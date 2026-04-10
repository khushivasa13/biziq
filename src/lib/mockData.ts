// ─── Rich Sample Datasets ───────────────────────────────────────────────────
// Loaded into DataContext as pre-built databases the user can explore immediately.

export const sampleDatasets = {
  q4Sales: {
    name: 'Q4 Sales Report 2024',
    data: [
      { month: 'October', region: 'North', product: 'Enterprise Suite', revenue: 124500, units: 42, deals_closed: 18, avg_deal_size: 6916 },
      { month: 'October', region: 'South', product: 'Starter Plan',     revenue: 38200,  units: 191, deals_closed: 55, avg_deal_size: 694 },
      { month: 'October', region: 'East',  product: 'Pro Plan',         revenue: 67800,  units: 113, deals_closed: 32, avg_deal_size: 2118 },
      { month: 'October', region: 'West',  product: 'Enterprise Suite', revenue: 98700,  units: 33, deals_closed: 14, avg_deal_size: 7050 },
      { month: 'November', region: 'North', product: 'Pro Plan',        revenue: 89200,  units: 148, deals_closed: 41, avg_deal_size: 2175 },
      { month: 'November', region: 'South', product: 'Enterprise Suite',revenue: 145000, units: 48, deals_closed: 22, avg_deal_size: 6590 },
      { month: 'November', region: 'East',  product: 'Starter Plan',    revenue: 42100,  units: 210, deals_closed: 63, avg_deal_size: 668 },
      { month: 'November', region: 'West',  product: 'Pro Plan',        revenue: 73500,  units: 122, deals_closed: 38, avg_deal_size: 1934 },
      { month: 'December', region: 'North', product: 'Enterprise Suite',revenue: 198000, units: 66, deals_closed: 28, avg_deal_size: 7071 },
      { month: 'December', region: 'South', product: 'Pro Plan',        revenue: 95600,  units: 159, deals_closed: 47, avg_deal_size: 2034 },
      { month: 'December', region: 'East',  product: 'Enterprise Suite',revenue: 162000, units: 54, deals_closed: 23, avg_deal_size: 7043 },
      { month: 'December', region: 'West',  product: 'Starter Plan',    revenue: 55400,  units: 277, deals_closed: 82, avg_deal_size: 675 },
    ]
  },

  hrRecords: {
    name: 'HR Employee Records',
    data: [
      { employee_id: 1001, name: 'Sarah Chen',       department: 'Engineering',  role: 'Senior Engineer',    salary: 138000, hire_year: 2021, performance: 4.8, location: 'Remote' },
      { employee_id: 1002, name: 'James Okafor',     department: 'Sales',        role: 'Account Executive',  salary: 92000,  hire_year: 2022, performance: 4.2, location: 'New York' },
      { employee_id: 1003, name: 'Priya Sharma',     department: 'Marketing',    role: 'Marketing Manager',  salary: 105000, hire_year: 2020, performance: 4.6, location: 'London' },
      { employee_id: 1004, name: 'Marcus Williams',  department: 'Engineering',  role: 'Lead Engineer',      salary: 158000, hire_year: 2019, performance: 4.9, location: 'Remote' },
      { employee_id: 1005, name: 'Aisha Patel',      department: 'HR',           role: 'HR Director',        salary: 118000, hire_year: 2020, performance: 4.5, location: 'Chicago' },
      { employee_id: 1006, name: 'Tom Richardson',   department: 'Sales',        role: 'Regional Manager',   salary: 125000, hire_year: 2018, performance: 4.7, location: 'Dallas' },
      { employee_id: 1007, name: 'Luna Park',        department: 'Engineering',  role: 'Frontend Developer', salary: 115000, hire_year: 2023, performance: 4.3, location: 'Remote' },
      { employee_id: 1008, name: 'David Müller',     department: 'Finance',      role: 'CFO',                salary: 210000, hire_year: 2017, performance: 4.8, location: 'Frankfurt' },
      { employee_id: 1009, name: 'Fatima Al-Hassan', department: 'Marketing',    role: 'Content Strategist', salary: 87000,  hire_year: 2023, performance: 4.1, location: 'Dubai' },
      { employee_id: 1010, name: 'Ryan O\'Brien',    department: 'Sales',        role: 'Sales Development',  salary: 68000,  hire_year: 2024, performance: 3.9, location: 'Boston' },
      { employee_id: 1011, name: 'Yuki Tanaka',      department: 'Engineering',  role: 'ML Engineer',        salary: 175000, hire_year: 2021, performance: 4.9, location: 'Tokyo' },
      { employee_id: 1012, name: 'Grace Mensah',     department: 'Finance',      role: 'Financial Analyst',  salary: 95000,  hire_year: 2022, performance: 4.4, location: 'London' },
    ]
  },

  marketingCampaigns: {
    name: 'Marketing Campaigns 2024',
    data: [
      { campaign: 'Google Search Ads',    channel: 'Paid Search',  spend: 45000, impressions: 2100000, clicks: 58000, conversions: 1740, revenue_generated: 138600, roi: 208 },
      { campaign: 'LinkedIn Sponsored',   channel: 'Social',       spend: 32000, impressions: 980000,  clicks: 18600, conversions: 744,  revenue_generated: 82100,  roi: 157 },
      { campaign: 'Email Newsletter Q4',  channel: 'Email',        spend: 8500,  impressions: 0,       clicks: 42000, conversions: 2100, revenue_generated: 94500,  roi: 1011 },
      { campaign: 'Webinar Series',       channel: 'Content',      spend: 12000, impressions: 145000,  clicks: 12000, conversions: 480,  revenue_generated: 67200,  roi: 460 },
      { campaign: 'YouTube Pre-rolls',    channel: 'Video',        spend: 28000, impressions: 5600000, clicks: 42000, conversions: 420,  revenue_generated: 31500,  roi: 12 },
      { campaign: 'Partner Referrals',    channel: 'Referral',     spend: 15000, impressions: 0,       clicks: 8900,  conversions: 890,  revenue_generated: 134000, roi: 793 },
      { campaign: 'Twitter/X Ads',        channel: 'Social',       spend: 11000, impressions: 3200000, clicks: 9600,  conversions: 192,  revenue_generated: 14400,  roi: 31 },
      { campaign: 'SEO Blog Content',     channel: 'Organic',      spend: 22000, impressions: 890000,  clicks: 67000, conversions: 1340, revenue_generated: 120600, roi: 448 },
    ]
  }
};

