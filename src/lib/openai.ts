// This utility calls our secure backend proxy (/api/chat) instead of
// calling OpenAI directly from the browser - the API key stays server-side.

export interface AnalysisResult {
  text: string;
  answer?: string;
  chartData?: Array<{ name: string; value: number }>;
  tableData?: Array<Record<string, any>>;
  sql?: string;
  suggestions?: string[];
}

export const analyzeBusinessData = async (
  prompt: string,
  contextData: any[],
  history: Array<{ role: string; text: string }> = []
): Promise<AnalysisResult> => {
  // Derive a human-readable schema from the first row's keys
  const schema = contextData.length > 0
    ? `Columns: ${Object.keys(contextData[0]).join(', ')}`
    : 'No data uploaded yet.';

  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      question: prompt,
      schema,
      sampleData: contextData.slice(0, 50),
      history: history.map(m => ({ role: m.role, content: m.text }))
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `API request failed with status ${response.status}`);
  }

  const { reply } = await response.json();

  let parsed: any;
  try {
    parsed = JSON.parse(reply);
  } catch {
    // If the model returned plain text, wrap it
    parsed = { answer: reply };
  }

  return {
    text: parsed.answer || parsed.text || '',
    chartData: parsed.chartData || [],
    tableData: parsed.tableData || [],
    sql: parsed.sql || '',
    suggestions: parsed.suggestions || []
  };
};
