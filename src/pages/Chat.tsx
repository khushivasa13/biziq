import { useState, useEffect, useRef } from 'react';
import { Bot, User, Send, ChevronRight, BarChart2, Check, Download, Code2, Database } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useData } from '../contexts/DataContext';
import { analyzeBusinessData } from '../lib/openai';
import { getMockResponse } from '../lib/mockData';
import { cn } from '../lib/utils';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { usePDF } from 'react-to-pdf';

type Message = {
  id: number;
  role: 'user' | 'ai';
  text: string;
  chartData?: any[];
  tableData?: any[];
  sql?: string;
  suggestions?: string[];
  isMock?: boolean;
};

export default function Chat() {
  const { dashboardStyle } = useTheme();
  const { currentDataset, datasets, setCurrentDataset, uploadSampleData } = useData();
  const { toPDF, targetRef } = usePDF({ filename: 'biziq-chat-export.pdf' });
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('biziq-chats');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        role: 'ai' as const,
        text: '👋 Welcome to BizIQ! I\'ve loaded 3 sample datasets for you:\n\n📊 **Q4 Sales Report 2024** — Revenue, deals, regional breakdowns\n👥 **HR Employee Records** — Salaries, performance, departments\n📣 **Marketing Campaigns 2024** — ROI, spend, conversions\n\nSelect a dataset from the sidebar and ask me anything about it!',
        suggestions: ['Show Q4 revenue by month', 'Who is the top earning employee?', 'Which marketing campaign has the best ROI?']
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('biziq-chats', JSON.stringify(messages));
  }, [messages]);

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const getPanelClass = () =>
    dashboardStyle === 'bento' ? 'bento-panel' :
    dashboardStyle === 'minimal-dark' ? 'minimal-dark-panel' :
    'glass-panel';

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { id: Date.now(), role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    // No dataset guard
    if (!currentDataset) {
      setLoading(false);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'ai',
        text: '⚠️ No dataset is loaded yet. The sample datasets should auto-load — try refreshing the page, or click "Load Sample Data" in the sidebar.',
        suggestions: ['Load Sample Data', 'How do I upload data?', 'What datasets are available?']
      }]);
      return;
    }

    // Step 1: Try the instant mock response (matches question patterns against dataset)
    const mock = getMockResponse(text, currentDataset.name);
    
    // Brief artificial delay so it feels like thinking
    await new Promise(r => setTimeout(r, 600));
    setLoading(false);

    setMessages(prev => [...prev, {
      id: Date.now() + 1,
      role: 'ai',
      text: mock.answer,
      chartData: mock.chartData,
      tableData: mock.tableData,
      sql: mock.sql,
      suggestions: mock.suggestions,
      isMock: true,
    } as Message]);

    // Step 2: In background, try to get a real AI response and upgrade the message if successful
    try {
      const result = await analyzeBusinessData(text, currentDataset.data, messages);
      if (result?.text && result.text.length > 20) {
        setMessages(prev => {
          const updated = [...prev];
          const lastAiIdx = updated.map(m => m.role).lastIndexOf('ai');
          if (lastAiIdx !== -1 && (updated[lastAiIdx] as any).isMock) {
            updated[lastAiIdx] = {
              ...updated[lastAiIdx],
              text: result.text || result.answer || updated[lastAiIdx].text,
              chartData: result.chartData?.length ? result.chartData : updated[lastAiIdx].chartData,
              tableData: result.tableData?.length ? result.tableData : updated[lastAiIdx].tableData,
              sql: result.sql || updated[lastAiIdx].sql,
              suggestions: result.suggestions?.length ? result.suggestions : updated[lastAiIdx].suggestions,
              isMock: false,
            };
          }
          return updated;
        });
      }
    } catch {
      // Silently ignore — mock response already shown
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleSuggestion = (s: string) => {
    if (s === 'Export to PDF') { toPDF(); return; }
    if (s === 'Load Sample Data') { uploadSampleData(); return; }
    // Populate and immediately send
    sendMessage(s);
  };

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-8rem)] gap-4 pb-4">
      {/* Left Sidebar */}
      <div className={cn("hidden md:flex w-64 flex-col rounded-2xl overflow-hidden shrink-0", getPanelClass())}>
        <div className="p-4 border-b border-white/5 font-semibold text-sm flex items-center gap-2">
          <Database className="w-4 h-4 text-[#4f8ef7]" />
          Active Datasets
        </div>

        <div className="p-2 space-y-1 overflow-y-auto flex-1 custom-scrollbar">
          {datasets.length === 0 ? (
            <div className="p-4 text-center space-y-3">
              <p className="text-xs text-zinc-500 italic">No datasets yet.</p>
              <button
                onClick={uploadSampleData}
                className="w-full py-2 px-3 rounded-lg bg-[#4f8ef7]/10 border border-[#4f8ef7]/20 text-[#4f8ef7] text-xs font-medium hover:bg-[#4f8ef7]/20 transition-colors"
              >
                Load Sample Data
              </button>
            </div>
          ) : (
            datasets.map(ds => (
              <div
                key={ds.id}
                onClick={() => setCurrentDataset(ds)}
                className={cn(
                  "flex items-center justify-between p-3 rounded-lg hover:bg-white/5 cursor-pointer group",
                  currentDataset?.id === ds.id ? "bg-white/5 ring-1 ring-[#4f8ef7]/40" : ""
                )}
              >
                <div className="flex items-center gap-2">
                  <Check className={cn(
                    "w-4 h-4 text-[#2dd4bf] transition-opacity shrink-0",
                    currentDataset?.id === ds.id ? "opacity-100" : "opacity-0 group-hover:opacity-50"
                  )} />
                  <span className="text-sm font-medium text-zinc-300 truncate max-w-[100px]">{ds.name}</span>
                </div>
                <span className="text-xs text-zinc-500 shrink-0">{ds.data.length}r</span>
              </div>
            ))
          )}
        </div>

        {/* Status pill */}
        <div className="p-3 border-t border-white/5">
          <div className={cn(
            "text-xs px-3 py-2 rounded-lg text-center font-medium",
            currentDataset
              ? "bg-[#2dd4bf]/10 text-[#2dd4bf] border border-[#2dd4bf]/20"
              : "bg-white/5 text-zinc-500 border border-white/10"
          )}>
            {currentDataset ? `✓ ${currentDataset.name}` : 'No dataset active'}
          </div>
        </div>
      </div>

      {/* Chat Thread */}
      <div className={cn("flex-1 flex flex-col rounded-2xl overflow-hidden", getPanelClass())}>
        {/* Mobile dataset notice */}
        {!currentDataset && (
          <div className="md:hidden mx-4 mt-4 px-4 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm flex items-center justify-between gap-3">
            <span>No dataset loaded</span>
            <button onClick={uploadSampleData} className="text-xs font-bold underline">Load Sample</button>
          </div>
        )}

        {/* Messages area */}
        <div ref={targetRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 custom-scrollbar">
          <AnimatePresence initial={false}>
            {messages.map(msg => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className={cn("flex gap-3 max-w-3xl", msg.role === 'user' ? "ml-auto flex-row-reverse" : "")}
              >
                {/* Avatar */}
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1",
                  msg.role === 'user' ? "bg-zinc-700" : "bg-gradient-to-br from-[#4f8ef7] to-[#7c3aed]"
                )}>
                  {msg.role === 'user'
                    ? <User className="w-4 h-4 text-white" />
                    : <Bot className="w-4 h-4 text-white" />}
                </div>

                {/* Content */}
                <div className={cn("space-y-3 min-w-0 flex-1", msg.role === 'user' ? "items-end flex flex-col" : "")}>
                  <div className={cn(
                    "px-4 py-3 rounded-2xl text-sm md:text-base leading-relaxed",
                    msg.role === 'user'
                      ? "bg-white text-zinc-900 inline-block max-w-[85%]"
                      : "bg-white/5 text-zinc-200 border border-white/10 w-full"
                  )}>
                    {msg.text}
                  </div>

                  {/* Chart */}
                  {msg.role === 'ai' && msg.chartData && msg.chartData.length > 0 && (
                    <div className="w-full bg-[#18181b] border border-white/10 rounded-xl p-5">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 text-[#4f8ef7]">
                          <BarChart2 className="w-4 h-4" />
                          <span className="text-sm font-medium">Data Visualization</span>
                        </div>
                        <button
                          onClick={() => toPDF()}
                          className="p-1 hover:bg-white/10 rounded-md text-zinc-400 transition-colors"
                          title="Export chart"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={msg.chartData}>
                            <XAxis dataKey="name" stroke="#52525b" fontSize={11} tickLine={false} axisLine={false} />
                            <YAxis stroke="#52525b" fontSize={11} tickLine={false} axisLine={false} />
                            <Tooltip
                              cursor={{ fill: '#27272a' }}
                              contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px', fontSize: '12px' }}
                            />
                            <Bar dataKey="value" fill="#4f8ef7" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  )}

                  {/* Table */}
                  {msg.role === 'ai' && msg.tableData && msg.tableData.length > 0 && (
                    <div className="w-full overflow-x-auto rounded-xl border border-white/10 bg-[#18181b]">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-white/10">
                            {Object.keys(msg.tableData[0]).map(col => (
                              <th key={col} className="px-4 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                                {col}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {msg.tableData.map((row, i) => (
                            <tr key={i} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                              {Object.values(row).map((val: any, j) => (
                                <td key={j} className="px-4 py-2.5 text-zinc-300">{String(val)}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* SQL */}
                  {msg.role === 'ai' && msg.sql && (
                    <details className="group w-full border border-white/10 rounded-xl overflow-hidden">
                      <summary className="flex items-center justify-between px-4 py-2.5 bg-[#18181b] cursor-pointer text-sm font-medium hover:bg-white/5 transition-colors list-none">
                        <div className="flex items-center gap-2 text-[#7c3aed]">
                          <Code2 className="w-4 h-4" />
                          <span>View generated SQL</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-zinc-500 group-open:rotate-90 transition-transform" />
                      </summary>
                      <div className="p-4 bg-black/60 text-xs font-mono text-zinc-300 whitespace-pre-wrap">
                        {msg.sql}
                      </div>
                    </details>
                  )}

                  {/* Suggestion chips */}
                  {msg.role === 'ai' && msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="flex flex-wrap gap-2" data-html2canvas-ignore>
                      {msg.suggestions.map((s, i) => (
                        <button
                          key={i}
                          onClick={() => handleSuggestion(s)}
                          className="text-xs px-3 py-1.5 rounded-full border border-[#4f8ef7]/30 text-[#4f8ef7] hover:bg-[#4f8ef7]/15 transition-colors"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          {loading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4f8ef7] to-[#7c3aed] flex items-center justify-center shrink-0 mt-1">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-1.5">
                <span className="w-2 h-2 bg-[#4f8ef7] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-[#7c3aed] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-[#2dd4bf] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}

          {/* Auto-scroll anchor */}
          <div ref={bottomRef} />
        </div>

        {/* Input bar */}
        <div className="p-4 border-t border-white/5 bg-[#09090b]/60 backdrop-blur-sm shrink-0">
          <form onSubmit={handleSubmit} className="relative max-w-4xl mx-auto flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              disabled={loading}
              placeholder={currentDataset ? `Ask anything about "${currentDataset.name}"...` : "Load a dataset first, or ask any business question..."}
              className="flex-1 bg-[#18181b] border border-white/10 focus:border-[#4f8ef7] rounded-full pl-5 pr-5 py-3.5 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-[#4f8ef7] transition-all disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="shrink-0 w-10 h-10 rounded-full bg-[#4f8ef7] disabled:opacity-40 flex items-center justify-center text-white hover:bg-[#3b7de6] transition-colors"
            >
              <Send className="w-4 h-4 -ml-0.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
