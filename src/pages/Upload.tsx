import { useState } from 'react';
import { UploadCloud, FileType, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useData } from '../contexts/DataContext';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

type SchemaCol = { id: string, name: string, type: string };

const mockRows = [
  [1001, 'Jane Smith', 'Engineering', 125000, '2022-03-15'],
  [1002, 'John Doe', 'Marketing', 95000, '2023-01-10'],
  [1003, 'Alice Johnson', 'Sales', 110000, '2021-11-01'],
  [1004, 'Bob Williams', 'HR', 85000, '2024-02-20'],
  [1005, 'Charlie Brown', 'Engineering', 135000, '2020-05-18'],
];

export default function Upload() {
  const { dashboardStyle } = useTheme();
  const { addDataset } = useData();
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [step, setStep] = useState(1);
  const [schema, setSchema] = useState<SchemaCol[]>([
    { id: '1', name: 'employee_id', type: 'Integer' },
    { id: '2', name: 'full_name', type: 'String' },
    { id: '3', name: 'department', type: 'String' },
    { id: '4', name: 'salary', type: 'Decimal' },
    { id: '5', name: 'hire_date', type: 'Date' }
  ]);
  const [toast, setToast] = useState<{message: string, type: 'success'|'error'} | null>(null);

  const getPanelClass = () => dashboardStyle === 'bento' ? 'bento-panel' : dashboardStyle === 'minimal-dark' ? 'minimal-dark-panel rounded-2xl' : 'glass-panel rounded-2xl';

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setTimeout(() => setStep(2), 500);
    }
  };

  const handleRowChange = (id: string, field: 'name' | 'type', value: string) => {
    setSchema(prev => prev.map(col => col.id === id ? { ...col, [field]: value } : col));
  };

  const removeColumn = (id: string) => {
    setSchema(prev => prev.filter(col => col.id !== id));
  };

  const confirmUpload = () => {
    // In a real app we'd parse the file here. For the demo, we'll use schema + mockRows
    const objectData = mockRows.map(row => {
      const obj: any = {};
      schema.forEach((col, idx) => {
        obj[col.name] = row[idx];
      });
      return obj;
    });

    addDataset(file?.name || 'Dataset Upload', objectData);
    setToast({ message: `Success! ${objectData.length} rows indexed and ready for AI.`, type: 'success' });
    setTimeout(() => {
      setToast(null);
      setStep(1);
      setFile(null);
    }, 4000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Data Upload Hub</h1>
        <p className="text-zinc-400">Securely connect datasets to train your AI workspace.</p>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={cn(
              "fixed top-24 right-8 z-50 p-4 rounded-xl shadow-xl flex items-center gap-3 border min-w-[300px]",
              toast.type === 'success' ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-rose-500/10 border-rose-500/20 text-rose-400"
            )}
          >
            {toast.type === 'success' ? <CheckCircle2 className="w-5 h-5 flex-shrink-0" /> : <AlertCircle className="w-5 h-5 flex-shrink-0" />}
            <span className="font-medium text-sm">{toast.message}</span>
            <button onClick={() => setToast(null)} className="ml-auto opacity-50 hover:opacity-100">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={cn("p-8", getPanelClass())}>
        {/* Dataset Categories */}
        {step === 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div 
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={cn(
                "border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300",
                isDragging ? "border-[#4f8ef7] bg-[#4f8ef7]/5" : "border-white/10 hover:border-white/20 bg-white/5"
              )}
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#4f8ef7]/20 to-[#7c3aed]/20 flex items-center justify-center mx-auto mb-6">
                <UploadCloud className="w-10 h-10 text-[#4f8ef7]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Drag & Drop your dataset</h3>
              <p className="text-zinc-400 mb-8 max-w-md mx-auto">Supports CSV, XLSX, JSON, and PDF documents. Max 500MB per file.</p>
              <label className="px-6 py-3 rounded-xl bg-white text-zinc-900 font-medium hover:bg-zinc-200 transition-colors cursor-pointer inline-flex shadow-lg shadow-white/10">
                Browse Files
                <input type="file" className="hidden" onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setFile(e.target.files[0]);
                    setStep(2);
                  }
                }} />
              </label>
            </div>
          </motion.div>
        )}

        {/* Schema Review Step */}
        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
             <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
                <div className="flex items-center gap-4">
                   <div className="p-3 bg-[#4f8ef7]/20 rounded-xl">
                      <FileType className="w-6 h-6 text-[#4f8ef7]" />
                   </div>
                   <div>
                     <h3 className="text-lg font-semibold">{file?.name || 'dataset.csv'}</h3>
                     <p className="text-sm text-zinc-400">Review schema and data types</p>
                   </div>
                </div>
                <button onClick={() => setStep(1)} className="text-sm text-zinc-500 hover:text-white">Cancel</button>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {/* Left: Schema Edit */}
               <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  <h4 className="font-medium text-zinc-300 mb-4 sticky top-0 bg-[#09090b]/80 backdrop-blur-md py-2 z-10">Define Columns</h4>
                  {schema.map((col) => (
                    <div key={col.id} className="flex gap-3 items-center group">
                      <input 
                        className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#4f8ef7]"
                        value={col.name}
                        onChange={(e) => handleRowChange(col.id, 'name', e.target.value)}
                      />
                      <select 
                        className="w-[120px] bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-zinc-300 focus:outline-none focus:border-[#4f8ef7]"
                        value={col.type}
                        onChange={(e) => handleRowChange(col.id, 'type', e.target.value)}
                      >
                         <option>String</option>
                         <option>Integer</option>
                         <option>Decimal</option>
                         <option>Date</option>
                         <option>Boolean</option>
                      </select>
                      <button onClick={() => removeColumn(col.id)} className="p-2 text-zinc-500 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-all">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
               </div>

               {/* Right: Preview */}
               <div className="border-l border-white/10 pl-8">
                  <h4 className="font-medium text-zinc-300 mb-4">Sample Data Review</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-zinc-400">
                      <thead>
                        <tr>
                          {schema.map(col => (
                            <th key={col.id} className="pb-3 pr-4 font-medium text-white">{col.name}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                         {mockRows.map((row, i) => (
                           <tr key={i} className="border-t border-white/5">
                             {row.map((cell, j) => {
                               // Only show cells that correspond to remaining columns
                               if (j < schema.length) {
                                 return <td key={j} className="py-3 pr-4 truncate max-w-[120px]">{cell}</td>
                               }
                               return null;
                             })}
                           </tr>
                         ))}
                      </tbody>
                    </table>
                  </div>
               </div>
             </div>

             <div className="mt-10 pt-6 border-t border-white/10 flex justify-end">
               <button 
                 onClick={confirmUpload}
                 className="px-6 py-2.5 bg-gradient-to-r from-[#4f8ef7] to-[#7c3aed] hover:from-[#3b7de6] hover:to-[#6d2fe0] text-white rounded-xl font-medium flex items-center gap-2 shadow-lg shadow-[#4f8ef7]/20"
               >
                 Confirm & Ingest
                 <CheckCircle2 className="w-4 h-4" />
               </button>
             </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
