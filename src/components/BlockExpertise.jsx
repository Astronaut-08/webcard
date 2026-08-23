import style from './BlockExpertise.module.css'
import TyperWriter from './TyperWriter.jsx'

const BlockExpertise = ({ title, description }) => {
    return(
        <div className={style.block}>
            <h4 className={style.title}>
                <TyperWriter 
                text={title} />
            </h4>
            <p className={style.description}>
                <TyperWriter
                text={description} />
            </p>
        </div>
    )
}

export default BlockExpertise
