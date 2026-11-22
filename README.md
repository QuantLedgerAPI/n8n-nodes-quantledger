# n8n-nodes-quantledger

Official **QuantLedger** community node for **n8n** workflow automation (`v2.9.1`).

Connects n8n pipelines directly to **73 deterministic pure-Python & NumPy CPA, FASB GAAP, IRC Corporate Tax, 409A Valuation, M&A QoE, GovCon DCAA, Commercial Real Estate, and Credit solvers (292 statutory laws across 57 US jurisdictions)** plus live federal compliance & B2B lead screeners:

1. **Execute 73-Engine GAAP / Tax / DCAA Solver (`BI-01`–`BI-73`):** `ASC 842` Lease Liability & CAM, `ASC 606` SaaS NDR, `ASC 326` CECL, `IRC § 409A` Safe-Harbor Valuation, `IRC § 382` NOL, `Form 6765` R&D Tax Credit, `DCAA` Indirect Rate Wrap, and `QoE` EBITDA bridges.
2. **Batch Screen US KYB, OFAC Sanctions, Commerce BIS & HHS OIG Exclusions:** Screen counterparty lists across `138,000+` live federal watchlist records + `31 CFR § 501.801` OFAC 50%-Rule beneficial ownership + SEC EDGAR CIK.
3. **Pull Live SEC Form D Startup Fundraising & 409A Leads:** Stream newly funded operating companies directly into HubSpot, Salesforce, Slack, or Google Sheets with CEO/CFO signer name, phone, closed dollars, `IRC § 409A` material financing flags, and `IRC § 1202` QSBS status.
4. **Screen DOL Form 5500 CPA Audit & ERISA § 408(b)(2) Fee Leads:** Query `121,000+` official U.S. DOL EFAST2 retirement plans for `80–120` participant first-time CPA audit leads, missing audit opinions, excess recordkeeping fees, and Line `4a` late deferrals.
5. **Audit Public Company SEC EDGAR Form 10-K XBRL & Debt Covenants:** Extract tied-out XBRL financials, Normalized Adjusted EBITDA, Altman Z-Score, DSCR, and verbatim debt-covenant quotes.
6. **Generate 2D Spreadsheet Spill Tables:** Output `[headers, ...rows]` arrays formatted for Google Sheets and Microsoft Excel nodes.

## Installation in n8n

### Option A — Community Nodes GUI (after npm publish)
1. Open **Settings -> Community Nodes -> Install** in your n8n instance.
2. Enter `n8n-nodes-quantledger` and click **Install**.

### Option B — Direct Install from GitHub (`Self-Hosted n8n`)
```bash
cd ~/.n8n/nodes
npm install git+https://github.com/QuantLedgerAPI/n8n-nodes-quantledger.git
```

## Authentication (Zero-Setup Demo Mode + RapidAPI Pro Key)
* **Zero-Setup Demo Mode:** Works immediately without credentials for 73-engine previews, KYB checks, Form D leads, Form 5500 screens, and 2D spreadsheet tables!
* **RapidAPI Key (`5 Free/Mo` or `Pro`):** Subscribe at [RapidAPI Hub — QuantLedger](https://rapidapi.com/quantledger/api/quantledger-73-engine-financial-and-statutory-api) and paste your `X-RapidAPI-Key` into the **QuantLedger API** credential in n8n to unlock full schedules, 5,000-entity KYB batches, 100-row lead pulls, and SEC 10-K XBRL audits.

## Related Spreadsheet & MCP Integrations
* **Google Sheets & Excel `=QUANTLEDGER(...)` Formulas:** [https://quantledgerapi.github.io/google-sheets-excel-formulas-and-n8n/](https://quantledgerapi.github.io/google-sheets-excel-formulas-and-n8n/)
* **Model Context Protocol (`@modelcontextprotocol/sdk`):** [https://github.com/QuantLedgerAPI/quantledger-mcp](https://github.com/QuantLedgerAPI/quantledger-mcp)

## License
MIT
