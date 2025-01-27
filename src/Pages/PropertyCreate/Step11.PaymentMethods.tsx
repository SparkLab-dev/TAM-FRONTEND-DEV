import { Box, Button, Grid, MenuItem } from "@mui/material";

import stepStyles from "./styles/stepgen.module.css";
import RHFTextField from "Components/Form/RHFTextField";
import { Add, DeleteOutline } from "@mui/icons-material";
import RHFSelect from "Components/Form/RHFSelect";
import { useState } from "react";
import { schemas } from "Schemas/Property";
import { set, useFieldArray, useFormContext } from "react-hook-form";
import * as yup from "yup";
import OutlineTextarea from "Components/Form/TextArea";

interface PMethod {
  id: number;
  methodName: string;
  idPaymentMethod: number;
}

const paymentMethodList = [
  { value: "credit_card", label: "Credit Card" },
  { value: "paypal", label: "PayPal" },
  { value: "bank_transfer", label: "Bank Transfer" },
  { value: "crypto", label: "Cryptocurrency" },
  { value: "flexible", label: "Flexible" },
  // Add more payment methods as needed
];

const defaultFormValue = {
  id: 0,
  methodName: "",
  idPaymentMethod: 0,
};

export const PaymentMethodStep: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState<PMethod>(defaultFormValue);
  const [showAddPaymentForm, setShowAddPaymentForm] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const { control, watch, setValue, trigger, formState } =
    useFormContext<yup.InferType<typeof schemas>>();

  const { append, update, remove } = useFieldArray({
    control,
    name: "step10.paymentMethods",
  });

  const paymentMethods = watch("step10.paymentMethods") || [];

  console.log(formState.errors.step10);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    setPaymentMethod({
      id: index,
      methodName: value,
      idPaymentMethod: index,
    });
  };

  const handleDelete = (index: number) => {
    remove(index);
  };

  const handleAddPayment = () => {
    const { methodName } = paymentMethod;

    if (!methodName) {
      alert("Please fill in all fields correctly");
      return;
    }

    if (editIndex !== null) {
      update(editIndex, paymentMethod);
    } else {
      // Add new fee
      append(paymentMethod);
    }

    setEditIndex(null);

    resetForm();
  };

  const handleEdit = (index: number, payment: PMethod) => {
    setPaymentMethod(payment);
    setEditIndex(index);
    setShowAddPaymentForm(true);
  };

  const resetForm = () => {
    setPaymentMethod(defaultFormValue);
    setShowAddPaymentForm(false);
  };

  return (
    <Box sx={{ width: "100%" }} className={stepStyles.StepWrapper}>
      <h2 className={stepStyles.stepHeading}>Payment Methods</h2>

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
          onClick={() => {
            setShowAddPaymentForm(!showAddPaymentForm);
          }}
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
                Payment Method
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Payment Method ID
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paymentMethods.map((method, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-700">
                  {method.methodName}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {method.idPaymentMethod}
                </td>
                <td className="px-4 py-2 flex space-x-4">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => handleEdit(index, method)}
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
        {showAddPaymentForm && (
          <Box className={stepStyles.mapOption}>
            <div className={stepStyles.top}>
              <span className="text-xl font-bold">Add/Edit fee</span>
              <Button
                onClick={() => {
                  setShowAddPaymentForm(!showAddPaymentForm);
                }}
              >
                <DeleteOutline sx={{ color: "red", cursor: "pointer" }} />
              </Button>
            </div>
            <div className="grid grid-cols-[1fr,1fr,150px] gap-6">
              <RHFSelect
                label="Payment Method"
                value={paymentMethod.methodName}
                onChange={(e) =>
                  handleChange(
                    e as any,
                    editIndex ? editIndex : paymentMethods.length
                  )
                }
              >
                {paymentMethodList.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </RHFSelect>

              <Button onClick={handleAddPayment} variant="contained">
                save
              </Button>
            </div>
          </Box>
        )}
      </Grid>
      {formState?.errors?.step10?.paymentMethods && (
        <p className="text-red-400">
          {formState?.errors?.step10.paymentMethods.message}
        </p>
      )}
    </Box>
  );
};
