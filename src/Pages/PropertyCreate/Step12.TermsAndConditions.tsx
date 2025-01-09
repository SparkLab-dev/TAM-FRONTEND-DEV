import { Box, Button, Grid, MenuItem } from "@mui/material";

import stepStyles from "./styles/stepgen.module.css";
import RHFTextField from "Components/Form/RHFTextField";
import { Add, DeleteOutline } from "@mui/icons-material";
import RHFSelect from "Components/Form/RHFSelect";
import { useState } from "react";

interface TermsAndConditions {
  languageId?: number;
  link: string;
}

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

export const TermsAndConditionsStep: React.FC = () => {
  const [terms, setTerms] = useState<TermsAndConditions[]>([]);

  const addFee = () => {
    let temp = terms;
    temp.push({
      link: "",
    });
    setTerms([...temp]);
  };
  return (
    <Box sx={{ width: "100%" }} className={stepStyles.StepWrapper}>
      <h2 className={stepStyles.stepHeading}>Terms And Conditions</h2>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontSize: "22px", fontWeight: "500" }}></span>
        <Button
          onClick={() => addFee()}
          variant="outlined"
          sx={{ cursor: "pointer" }}
        >
          <Add /> Add
        </Button>
      </Box>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 4, md: 4 }}
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          margin: "16px 0px",
          padding: "16px",
        }}
      >
        {terms.map((fee, index) => (
          <Box className={stepStyles.mapOption}>
            <div className={stepStyles.top}>
              <span>Add/Edit Terms and condition</span>
              <DeleteOutline sx={{ color: "red", cursor: "pointer" }} />
            </div>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 4, md: 4 }}
              style={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                flexDirection: "row",
                gap: "20px",
              }}
            >
              <RHFSelect
                label="Language"
                name="language"
                sx={{ width: "250px" }}
              >
                {languages.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </RHFSelect>
              {/* <RHFTextField label="Link" name="link" sx={{ width: "50%" }} /> */}

              <Button onClick={() => console.clear()} variant="contained">
                save
              </Button>
            </Grid>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};
