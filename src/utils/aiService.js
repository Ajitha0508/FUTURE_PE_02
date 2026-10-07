/**
 * AI Service for UGC Script Generator
 * Supports direct client-side Gemini API, OpenAI API, and local engine fallback.
 */

export const AI_PROVIDERS = {
  OFFLINE: 'offline',
  GEMINI: 'gemini',
  OPENAI: 'openai'
};

export const GEMINI_MODELS = [
  { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash (Recommended)' },
  { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash (Fast & Smart)' },
  { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash (Legacy Fast)' },
  { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro (Deep Creative)' },
  { id: 'gemini-2.0-flash-exp', name: 'Gemini 2.0 Flash Exp (Experimental)' }
];

export const OPENAI_MODELS = [
  { id: 'gpt-4o-mini', name: 'GPT-4o Mini (Ultra Fast)' },
  { id: 'gpt-4o', name: 'GPT-4o (Omni High Quality)' }
];

/**
 * Call Gemini API directly
 */
export async function callGeminiAPI(apiKey, model, systemPrompt, userPrompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  
  const payload = {
    contents: [
      {
        role: 'user',
        parts: [
          { text: `${systemPrompt}\n\nTask Details:\n${userPrompt}\n\nProvide clean JSON output matching the required schema.` }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.8,
      topK: 40,
      topP: 0.95,
      responseMimeType: 'application/json'
    }
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Gemini API returned status ${response.status}`);
  }

  const data = await response.json();
  const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) throw new Error('No content received from Gemini');

  try {
    return JSON.parse(rawText);
  } catch (err) {
    // Attempt fallback json regex extraction
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error('Failed to parse Gemini response as JSON: ' + err.message, { cause: err });
  }
}

/**
 * Call OpenAI API directly
 */
export async function callOpenAIAPI(apiKey, model, systemPrompt, userPrompt) {
  const url = 'https://api.openai.com/v1/chat/completions';

  const payload = {
    model: model || 'gpt-4o-mini',
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ],
    temperature: 0.8
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `OpenAI API returned status ${response.status}`);
  }

  const data = await response.json();
  const rawText = data.choices?.[0]?.message?.content;
  if (!rawText) throw new Error('No content received from OpenAI');

  return JSON.parse(rawText);
}
