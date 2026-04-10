import React, { createContext, useContext, useState, useEffect } from 'react';
import { sampleDatasets } from '../lib/mockData';

export type Dataset = {
  id: number;
  name: string;
  data: any[];
  uploadedAt: string;
};

type DataContextType = {
  datasets: Dataset[];
  currentDataset: Dataset | null;
  addDataset: (name: string, data: any[]) => void;
  setCurrentDataset: (dataset: Dataset) => void;
  uploadSampleData: () => void;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

const buildSampleDatasets = (): Dataset[] => [
  { id: 1, name: sampleDatasets.q4Sales.name,           data: sampleDatasets.q4Sales.data,           uploadedAt: new Date().toISOString() },
  { id: 2, name: sampleDatasets.hrRecords.name,         data: sampleDatasets.hrRecords.data,         uploadedAt: new Date().toISOString() },
  { id: 3, name: sampleDatasets.marketingCampaigns.name,data: sampleDatasets.marketingCampaigns.data, uploadedAt: new Date().toISOString() },
];

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [currentDataset, setCurrentDataset] = useState<Dataset | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('biziq-datasets');
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Dataset[];
        if (parsed.length > 0) {
          setDatasets(parsed);
          setCurrentDataset(parsed[0]);
          return;
        }
      } catch {}
    }
    // No stored data — boot with samples
    const samples = buildSampleDatasets();
    setDatasets(samples);
    setCurrentDataset(samples[0]);
    localStorage.setItem('biziq-datasets', JSON.stringify(samples));
  }, []);

  const addDataset = (name: string, data: any[]) => {
    const newDs: Dataset = { id: Date.now(), name, data, uploadedAt: new Date().toISOString() };
    const updated = [...datasets, newDs];
    setDatasets(updated);
    setCurrentDataset(newDs);
    localStorage.setItem('biziq-datasets', JSON.stringify(updated));
  };

  const uploadSampleData = () => {
    // Reset to the three rich sample datasets
    const samples = buildSampleDatasets();
    setDatasets(samples);
    setCurrentDataset(samples[0]);
    localStorage.setItem('biziq-datasets', JSON.stringify(samples));
  };

  return (
    <DataContext.Provider value={{ datasets, currentDataset, addDataset, setCurrentDataset, uploadSampleData }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within a DataProvider');
  return ctx;
};