// ─── Pre-canned AI Responses ─────────────────────────────────────────────────
// Returns structured AI-style responses based on the active dataset and question.
// These look and feel exactly like real AI-generated analysis.

export interface MockResponse {
  answer: string;
  sql?: string;
  chartData?: Array<{ name: string; value: number }>;
  tableData?: Array<Record<string, any>>;
  suggestions?: string[];
}

type DatasetKey = 'Q4 Sales Report 2024' | 'HR Employee Records' | 'Marketing Campaigns 2024' | string;

const Q4_RESPONSES: Record<string, MockResponse> = {
  revenue: {
    answer: `📊 **Q4 Revenue Analysis**\n\nTotal Q4 revenue reached **$1,189,000** across all regions and products.\n\n**By Month:**\n• October: $329,200\n• November: $349,800 (+6.3% MoM)\n• December: **$510,000** (+45.8% MoM) — strongest month driven by year-end enterprise deals\n\n**Key Insight:** December accounted for 42.9% of all Q4 revenue. The Enterprise Suite drove 68% of total revenue despite representing only 31% of unit sales, confirming premium pricing is working.`,
    sql: `SELECT month, SUM(revenue) AS total_revenue\nFROM q4_sales\nGROUP BY month\nORDER BY total_revenue DESC;`,
    chartData: [
      { name: 'October', value: 329200 },
      { name: 'November', value: 349800 },
      { name: 'December', value: 510000 },
    ],
    suggestions: ['Break down revenue by region', 'Which product made the most?', 'Compare deal sizes by product']
  },
  region: {
    answer: `🗺️ **Regional Performance Breakdown**\n\nNorth region led Q4 with **$421,700** total revenue, closely followed by South at **$318,900**.\n\n**Rankings:**\n1. 🥇 North — $421,700 (35.5%)\n2. 🥈 South — $318,900 (26.8%)\n3. 🥉 East — $271,900 (22.9%)\n4. West — $227,600 (19.1%)\n\n**Action:** The West region underperformed by 23% vs North. Q1 should prioritize deploying 2 additional AEs in West-coast territory.`,
    sql: `SELECT region, SUM(revenue) AS total_revenue, SUM(deals_closed) AS total_deals\nFROM q4_sales\nGROUP BY region\nORDER BY total_revenue DESC;`,
    chartData: [
      { name: 'North', value: 421700 },
      { name: 'South', value: 318900 },
      { name: 'East', value: 271900 },
      { name: 'West', value: 227600 },
    ],
    suggestions: ['Show top month by region', 'Which region closed most deals?', 'Revenue per deal by region']
  },
  product: {
    answer: `📦 **Product Revenue Breakdown**\n\nThe Enterprise Suite dominates at **$728,200** (61.2% of total revenue).\n\n| Product | Revenue | Units | Avg Deal Size |\n|---|---|---|---|\n| Enterprise Suite | $728,200 | 243 | $6,994 |\n| Pro Plan | $325,100 | 442 | $2,065 |\n| Starter Plan | $135,700 | 678 | $668 |\n\n**Recommendation:** Upsell Starter → Pro. 678 starter customers exist — even a 15% conversion to Pro would generate **$166k** in incremental Q1 revenue.`,
    sql: `SELECT product, SUM(revenue) AS total_revenue, SUM(units) AS total_units,\n  ROUND(AVG(avg_deal_size), 0) AS avg_deal_size\nFROM q4_sales\nGROUP BY product\nORDER BY total_revenue DESC;`,
    chartData: [
      { name: 'Enterprise Suite', value: 728200 },
      { name: 'Pro Plan', value: 325100 },
      { name: 'Starter Plan', value: 135700 },
    ],
    tableData: [
      { Product: 'Enterprise Suite', Revenue: '$728,200', Units: 243, 'Avg Deal': '$6,994' },
      { Product: 'Pro Plan', Revenue: '$325,100', Units: 442, 'Avg Deal': '$2,065' },
      { Product: 'Starter Plan', Revenue: '$135,700', Units: 678, 'Avg Deal': '$668' },
    ],
    suggestions: ['Which region sells most Enterprise?', 'Monthly trend by product', 'Total deals closed']
  },
  deals: {
    answer: `🤝 **Deals Closed Analysis**\n\nA total of **461 deals** were closed in Q4, generating $1,189,000 in revenue.\n\n**December was the strongest close month** with 133 deals — a 30.4% increase over October's 102 deals.\n\nAverage deal size across all products: **$2,579**. Enterprise Suite deals averaged **$6,994**, making each enterprise win equivalent to ~10 starter sales.`,
    sql: `SELECT month, SUM(deals_closed) AS total_deals, ROUND(SUM(revenue)/SUM(deals_closed), 0) AS avg_deal_value\nFROM q4_sales\nGROUP BY month\nORDER BY month;`,
    chartData: [
      { name: 'October', value: 102 },
      { name: 'November', value: 164 },
      { name: 'December', value: 195 },
    ],
    suggestions: ['Revenue per deal by region', 'Top product by deals closed', 'Show full Q4 summary']
  },
};

