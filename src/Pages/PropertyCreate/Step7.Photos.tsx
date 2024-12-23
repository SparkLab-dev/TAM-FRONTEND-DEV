import React from "react";

import stepStyles from "./styles/stepgen.module.css";
import classes from "./styles/step7.module.css";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";

export const PhotosStep: React.FC = () => {
  return (
    <div className={stepStyles.StepWrapper}>
      <h1 className={stepStyles.stepHeading}> Photos </h1>
      <div className={classes.paragraphs}>
        <p>
          Choose to add photos individually or in a bulk. Reorder by dragging.
          The photo size cannot exceed 2 MB. For every time you upload in bulk
          the total size cannot exceed 10 MB. <br />
          HomeAway will not accept pictures under 1920 x 1080 pixels so upload
          your largest photos.
        </p>
        <div className={classes.pBtns}>
          <Button
            onClick={() => console.log("yam")}
            variant="outlined"
            className={classes.addBtn}
          >
            <Add /> Add Photo
          </Button>
          <Button
            onClick={() => console.log("yam")}
            variant="outlined"
            className={classes.addBtn}
          >
            <Add /> Add Floorplan
          </Button>
        </div>
      </div>
    </div>
  );
};
