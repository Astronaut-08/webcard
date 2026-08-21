import style from './BlockExpertise.module.css'

const BlockExpertise = ({ title, description }) => {
    return(
        <div className={style.block}>
            <h4 className={style.title}>
                {title}
            </h4>
            <p className={style.description}>
                {description}
            </p>
        </div>
    )
}

export default BlockExpertise
