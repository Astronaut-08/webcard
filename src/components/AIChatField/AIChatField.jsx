import styles from './AIChatField.module.css'

export default function AIChatField({ messages }) {
    return (
        <div className={styles.main}>
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
        </div>
    )
}