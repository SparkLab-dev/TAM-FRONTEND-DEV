import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import { MdAddCircle, MdDelete } from "react-icons/md";
import RHFSelect from "Components/Form/RHFSelect";
import classes from "../styles/step6.module.css";
import { useFormContext, useFieldArray } from "react-hook-form";
import { schemas } from "Schemas/Property";
import * as yup from "yup";

const taxChargeList = [
  { value: 1, label: "tax 1" },
  { value: 2, label: "tax 2" },
  { value: 3, label: "tax 3" },
];

const extraTaxChargeList = [
  { value: 100, label: "Charge 1" },
  { value: 200, label: "Charge 2" },
  { value: 300, label: "Charge 3" },
];

const calChargeList = [
  { value: 1, label: "option 1" },
  { value: 2, label: "option 2" },
  { value: 3, label: "option 3" },
];

export const FeesTab: React.FC = () => {
  const { control, watch, setValue, trigger, formState } =
    useFormContext<yup.InferType<typeof schemas>>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "step7.additionalFees",
  });

  const additionalFees = watch("step7.additionalFees") || [];
  const deposite = watch("step7.deposite") || {};
  const securityDeposite = watch("step7.securityDeposit") || {};

  console.log(formState.errors.step7?.additionalFees);

  const handleCreateAdditionFees = (
    index: number,
    type: "etra charges" | "taxes"
  ) => {
    append({
      feeTaxType: type === "etra charges" ? 100 : 1,
      discriminatorID: 1,
      order: index,
      value: 0,
    });
  };

  const handleTaxChange = (
    feeTaxType: number,
    field: "feeTaxType" | "discriminatorID" | "order" | "value",
    value: number
  ) => {
    const updatedData = [...additionalFees];
    const index = updatedData.findIndex((fee) => fee.feeTaxType === feeTaxType);

    if (index !== -1) {
      updatedData[index][field] = value;
      setValue("step7.additionalFees", updatedData);
    } else {
      console.warn(`FeeTaxType ${feeTaxType} not found.`);
    }
  };

  const handleDeleteTax = (id: number) => {
    const dataToRemove = additionalFees.filter(
      (data) => data.feeTaxType === id
    )[0];

    const updatedFees = additionalFees.filter(
      (fee) => fee.feeTaxType !== dataToRemove.feeTaxType
    );

    setValue("step7.additionalFees", updatedFees);
  };

  return (
    <Box p={4}>
      <Typography variant="h6" mb={4}>
        Taxes & Fees
      </Typography>

      <Box mb={4}>
        <Typography variant="subtitle1" mb={2}>
          Taxes
        </Typography>
        <Button
          variant="outlined"
          startIcon={<MdAddCircle />}
          onClick={() =>
            handleCreateAdditionFees(additionalFees.length, "taxes")
          }
        >
          Add Tax
        </Button>

        {additionalFees
          .filter((fees) => fees.feeTaxType <= 3)
          .map((tax, index) => (
            <Box key={index} display="flex" alignItems="center" mb={2}>
              <RHFSelect
                name={`step7.additionalFees.${index}.feeTaxType`}
                label="Extra tax"
                value={tax.feeTaxType}
                className={classes.selectLanguage}
                onChange={(event) => {
                  handleTaxChange(
                    index,
                    "feeTaxType",
                    Number(event.target.value)
                  );
                }}
                error={
                  !!formState?.errors?.step7?.additionalFees?.[index]
                    ?.feeTaxType?.message
                }
                sx={{ mr: 2, flexGrow: 1 }}
              >
                {taxChargeList.map((tax) => (
                  <MenuItem key={tax.value} value={tax.value}>
                    {tax.label}
                  </MenuItem>
                ))}
              </RHFSelect>
              <TextField
                label="Value"
                variant="outlined"
                name={`step7.additionalFees.${index}.value`}
                value={tax.value}
                error={
                  !!formState?.errors?.step7?.additionalFees?.[index]?.value
                    ?.message
                }
                onChange={(e) =>
                  handleTaxChange(
                    tax.feeTaxType,
                    "value",
                    Number(e.target.value)
                  )
                }
                sx={{ mr: 2, flexGrow: 1 }}
              />
              <RHFSelect
                name={`step7.additionalFees.${index}.discriminatorID`}
                label="Calculated by"
                value={tax.discriminatorID}
                className={classes.selectLanguage}
                onChange={(event) => {
                  handleTaxChange(
                    tax.feeTaxType,
                    "discriminatorID",
                    Number(event?.target.value)
                  );
                }}
                error={
                  !!formState?.errors?.step7?.additionalFees?.[index]
                    ?.discriminatorID?.message
                }
                sx={{ mr: 2, flexGrow: 1 }}
              >
                {calChargeList.map((tax) => (
                  <MenuItem key={tax.value} value={tax.value}>
                    {tax.label}
                  </MenuItem>
                ))}
              </RHFSelect>

              <Button
                variant="outlined"
                color="error"
                className="text-xs"
                startIcon={<MdDelete size={20} />}
                onClick={() => handleDeleteTax(tax.feeTaxType)}
              >
                Delete
              </Button>
            </Box>
          ))}
      </Box>

      <Box mb={4}>
        <Typography variant="subtitle1" mb={2}>
          Extra Charges
        </Typography>
        <Button
          variant="outlined"
          startIcon={<MdAddCircle />}
          onClick={() => handleCreateAdditionFees(100, "etra charges")}
        >
          Add Extra Charge
        </Button>

        {additionalFees
          .filter((fees) => fees.feeTaxType >= 100)
          .map((charge, index) => (
            <Box key={index} display="flex" alignItems="center" mb={2}>
              <RHFSelect
                name={`step7.additionalFees.${index}.feeTaxType`}
                label="Extra tax"
                value={charge.feeTaxType}
                className={classes.selectLanguage}
                onChange={(event) => {
                  handleTaxChange(
                    charge.feeTaxType,
                    "feeTaxType",
                    Number(event.target.value)
                  );
                }}
                sx={{ mr: 2, flexGrow: 1 }}
              >
                {extraTaxChargeList.map((tax) => (
                  <MenuItem key={tax.value} value={tax.value}>
                    {tax.label}
                  </MenuItem>
                ))}
              </RHFSelect>
              <TextField
                label="Value"
                variant="outlined"
                name={`step7.additionalFees.${index}.value`}
                value={charge.value}
                onChange={(e) =>
                  handleTaxChange(
                    charge.feeTaxType,
                    "value",
                    Number(e.target.value)
                  )
                }
                sx={{ mr: 2, flexGrow: 1 }}
              />
              <RHFSelect
                name={`step7.additionalFees.${index}.discriminatorID`}
                label="Calculated by"
                value={charge.discriminatorID}
                className={classes.selectLanguage}
                onChange={(event) => {
                  handleTaxChange(
                    charge.feeTaxType,
                    "discriminatorID",
                    Number(event?.target.value)
                  );
                }}
                sx={{ mr: 2, flexGrow: 1 }}
              >
                {calChargeList.map((tax) => (
                  <MenuItem key={tax.value} value={tax.value}>
                    {tax.label}
                  </MenuItem>
                ))}
              </RHFSelect>

              <Button
                variant="outlined"
                color="error"
                startIcon={<MdDelete />}
                onClick={() => handleDeleteTax(charge.feeTaxType)}
              >
                Delete
              </Button>
            </Box>
          ))}
      </Box>

      <Box mb={4}>
        <Typography variant="subtitle1" mb={2}>
          Down Payment
        </Typography>
        <RHFSelect
          name={`step7.deposite.depositTypeID`}
          label="Calculated by"
          value={deposite.depositTypeID}
          className={classes.selectLanguage}
          onChange={(event) => {
            setValue(
              "step7.deposite.depositTypeID",
              Number(event.target.value)
            );
          }}
        >
          {calChargeList.map((tax) => (
            <MenuItem key={tax.value} value={tax.value}>
              {tax.label}
            </MenuItem>
          ))}
        </RHFSelect>
        <TextField
          label="Amount"
          type="number"
          name={`step7.deposite.amount`}
          variant="outlined"
          value={deposite.amount}
          onChange={(event) =>
            setValue("step7.deposite.amount", Number(event.target.value))
          }
        />
      </Box>

      <Box>
        <Typography variant="subtitle1" mb={2}>
          Security Deposit
        </Typography>
        <RHFSelect
          name={`step7.securityDeposit.depositTypeID`}
          label="Calculated by"
          value={securityDeposite.depositTypeID}
          className={classes.selectLanguage}
          onChange={(event) => {
            setValue(
              "step7.securityDeposit.depositTypeID",
              Number(event.target.value)
            );
          }}
        >
          {calChargeList.map((tax) => (
            <MenuItem key={tax.value} value={tax.value}>
              {tax.label}
            </MenuItem>
          ))}
        </RHFSelect>
        <TextField
          label="Amount"
          type="number"
          name={`step7.securityDeposit.amount`}
          variant="outlined"
          value={securityDeposite.amount}
          onChange={(event) =>
            setValue("step7.securityDeposit.amount", Number(event.target.value))
          }
        />
      </Box>
    </Box>
  );
};
