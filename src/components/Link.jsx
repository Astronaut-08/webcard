import style from './Link.module.css'

const Link = ({
    image, // svg icon
    href=''
}) => {
    return(
        <a 
        className={style.mainbtn}
        href={href}
        >
            <svg>
                <use href={image} />
            </svg>
        </a>
    )
}

export default Link
