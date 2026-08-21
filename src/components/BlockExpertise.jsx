import style from './BlockExpertise.module.css'
import TyperWriter from './TyperWriter.jsx'

const BlockExpertise = ({ title, description }) => {
    return(
        <div className={style.block}>
            <h4 className={style.title}>
                {title}
            </h4>
            <p className={style.description}>
                <TyperWriter
                text={' ' + description}
                speed={15} />
            </p>
        </div>
    )
}

export default BlockExpertise
