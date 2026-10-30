import OpenAI from "openai";



const SYSTEM_PROMPT = `You are an assistant on a developer's portfolio site. Answer concisely about ML focus, architecture, tooling, governance and project fit. If you don't know something about the profile, say so.`

// const json = (body, status = 200) => {
//     new Response(JSON.stringify(body), {
//         status,
//         headers: {
//             "Content-Type": "application/json"
//         }
//     })
// }

export default async function handler(req, res) {
    // Дозволяємо лиже POST
    if (req.method !== 'POST') {
        return res.status(400).json({error: 'Method not allowed'})
    }

    const prompt = req.body?.prompt

    if (typeof prompt !== 'string' || prompt.trim() || prompt.length > 500) {
        return res.status(400).json({error: 'Invalid prompt'})
    }

    if (!process.env.OPENAI_API_KEY) {
        return res.status(500).json({error: "API KEY is not set"})
    }

    try {
        // Підключаємо свій акаунт OpenAI або OpenRouter
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
            baseURL: 'https://openrouter.ai/api/v1',
            timeout: 15000, 
            maxRetries: 0,
            defaultHeaders: {
                'HTTP-Referer': 'https://volodymyr-yusyp.pp.ua',
                'X-Title': 'WebCard Portfolio',
            }
        })

        // Вмикаємо Stream 
        const stream = await openai.chat.completions.create({
            model: 'openai/gpt-4o-mini', // Економна і швидка модель
            messages: [
                { role: 'system', content: SYSTEM_PROMPT },
                { role: 'user', content: prompt }
            ],
            max_tokens: 400,
            stream: true
        })

        res.setHeader("Content-Type", "text/plain; charset=utf-8")
        res.setHeader("Cache-Control", "no-cache")

        for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content || ''
            if (text) res.write(text)
        }
        res.end()

    } catch (error) {
        console.error("/api/chat failed:", error);
        if (!res.headersSent) {
            res.status(500).json({ error: error.message });
        } else {
            res.end();
        }
    }
}