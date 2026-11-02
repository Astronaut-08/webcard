import styles from './MobileActions.module.css'
import NavigationBtn from '../NavigationBtn/NavigationBtn'

export default function MobileActions() {
    return (
        <div className={styles.mobileContainer}>
            <div className={styles.contactGroup}>
                <NavigationBtn iconName='/icons.svg#github' text='GitHub' link='https://github.com/Astronaut-08' />
                <NavigationBtn iconName='/icons.svg#linked-in' text='LinkedIn' link='https://www.linkedin.com/in/volodymyryusyp/' />
            </div>
        </div>
    )
}