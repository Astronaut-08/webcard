import style from './Lang.module.css'
import { useTranslation } from 'react-i18next'
import { useState, useRef, useEffect } from 'react'

const Lang = () => {
    const { t, i18n } = useTranslation()
    const [isOpen, setIsOpen] = useState(false)
    const dropDownRef = useRef(null)

    const languages = [
        {code: 'uk', label: 'Українська', flag: 'ua'},
        {code: 'en', label: 'English', flag: 'en'}
    ]

    useEffect(() => {
        const handleClick = (evt) => {
            if (dropDownRef.current && !dropDownRef.current.contains(evt.target)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClick)
        return () => document.removeEventListener('mousedown', handleClick)
    }, [])

    const changeLang = (lang) => {
        i18n.changeLanguage(lang)
        setIsOpen(false)
    }

    const currentLangCode = i18n.resolvedLanguage || i18n.language || 'uk'
    const currentLang = languages.find(lang => lang.code === currentLangCode) || languages[0]

    return (
        <div className={style.mainbox} ref={dropDownRef}>
            <button
            className={style.btn}
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen} >
                <span className={style.flag}>{currentLang.flag}</span>
                <span className={`${style.chevr} ${isOpen ? style.open : ''}`}>▼</span>
            </button>

            <ul className={`${style.dropdown} ${isOpen ? style.active : ''}`}>
                {languages.map((lang) => (
                    <li key={lang.code}>
                        <button
                        className={`${style.option} ${currentLangCode === lang.code ? 'selected' : ''}`}
                        onClick={() => changeLang(lang.code)}>
                            <span className={style.flag}>{lang.flag}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Lang
