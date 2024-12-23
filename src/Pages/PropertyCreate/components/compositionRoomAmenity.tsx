
import { useState } from 'react'
import styles from './styles/roomamenity.module.css'
import { MdRoom } from "react-icons/md";





interface Props{
    icon?: any,
    title: string,
    subTitle?: string
}
export const CompositionRoomAmenity: React.FC<Props> = ({icon, title, subTitle}) =>{
    const [qty, setQty] = useState<number>(0)
    return(
        <div className={styles.amenityContainer}>
            <div className={styles.topContainer}>
             
                {icon}
                <div className={styles.inputContainer}>
                    <span onClick={()=>setQty(qty-1)}>-</span>
                    <input type="number" disabled value={qty} />
                    <span onClick={()=>setQty(qty+1)}>+</span>
                </div>
            </div>

            <div className={styles.titlesContainer}>
                <span className={styles.title}>{title}</span>
                <span className={styles.subtitle}>{subTitle}</span>
            </div>
        </div>
    )
}