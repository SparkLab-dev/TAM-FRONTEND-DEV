import { CompositionRoomAmenity } from "./components/compositionRoomAmenity";
import { StepWrapper } from "./styles";
import { FaToilet, FaBed, FaBath } from "react-icons/fa";

import roomStyle from './components/styles/roomamenity.module.css'
import styles from './styles/step4.module.css'
import { RHFCheckbox } from "Components/Form/RHFCheckbox";
import RHFTextField from "Components/Form/RHFTextField";

const CompositionStep = () => {
    return (
        <StepWrapper >
            <div className={styles.container}>

                <h2 style={{ width: "100%", textAlign: "left" }}>Composition</h2>
                <div className={styles.roomsRow}>
                    <CompositionRoomAmenity title="Number of bedrooms" subTitle="keep 0 if studio" icon={<FaBed className={roomStyle.image} />} />
                    <CompositionRoomAmenity title="Number of bedrooms" subTitle="keep 0 if studio" icon={<FaBath className={roomStyle.image} />} />
                    <CompositionRoomAmenity title="Number of bedrooms" subTitle="keep 0 if studio" icon={<FaToilet className={roomStyle.image} />} />
                </div>
                <div className={styles.formContainer}>
                    <h4 style={{ width: "100%", textAlign: "left", padding: 0, margin: 0 }}>General Amenities</h4>
                    <div className={styles.formContent}>
                        <div className={styles.formContent}>
                            <div className={styles.formRow}>
                                <RHFCheckbox name="kitchen" label="Separate kitchen" />
                            </div>
                            <div className={styles.formRow}>
                                <RHFCheckbox name="elevator" label="Elevator" />
                                <RHFTextField name="elevator"  />
                            </div>
                            <div className={styles.formRow}>
                                <RHFCheckbox name="smoking" label="Smooking allowed" />
                            </div>
                            <div className={styles.formRow}>
                                <RHFCheckbox name="ac" label="Air Conditioning" />
                            </div>
                            <div className={styles.formRow}>
                                <RHFCheckbox name="pets" label="pets allowed" />
                            </div>
                            <div className={styles.formRow}>
                                <RHFCheckbox name="parking" label="Parking" />
                                <RHFTextField name="parking"  />
                            </div>
                            <div className={styles.formRow}>
                                <RHFCheckbox name="Internet" label="Internet" />
                                <RHFTextField name="Internet"  />
                            </div>
                            <div className={styles.formRow}>
                                <RHFCheckbox name="Baby" label="Baby cot" />
                                <RHFTextField name="Baby"  />
                            </div>
                            <div className={styles.formRow}>
                                <RHFCheckbox name="wheel" label="Wheelchair access" />
                            </div>
                            <div className={styles.formRow}>
                                <RHFCheckbox name="terrace" label="Terrace" />
                            </div>
                            <div className={styles.formRow}>
                                <RHFCheckbox name="Healing" label="Healing" />
                            </div>
                            <div className={styles.formRow}>
                                <RHFCheckbox name="linen" label="Linen & towels" />
                            </div>
                            <div className={styles.formRow}>
                                <RHFCheckbox name="swimming" label="Swimming pool" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </StepWrapper>
    )
}

export default CompositionStep;