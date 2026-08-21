import {
    useCallback,
    useMemo,
    useRef,
    useState,
    useEffect,
    startTransition,
} from "react";

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
    ]
}) {
    const [inputValue, setInputValue] = useState("");
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
                keywords: [
                    "data platform",
                    "platform",
                    "pipelines",
                    "analytics engineering",
                ],
                answer: "Builds reliable data platforms: ingestion, transformation, quality checks, and analytics-ready layers.",
            },
            {
                keywords: [
                    "architecture",
                    "system design",
                    "scalability",
                    "reliability",
                ],
                answer: "Designs scalable system architecture balancing performance, maintainability, and operational resilience.",
            },
            {
                keywords: ["governance", "compliance", "quality", "lineage"],
                answer: "Applies data governance with clear ownership, lineage, controls, and quality standards across teams.",
            },
            {
                keywords: [
                    "python",
                    "sql",
                    "postgresql",
                    "vector",
                    "vector search",
                    "cloud",
                    "tooling",
                ],
                answer: "Tooling includes Python, SQL, PostgreSQL, vector search patterns, and cloud analytics ecosystems.",
            },
            {
                keywords: [
                    "engagement",
                    "fit",
                    "project",
                    "help",
                    "work together",
                ],
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
                setMessages((prev) => [
                    ...prev,
                    { role: "user", text: question },
                ]);
                setInputValue("");
                setIsLoading(true);
            });

            if (typeof window !== "undefined") {
                if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
                timeoutRef.current = window.setTimeout(() => {
                    const answer = findAnswer(question);
                    startTransition(() => {
                        setMessages((prev) => [
                            ...prev,
                            { role: "assistant", text: answer },
                        ]);
                        setIsLoading(false);
                    });
                }, 420);
            } else {
                const answer = findAnswer(question);
                startTransition(() => {
                    setMessages((prev) => [
                        ...prev,
                        { role: "assistant", text: answer },
                    ]);
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

    return (
        <section
            style={{
                position: "relative",
                width: "100%",
                minWidth: 260,
                display: "flex",
                flexDirection: "column",
                gap: 10,
                background: surfaceColor,
                color: textColor,
                border: `1px solid ${borderColor}`,
                borderRadius: cornerRadius,
                padding: 12,
                boxSizing: "border-box",
            }}
        >
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <div
                    style={{
                        fontSize: 12,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        color: accentColor,
                        opacity: 0.95,
                    }}
                >
                    Profile AI Assistant
                </div>
                <p
                    style={{
                        margin: 0,
                        fontSize: 13,
                        lineHeight: 1.35,
                        opacity: 0.92,
                    }}
                >
                    {introText}
                </p>
            </div>

            <div
                style={{
                    minHeight: minConversationHeight,
                    maxHeight: 260,
                    overflowY: "auto",
                    border: `1px solid ${borderColor}`,
                    borderRadius: Math.max(8, cornerRadius - 4),
                    padding: 10,
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                    background: "rgba(0,0,0,0.22)",
                }}
            >
                {messages.map((message, index) => {
                    const isAssistant = message.role === "assistant";
                    return (
                        <div
                            key={`${message.role}-${index}`}
                            style={{
                                alignSelf: isAssistant
                                    ? "flex-start"
                                    : "flex-end",
                                maxWidth: "92%",
                                padding: "8px 10px",
                                borderRadius: 10,
                                background: isAssistant
                                    ? "rgba(255,255,255,0.06)"
                                    : `${accentColor}22`,
                                border: `1px solid ${isAssistant ? borderColor : accentColor}`,
                                fontSize: 12,
                                lineHeight: 1.35,
                            }}
                        >
                            {message.text}
                        </div>
                    );
                })}
                {isLoading && (
                    <div
                        aria-live="polite"
                        style={{
                            fontSize: 12,
                            opacity: 0.8,
                            padding: "2px 4px",
                        }}
                    >
                        Thinking…
                    </div>
                )}
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {presetQuestions.map((q, i) => (
                    <button
                        key={`${q}-${i}`}
                        type="button"
                        onClick={() => sendMessage(q)}
                        style={{
                            border: `1px solid ${borderColor}`,
                            borderRadius: 999,
                            background: "transparent",
                            color: textColor,
                            fontSize: 11,
                            padding: "6px 9px",
                            cursor: "pointer",
                        }}
                    >
                        {q}
                    </button>
                ))}
            </div>

            <div style={{ display: "flex", gap: 8 }}>
                <input
                    aria-label="Ask about the specialist profile"
                    value={inputValue}
                    onChange={(event) => {
                        const nextValue = event.target.value;
                        startTransition(() => setInputValue(nextValue));
                    }}
                    onKeyDown={onKeyDown}
                    placeholder="Ask a profile question..."
                    style={{
                        flex: 1,
                        border: `1px solid ${borderColor}`,
                        borderRadius: Math.max(8, cornerRadius - 4),
                        background: "rgba(255,255,255,0.02)",
                        color: textColor,
                        padding: "10px 11px",
                        outline: "none",
                        fontSize: 13,
                    }}
                />
                <button
                    type="button"
                    role="button"
                    onClick={() => sendMessage()}
                    disabled={isLoading || inputValue.trim().length === 0}
                    style={{
                        border: `1px solid ${accentColor}`,
                        borderRadius: Math.max(8, cornerRadius - 4),
                        background: accentColor,
                        color: "#0B0F1A",
                        padding: "0 12px",
                        fontSize: 12,
                        cursor: isLoading ? "wait" : "pointer",
                        opacity:
                            isLoading || inputValue.trim().length === 0
                                ? 0.55
                                : 1,
                    }}
                >
                    Send
                </button>
            </div>
        </section>
    );
}