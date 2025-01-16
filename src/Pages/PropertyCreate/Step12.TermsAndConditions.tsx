import { Box, Button, Grid, MenuItem } from "@mui/material";
import stepStyles from "./styles/stepgen.module.css";
import RHFTextField from "Components/Form/RHFTextField";
import { Add, DeleteOutline } from "@mui/icons-material";
import RHFSelect from "Components/Form/RHFSelect";
import { useState } from "react";
import * as yup from "yup";
import { schemas } from "Schemas/Property";
import { useFieldArray, useFormContext } from "react-hook-form";
import { languageOptions } from "../../constants";

interface TermsAndConditions {
  languageID: number;
  link: string;
}

const defaultFormState: TermsAndConditions = {
  languageID: 0,
  link: "",
};

export const TermsAndConditionsStep: React.FC = () => {
  const [showAddTAndCForm, setShowAddTAndCForm] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [term, setTerm] = useState<TermsAndConditions>(defaultFormState);

  const { control, watch, setValue, trigger, formState } =
    useFormContext<yup.InferType<typeof schemas>>();

  const { append, update, remove } = useFieldArray({
    control,
    name: "step11.termsAndConditionsLinks",
  });

  const termsAndConditionsLinks = watch("step11.termsAndConditionsLinks") || [];

  const handleChange = (
    e: React.ChangeEvent<{ name?: string; value: unknown }>,
    name: keyof TermsAndConditions
  ) => {
    const { value } = e.target;
    setTerm((prev) => ({
      ...prev,
      [name]: value as string | number,
    }));
  };

  const handleDelete = (index: number) => {
    remove(index);
  };

  const handleAddTerms = () => {
    const { link, languageID } = term;

    if (!link || languageID === 0) {
      alert("Please fill in all fields correctly");
      return;
    }

    if (editIndex !== null) {
      update(editIndex, term);
    } else {
      append(term);
    }

    setEditIndex(null);
    resetForm();
  };

  const handleEdit = (index: number, terms: TermsAndConditions) => {
    setTerm(terms);
    setEditIndex(index);
    setShowAddTAndCForm(true);
  };

  const resetForm = () => {
    setTerm(defaultFormState);
    setShowAddTAndCForm(false);
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
          onClick={() => setShowAddTAndCForm((prev) => !prev)}
          variant="outlined"
          sx={{ cursor: "pointer" }}
        >
          <Add /> Add
        </Button>
      </Box>

      <div className="overflow-x-auto mt-6">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Language
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Link
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {termsAndConditionsLinks.map((terms, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-700">
                  {
                    languageOptions.find(
                      (option) => option.value === terms.languageID
                    )?.label
                  }
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {terms.link}
                </td>
                <td className="px-4 py-2 flex space-x-4">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => handleEdit(index, terms)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddTAndCForm && (
        <Box
          className={stepStyles.mapOption}
          sx={{
            margin: "16px 0",
            padding: "16px",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        >
          <div
            className={stepStyles.top}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <span>Add/Edit Terms and Conditions</span>
            <Button
              onClick={() => resetForm()}
              sx={{ minWidth: 0, padding: 0 }}
            >
              <DeleteOutline sx={{ color: "red", cursor: "pointer" }} />
            </Button>
          </div>

          <Grid
            container
            spacing={2}
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "20px",
              marginTop: "16px",
            }}
          >
            <RHFSelect
              label="Language"
              value={term.languageID}
              onChange={(e) => handleChange(e as any, "languageID")}
              sx={{ width: "250px" }}
            >
              {languageOptions.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </RHFSelect>

            <RHFTextField
              errorMessage=""
              label="Link"
              value={term.link}
              onChange={(e) => handleChange(e, "link")}
              sx={{ width: "50%" }}
            />

            <Button onClick={handleAddTerms} variant="contained">
              Save
            </Button>
          </Grid>
          {formState?.errors?.step11?.termsAndConditionsLinks && (
            <p className="text-red-400">
              {formState?.errors?.step11.termsAndConditionsLinks.message}
            </p>
          )}
        </Box>
      )}
    </Box>
  );
};
