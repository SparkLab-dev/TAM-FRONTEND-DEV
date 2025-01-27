import React, { useEffect, useState } from "react";
import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useFormContext } from "react-hook-form";
import { useFieldArray } from "react-hook-form";
import { schemas } from "Schemas/Property";
import * as yup from "yup";
import RHFTextField from "Components/Form/RHFTextField";
import stepStyles from "./styles/stepgen.module.css";
import classes from "./styles/step6.module.css";
import { Add } from "@mui/icons-material";
import { MdClose, MdDelete } from "react-icons/md";
import RHFSelect from "Components/Form/RHFSelect";
import { languageOptions } from "../../constants";
import OutlineTextarea from "Components/Form/TextArea";

const ArrivalInstructionsStep: React.FC = () => {
  const [isAddLanguageOpen, setIsAddLanguageOpen] = useState(false);
  const [currentSelectedLanguageID, setCurrentSelectedLanguageID] = useState(0);
  const [activLanguageIndex, setActiveLanguageIndex] = useState(0);

  const { control, watch, setValue, trigger, formState } =
    useFormContext<yup.InferType<typeof schemas>>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "step8.arrivalInstructions.howToArrive",
  });

  useEffect(() => {
    setValue("step8.arrivalInstructions.pickupService.languageID", 1);
  }, []);

  console.log(formState.errors.step8?.arrivalInstructions?.howToArrive);

  const howToArrive = watch("step8.arrivalInstructions.howToArrive") || [];
  const pickupServiceDescription =
    watch("step8.arrivalInstructions.pickupService.text") || "";

  const handleAddLanguage = () => {
    const languageExist: boolean = howToArrive.some(
      (howToArrive) => howToArrive.languageID === currentSelectedLanguageID
    );

    if (!languageExist) {
      append({ languageID: currentSelectedLanguageID, text: "" });
    } else {
      alert("Language already exists");
    }
  };
  const handleUpdateDescription = (index: number, value: string) => {
    setValue(`step8.arrivalInstructions.howToArrive.${index}.text`, value);
  };

  return (
    <div className="p-6  space-y-6 w-full">
      <h2 className="text-xl font-semibold">Arrival Information</h2>
      {/* Section: Arrival Instructions */}
      <div className="space-y-4">
        <div className="grid grid-cols-[200px,1fr,1fr]  gap-4">
          <label className="font-medium">Please contact the Landlord</label>
          <RHFTextField
            name="step8.arrivalInstructions.landlord"
            label="Landlord"
            variant="outlined"
            fullWidth
            errorMessage={
              formState.errors.step8?.arrivalInstructions?.landlord?.message
            }
          />
          <RHFTextField
            label="Days Before Arrival"
            name="step8.arrivalInstructions.daysBeforeArrival"
            variant="outlined"
            errorMessage={
              formState.errors.step8?.arrivalInstructions?.daysBeforeArrival
                ?.message
            }
            type="number"
            fullWidth
          />
        </div>

        <div className="grid grid-cols-[200px,1fr,1fr] items-center gap-4">
          <label className="font-medium">Or this telephone number</label>
          <RHFTextField
            label="Phone"
            variant="outlined"
            type="tel"
            fullWidth
            name="step8.arrivalInstructions.phone"
            errorMessage={
              formState.errors.step8?.arrivalInstructions?.phone?.message
            }
          />
          <RHFTextField
            name="step8.arrivalInstructions.email"
            label="Email"
            variant="outlined"
            type="email"
            fullWidth
            errorMessage={
              formState.errors.step8?.arrivalInstructions?.email?.message
            }
          />
        </div>
      </div>
      <div>
        <Button
          onClick={() => setIsAddLanguageOpen(true)}
          variant="outlined"
          className="w-[200px]"
        >
          <Add /> Add Language
        </Button>
      </div>

      <div className={classes.stepContent}>
        {isAddLanguageOpen && (
          <div className={stepStyles.mapOption}>
            <div className={stepStyles.top}>
              <span>Add Language</span>
              <MdClose
                color="red"
                style={{ cursor: "pointer" }}
                onClick={() => setIsAddLanguageOpen(false)}
              />
            </div>
            <div className={classes.langForm}>
              <RHFSelect
                name={"Language"}
                label="Choose a Language"
                value={
                  languageOptions.filter(
                    (language) => language.value === currentSelectedLanguageID
                  )[0]?.value
                }
                className={classes.selectLanguage}
                onChange={(event) => {
                  setCurrentSelectedLanguageID(Number(event.target.value));
                  console.log(event.target.value);
                }}
              >
                {languageOptions.map((lang) => (
                  <MenuItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </MenuItem>
                ))}
              </RHFSelect>
              <Button
                onClick={handleAddLanguage}
                variant="contained"
                className={classes.langBtn}
              >
                Add Language
              </Button>
            </div>
          </div>
        )}

        {howToArrive.length > 0 && (
          <div>
            <div className="border-b-4 flex mb-4">
              {howToArrive.map((desc, index) => (
                <button
                  className="mx-4 text-lg font-bold "
                  key={index}
                  onClick={() => {
                    setActiveLanguageIndex(index);
                  }}
                >
                  <div
                    className={
                      activLanguageIndex === index
                        ? "border-b-2 border-blue-500"
                        : ""
                    }
                  >
                    {languageOptions[desc.languageID - 1].label}
                  </div>
                </button>
              ))}
            </div>

            <div className="flex items-center">
              <h3>700 characters minimum without HTML</h3>
              <button
                className="ml-auto"
                onClick={() => {
                  remove(activLanguageIndex);

                  setActiveLanguageIndex(
                    activLanguageIndex === 0 && howToArrive.length > 1
                      ? activLanguageIndex + 1
                      : activLanguageIndex - 1
                  );
                }}
              >
                <MdDelete color="red" size={25} />
              </button>
            </div>
            <OutlineTextarea
              rows={10}
              name={`step4.compositionRoomAmenitiesList.${activLanguageIndex}.amenities`}
              placeholder="Enter Description here . . ."
              value={howToArrive[activLanguageIndex]?.text || ""}
              errorMessage={
                formState.errors?.step8?.arrivalInstructions?.howToArrive?.[
                  activLanguageIndex
                ]?.message ?? ""
              }
              onChange={(event) => {
                handleUpdateDescription(
                  activLanguageIndex,
                  event?.target?.value as string
                );
              }}
            />
            <div className="mt-10">
              <h3 className="font-bold ">Pickup Service(English)</h3>
              <OutlineTextarea
                rows={10}
                name="step8.arrivalInstructions.pickupService.text"
                placeholder="Enter Pickup Service details"
                value={pickupServiceDescription}
                errorMessage={
                  formState.errors?.step8?.arrivalInstructions?.pickupService
                    ?.message ?? ""
                }
                onChange={(event) => {
                  setValue(
                    "step8.arrivalInstructions.pickupService.text",
                    event?.target?.value
                  );
                }}
              />
            </div>
          </div>
        )}
      </div>
      {formState?.errors?.step8 && (
        <p className="text-red-400">{formState?.errors?.step8.message}</p>
      )}
    </div>
  );
};

export default ArrivalInstructionsStep;
