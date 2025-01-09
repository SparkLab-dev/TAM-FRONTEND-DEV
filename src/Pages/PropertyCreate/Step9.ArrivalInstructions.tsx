import React from "react";

import stepStyles from "./styles/stepgen.module.css";
import classes from "./styles/step6.module.css";
import { Button, MenuItem } from "@mui/material";
import { Add } from "@mui/icons-material";
import { MdDelete } from "react-icons/md";
import RHFSelect from "Components/Form/RHFSelect";
import RHFTextField from "Components/Form/RHFTextField";
import OutlineTextarea from "Components/Form/TextArea";

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
export const ArrivalInstructionsStep: React.FC = () => {
  const addLanguage = () => {};
  return (
    <div className={stepStyles.StepWrapper}>
      <h1 className={stepStyles.stepHeading}>Description</h1>
      <div className={classes.btnContainer}>
        <Button
          onClick={() => addLanguage()}
          variant="outlined"
          className={classes.addBtn}
        >
          <Add /> Add Language
        </Button>
      </div>
      <div className={classes.stepContent}>
        <div className={stepStyles.mapOption}>
          <div className={stepStyles.top}>
            <span>Add Language</span>
            <MdDelete color="red" style={{ cursor: "pointer" }} />
          </div>
          <div className={classes.langForm}>
            <RHFSelect
              name={"Language"}
              label="Choose a Language"
              className={classes.selectLanguage}
            >
              {languages.map((lang) => (
                <MenuItem key={lang} value={lang}>
                  {lang}
                </MenuItem>
              ))}
            </RHFSelect>
            <Button
              onClick={() => addLanguage()}
              variant="contained"
              className={classes.langBtn}
            >
              Add Language
            </Button>
          </div>
        </div>

        <div className={classes.langHeading}>
          <span>English</span>
        </div>
        <div>
          <h3>How to arrive at the property</h3>
          <OutlineTextarea
            name="hi"
            errorMessage=""
            rows={10}
            placeholder="Enter Instructions here . . ."
          />
        </div>

        <div>
          <h3>Details of your Pickup service</h3>
          <OutlineTextarea
            name="hi"
            errorMessage=""
            rows={10}
            placeholder="Enter Description here . . ."
          />
        </div>
      </div>
    </div>
  );
};
