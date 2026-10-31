import {
    useCallback,
    useRef,
    useState,
    useEffect,
} from "react";
import style from './ProfileAssistant.module.css';
import { useTranslation } from "react-i18next";
import ReactMarkdown from 'react-markdown'
import remarkGfm from "remark-gfm";


export default function ProfileAIAssistant({
    accentColor = "#3B82F6",
    surfaceColor = "#121722",
    textColor = "#E6ECFF",
    borderColor = "#2A3242",
    cornerRadius = 14,
    minConversationHeight = 140,
    isUnderConstruction = false
}) {
    const [inputValue, setInputValue] = useState("");
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: "assistant",
            text: t('starterPrompt')   
        },
    ]);
    const abortRef = useRef(null);

    const sendMessage = useCallback(
        async (rawQuestion) => {
            const question = (
                typeof rawQuestion === 'string' ? rawQuestion : inputValue
            ).trim();
            if (!question || isLoading) return;

            setMessages((prev) => [...prev, { role: "user", text: question }, { role: "assistant", text: "" }]);
            setInputValue("");
            setIsLoading(true);

            abortRef.current?.abort()
            const contoller = new AbortController()
            abortRef.current = contoller

            try {
                const res = await fetch('/api/chat', {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ prompt: question }),
                    signal: contoller.signal
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
                    const chunk = decoder.decode(value, {stream: true})
                    setMessages((prev) => {
                        const next = [...prev]
                        const last = next[next.length - 1]
                        next[next.length - 1] = { ...last, text: last.text + chunk}
                        return next
                    })
                }
            } catch(err) {
                if (err.name === 'AbortError') return;
                setMessages((prev) => [
                    ...prev,
                    { role: 'assistant', text: 'Can\'t get response, please try again.' }
                ])
            } finally {
                if (abortRef.current === contoller) setIsLoading(false)
            }
        }, [inputValue, isLoading]
    );

    useEffect(() => {
        return () => abortRef.current?.abort()
    }, []);

    const onKeyDown = useCallback(
        (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                sendMessage();
            }
        },
        [sendMessage]
    );

    // Передаємо пропси у CSS як змінні
    const cssVariables = {
        '--accent-color': accentColor,
        '--surface-color': surfaceColor,
        '--text-color': textColor,
        '--border-color': borderColor,
        '--corner-radius': `${cornerRadius}px`,
        '--min-conv-height': `${minConversationHeight}px`
    };

    const presetQuestions = [
        t('presetQuestions1'),
        t('presetQuestions2'),
        t('presetQuestions3')
    ]

    return (
        <section className={style.container} style={cssVariables}>
            <div className={style.header}>
                <div className={style.title}>{t('headAIAssistant')}</div>
                <p className={style.intro}>{t('introText')}</p>
            </div>

            <div className={style.chatBox}>
                {messages.map((message, index) => {
                    const isAssistant = message.role === "assistant";
                    return (
                        <div
                            key={`${message.role}-${index}`}
                            className={`${style.message} ${isAssistant ? style.assistantMessage : style.userMessage}`}
                        >
                            {isAssistant ? (<ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    a: (props) => (
                                        <a {...props} target="_blank" rel="noopener noreferrer"></a>
                                    )
                                }}>
                                {message.text}
                            </ReactMarkdown>) : message.text}
                        </div>
                    );
                })}
                {isLoading && messages[messages.length - 1]?.text === '' && (
                    <div aria-live="polite" className={style.thinking}>
                        Thinking…
                    </div>
                )}
            </div>

            <div className={style.presetContainer}>
                {presetQuestions.map((q, i) => (
                    <button
                        key={`${q}-${i}`}
                        type="button"
                        onClick={() => sendMessage(q)}
                        className={style.presetBtn}
                    >
                        {q}
                    </button>
                ))}
            </div>

            <div className={style.inputContainer}>
                <input
                    aria-label="Ask about the specialist profile"
                    value={inputValue}
                    onChange={(event) => setInputValue(event.target.value)}
                    onKeyDown={onKeyDown}
                    placeholder={t('chatPlaceholder')}
                    className={style.inputField}
                />
                <button
                    type="button"
                    role="button"
                    onClick={() => sendMessage()}
                    disabled={isLoading || inputValue.trim().length === 0}
                    className={style.sendBtn}
                >
                    {t('sendBtn')}
                </button>
            </div>

            {isUnderConstruction && (
                <div className={style.overlay}>
                    <div className={style.overlayCard}>
                        {t('partOfWebInProgress')}
                    </div>
                </div>
            )}
        </section>
    );
}