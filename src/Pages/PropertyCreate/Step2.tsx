/* eslint-disable import/no-anonymous-default-export */
import { Button, MenuItem, TextField } from "@mui/material";
import { AttractionsTable, AttractionsWrapper, StepWrapper } from "./styles";
import { Add, Delete } from "@mui/icons-material";
import { useFormContext, useFieldArray } from "react-hook-form";
import { PropertyCreateInputs } from ".";
import RHFSelect from "Components/Form/RHFSelect";
import RHFTextField from "Components/Form/RHFTextField";
import { useState } from "react";
import { CreatePropertyInput } from "Types/PropertyTypes";
import { FiEdit } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import { schemas } from "Schemas/Property";
import * as yup from "yup";

type DistancesToAttractionType = CreatePropertyInput["distances"];

const Step2 = () => {
  const { control, watch, setValue, trigger, formState } =
    useFormContext<yup.InferType<typeof schemas>>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "step2.distances",
  });

  const attractionsDistances = watch("step2.distances") || [];

  const [newAttraction, setNewAttraction] = useState({
    destinationID: 0,
    distanceUnitID: 0,
    distanceValue: 0,
  });
  const [isAdding, setIsAdding] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleAddAttraction = () => {
    setIsAdding(true);
    setNewAttraction({ destinationID: 0, distanceUnitID: 0, distanceValue: 0 }); // Reset the new attraction state
    setEditingIndex(null); // Reset editing inde
  };

  const handleSaveAttraction = async () => {
    await trigger(`step2.distances`); // Trigger validation for distances

    if (
      newAttraction.destinationID &&
      newAttraction.distanceValue &&
      newAttraction.distanceUnitID
    ) {
      if (editingIndex !== null) {
        // If editing an existing attraction
        setValue(`step2.distances[${editingIndex}]` as any, newAttraction); // Update the existing attraction
      } else {
        // If adding a new attraction
        append(newAttraction); // Add the new attraction to the form
      }
      setNewAttraction({
        destinationID: 0,
        distanceUnitID: 0,
        distanceValue: 0,
      });
      setIsAdding(false);
      setEditingIndex(null);
    } else {
      alert("Please fill in all fields before saving.");
    }
  };

  const handleEditAttraction = (index: number) => {
    setNewAttraction({
      destinationID: attractionsDistances[0].destinationID ?? 0,
      distanceUnitID: attractionsDistances[0].distanceUnitID ?? 0,
      distanceValue: attractionsDistances[0].distanceValue ?? 0,
    });
    setIsAdding(true);
    setEditingIndex(index);
  };

  const handleCancel = () => {
    setIsAdding(false); // Hide the input fields
    setNewAttraction({ destinationID: 0, distanceUnitID: 0, distanceValue: 0 }); // Reset the new attraction state
    setEditingIndex(null); // Reset editing index
  };

  return (
    <StepWrapper>
      <div className="licenceNumberBox">
        <h3>Tourist License number</h3>
        <p>
          Tourist License number is mandatory in some cities, you need to add it
          here in order for your properties to be accepted
        </p>
        <RHFTextField
          variant="outlined"
          name="step2.licenceInfo.licenceNumber"
          label="Licence Number"
          placeholder="Tourist Licence Number"
          className="textfield"
          errorMessage={
            formState?.errors?.step2?.licenceInfo?.licenceNumber?.message
          }
        />
      </div>

      <AttractionsWrapper>
        <h3>Add distances to attractions</h3>
        <Button
          variant="outlined"
          className="addButton"
          onClick={handleAddAttraction}
        >
          <Add /> Add attraction
        </Button>

        {isAdding && (
          <div className="mt-5">
            <div className="flex justify-evenly">
              <div className="w-[30%]">
                <RHFSelect
                  label="Select Attraction Name"
                  value={newAttraction.destinationID}
                  onChange={(e) =>
                    setNewAttraction({
                      ...newAttraction,
                      destinationID: Number(e.target.value),
                    })
                  }
                >
                  <MenuItem value="1">Destination 1</MenuItem>
                  <MenuItem value="2">Destination 2</MenuItem>
                  <MenuItem value="3">Destination 3</MenuItem>
                </RHFSelect>
              </div>
              <div className="w-[30%]">
                <RHFTextField
                  label="Distance"
                  type="number"
                  value={newAttraction.distanceValue as any}
                  onChange={(e) =>
                    setNewAttraction({
                      ...newAttraction,
                      distanceValue: Number(e.target.value),
                    })
                  }
                  errorMessage={
                    formState?.errors?.step2?.distances?.[
                      attractionsDistances.length
                    ]?.distanceValue?.message ?? ""
                  }
                />
              </div>
              <div className="w-[30%]">
                <RHFSelect
                  label="Measurement"
                  value={newAttraction.distanceUnitID}
                  onChange={(e) =>
                    setNewAttraction({
                      ...newAttraction,
                      distanceUnitID: Number(e.target.value),
                    })
                  }
                >
                  <MenuItem value="1">Unit 1</MenuItem>
                  <MenuItem value="2">Unit 2</MenuItem>
                  <MenuItem value="3">Unit 3</MenuItem>
                </RHFSelect>
              </div>
            </div>

            <div className="space-x-8 ml-5 py-2">
              <Button className="saveButton" onClick={handleSaveAttraction}>
                Save
              </Button>
              <Button className="cancelButton" onClick={handleCancel}>
                <span className="text-red-500">Cancel</span>
              </Button>
            </div>
          </div>
        )}

        <AttractionsTable>
          <div className="grid grid-cols-4 gap-48 border-b-2">
            <div>Attraction Name</div>
            <div>Distance</div>
            <div>Measurement</div>
            <div>Action</div>
          </div>
          <div className="body h-[200px] overflow-y-scroll">
            {attractionsDistances.length ? (
              attractionsDistances.map((attraction, index) => (
                <div
                  key={attraction.destinationID}
                  className="grid grid-cols-4 gap-48 py-4"
                >
                  <div>{attraction.destinationID}</div>
                  <div>{attraction.distanceValue}</div>
                  <div>{attraction.distanceUnitID}</div>
                  <div className="flex items-center space-x-6">
                    <Button onClick={() => handleEditAttraction(index)}>
                      <FiEdit size={20} />
                    </Button>
                    <Button onClick={() => remove(index)}>
                      <FaRegTrashAlt className="text-red-400" size={20} />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="infoRow">No attractions added</div>
            )}
          </div>
          {formState?.errors?.step2?.distances && (
            <p className="text-red-400">
              {formState?.errors?.step2?.distances?.message}
            </p>
          )}
        </AttractionsTable>
      </AttractionsWrapper>
    </StepWrapper>
  );
};

export default Step2;