const HR_RESPONSES: Record<string, MockResponse> = {
  salary: {
    answer: `💰 **Salary Distribution Analysis**\n\nAverage company salary: **$115,500**\n\nTop earner: David Müller (CFO) at **$210,000**\n\n**By Department:**\n• Engineering: avg **$146,500** (highest)\n• Finance: avg **$152,500**\n• Sales: avg **$95,000**\n• Marketing: avg **$96,000**\n• HR: avg **$118,000**\n\n**Insight:** Engineering and Finance compensation is well above market median. Sales salaries could be limiting talent acquisition in competitive markets.`,
    sql: `SELECT department, ROUND(AVG(salary), 0) AS avg_salary, MAX(salary) AS max_salary, MIN(salary) AS min_salary\nFROM hr_records\nGROUP BY department\nORDER BY avg_salary DESC;`,
    chartData: [
      { name: 'Finance', value: 152500 },
      { name: 'Engineering', value: 146500 },
      { name: 'HR', value: 118000 },
      { name: 'Marketing', value: 96000 },
      { name: 'Sales', value: 95000 },
    ],
    suggestions: ['Who is the highest paid employee?', 'Show performance by department', 'Salary vs performance correlation']
  },
  performance: {
    answer: `⭐ **Performance Review Summary**\n\nCompany average performance score: **4.47 / 5.0**\n\nTop performers (≥4.8):\n• Yuki Tanaka — 4.9 (ML Engineer, Engineering)\n• Marcus Williams — 4.9 (Lead Engineer, Engineering)\n• Sarah Chen — 4.8 (Senior Engineer, Engineering)\n• David Müller — 4.8 (CFO, Finance)\n\nOnly 1 employee below 4.0 (Ryan O\'Brien, newest hire in 2024 — expected for ramp period).\n\n**Engineering department is the highest-performing team** with an average of 4.63.`,
    sql: `SELECT name, department, performance, salary\nFROM hr_records\nORDER BY performance DESC\nLIMIT 5;`,
    chartData: [
      { name: 'Engineering', value: 4.63 },
      { name: 'Finance', value: 4.60 },
      { name: 'HR', value: 4.50 },
      { name: 'Marketing', value: 4.35 },
      { name: 'Sales', value: 4.27 },
    ],
    tableData: [
      { Name: 'Yuki Tanaka', Department: 'Engineering', Score: '4.9', Salary: '$175,000' },
      { Name: 'Marcus Williams', Department: 'Engineering', Score: '4.9', Salary: '$158,000' },
      { Name: 'Sarah Chen', Department: 'Engineering', Score: '4.8', Salary: '$138,000' },
      { Name: 'David Müller', Department: 'Finance', Score: '4.8', Salary: '$210,000' },
      { Name: 'Tom Richardson', Department: 'Sales', Score: '4.7', Salary: '$125,000' },
    ],
    suggestions: ['Which department has lowest performance?', 'Show salary vs performance', 'How long has the top performer been here?']
  },
  department: {
    answer: `🏢 **Department Headcount & Structure**\n\nTotal headcount: **12 employees** across 5 departments.\n\n| Department | Count | Avg Salary | Avg Performance |\n|---|---|---|---|\n| Engineering | 4 | $146,500 | 4.73 |\n| Sales | 3 | $95,000 | 4.27 |\n| Marketing | 2 | $96,000 | 4.35 |\n| Finance | 2 | $152,500 | 4.60 |\n| HR | 1 | $118,000 | 4.50 |\n\n**Risk:** HR is a single-person department. A key-person dependency risk exists — recommend hiring one HR generalist in Q2.`,
    sql: `SELECT department, COUNT(*) AS headcount, ROUND(AVG(salary), 0) AS avg_salary, ROUND(AVG(performance), 2) AS avg_perf\nFROM hr_records\nGROUP BY department\nORDER BY headcount DESC;`,
    chartData: [
      { name: 'Engineering', value: 4 },
      { name: 'Sales', value: 3 },
      { name: 'Marketing', value: 2 },
      { name: 'Finance', value: 2 },
      { name: 'HR', value: 1 },
    ],
    suggestions: ['Who earns the most?', 'Show remote vs office split', 'Performance rankings']
  },
};

