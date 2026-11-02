import styles from './AIChatField.module.css'

export default function AIChatField({ messages }) {
    return (
        <div className={styles.main}>
            {messages.map((msg, index) => {
                const isAI = msg.sender === 'AI'

                return (
                    <div className={styles['message-block']} key={index}>
                        <div>
                            {isAI ? (
                                <svg className={styles['ai-icon']} viewBox="0 0 24 24">
                                    <use href='/icons.svg#ai-icon' />
                                </svg>
                            ) : (
                                <div className={styles.space}></div>
                            )}
                        </div>
                        
                        <div className={styles.message}>
                            <div className={styles.sender}>{msg.sender}</div>
                            <div className={styles['message-text']}>{msg.text}</div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}