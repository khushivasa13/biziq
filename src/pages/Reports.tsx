import { useState, useRef } from 'react';
import { FileBarChart, Download, Share2, FileSpreadsheet, Wand2, TrendingUp, Users, Target, DollarSign } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useData } from '../contexts/DataContext';
import { analyzeBusinessData } from '../lib/openai';
import { getMockResponse } from '../lib/mockData';
import { cn } from '../lib/utils';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, CartesianGrid, Legend
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { usePDF } from 'react-to-pdf';

const COLORS = ['#4f8ef7', '#7c3aed', '#2dd4bf', '#f59e0b', '#ef4444', '#10b981'];

// ─── Pre-built sample report sections ─────────────────────────────────────────
const SAMPLE_REPORTS: Record<string, any> = {
  'Q4 Sales Report 2024': {
    title: 'Q4 2024 Sales Executive Summary',
    subtitle: 'Revenue, Regional Performance & Product Analysis',
    kpis: [
      { label: 'Total Revenue', value: '$1,189,000', change: '+18.4%', up: true, icon: DollarSign, color: 'text-emerald-400' },
      { label: 'Deals Closed', value: '461', change: '+23.6%', up: true, icon: Target, color: 'text-[#4f8ef7]' },
      { label: 'Avg Deal Size', value: '$2,579', change: '+4.1%', up: true, icon: TrendingUp, color: 'text-[#7c3aed]' },
      { label: 'Top Region', value: 'North', change: '$421.7K', up: true, icon: Users, color: 'text-[#2dd4bf]' },
    ],
    mainChart: {
      type: 'bar',
      title: 'Revenue by Month',
      data: [{ name: 'October', value: 329200 }, { name: 'November', value: 349800 }, { name: 'December', value: 510000 }],
    },
    secondaryChart: {
      type: 'pie',
      title: 'Revenue by Product',
      data: [{ name: 'Enterprise Suite', value: 728200 }, { name: 'Pro Plan', value: 325100 }, { name: 'Starter Plan', value: 135700 }],
    },
    table: {
      headers: ['Region', 'Revenue', 'Deals Closed', 'Avg Deal Size'],
      rows: [
        ['North', '$421,700', '91', '$4,634'],
        ['South', '$318,900', '140', '$2,278'],
        ['East', '$271,900', '118', '$2,304'],
        ['West', '$227,600', '112', '$2,032'],
      ]
    },
    insights: [
      'December drove 42.9% of all Q4 revenue — enterprise year-end budget spend was the primary catalyst.',
      'Enterprise Suite represents 61.2% of revenue at only 31% of unit volume, validating premium pricing strategy.',
      'West region underperformed North by 35%. Recommend deploying 2 additional AEs in West-coast territory for Q1.',
      'Starter Plan has 678 units — a 15% upsell to Pro would generate ~$166,000 incremental Q1 revenue.',
    ],
  },
  'HR Employee Records': {
    title: 'HR Workforce Intelligence Report',
    subtitle: 'Compensation, Performance & Headcount Analysis',
    kpis: [
      { label: 'Total Employees', value: '12', change: '+4 YoY', up: true, icon: Users, color: 'text-[#4f8ef7]' },
      { label: 'Avg Salary', value: '$115,500', change: '+8.2%', up: true, icon: DollarSign, color: 'text-emerald-400' },
      { label: 'Avg Performance', value: '4.47 / 5.0', change: '+0.2', up: true, icon: TrendingUp, color: 'text-[#7c3aed]' },
      { label: 'Top Department', value: 'Engineering', change: '4.73 avg score', up: true, icon: Target, color: 'text-[#2dd4bf]' },
    ],
    mainChart: {
      type: 'bar',
      title: 'Average Salary by Department',
      data: [
        { name: 'Finance', value: 152500 },
        { name: 'Engineering', value: 146500 },
        { name: 'HR', value: 118000 },
        { name: 'Marketing', value: 96000 },
        { name: 'Sales', value: 95000 },
      ],
    },
    secondaryChart: {
      type: 'pie',
      title: 'Headcount by Department',
      data: [
        { name: 'Engineering', value: 4 },
        { name: 'Sales', value: 3 },
        { name: 'Marketing', value: 2 },
        { name: 'Finance', value: 2 },
        { name: 'HR', value: 1 },
      ],
    },
    table: {
      headers: ['Name', 'Department', 'Role', 'Salary', 'Performance'],
      rows: [
        ['Yuki Tanaka', 'Engineering', 'ML Engineer', '$175,000', '4.9 ⭐'],
        ['Marcus Williams', 'Engineering', 'Lead Engineer', '$158,000', '4.9 ⭐'],
        ['David Müller', 'Finance', 'CFO', '$210,000', '4.8 ⭐'],
        ['Sarah Chen', 'Engineering', 'Sr. Engineer', '$138,000', '4.8 ⭐'],
        ['Tom Richardson', 'Sales', 'Regional Manager', '$125,000', '4.7'],
      ]
    },
    insights: [
      'Engineering is the highest-performing department (4.73 avg) and also top compensated at $146,500 avg salary.',
      'HR department has only 1 person — a critical single point of failure. Recommend Q2 hire of HR Generalist.',
      'Ryan O\'Brien (Sales, 2024) is the lowest scorer at 3.9, within normal new hire ramp expectations.',
      'David Müller (CFO) at $210,000 is the highest compensated — well within market range for Frankfurt-based executive.',
    ],
  },
  'Marketing Campaigns 2024': {
    title: 'Marketing Campaign Performance Report',
    subtitle: 'ROI, Spend Efficiency & Channel Analysis',
    kpis: [
      { label: 'Total Spend', value: '$173,500', change: '-5.2% vs plan', up: false, icon: DollarSign, color: 'text-[#4f8ef7]' },
      { label: 'Revenue Generated', value: '$682,900', change: 'Blended ROI 293%', up: true, icon: TrendingUp, color: 'text-emerald-400' },
      { label: 'Total Conversions', value: '7,906', change: '+31.2% YoY', up: true, icon: Target, color: 'text-[#7c3aed]' },
      { label: 'Best Campaign', value: 'Email Newsletter', change: '1,011% ROI', up: true, icon: Users, color: 'text-[#2dd4bf]' },
    ],
    mainChart: {
      type: 'bar',
      title: 'Campaign ROI (%)',
      data: [
        { name: 'Email', value: 1011 },
        { name: 'Referral', value: 793 },
        { name: 'Webinar', value: 460 },
        { name: 'SEO Blog', value: 448 },
        { name: 'Google Ads', value: 208 },
        { name: 'LinkedIn', value: 157 },
        { name: 'Twitter', value: 31 },
        { name: 'YouTube', value: 12 },
      ],
    },
    secondaryChart: {
      type: 'pie',
      title: 'Budget Allocation by Channel',
      data: [
        { name: 'Paid Search', value: 45000 },
        { name: 'Social Media', value: 43000 },
        { name: 'SEO + Content', value: 34000 },
        { name: 'Video', value: 28000 },
        { name: 'Referral', value: 15000 },
        { name: 'Email', value: 8500 },
      ],
    },
    table: {
      headers: ['Campaign', 'Spend', 'Conversions', 'Revenue', 'ROI'],
      rows: [
        ['Email Newsletter Q4', '$8,500', '2,100', '$94,500', '1,011%'],
        ['Partner Referrals', '$15,000', '890', '$134,000', '793%'],
        ['Webinar Series', '$12,000', '480', '$67,200', '460%'],
        ['SEO Blog Content', '$22,000', '1,340', '$120,600', '448%'],
        ['Google Search Ads', '$45,000', '1,740', '$138,600', '208%'],
        ['YouTube Pre-rolls', '$28,000', '420', '$31,500', '12%'],
      ]
    },
    insights: [
      'Email Newsletter achieved 1,011% ROI on just $8,500 spend — the highest leverage asset in the entire portfolio.',
      'YouTube Pre-rolls burned $28,000 for only 12% ROI. Recommend redirecting 75% of this budget immediately.',
      'Partner Referrals convert at 10% — 5x the platform average. Scaling referral program is the #1 Q1 priority.',
      'Blended marketing ROI of 293% significantly outperforms industry benchmark of 122%. Strategy is working.',
    ],
  }
};

