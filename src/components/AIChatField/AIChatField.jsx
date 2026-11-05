import styles from './AIChatField.module.css'
import { useRef, useEffect, use } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function AIChatField({ messages }) {
    const containerRef = useRef(null)

    // Зберігаємо довжину останнього повідомлення для скролу
    const lastMessage = messages[messages.length - 1]
    const lastTextLen = lastMessage?.text?.length ?? 0

    const prevCount = useRef(messages.length)
    const prevTextLen = useRef(lastTextLen)


    useEffect(() => {  
        const el = containerRef.current
        if (!el) return

        const added = messages.length - prevCount.current
        const grew = added === 0 && lastTextLen > prevTextLen.current

        prevCount.current = messages.length
        prevTextLen.current = lastTextLen

        if (added > 0) {
            el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
        } else if (grew) {
            el.scrollTo({ top: el.scrollHeight, behavior: 'auto' })
        }
    }, [messages.length, lastTextLen])

    return (
        <div ref={containerRef} className={`${styles.main} ${styles['custom-scrollbar']}`}>
            {messages.map((msg, index) => {
                const isAI = msg.sender === 'AI'

                return (
                    <div className={styles['message-block']} key={index}>
                        <div className={styles.message}>
                            {/* Верхній рядок: іконка + назва відправника */}
                            <div className={styles['sender-header']}>
                                {isAI && (
                                    <svg className={styles['ai-icon']} viewBox="0 0 24 24">
                                        <use href='/icons.svg#ai-icon' />
                                    </svg>
                                )}
                                <span className={styles.sender}>{msg.sender}</span>
                            </div>

                            {/* Текст повідомлення */}
                            <div className={styles['message-text']}>
                                <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    a: (props) => (
                                        <a {...props} target='_blank' rel='noopener noreferrer' ></a>
                                    )
                                }}>{msg.text}</ReactMarkdown>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
