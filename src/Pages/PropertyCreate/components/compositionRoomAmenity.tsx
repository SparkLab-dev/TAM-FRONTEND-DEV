import { useState } from "react";
import styles from "./styles/roomamenity.module.css";
import { MdRoom } from "react-icons/md";

interface Props {
  icon?: any;
  title: string;
  subTitle?: string;
  quantity: number;
  setQuantity: (value: number) => void;
}

// component
export const CompositionRoomAmenity: React.FC<Props> = ({
  icon,
  title,
  subTitle,
  quantity,
  setQuantity,
}) => {
  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className={styles.amenityContainer}>
      <div className={styles.topContainer}>
        {icon}
        <div className={styles.inputContainer}>
          <span onClick={handleDecrease}>-</span>
          <input type="number" disabled value={quantity} />
          <span onClick={handleIncrease}>+</span>
        </div>
      </div>

      <div className={styles.titlesContainer}>
        <span className={styles.title}>{title}</span>
        <span className={styles.subtitle}>{subTitle}</span>
      </div>
    </div>
  );
};
