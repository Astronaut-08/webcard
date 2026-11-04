import styles from './AIChatField.module.css'
import { useRef, useEffect } from 'react'

export default function AIChatField({ messages }) {
    const messageEndRef = useRef(null)
    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    return (
        <div className={`${styles.main} ${styles['custom-scrollbar']}`}>
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
                            <div className={styles['message-text']}>{msg.text}</div>
                        </div>
                    </div>
                )
            })}

            {/* Якір для прокрутки чату вниз */}
            <div ref={messageEndRef} />
        </div>
    )
}