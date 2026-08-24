import style from './CoreExpertise.module.css'
import BlockExpertise from './BlockExpertise.jsx'
import { useTranslation } from 'react-i18next'

const CoreExpertise = () => {
    const { t } = useTranslation()

    return(
        <div className={style.main}>
            <BlockExpertise
            title={t('skillML')}
            description={t('skillMLDescr')} />
            <BlockExpertise
            title={t('skillDataPlatform')}
            description={t('skillDataPlatformDescr')} />
            <BlockExpertise
            title={t('skillSysArch')}
            description={t('skillSysArchDescr')} />
            <BlockExpertise
            title={t('skillDataGover')}
            description={t('skillDataGoverDescr')} />
        </div>
    )
}

export default CoreExpertise
