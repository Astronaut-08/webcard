import OpenAI from "openai";
import { Pinecone } from "@pinecone-database/pinecone";


const SYSTEM_PROMPT = `
Ти партнер розробника Володимира, твоя задача продати його послуги. Ти не маєш представлятись Володимиром, чи говорити від його імені, 
натомість використовуючи наявну інформацію ти можеш давати відповіді на ті чи інші запитання. Якщо в наявних документах немає інформації 
на запитання про співпрацю, пропонуй зв'язатись напряму, якщо іфнормація стосується інших запитів, просто скажи нічого про це не знаєш
про це. Ти можеш давати відповіді і на будь яку іншу тему, про яку ти щось знаєш, але нічого не вигадуй, і попереджай користувача, що 
ти не зберігаєш контекст, це пов'язано з політикою конфіденційності і приватності повідомлень.
`
const pc = new Pinecone ({
    apiKey: process.env.PINECONE_API_KEY
})

export default async function handler(req, res) {
    // Дозволяємо лиже POST
    if (req.method !== 'POST') {
        return res.status(405).json({error: 'Method not allowed'})
    }

    const prompt = req.body?.prompt

    if (typeof prompt !== 'string' || !prompt.trim() || prompt.length > 500) {
        return res.status(400).json({error: 'Invalid prompt'})
    }

    if (!process.env.OPENAI_API_KEY) {
        return res.status(500).json({error: "API KEY is not set"})
    }

    // Model LLM OpenAI
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

        // Генерація ембедингу перед відправкою в Pinecone
        const embeddingResponse = await openai.embeddings.create({
            model: 'openai/text-embedding-3-small',
            input: prompt
        })
        const queryVector = embeddingResponse.data[0].embedding

        // Пошук релевантних документів в Pinecone
        const indexName = process.env.PINECONE_INDEX_NAME || 'portfolio-index'
        const index = pc.index(indexName)
        const queryResponse = await index.query({
            vector: queryVector,
            topK: 3, 
            includeMetadata: true
        })

        // Формуємо контекст 
        const retrievedContext = queryResponse.matches?.map((match) => {
            return match.metadata?.text || ''
        }).join("\n\n") || ''

        // Вмикаємо Stream 
        const stream = await openai.chat.completions.create({
            model: 'openai/gpt-oss-120b', // Економна і швидка модель
            messages: [
                { role: 'system', content: SYSTEM_PROMPT },
                { role: 'user', content: `Контекст із документів: \n${retrievedContext}\n\nЗапитання: <<<${prompt}>>>` }
            ],
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