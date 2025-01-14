import { Box, Button, Grid, MenuItem, TextField } from "@mui/material";

import stepStyles from "./styles/stepgen.module.css";
import RHFTextField from "Components/Form/RHFTextField";
import { Add, DeleteOutline } from "@mui/icons-material";
import RHFSelect from "Components/Form/RHFSelect";
import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { schemas } from "Schemas/Property";
import * as yup from "yup";

const checkInPlaces = [
  { value: "at_the_office", label: "At the Office" },
  { value: "at_the_apartment", label: "At the Apartment" },
  { value: "at_the_bus_station", label: "At the Bus Station" },
  { value: "at_the_railway_station", label: "At the Railway Station" },
  { value: "at_the_airport", label: "At the Airport" },
  { value: "at_the_address_below", label: "At the Address Below" },
  { value: "by_your_taxi_driver", label: "By Your Taxi Driver" },
];

type feeTypesStringLiteral = "lateArrivalFees" | "earlyDepartureFees";

const defaultFeesState = {
  from: "",
  to: "",
  fee: 0,
};

export const CheckInOutStep: React.FC = () => {
  const [feeType, setFeeType] =
    useState<feeTypesStringLiteral>("lateArrivalFees");
  const [showAddFeesForm, setShowAddFeesForm] = useState(false);
  const [feesDataToAdd, setFeesDataToAdd] = useState(defaultFeesState);
  const { control, watch, setValue, trigger, formState } =
    useFormContext<yup.InferType<typeof schemas>>();
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const {
    append: addEarlyDeparture,
    update: updateEarlyDeparture,
    remove: removeEarlyDeparture,
  } = useFieldArray({
    control,
    name: "step9.checkInOut.earlyDepartureFees",
  });

  const {
    append: addLateArrival,
    update: updateLateArrival,
    remove: removeLateArrival,
  } = useFieldArray({
    control,
    name: "step9.checkInOut.lateArrivalFees",
  });

  const lateArrivals = watch("step9.checkInOut.lateArrivalFees") || [];
  const earlyDeparture = watch("step9.checkInOut.earlyDepartureFees") || [];

  const mergedArrivalDepatureFormData = [
    ...lateArrivals.map((item, index) => ({
      ...item,
      feeType: "lateArrivalFees",
      originalIndex: index, // Track index in lateArrivals array
    })),
    ...earlyDeparture.map((item, index) => ({
      ...item,
      feeType: "earlyDepartureFees",
      originalIndex: index, // Track index in earlyDeparture array
    })),
  ];

  const feeData = {
    earlyDepartureFees: earlyDeparture.length,
    lateArrivalFees: lateArrivals.length,
  };

  const handleAddFees = () => {
    const { from, to, fee } = feesDataToAdd;

    if (!from || !to || fee <= 0) {
      alert("Please fill in all fields correctly");
      return;
    }

    const addFeesHandler =
      feeType === "lateArrivalFees" ? addLateArrival : addEarlyDeparture;
    const updateFeesHandler =
      feeType === "lateArrivalFees" ? updateLateArrival : updateEarlyDeparture;

    if (editIndex !== null) {
      // Update existing fee
      updateFeesHandler(editIndex, feesDataToAdd);
    } else {
      // Add new fee
      addFeesHandler(feesDataToAdd);
    }

    setEditIndex(null);

    resetForm();
  };

  const handleEdit = (index: number, fee: any) => {
    setFeeType(fee.feeType);
    setFeesDataToAdd(fee);
    setEditIndex(index);
    setShowAddFeesForm(true);
  };

  const handleDelete = (index: number, feeType: feeTypesStringLiteral) => {
    const removeHandler =
      feeType === "lateArrivalFees" ? removeLateArrival : removeEarlyDeparture;
    removeHandler(index);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: "from" | "to" | "fee"
  ) => {
    const { value } = e.target;
    setFeesDataToAdd((prev) => ({
      ...prev,
      [name]: name === "fee" ? Number(value) : value, // Convert to number if it's the fees field
    }));
  };

  const resolveDynamicFieldErrorMessages = (
    fieldName: "from" | "to" | "fee"
  ) => {
    return (
      formState?.errors?.step9?.checkInOut?.[feeType]?.[feeData[feeType]]?.[
        fieldName
      ]?.message || ""
    );
  };

  const resetForm = () => {
    setFeesDataToAdd(defaultFeesState);
    setShowAddFeesForm(false);
  };

  return (
    <Box sx={{ width: "100%" }} className={stepStyles.StepWrapper}>
      <h2 className={stepStyles.stepHeading}>Check In / Check Out</h2>

      <div className="space-y-4">
        <div className="grid grid-cols-[200px,1fr] items-center gap-4">
          <label className="font-medium">Normal check-in times</label>
          <div className="flex items-center space-x-2">
            <RHFTextField
              name="step9.checkInOut.checkInFrom"
              errorMessage={
                formState.errors.step9?.checkInOut?.checkInFrom?.message
              }
              type="time"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <span>-</span>
            <RHFTextField
              name="step9.checkInOut.checkInTo"
              errorMessage={
                formState.errors.step9?.checkInOut?.checkInTo?.message
              }
              type="time"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </div>
        </div>

        <div className="grid grid-cols-[200px,1fr] items-center gap-4">
          <label className="font-medium">Normal check-out time</label>
          <div className="flex items-center space-x-2">
            <RHFTextField
              name="step9.checkInOut.checkOutUntil"
              errorMessage={
                formState.errors.step9?.checkInOut?.checkOutUntil?.message
              }
              type="time"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </div>
        </div>

        <div className="grid grid-cols-[200px,1fr] items-center gap-4">
          <label className="font-medium">The check-in will happen</label>
          <RHFSelect name="step9.checkInOut.place" label="Checkout places">
            {checkInPlaces.map((option, index) => (
              <MenuItem value={option.value} key={index}>
                {" "}
                {option.label}
              </MenuItem>
            ))}
          </RHFSelect>
        </div>
      </div>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontSize: "22px", fontWeight: "500" }}>Fee List</span>
        <Button
          onClick={() => {
            setShowAddFeesForm(!showAddFeesForm);
          }}
          variant="outlined"
          sx={{ cursor: "pointer" }}
        >
          <Add /> Add fee
        </Button>
      </Box>
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Fee Type
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                From
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                To
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Cost
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {mergedArrivalDepatureFormData.map((fee, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-700">
                  {fee.feeType}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">{fee.from}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{fee.to}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{fee.fee}</td>
                <td className="px-4 py-2 flex space-x-4">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => handleEdit(fee.originalIndex, fee)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() =>
                      handleDelete(
                        fee.originalIndex,
                        fee.feeType as feeTypesStringLiteral
                      )
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
        {showAddFeesForm && (
          <Box className={stepStyles.mapOption}>
            <div className={stepStyles.top}>
              <span>Add/Edit fee</span>
              <Button onClick={resetForm}>
                <DeleteOutline sx={{ color: "red", cursor: "pointer" }} />
              </Button>
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
                label="Fee type"
                sx={{ width: "250px" }}
                defaultValue={feeType}
                value={feeType}
                onChange={(e: any) => {
                  setFeeType(e?.target?.value as any); // Update feeType state
                }}
              >
                <MenuItem value="lateArrivalFees">Late Checkin</MenuItem>
                <MenuItem value="earlyDepartureFees">Early Checkout</MenuItem>
              </RHFSelect>
              <RHFTextField
                errorMessage={resolveDynamicFieldErrorMessages("from")}
                type="time"
                label="From"
                sx={{ width: "250px" }}
                value={feesDataToAdd.from}
                onChange={(e: any) => handleChange(e, "from")}
              />
              <RHFTextField
                errorMessage={resolveDynamicFieldErrorMessages("to")}
                label="To"
                type="time"
                sx={{ width: "250px" }}
                value={feesDataToAdd.to}
                onChange={(e: any) => handleChange(e, "to")}
              />
              <RHFTextField
                errorMessage={resolveDynamicFieldErrorMessages("fee")}
                label="Fee"
                sx={{ width: "250px" }}
                type="number"
                value={feesDataToAdd.fee.toString() ?? ""}
                onChange={(e: any) => handleChange(e, "fee")}
              />
              <Button onClick={handleAddFees} variant="outlined">
                {editIndex !== null ? "Update" : "Save"}
              </Button>
            </Grid>
          </Box>
        )}
      </Grid>
    </Box>
  );
};
