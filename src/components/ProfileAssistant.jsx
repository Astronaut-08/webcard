import {
    useCallback,
    useMemo,
    useRef,
    useState,
    useEffect,
    startTransition,
} from "react";
import style from './ProfileAssistant.module.css';
import { useTranslation } from "react-i18next";

export default function ProfileAIAssistant({
    accentColor = "#3B82F6",
    surfaceColor = "#121722",
    textColor = "#E6ECFF",
    borderColor = "#2A3242",
    cornerRadius = 14,
    introText = "Ask concise questions about ML focus, architecture, tooling, governance, and project fit.",
    starterPrompt = "Hi — I can answer profile questions about ML systems, data platforms, architecture, governance, tooling, and engagement fit.",
    fallbackResponse = "I can best help with machine learning systems, data platforms, architecture, governance, tooling, and modernization engagements.",
    minConversationHeight = 140,
    presetQuestions = [
        "What is your ML focus?",
        "What tools do you use?",
        "What projects are the best fit?",
    ],
    isUnderConstruction = true,
}) {
    const [inputValue, setInputValue] = useState("");
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: "assistant",
            text:
                starterPrompt ||
                "Ask me about AI/ML focus, tooling, architecture, or engagement fit.",
        },
    ]);
    const timeoutRef = useRef(null);

    const qaPairs = useMemo(
        () => [
            {
                keywords: ["machine learning", "ml", "models", "ai"],
                answer: "Focus: practical ML systems, from experimentation to production, with measurable business impact.",
            },
            {
                keywords: ["data platform", "platform", "pipelines", "analytics engineering"],
                answer: "Builds reliable data platforms: ingestion, transformation, quality checks, and analytics-ready layers.",
            },
            {
                keywords: ["architecture", "system design", "scalability", "reliability"],
                answer: "Designs scalable system architecture balancing performance, maintainability, and operational resilience.",
            },
            {
                keywords: ["governance", "compliance", "quality", "lineage"],
                answer: "Applies data governance with clear ownership, lineage, controls, and quality standards across teams.",
            },
            {
                keywords: ["python", "sql", "postgresql", "vector", "vector search", "cloud", "tooling"],
                answer: "Tooling includes Python, SQL, PostgreSQL, vector search patterns, and cloud analytics ecosystems.",
            },
            {
                keywords: ["engagement", "fit", "project", "help", "work together"],
                answer: "Best fit: new data products, AI adoption programs, and analytical modernization initiatives.",
            },
        ],
        []
    );

    const findAnswer = useCallback(
        (question) => {
            const normalized = question.toLowerCase().trim();
            const match = qaPairs.find((entry) =>
                entry.keywords.some((keyword) => normalized.includes(keyword))
            );
            return match?.answer || fallbackResponse;
        },
        [qaPairs, fallbackResponse]
    );

    const sendMessage = useCallback(
        (rawQuestion) => {
            const question = (rawQuestion ?? inputValue).trim();
            if (!question || isLoading) return;

            startTransition(() => {
                setMessages((prev) => [...prev, { role: "user", text: question }]);
                setInputValue("");
                setIsLoading(true);
            });

            if (typeof window !== "undefined") {
                if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
                timeoutRef.current = window.setTimeout(() => {
                    const answer = findAnswer(question);
                    startTransition(() => {
                        setMessages((prev) => [...prev, { role: "assistant", text: answer }]);
                        setIsLoading(false);
                    });
                }, 420);
            } else {
                const answer = findAnswer(question);
                startTransition(() => {
                    setMessages((prev) => [...prev, { role: "assistant", text: answer }]);
                    setIsLoading(false);
                });
            }
        },
        [findAnswer, inputValue, isLoading]
    );

    useEffect(() => {
        return () => {
            if (typeof window !== "undefined" && timeoutRef.current) {
                window.clearTimeout(timeoutRef.current);
            }
        };
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

    return (
        <section className={style.container} style={cssVariables}>
            <div className={style.header}>
                <div className={style.title}>Profile AI Assistant</div>
                <p className={style.intro}>{introText}</p>
            </div>

            <div className={style.chatBox}>
                {messages.map((message, index) => {
                    const isAssistant = message.role === "assistant";
                    return (
                        <div
                            key={`${message.role}-${index}`}
                            className={`${style.message} ${isAssistant ? style.assistantMessage : style.userMessage}`}
                        >
                            {message.text}
                        </div>
                    );
                })}
                {isLoading && (
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
                    onChange={(event) => {
                        const nextValue = event.target.value;
                        startTransition(() => setInputValue(nextValue));
                    }}
                    onKeyDown={onKeyDown}
                    placeholder="Ask a profile question..."
                    className={style.inputField}
                />
                <button
                    type="button"
                    role="button"
                    onClick={() => sendMessage()}
                    disabled={isLoading || inputValue.trim().length === 0}
                    className={style.sendBtn}
                >
                    Send
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