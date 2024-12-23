import React from "react";
import { StepWrapper } from "./styles";
import { Button, MenuItem } from "@mui/material";
import { Add } from "@mui/icons-material";

import stepStyles from "./styles/stepgen.module.css";
import classes from "./styles/step5.module.css";
import RHFMultiSelect from "Components/Form/RHFMultiSelect";
import RHFSelect from "Components/Form/RHFSelect";
import { MdDelete } from "react-icons/md";

const amenities = [
  { value: "air-conditioning", label: "Air Conditioning" },
  { value: "alarm-clock", label: "Alarm Clock" },
  { value: "balcony", label: "Balcony" },
  { value: "bath", label: "Bath" },
  { value: "bathroom-ensuite", label: "Bathroom Ensuite" },
  { value: "bedding", label: "Bedding" },
  { value: "cooker", label: "Cooker" },
  { value: "dishwasher", label: "Dishwasher" },
  { value: "dryer", label: "Dryer" },
  { value: "fireplace", label: "Fireplace" },
  { value: "fridge", label: "Fridge" },
  { value: "garage", label: "Garage" },
  { value: "gym", label: "Gym" },
  { value: "heating", label: "Heating" },
  { value: "hot-tub", label: "Hot Tub" },
  { value: "internet", label: "Internet" },
  { value: "laundry", label: "Laundry" },
  { value: "microwave", label: "Microwave" },
  { value: "oven", label: "Oven" },
  { value: "parking", label: "Parking" },
  { value: "pool", label: "Pool" },
  { value: "refrigerator", label: "Refrigerator" },
  { value: "sauna", label: "Sauna" },
  { value: "security", label: "Security" },
  { value: "smoker", label: "Smoker" },
  { value: "stove", label: "Stove" },
  { value: "tv", label: "TV" },
  { value: "washer", label: "Washer" },
  { value: "water-heater", label: "Water Heater" },
  { value: "wifi", label: "Wifi" },
  { value: "window-coverings", label: "Window Coverings" },
  { value: "other", label: "Other" },
];

export const RoomAmenitiesStep: React.FC = () => {
  const [rooms, setRooms] = React.useState<Number[]>([]);
  const [roomCount, setRoomCount] = React.useState(1);
  const addRoom = () => {
    setRooms([...rooms, roomCount]);
    setRoomCount(roomCount + 1);
  };

  const removeRoom = (roomNum: Number) => {
    const newRooms = [...rooms];
    let index = rooms.indexOf(roomNum);
    newRooms.splice(index, 1);
    setRooms(newRooms);
  };
  return (
    <div className={stepStyles.StepWrapper}>
      <h2>Room-Specific Amenities</h2>
      <Button
        onClick={() => addRoom()}
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
            {rooms.map((roomNum) => {
              return (
                <tr>
                  <td>
                    <RHFSelect
                      name={"room" + roomNum}
                      label="Room"
                      className={classes.selectRoom}
                    >
                      <MenuItem value="8741">Room {String(roomNum)}</MenuItem>
                    </RHFSelect>
                  </td>
                  <td>
                    <RHFMultiSelect
                      name={"amenities" + roomNum}
                      label="Amenities"
                      options={amenities}
                      className={classes.multiSelect}
                    />
                  </td>
                  <td>
                    <MdDelete
                      color="red"
                      onClick={() => removeRoom(roomNum)}
                      style={{ cursor: "pointer" }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
