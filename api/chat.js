import OpenAI from "openai";


export default async function handler(req) {
    // Обробляємо CORS для локальної розробки
    if (req.method === 'OPTIONS') {
        return new Response('OK', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            }
        })
    }

    // Дозволяємо лиже POST
    if (req.method !== 'POST') {
        return new Response(JSON.stringify({error: 'Method not allowed'}), {
            status: 405,
            headers: {'Content-type': 'application/json'}
        })
    }

    try {
        // Зчитуємо тіло запиту
        const body = await req.json()
        const { prompt } = body

        if (!prompt) {
            return new Response(JSON.stringify({ error: 'Prompt is required' }), {
                status: 400,
                headers: { 'Content-type': 'application/json' }
            })
        }

        const apiKey = process.env.OPENAI_API_KEY

        // Підключаємо свій акаунт OpenAI або OpenRouter
        const openai = new OpenAI({
            apiKey: apiKey,
            baseURL: 'https://openrouter.ai/api/v1',
            timeout: 15000, 
            defaultHeaders: {
                'HTTP-Referer': 'https://volodymyr-yusyp.pp.ua',
                'X-Title': 'WebCard Portfolio',
            }
        })

        console.log('Відправляємо запит до OpenRouter...')

        const response = await openai.chat.completions.create({
            model: 'openai/gpt-4o-mini', // Економна і швидка модель
            messages: [{ role: 'user', content: prompt }]
        })

        const aiMessage = response.choices[0].message.content || ''

        return new Response(JSON.stringify({ result: aiMessage }), {
            status: 200,
            headers: {
                'Content-type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        })
    } catch (error) {
        return new Response(JSON.stringify({error: error.message}), {
            status: 500,
            headers: {
                'Content-type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        })
    }
}