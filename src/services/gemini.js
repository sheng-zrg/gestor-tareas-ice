import { GEMINI_API_ENDPOINT, GEMINI_TIMEOUT_MS } from '../constants';
export async function analyzeTask(description) {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
        throw new Error('VITE_GEMINI_API_KEY environment variable is not set');
    }
    const prompt = `Analiza esta tarea y devuelve en JSON: { "impact": number (1-10), "confidence": number (1-10), "ease": number (1-10), "explanation": string }. Tarea: ${description}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), GEMINI_TIMEOUT_MS);
    try {
        const response = await fetch(`${GEMINI_API_ENDPOINT}?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [{ text: prompt }],
                    },
                ],
            }),
            signal: controller.signal,
        });
        clearTimeout(timeoutId);
        if (!response.ok) {
            throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text) {
            throw new Error('Invalid response from Gemini API');
        }
        // Parsear el JSON de la respuesta
        const parsed = JSON.parse(text);
        return {
            impact: parsed.impact,
            confidence: parsed.confidence,
            ease: parsed.ease,
            explanation: parsed.explanation,
        };
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to analyze task: ${error.message}`);
        }
        throw new Error('Unknown error occurred while analyzing task');
    }
}