const DEFAULT_DATASET_KEY = 'Q4 Sales Report 2024';

export default function Reports() {
  const { dashboardStyle } = useTheme();
  const { currentDataset, datasets } = useData();
  const [generating, setGenerating] = useState(false);
  const [reportReady, setReportReady] = useState(true); // Show sample by default
  const [prompt, setPrompt] = useState('');
  const [reportContent, setReportContent] = useState<any>(null);
  const [reportType, setReportType] = useState('Executive Summary');
  const { toPDF, targetRef } = usePDF({ filename: 'biziq_report.pdf' });

  const getPanelClass = () => dashboardStyle === 'bento' ? 'bento-panel' : dashboardStyle === 'minimal-dark' ? 'minimal-dark-panel' : 'glass-panel';

  // Get the sample report for the current dataset (or default)
  const activeReportKey = currentDataset?.name || DEFAULT_DATASET_KEY;
  const sampleReport = SAMPLE_REPORTS[activeReportKey] || SAMPLE_REPORTS[DEFAULT_DATASET_KEY];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setGenerating(true);
    setReportReady(false);

    try {
      // Try instant mock response first
      const mock = getMockResponse(prompt || `Generate a ${reportType} for this data`, currentDataset?.name || '');
      
      // Simulate brief thinking
      await new Promise(r => setTimeout(r, 1200));
      
      setReportContent(mock);
      setReportReady(true);

      // Background: upgrade with real AI
      if (currentDataset) {
        try {
          const result = await analyzeBusinessData(
            `Generate a comprehensive ${reportType}. ${prompt}`,
            currentDataset.data
          );
          if (result?.text?.length > 20) setReportContent(result);
        } catch {}
      }
    } catch {
      setReportReady(true); // show sample anyway
    } finally {
      setGenerating(false);
    }
  };

  const currentReport = reportContent || sampleReport;

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20">
      <div className="mb-4">
        <h1 className="text-3xl font-bold tracking-tight mb-1">Report Generator</h1>
        <p className="text-zinc-400">AI-powered business intelligence reports — export to PDF instantly.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
        {/* Config Panel */}
        <div className={cn("p-6 rounded-2xl h-fit lg:sticky lg:top-6 space-y-5", getPanelClass())}>
          <h3 className="text-lg font-semibold border-b border-white/10 pb-3">Report Settings</h3>
          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-zinc-400 mb-1.5 block">Dataset</label>
              <select
                className="w-full bg-[#18181b] border border-white/10 rounded-xl py-2 px-3 text-white focus:outline-none focus:border-[#4f8ef7] text-sm"
                value={currentDataset?.id || ''}
              >
                {datasets.map(ds => <option key={ds.id} value={ds.id}>{ds.name}</option>)}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-zinc-400 mb-1.5 block">Report Type</label>
              <select
                value={reportType}
                onChange={e => setReportType(e.target.value)}
                className="w-full bg-[#18181b] border border-white/10 rounded-xl py-2 px-3 text-white focus:outline-none focus:border-[#4f8ef7] text-sm"
              >
                <option>Executive Summary</option>
                <option>Deep Dive Analysis</option>
                <option>Financial Health Check</option>
                <option>Performance Review</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-zinc-400 mb-1.5 block">Custom Focus (Optional)</label>
              <textarea
                rows={3}
                placeholder="E.g., Focus on regional performance and Q1 forecasting..."
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                className="w-full bg-[#18181b] border border-white/10 rounded-xl py-2 px-3 text-white focus:outline-none focus:border-[#4f8ef7] resize-none text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={generating}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#4f8ef7] to-[#7c3aed] text-white font-medium hover:opacity-90 flex items-center justify-center gap-2 disabled:opacity-50 transition-opacity"
            >
              {generating ? (
                <><Wand2 className="w-4 h-4 animate-spin" /> Generating...</>
              ) : (
                <><Wand2 className="w-4 h-4" /> Generate Report</>
              )}
            </button>
          </form>

          {/* Quick prompts */}
          <div className="pt-2 border-t border-white/5">
            <p className="text-xs font-medium text-zinc-500 mb-2">Quick Analyses</p>
            <div className="space-y-1">
              {['Show revenue trends', 'Top performers', 'Budget efficiency'].map(q => (
                <button
                  key={q}
                  onClick={() => setPrompt(q)}
                  className="w-full text-left text-xs px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Report Output */}
        <div className="lg:col-span-2">
          {generating && (
            <div className={cn("min-h-[400px] rounded-2xl flex flex-col items-center justify-center p-8 text-center", getPanelClass())}>
              <div className="w-14 h-14 mb-5 relative">
                <div className="absolute inset-0 border-4 border-[#18181b] rounded-full" />
                <div className="absolute inset-0 border-4 border-[#4f8ef7] rounded-full border-t-transparent animate-spin" />
              </div>
              <p className="text-base font-medium text-zinc-300 animate-pulse">BizIQ is analyzing your data...</p>
              <p className="text-sm text-zinc-600 mt-1">Building charts, tables & insights</p>
            </div>
          )}

          <AnimatePresence>
            {reportReady && !generating && (
              <motion.div
                ref={targetRef}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn("rounded-2xl p-6 md:p-8 space-y-8", getPanelClass())}
              >
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-6">
                  <div>
                    <p className="text-xs font-bold text-[#4f8ef7] uppercase tracking-widest mb-1">BizIQ Intelligence Report</p>
                    <h2 className="text-2xl font-bold text-white">{currentReport.title || 'Business Analysis Report'}</h2>
                    <p className="text-zinc-400 text-sm mt-1">{currentReport.subtitle || `Generated ${new Date().toLocaleDateString()}`}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => toPDF()} className="p-2 bg-[#2dd4bf]/10 hover:bg-[#2dd4bf]/20 border border-[#2dd4bf]/20 rounded-lg text-[#2dd4bf] transition-colors" title="Download PDF">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-zinc-300 transition-colors" title="Export XLSX">
                      <FileSpreadsheet className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-zinc-300 transition-colors" title="Share">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* KPI Cards */}
                {currentReport.kpis && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {currentReport.kpis.map((kpi: any, i: number) => (
                      <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-medium text-zinc-400">{kpi.label}</p>
                          <kpi.icon className={cn("w-4 h-4", kpi.color)} />
                        </div>
                        <p className="text-xl font-bold text-white">{kpi.value}</p>
                        <p className={cn("text-xs font-medium", kpi.up ? "text-emerald-400" : "text-rose-400")}>
                          {kpi.up ? '▲' : '▼'} {kpi.change}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* AI Text (if from real API) */}
                {reportContent?.text && (
                  <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                    <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap">{reportContent.text}</p>
                  </div>
                )}

                {/* Charts Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Main Chart */}
                  {currentReport.mainChart && (
                    <div className="bg-[#18181b] rounded-xl p-5 border border-white/5">
                      <h3 className="text-sm font-semibold text-zinc-300 mb-4">{currentReport.mainChart.title}</h3>
                      <div className="h-52">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={currentReport.mainChart.data}>
                            <XAxis dataKey="name" stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} />
                            <YAxis stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} />
                            <Tooltip
                              cursor={{ fill: '#27272a' }}
                              contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px', fontSize: '11px' }}
                            />
                            <Bar dataKey="value" fill="#4f8ef7" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  )}

                  {/* Pie Chart */}
                  {currentReport.secondaryChart && (
                    <div className="bg-[#18181b] rounded-xl p-5 border border-white/5">
                      <h3 className="text-sm font-semibold text-zinc-300 mb-4">{currentReport.secondaryChart.title}</h3>
                      <div className="h-52">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={currentReport.secondaryChart.data}
                              innerRadius={50}
                              outerRadius={75}
                              paddingAngle={3}
                              dataKey="value"
                            >
                              {currentReport.secondaryChart.data.map((_: any, idx: number) => (
                                <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px', fontSize: '11px' }} />
                            <Legend iconSize={8} iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  )}
                </div>

                {/* Table */}
                {currentReport.table && (
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-300 mb-3 flex items-center gap-2">
                      <span className="w-1 h-4 bg-[#4f8ef7] rounded-full" />
                      Detailed Breakdown
                    </h3>
                    <div className="overflow-x-auto rounded-xl border border-white/10">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-white/10 bg-white/5">
                            {currentReport.table.headers.map((h: string) => (
                              <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {currentReport.table.rows.map((row: string[], i: number) => (
                            <tr key={i} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                              {row.map((cell, j) => (
                                <td key={j} className="px-4 py-3 text-zinc-300 text-sm">{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* AI Insights */}
                {currentReport.insights && (
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-300 mb-3 flex items-center gap-2">
                      <span className="w-1 h-4 bg-[#7c3aed] rounded-full" />
                      Strategic Insights & Recommendations
                    </h3>
                    <div className="space-y-3">
                      {currentReport.insights.map((insight: string, i: number) => (
                        <div key={i} className="flex gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                          <span className="text-[#4f8ef7] font-bold text-sm mt-0.5 shrink-0">{i + 1}.</span>
                          <p className="text-sm text-zinc-300 leading-relaxed">{insight}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
