import style from './CoreExpertise.module.css'
import BlockExpertise from './BlockExpertise.jsx'

const CoreExpertise = () => {
    return(
        <div className={style.main}>
            <BlockExpertise
            title='Machine learning'
            description='Production models, evaluation and applied LLM workflows.' />
            <BlockExpertise
            title='Data platforms'
            description='Warehouses, vector search and accountable data pipelines.' />
            <BlockExpertise
            title='System architecture'
            description='Reliable interfaces, scalable APIs and clear engineering decisions.' />
            <BlockExpertise
            title='Data governance'
            description='Quality, lineage and trustworthy delivery for critical decisions.' />
        </div>
    )
}

export default CoreExpertise
