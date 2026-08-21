import { useState, useEffect } from "react";

const TyperWriter = ({ text, speed=25, delay=300 }) => {
    const [displayedText, setDisplayedText] = useState('')
    const [isStarted, setIsStarted] = useState(false)

    // Delay before start
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsStarted(true)
        }, delay)

        return () => clearTimeout(timer)
    }, [delay])

    // Logic of typing
    useEffect(() => {
        if(!isStarted) return

        let currentIndex = 0
        const interval = setInterval(() => {
            if (currentIndex < text.length) {
                setDisplayedText((prev) => prev + text[currentIndex])
                currentIndex++
            } else {
                clearInterval(interval)
            }
        }, speed)

        return () => clearInterval(interval)
    }, [text, speed, isStarted])

    return <>{displayedText}</>
}

export default TyperWriter
