import style from './Image.module.css'
import volodymyrImg from '../assets/volodymyr.jpeg'

const Image = () => {
    return(
        <img
        src={volodymyrImg}
        loading='lazy'
        className={style.main}
        alt='Photo of Volodymyr'
        />
    )
}

export default Image;
