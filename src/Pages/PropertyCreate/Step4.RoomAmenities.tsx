import React, { Dispatch, useState } from "react";
import { StepWrapper } from "./styles";
import { Button, MenuItem } from "@mui/material";
import { Add } from "@mui/icons-material";

import stepStyles from "./styles/stepgen.module.css";
import classes from "./styles/step5.module.css";
import RHFMultiSelect from "Components/Form/RHFMultiSelect";
import RHFSelect from "Components/Form/RHFSelect";
import { MdDelete, MdSave } from "react-icons/md";
import { schemas } from "Schemas/Property";
import { set, useFieldArray, useFormContext } from "react-hook-form";
import * as yup from "yup";
import { CreatePropertyInput } from "Types/PropertyTypes";

const amenities = [
  { value: 1, label: "Air Conditioning" },
  { value: 2, label: "Alarm Clock" },
  { value: 3, label: "Balcony" },
  { value: 4, label: "Bath" },
  { value: 5, label: "Bathroom Ensuite" },
  { value: 6, label: "Bedding" },
  { value: 7, label: "Cooker" },
  { value: 8, label: "Dishwasher" },
  { value: 9, label: "Dryer" },
  { value: 10, label: "Fireplace" },
  { value: 11, label: "Fridge" },
  { value: 12, label: "Garage" },
  { value: 13, label: "Gym" },
  { value: 14, label: "Heating" },
  { value: 15, label: "Hot Tub" },
  { value: 16, label: "Internet" },
  { value: 17, label: "Laundry" },
  { value: 18, label: "Microwave" },
  { value: 19, label: "Oven" },
  { value: 20, label: "Parking" },
  { value: 21, label: "Pool" },
  { value: 22, label: "Refrigerator" },
  { value: 23, label: "Sauna" },
  { value: 24, label: "Security" },
  { value: 25, label: "Smoker" },
  { value: 26, label: "Stove" },
  { value: 27, label: "TV" },
  { value: 28, label: "Washer" },
  { value: 29, label: "Water Heater" },
  { value: 30, label: "Wifi" },
  { value: 31, label: "Window Coverings" },
  { value: 32, label: "Other" },
];

type RoomAmenitiesStepProps = {
  roomDropdownOptions: { label: string; value: number }[];
};

export default function RoomAmenitiesSte({
  roomDropdownOptions,
}: RoomAmenitiesStepProps) {
  const { control, watch, setValue, trigger, formState } =
    useFormContext<yup.InferType<typeof schemas>>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "step4.compositionRoomAmenitiesList",
  });

  const rooms = watch("step4.compositionRoomAmenitiesList") || [];

  console.log(rooms);

  const handleSetSelectedRoomAmenitiesChange = async (
    roomIndex: number,
    selected: { value: number; label: string }[]
  ) => {
    const updatedRooms = [...rooms];
    const updatedRoom = { ...updatedRooms[roomIndex] };

    updatedRoom.amenities = selected.map((selectedAmenity) => ({
      id: selectedAmenity.value,
      amenityID: selectedAmenity.value,
      amenityDescription: selectedAmenity.label,
    }));

    updatedRooms[roomIndex] = updatedRoom;
    setValue("step4.compositionRoomAmenitiesList", updatedRooms);

    await trigger("step4.compositionRoomAmenitiesList");
  };

  const handleAddRoom = () => {
    const room = {
      compositionRoomID: rooms.length,
      amenities: [],
    };
    append(room);
  };

  const handleRoomSelectionChange = (
    roomIndex: number,
    selectedRoomID: number
  ) => {
    setValue(
      `step4.compositionRoomAmenitiesList.${roomIndex}.compositionRoomID`,
      selectedRoomID,
      { shouldValidate: true }
    );
  };

  const deleteRoom = (index: number) => {
    remove(index);
  };
  console.log(roomDropdownOptions);

  return (
    <div className={stepStyles.StepWrapper}>
      <h2>Room-Specific Amenities</h2>
      <Button
        onClick={handleAddRoom}
        variant="outlined"
        className={classes.addBtn}
      >
        <Add /> Add Room
      </Button>

      <div className={classes.formContainer}>
        <table>
          <thead>
            <tr>
              <th>Room</th>
              <th>Amenities</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room, index) => (
              <tr key={index} className="my-5">
                <td>
                  <RHFSelect
                    name={`step4.compositionRoomAmenitiesList.${index}.compositionRoomID`}
                    label="Room"
                    className={classes.selectRoom}
                    onChange={(event) => {
                      handleRoomSelectionChange(
                        index,
                        event?.target?.value as number
                      );
                    }}
                  >
                    {roomDropdownOptions.map((roomDropdownOption, index) => (
                      <MenuItem value={roomDropdownOption.value} key={index}>
                        {" "}
                        {roomDropdownOption.label}
                      </MenuItem>
                    ))}
                  </RHFSelect>
                </td>
                <td>
                  <RHFMultiSelect
                    name={`step4.compositionRoomAmenitiesList.${index}.amenities`}
                    label="Amenities"
                    options={amenities}
                    className={classes.multiSelect}
                    value={room.amenities?.map((amenity) => ({
                      value: amenity.id,
                      label: amenity.amenityDescription,
                    }))}
                    onSelectChange={(e, selectedValue) =>
                      handleSetSelectedRoomAmenitiesChange(index, selectedValue)
                    }
                  />
                </td>

                <td>
                  <MdDelete
                    color="red"
                    onClick={() => {
                      deleteRoom(index);
                    }}
                    style={{ cursor: "pointer" }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {formState?.errors?.step4?.compositionRoomAmenitiesList && (
        <p className="text-red-400">
          {formState?.errors?.step4?.compositionRoomAmenitiesList?.message}
        </p>
      )}
    </div>
  );
}
