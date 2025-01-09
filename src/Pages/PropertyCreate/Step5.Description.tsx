import React, { useEffect, useState } from "react";

import stepStyles from "./styles/stepgen.module.css";
import classes from "./styles/step6.module.css";
import { Button, MenuItem } from "@mui/material";
import { Add } from "@mui/icons-material";
import { MdClose, MdDelete } from "react-icons/md";
import RHFSelect from "Components/Form/RHFSelect";
import RHFTextField from "Components/Form/RHFTextField";
import OutlineTextarea from "Components/Form/TextArea";
import { schemas } from "Schemas/Property";
import { set, useFormContext } from "react-hook-form";
import { useFieldArray } from "react-hook-form";
import * as yup from "yup";

const languages: string[] = [
  "English",
  "Spanish",
  "French",
  "Mandarin",
  "Arabic",
  "Hindi",
  "Swahili",
  "Portuguese",
  "Russian",
  "Bengali",
  "Japanese",
  "German",
  "Korean",
  "Italian",
  "Turkish",
  "Vietnamese",
  "Thai",
  "Persian",
  "Dutch",
  "Swedish",
  "Norwegian",
];

const languageOptions = languages.map((language, index) => ({
  value: index + 1,
  label: language,
}));

export default function DescriptionStep() {
  const [isAddLanguageOpen, setIsAddLanguageOpen] = useState(false);
  const [currentSelectedLanguageID, setCurrentSelectedLanguageID] = useState(0);
  const [activLanguageIndex, setActiveLanguageIndex] = useState(0);

  const { control, watch, setValue, trigger, formState } =
    useFormContext<yup.InferType<typeof schemas>>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "step5.descriptions",
  });

  console.log(formState.errors.step5?.descriptions);

  const descriptions = watch("step5.descriptions") || [];

  const handleAddLanguage = () => {
    const languageExist: boolean = descriptions.some(
      (description) => description.languageID === currentSelectedLanguageID
    );

    if (!languageExist) {
      append({ languageID: currentSelectedLanguageID, text: "" });
    } else {
      alert("Language already exists");
    }
  };
  const handleUpdateDescription = (index: number, value: string) => {
    setValue(`step5.descriptions.${index}.text`, value);
  };
  return (
    <div className={stepStyles.StepWrapper}>
      <h1 className={stepStyles.stepHeading}>Description</h1>
      <div className={classes.btnContainer}>
        <Button
          onClick={() => setIsAddLanguageOpen(true)}
          variant="outlined"
          className={classes.addBtn}
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
              <Button
                onClick={handleAddLanguage}
                variant="contained"
                className={classes.langBtn}
              >
                Make Google Translation
              </Button>
            </div>
          </div>
        )}

        {descriptions.length > 0 && (
          <div>
            <div className="border-b-4 flex mb-4">
              {descriptions.map((desc, index) => (
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
                    {languages[desc.languageID - 1]}
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
                    activLanguageIndex === 0 && descriptions.length > 1
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
              value={descriptions[activLanguageIndex]?.text || ""}
              errorMessage={
                formState.errors?.step5?.descriptions?.[activLanguageIndex]
                  ?.message ?? ""
              }
              onChange={(event) => {
                handleUpdateDescription(
                  activLanguageIndex,
                  event?.target?.value as string
                );
              }}
            />
          </div>
        )}
      </div>
      {formState?.errors?.step5?.descriptions && (
        <p className="text-red-400">
          {formState?.errors?.step5?.descriptions?.message}
        </p>
      )}
    </div>
  );
}
