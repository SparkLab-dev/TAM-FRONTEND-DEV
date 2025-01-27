import { Box, Button, Grid, MenuItem } from "@mui/material";
import stepStyles from "./styles/stepgen.module.css";
import { Add, DeleteOutline, EditAttributes } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import RHFTextField from "Components/Form/RHFTextField";
import RHFSelect from "Components/Form/RHFSelect";
import { useFieldArray, useFormContext } from "react-hook-form";
import { schemas } from "Schemas/Property";
import * as yup from "yup";

interface CancelationPolicyType {
  validFrom: number;
  validTo: number;
  percentage: number;
}

const defaultCancellationPolicyData: CancelationPolicyType = {
  validFrom: 0,
  validTo: 0,
  percentage: 0,
};

export const CancellationPoliciesStep: React.FC = () => {
  const [cancellationPolicies, setCancellationPolicies] = useState(
    defaultCancellationPolicyData
  );
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [showAddPolicyForm, setShowAddPolicyForm] = useState(false);
  const { control, watch, setValue, trigger, formState } =
    useFormContext<yup.InferType<typeof schemas>>();

  const { append, update, remove } = useFieldArray({
    control,
    name: "step12.cancellationPolicies",
  });

  const cancellationPoliciesFormData =
    watch("step12.cancellationPolicies") || [];

  const handleChange = (
    e: React.ChangeEvent<{ name?: string; value: unknown }>,
    name: keyof CancelationPolicyType
  ) => {
    const { value } = e.target;
    setCancellationPolicies((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleDelete = (index: number) => {
    remove(index);
  };

  const handleAddTerms = () => {
    const { percentage, validFrom, validTo } = cancellationPolicies;

    if (percentage <= 0 || validFrom <= 0 || validTo <= 0) {
      alert("Please fill in all fields correctly");
      return;
    }

    if (editIndex !== null) {
      update(editIndex, cancellationPolicies);
    } else {
      append(cancellationPolicies);
    }

    setEditIndex(null);
    resetForm();
  };

  const handleEdit = (index: number, policies: CancelationPolicyType) => {
    setCancellationPolicies(policies);
    setEditIndex(index);
    setShowAddPolicyForm(true);
  };

  const resetForm = () => {
    setCancellationPolicies(defaultCancellationPolicyData);
    setShowAddPolicyForm(false);
  };

  return (
    <Box sx={{ width: "100%" }} className={stepStyles.StepWrapper}>
      <h2 className={stepStyles.stepHeading}>Cancelation Policy</h2>
      <Button
        onClick={() => setShowAddPolicyForm(true)}
        variant="outlined"
        sx={{ cursor: "pointer", width: "10rem" }}
      >
        <Add /> Add
      </Button>
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                From
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600"></th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                To
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600"></th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Charge
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600"></th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {cancellationPoliciesFormData.map((policy, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-700 font-bold">
                  {policy.validFrom}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">To</td>
                <td className="px-4 py-2 text-sm text-gray-700 first-letter:font-bold">
                  {policy.validTo}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  days before arrival charge
                </td>
                <td className="px-4 py-2 text-sm text-gray-700 font-bold">
                  {policy.percentage}%
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  of total booking amount
                </td>
                <td className="px-4 py-2 flex space-x-4">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => handleEdit(index, policy)}
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
      {showAddPolicyForm && (
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
            <RHFTextField
              errorMessage=""
              label="From"
              type="number"
              value={cancellationPolicies.validFrom.toString()}
              onChange={(e) => handleChange(e, "validFrom")}
              sx={{ width: "250px" }}
            />
            <p>Days</p>

            <RHFTextField
              errorMessage=""
              label="To"
              type="number"
              value={cancellationPolicies.validTo.toString()}
              onChange={(e) => handleChange(e, "validTo")}
              sx={{ width: "250px" }}
            />
            <p>days before arrival change</p>
            <RHFTextField
              errorMessage=""
              label="Percentage"
              type="number"
              value={cancellationPolicies.percentage.toString()}
              onChange={(e) => handleChange(e, "percentage")}
              sx={{ width: "250px" }}
            />

            <p>of total booking amount</p>

            <Button onClick={handleAddTerms} variant="contained">
              save
            </Button>
          </Grid>
          {formState?.errors?.step12?.cancellationPolicies && (
            <p className="text-red-400">
              {formState?.errors?.step12.cancellationPolicies.message}
            </p>
          )}
        </Box>
      )}
    </Box>
  );
};
