import { useRef, useEffect, useState } from "react";
import style from './ScrollTrigger.module.css'

const ScrollTrigger = ({
    children,
    type = 'typing',
    threshold = 0.5, // if visible 50% of content
    triggerOnce = true
}) => {
    // Check if visible on the screen
    const [isVisible, setIsVisible] = useState(false)
    const triggerRef = useRef(null)

    useEffect(() => {
        // Check if mobile version
        const isMobile = window.matchMedia('(max-width: 767px)').matches

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

        if (triggerRef.current && isMobile) {
            observer.observe(triggerRef.current)
        } else if (!isMobile) {
            setIsVisible(true) // desctop play on scene together
        }

        return () => observer.disconnect() // clearing
    }, [threshold, triggerOnce])

    // Select classes
    let wrapperClass = ''
    let activeClass = ''

    if (type === 'typing') {
        wrapperClass = style.typingWrapper
        activeClass = style.typingActive
    } else if (type === 'fade') {
        wrapperClass = style.fadeWrapper
        activeClass = style.fadeActive
    }

    return (
        <div ref={triggerRef} 
        className={`${wrapperClass} ${isVisible ? activeClass : ''}`}>
            {children}
        </div>
    )
}

export default ScrollTrigger
