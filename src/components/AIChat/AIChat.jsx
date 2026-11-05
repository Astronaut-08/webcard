import { useState, useRef, useEffect } from 'react'
import styles from './AIChat.module.css'
import AIChatInput from '../AIChatInput/AIChatInput'
import AIChatTitle from '../AIChatTitle/AIChatTitle'
import AIChatField from '../AIChatField/AIChatField'
import { useTranslation } from 'react-i18next'

export default function AIChat() {
    const { t } = useTranslation()
    const [messages, setMessages] = useState([
        { sender: 'AI', text: t('AIChatFirstPrompt') }
    ])
    const [status, setStatus] = useState(t('AIChatAvailability'))

    const abortRef = useRef(null)

    const handleText = async (text) => {
        setStatus(t('AIChatAvailability1'))
        setMessages((prev) => [...prev, { sender: 'Ви', text: text }, { sender: 'AI', text: '' }])

        abortRef.current?.abort()
        const controller = new AbortController()
        abortRef.current = controller

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: text }),
                signal: controller.signal
            })

            if (!res.ok || !res.body) {
                const err = await res.json().catch(() => ({}))
                throw new Error(err.error || `HTTP ${res.status}`)
            }

            const reader = res.body.getReader()
            const decoder = new TextDecoder()

            while (true) {
                const { done, value } = await reader.read()
                if (done) break
                const chunk = decoder.decode(value, { stream: true })
                setMessages((prev) => {
                    const next = [...prev]
                    const last = next[next.length - 1]
                    next[next.length - 1] = { ...last, text: last.text + chunk }
                    return next
                })
            }
        } catch (err) {
            if (err.name === 'AbortError') return
            setMessages((prev) => [
                ...prev,
                { sender: 'AI', text: 'Не вдалося отримати відповідь. Спробуйте ще раз.' }
            ])
        } finally {
            // Завжди повертаємо статус 'available' після завершення або помилки
            setStatus(t('AIChatAvailability'))
        }
    }

    useEffect(() => {
        return () => abortRef.current?.abort()
    }, [])

    return (
        <div className={styles.main}>
            <AIChatTitle statusText={status} />
            <AIChatField messages={messages} />
            <AIChatInput onSend={handleText} />
        </div>
    )
}