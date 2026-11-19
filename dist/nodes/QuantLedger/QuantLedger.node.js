'use strict';

const { QUANTLEDGER_PROPERTIES } = require('./quantledgerFields');

const RAPID_ORIGIN = 'https://quantledger-73-engine-financial-and-statutory-api.p.rapidapi.com';
const RAPID_HOST = 'quantledger-73-engine-financial-and-statutory-api.p.rapidapi.com';
const DEMO_ORIGIN = 'https://quantledger-ghost-kitchen-3yplwqtnha-uc.a.run.app';

class QuantLedger {
  constructor() {
    this.description = {
      displayName: 'QuantLedger',
      name: 'quantLedger',
      icon: 'file:quantledger.svg',
      group: ['transform'],
      version: 1,
      subtitle: '={{$parameter["operation"]}}',
      description: 'Deterministic 73-engine GAAP, IRC corporate tax, 409A, US KYB/OFAC, SEC Form D, DOL Form 5500 & SEC 10-K API',
      defaults: { name: 'QuantLedger' },
      inputs: ['main'],
      outputs: ['main'],
      credentials: [{ name: 'quantLedgerApi', required: false }],
      properties: QUANTLEDGER_PROPERTIES,
    };
  }

  async execute() {
    const items = this.getInputData();
    const returnData = [];
    let creds = { connectionMode: 'demo', rapidApiKey: '' };
    try {
      const loaded = await this.getCredentials('quantLedgerApi');
      if (loaded) creds = loaded;
    } catch (_e) {
      // Fall back to keyless preview endpoints when credentials are not attached
    }

    const apiKey = String(creds.rapidApiKey || '').trim();
    const usePro = creds.connectionMode === 'rapidapi' && apiKey.length > 0;
    const baseOrigin = usePro ? RAPID_ORIGIN : DEMO_ORIGIN;
    const headers = { 'Content-Type': 'application/json', Accept: 'application/json' };
    if (usePro) {
      headers['X-RapidAPI-Key'] = apiKey;
      headers['X-RapidAPI-Host'] = RAPID_HOST;
    }

    for (let i = 0; i < items.length; i++) {
      const op = this.getNodeParameter('operation', i);
      let url = '';
      let body = {};

      if (op === 'executeMathEngine') {
        const code = String(this.getNodeParameter('engineCode', i, 'BI-17')).trim().toUpperCase();
        const jur = String(this.getNodeParameter('jurisdiction', i, 'NY')).trim().toUpperCase();
        const naics = String(this.getNodeParameter('naicsOrSic', i, '541211')).trim();
        const rawJson = this.getNodeParameter('structuredInputsJson', i, '{}');
        const parsed = typeof rawJson === 'string' ? JSON.parse(rawJson || '{}') : (rawJson || {});
        url = usePro ? `${baseOrigin}/v1/suites/${encodeURIComponent(code)}/compute` : `${DEMO_ORIGIN}/v1/public/preview/${encodeURIComponent(code)}`;
        body = { jurisdiction: jur, naics_or_sic: naics, structured_inputs: parsed };
      } else if (op === 'batchScreenKyb') {
        const rawEnts = String(this.getNodeParameter('entitiesRaw', i, 'Apple Inc.')).split(/[,\n]+/).map((s) => s.trim()).filter(Boolean);
        url = usePro ? `${baseOrigin}/v1/kyb/batch-screen` : `${DEMO_ORIGIN}/v1/public/kyb-preview`;
        body = { entities: rawEnts, fuzzy_threshold: 0.88 };
      } else if (op === 'secFormDLeads') {
        url = usePro ? `${baseOrigin}/v1/sec-edgar/form-d-private-raises` : `${DEMO_ORIGIN}/v1/public/form-d-preview`;
        body = {
          state_filter: String(this.getNodeParameter('stateFilter', i, '')).trim().toUpperCase(),
          days_back: Number(this.getNodeParameter('daysBack', i, 14)),
          min_amount_sold_usd: Number(this.getNodeParameter('minAmountUsd', i, 250000)),
          max_results: Number(this.getNodeParameter('maxResults', i, 25)),
          exclude_pooled_funds: true,
        };
      } else if (op === 'dolForm5500Screen') {
        url = usePro ? `${baseOrigin}/v1/dol-ebsa/form-5500-audit-screen` : `${DEMO_ORIGIN}/v1/public/form-5500-preview`;
        body = {
          plan_year: 2025,
          state_filter: String(this.getNodeParameter('stateFilter', i, 'CA')).trim().toUpperCase(),
          trigger_filter: String(this.getNodeParameter('triggerFilter', i, 'FIRST_TIME_CPA_AUDIT_ZONE')),
          min_assets_usd: Number(this.getNodeParameter('minAmountUsd', i, 500000)),
          max_results: Number(this.getNodeParameter('maxResults', i, 25)),
        };
      } else if (op === 'sec10kDossier') {
        if (!usePro) {
          throw new Error('SEC 10-K deep XBRL + footnote audit requires a RapidAPI key (5 free/mo at rapidapi.com/quantledger).');
        }
        url = `${baseOrigin}/v1/sec-edgar/10k-xbrl-ebitda-and-covenants`;
        body = { ticker_or_cik: String(this.getNodeParameter('tickerOrCik', i, 'CAT')).trim().toUpperCase(), analysis_focus: 'auto' };
      } else {
        url = usePro ? `${baseOrigin}/v1/spreadsheet/formula-eval` : `${DEMO_ORIGIN}/v1/public/spreadsheet-demo`;
        body = {
          formula_type: String(this.getNodeParameter('formulaType', i, 'ENGINE')),
          engine_code: String(this.getNodeParameter('engineCode', i, 'BI-17')).trim().toUpperCase(),
          jurisdiction: String(this.getNodeParameter('jurisdiction', i, 'NY')).trim().toUpperCase(),
          max_rows: Number(this.getNodeParameter('maxResults', i, 25)),
        };
      }

      const responseData = await this.helpers.httpRequest({
        method: 'POST',
        url,
        headers,
        body,
        json: true,
      });
      returnData.push({ json: responseData, pairedItem: { item: i } });
    }

    return [returnData];
  }
}

module.exports = { QuantLedger };
