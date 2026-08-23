import { useState, useEffect, useRef } from "react";

const TyperWriter = ({
    text, 
    speed=25,
    threshold=0.5,
    triggerOnce=true
}) => {
    const [displayedText, setDisplayedText] = useState('')
    const [isVisible, setIsVisible] = useState(false)
    const triggerRef = useRef(null)

    // Delay before start
    useEffect(() => {
        const isMobile = window.matchMedia(
            '(max-width: 767px)'
        ).matches

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    if (triggerOnce) observer.disconnect()
                } else if (!triggerOnce) {
                    setIsVisible(false)
                }
            },
            { threshold }
        )

        observer.observe(triggerRef.current)

        return () => observer.disconnect() // clear
    }, [threshold, triggerOnce])

    // Logic of typing
    useEffect(() => {
        if(!isVisible) return

        setDisplayedText('')

        let currentIndex = 0
        const interval = setInterval(() => {
            if (currentIndex < text.length) {
                const char = text[currentIndex]
                setDisplayedText((prev) => prev + char)
                currentIndex++
            } else {
                clearInterval(interval)
            }
        }, speed)

        return () => clearInterval(interval)
    }, [text, speed, isVisible])

    return <span ref={triggerRef}>{displayedText}</span>
}

export default TyperWriter
