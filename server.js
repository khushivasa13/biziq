import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

const app = express();
app.use(cors());
app.use(express.json());

// Health check — verify the right server is running
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', provider: 'gemini', model: 'gemini-2.0-flash' });
});

// POST /api/chat — Proxies to Google Gemini. API key stays server-side.
app.post('/api/chat', async (req, res) => {
  const { question, schema, sampleData, history = [] } = req.body;

  if (!question) {
    return res.status(400).json({ error: 'Missing question field.' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY is not configured in .env' });
  }

  const systemPrompt = `You are BizIQ, a world-class Business Intelligence AI and Analyst.
The user has uploaded data with this structure:
${schema || 'No schema provided.'}

Sample rows from the dataset:
${JSON.stringify(sampleData?.slice(0, 20), null, 2)}

STRICT RULES:
1. Answer ONLY from the uploaded data above. Do NOT fabricate or hallucinate information.
2. Give clear, concise business explanations using real numbers from the provided data.
3. If the data doesn't answer the question, say so clearly.
4. Include a useful SQL query when applicable.
5. Format numerical data into charts or tables when it helps clarity.

MANDATORY RESPONSE FORMAT — Return ONLY valid JSON, no markdown, no backticks:
{
  "answer": "Your detailed textual analysis here.",
  "sql": "SELECT ... (or empty string if not applicable)",
  "chartData": [{"name": "Label", "value": 123}],
  "tableData": [{"column1": "value1", "column2": "value2"}],
  "suggestions": ["Follow-up question 1", "Follow-up question 2", "Follow-up question 3"]
}`;

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
      systemInstruction: systemPrompt,
      generationConfig: {
        responseMimeType: 'application/json',
        maxOutputTokens: 2048,
        temperature: 0.3,
      },
      safetySettings: [
        { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
        { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
      ],
    });

    // Build conversation history in Gemini format
    // Gemini uses 'user' / 'model' roles (not 'assistant')
    const geminiHistory = history
      .slice(-12) // last 6 turns
      .filter(m => m.role === 'user' || m.role === 'ai')
      .map(m => ({
        role: m.role === 'ai' ? 'model' : 'user',
        parts: [{ text: m.content || m.text || '' }]
      }));

    const chat = model.startChat({ history: geminiHistory });
    const result = await chat.sendMessage(question);
    const reply = result.response.text();

    res.json({ reply });

  } catch (err) {
    console.error('Gemini API error:', err?.message || err);
    res.status(500).json({
      error: err?.message || 'Gemini API request failed. Check your API key and network connection.'
    });
  }
});

// Serve frontend static files in production
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'dist')));

// Fallback for React Router (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || process.env.API_PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ BizIQ server running on port ${PORT}`);
});
