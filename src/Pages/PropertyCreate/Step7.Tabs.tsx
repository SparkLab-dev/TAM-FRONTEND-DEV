import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { PricingTab } from "./tabs/PricingTab";
import stepStyles from "./styles/stepgen.module.css";
import RHFTextField from "Components/Form/RHFTextField";
import { FeesTab } from "./tabs/FeesTab";
import { useFieldArray, useFormContext } from "react-hook-form";
import { schemas } from "Schemas/Property";
import * as yup from "yup";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function TabsStep() {
  const [activeTab, setActiveTab] = React.useState(0);

  const { control, setValue, getValues, formState } =
    useFormContext<yup.InferType<typeof schemas>>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "step7.additionalFees",
  });

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ width: "100%" }} className={stepStyles.StepWrapper}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={activeTab}
          onChange={handleChange}
          aria-label="Pricing and tax"
        >
          <Tab label="Pricing" {...a11yProps(0)} />
          <Tab label="Tax & Fees" {...a11yProps(1)} />
        </Tabs>
      </Box>

      <CustomTabPanel value={activeTab} index={0}>
        <PricingTab />
      </CustomTabPanel>
      <CustomTabPanel value={activeTab} index={1}>
        <FeesTab />
      </CustomTabPanel>
    </Box>
  );
}
