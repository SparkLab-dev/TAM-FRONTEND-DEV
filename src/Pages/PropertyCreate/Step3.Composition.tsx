import { CompositionRoomAmenity } from "./components/compositionRoomAmenity";
import { StepWrapper } from "./styles";
import { FaToilet, FaBed, FaBath } from "react-icons/fa";

import roomStyle from "./components/styles/roomamenity.module.css";
import styles from "./styles/step4.module.css";
import { RHFCheckbox } from "Components/Form/RHFCheckbox";
import RHFTextField from "Components/Form/RHFTextField";
import { Dispatch, useState } from "react";
import { Checkbox, Input, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { schemas } from "Schemas/Property";
import { useFieldArray } from "react-hook-form";
import * as yup from "yup";
import { AmenitiesType, AmenityComposition } from "Types/PropertyTypes";

type CompositionStepProps = {
  composition: AmenityComposition[];
  onQuantityChange: (id: number, quantity: number) => void;
  generalAmenities: AmenitiesType[];
  setGeneralAmenities: Dispatch<any>;
};

const CompositionStep = ({
  composition,
  generalAmenities,
  setGeneralAmenities,
  onQuantityChange,
}: CompositionStepProps) => {
  const { control, watch, setValue, trigger, formState, getValues } =
    useFormContext<yup.InferType<typeof schemas>>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "step3.amenities",
  });

  const generalAmenitiesFormState = watch("step3.amenities") || [];

  const toggleAmenityCount = (id: number, count: number) => {
    setGeneralAmenities((prevAmenities: AmenitiesType[]) =>
      prevAmenities.map((amenity) =>
        amenity.id === id ? { ...amenity, count } : amenity
      )
    );
  };

  const handleCheckboxChange = (id: number) => {
    const amenityIndex = id - 1;

    if (generalAmenitiesFormState[amenityIndex]) {
      remove(`step3.amenities[${amenityIndex}]` as any);
      toggleAmenityCount(id, 0); // Set count to 0
      return;
    }

    // Add amenity if not already selected
    setValue(`step3.amenities[${amenityIndex}]` as any, {
      amenityID: id,
      count: 1,
    });
    toggleAmenityCount(id, 1);
  };

  const handleCountChange = (id: number, value: number) => {
    setValue(`step3.amenities[${id - 1}]` as any, {
      amenityID: id,
      count: value,
    });
    setGeneralAmenities((prevAmenities: AmenitiesType[]) =>
      prevAmenities.map((amenity) =>
        amenity.id === id
          ? { ...amenity, count: value } // Update count based on user input
          : amenity
      )
    );
  };

  return (
    <StepWrapper>
      <div className={styles.container}>
        <h2 style={{ width: "100%", textAlign: "left" }}>Composition</h2>
        <div className={styles.roomsRow}>
          {composition.map((data, index) => (
            <CompositionRoomAmenity
              key={index}
              title={data.name}
              subTitle={data.subTitle}
              icon={data.icon}
              quantity={data.count}
              setQuantity={(newQuantity) =>
                onQuantityChange(data.id, newQuantity)
              }
            />
          ))}
        </div>
        <div className={styles.formContainer}>
          <h4
            style={{ width: "100%", textAlign: "left", padding: 0, margin: 0 }}
          >
            General Amenities
          </h4>
          <div className={styles.formContent}>
            <div className={styles.formContent}>
              {generalAmenities.map((amenityData, index) => (
                <div key={amenityData.id}>
                  <Checkbox
                    checked={amenityData.count > 0}
                    onChange={() => handleCheckboxChange(amenityData.id)}
                  />
                  <span>{amenityData.name}</span>
                  {amenityData.isCountEditable && amenityData.count > 0 && (
                    <input
                      type="number"
                      className="border border-gray-500 p-1 rounded-sm ml-2"
                      value={generalAmenities[index]?.count ?? 1}
                      onChange={(e) =>
                        handleCountChange(
                          amenityData.id,
                          Math.max(1, Number(e.target.value))
                        )
                      }
                      min={1}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        {formState?.errors?.step3?.amenities && (
          <p className="text-red-400">
            {formState?.errors?.step3?.amenities?.message}
          </p>
        )}
      </div>
    </StepWrapper>
  );
};

export default CompositionStep;