const MARKETING_RESPONSES: Record<string, MockResponse> = {
  roi: {
    answer: `📈 **Campaign ROI Analysis**\n\nBest performing campaign: **Email Newsletter Q4** with an astonishing **1,011% ROI** on $8,500 spend.\n\nWorst performing: **YouTube Pre-rolls** at just 12% ROI — effectively burning $28,000 for minimal return.\n\n**Top 3 by ROI:**\n1. Email Newsletter — 1,011%\n2. Partner Referrals — 793%\n3. Webinar Series — 460%\n\n**Recommendation:** Immediately reallocate $20,000 of the YouTube budget to Email and Partner programs, projected to generate an additional **$160,000** in revenue.`,
    sql: `SELECT campaign, spend, revenue_generated, roi\nFROM marketing_campaigns\nORDER BY roi DESC;`,
    chartData: [
      { name: 'Email', value: 1011 },
      { name: 'Partners', value: 793 },
      { name: 'Webinar', value: 460 },
      { name: 'SEO Blog', value: 448 },
      { name: 'LinkedIn', value: 157 },
      { name: 'Google Ads', value: 208 },
      { name: 'Twitter/X', value: 31 },
      { name: 'YouTube', value: 12 },
    ],
    suggestions: ['Which channel has highest spend?', 'Total revenue from all campaigns', 'Best cost per conversion']
  },
  spend: {
    answer: `💸 **Campaign Spend Breakdown**\n\nTotal marketing spend: **$173,500** generating **$682,900** in attributed revenue — an overall blended ROI of **293%**.\n\n**Spend by Channel:**\n• Paid Search (Google Ads): $45,000 — highest spend\n• Video (YouTube): $28,000 — lowest return\n• Social (LinkedIn + Twitter): $43,000\n• Organic + Content: $34,000 — best value\n\n**Key Finding:** $34,000 spent on Organic (SEO) and Content (Webinars) generated $187,800 — a 452% return. This is the highest leveraged channel cluster.`,
    sql: `SELECT channel, SUM(spend) AS total_spend, SUM(revenue_generated) AS total_revenue,\n  ROUND(SUM(revenue_generated) / SUM(spend) * 100, 0) AS blended_roi\nFROM marketing_campaigns\nGROUP BY channel\nORDER BY blended_roi DESC;`,
    chartData: [
      { name: 'Google Ads', value: 45000 },
      { name: 'Social', value: 43000 },
      { name: 'SEO+Content', value: 34000 },
      { name: 'YouTube', value: 28000 },
      { name: 'Referral', value: 15000 },
      { name: 'Email', value: 8500 },
    ],
    suggestions: ['Show ROI by channel', 'Cost per conversion comparison', 'Which campaign should we cut?']
  },
  conversion: {
    answer: `🎯 **Conversion Rate Analysis**\n\nHighest conversion rate: **Email Newsletter** at **5.0%** (2,100 conversions from 42,000 clicks).\n\n**Conversions by Campaign:**\n| Campaign | Clicks | Conversions | Rate |\n|---|---|---|---|\n| Email Newsletter | 42,000 | 2,100 | 5.0% |\n| Partner Referrals | 8,900 | 890 | 10.0% |\n| Webinar Series | 12,000 | 480 | 4.0% |\n| SEO Blog | 67,000 | 1,340 | 2.0% |\n| Google Ads | 58,000 | 1,740 | 3.0% |\n\n**Insight:** Partner Referrals convert at 10% — 5x the average. Scaling the referral program should be a top Q1 priority.`,
    sql: `SELECT campaign, clicks, conversions, ROUND(conversions * 100.0 / clicks, 1) AS conversion_rate\nFROM marketing_campaigns\nWHERE clicks > 0\nORDER BY conversion_rate DESC;`,
    chartData: [
      { name: 'Partners', value: 10.0 },
      { name: 'Email', value: 5.0 },
      { name: 'Webinar', value: 4.0 },
      { name: 'Google Ads', value: 3.0 },
      { name: 'SEO Blog', value: 2.0 },
      { name: 'LinkedIn', value: 4.0 },
    ],
    suggestions: ['Total revenue generated', 'Campaign ROI ranking', 'Best channel to scale next quarter']
  },
};

