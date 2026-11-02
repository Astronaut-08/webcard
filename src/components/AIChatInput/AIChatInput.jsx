import styles from './AIChatInput.module.css'
import TyperWriter from '../TyperWriter'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

export default function AIChatInput({ onSend }) {
    const { t } = useTranslation()
    const [message, setMessage] = useState('')

    const handleSend = () => {
        const text = message.trim()
        if (!text) return
        onSend(text)
        setMessage('')
    }

    const handleKeyDown = (evt) => {
        if (evt.key === 'Enter' && !evt.shiftKey) {
            evt.preventDefault()
            handleSend()
        }
    }

    return (
        <div className={styles.main}>
            <div className={styles['field-wrapper']}>
                <label className={styles.title}><TyperWriter text={t('AIChatInputTitle')} /></label>
                <textarea 
                    className={styles.field} 
                    placeholder={t('AIChatInputPlaceholder')}
                    value={message}
                    onChange={(evt) => setMessage(evt.target.value)}
                    onKeyDown={handleKeyDown}
                    rows={3}
                />
            </div>

            <div className={styles.tips}>
                <p><TyperWriter text={t('AIChatInputTips')} /></p>
                <p><TyperWriter text={t('AIChatInputPolicy')} /></p>
            </div>

            <div className={styles.actions}>
                <button className={styles.clear} onClick={() => setMessage('')}>
                    <TyperWriter text={t('AIChatClearBtn')} />
                </button>

                <button className={styles.AIChatSendBtn} onClick={handleSend}>
                    <span className={styles['send-text']}><TyperWriter text={t('AIChatSendBtn')} /></span>
                    <svg className={styles['send-icon']} viewBox="0 0 24 24">
                        <use href='/icons.svg#goto-black' />
                    </svg>
                </button>
            </div>
        </div>
    )
}