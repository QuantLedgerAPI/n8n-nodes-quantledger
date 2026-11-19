'use strict';

class QuantLedgerApi {
  constructor() {
    this.name = 'quantLedgerApi';
    this.displayName = 'QuantLedger API';
    this.documentationUrl = 'https://quantledgerapi.github.io/google-sheets-excel-formulas-and-n8n/';
    this.properties = [
      {
        displayName: 'Connection Mode',
        name: 'connectionMode',
        type: 'options',
        default: 'rapidapi',
        options: [
          {
            name: 'RapidAPI Gateway (5 Free/Mo or Pro Key)',
            value: 'rapidapi',
          },
          {
            name: 'Free Keyless Demo Preview (Rate-Limited)',
            value: 'demo',
          },
        ],
      },
      {
        displayName: 'RapidAPI Key (X-RapidAPI-Key)',
        name: 'rapidApiKey',
        type: 'string',
        typeOptions: { password: true },
        default: '',
        displayOptions: {
          show: {
            connectionMode: ['rapidapi'],
          },
        },
        description: 'Subscribe free (5 calls/mo) or Pro at https://rapidapi.com/quantledger/api/quantledger-73-engine-financial-and-statutory-api',
      },
    ];
  }
}

module.exports = { QuantLedgerApi };