// ─── Response Matcher ────────────────────────────────────────────────────────

function matchResponse(question: string, datasetName: DatasetKey): MockResponse | null {
  const q = question.toLowerCase();

  if (datasetName.includes('Sales') || datasetName.includes('Q4')) {
    if (q.match(/revenue|sales|money|total|income|earning/)) return Q4_RESPONSES.revenue;
    if (q.match(/region|area|territory|location|north|south|east|west/)) return Q4_RESPONSES.region;
    if (q.match(/product|plan|enterprise|starter|pro/)) return Q4_RESPONSES.product;
    if (q.match(/deal|closed|close|won|win/)) return Q4_RESPONSES.deals;
  }

  if (datasetName.includes('HR') || datasetName.includes('Employee')) {
    if (q.match(/salary|pay|earn|compensation|wage|income/)) return HR_RESPONSES.salary;
    if (q.match(/perform|score|rating|review|best|top/)) return HR_RESPONSES.performance;
    if (q.match(/department|team|headcount|count|many|division/)) return HR_RESPONSES.department;
  }

  if (datasetName.includes('Marketing') || datasetName.includes('Campaign')) {
    if (q.match(/roi|return|efficient|best|worst|worth/)) return MARKETING_RESPONSES.roi;
    if (q.match(/spend|budget|cost|expensive|money|channel/)) return MARKETING_RESPONSES.spend;
    if (q.match(/conver|click|rate|lead|sign|acquisition/)) return MARKETING_RESPONSES.conversion;
  }

  return null; // no match — let the real API handle it
}

export function getMockResponse(question: string, datasetName: DatasetKey): MockResponse {
  const matched = matchResponse(question, datasetName);

  if (matched) return matched;

  // Generic fallback based on dataset type
  if (datasetName.includes('Sales')) return Q4_RESPONSES.revenue;
  if (datasetName.includes('HR')) return HR_RESPONSES.department;
  if (datasetName.includes('Marketing')) return MARKETING_RESPONSES.roi;

  return {
    answer: `I've analyzed your dataset "${datasetName}". The data contains ${12} records. Try asking about specific metrics like revenue, performance, or ROI to get detailed visual breakdowns.`,
    suggestions: ['Show me a summary', 'What are the key trends?', 'Export to PDF']
  };
}
