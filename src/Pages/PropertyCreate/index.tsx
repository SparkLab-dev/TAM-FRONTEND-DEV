import { Box, Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { PageContainer } from "./styles";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Step1 from "./Step1";
import Step2 from "./Step2";
import CompositionStep from "./Step3.Composition";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { schemas } from "Schemas/Property";
import * as yup from "yup";
import RoomAmenitiesStep from "./Step4.RoomAmenities";
import { amenities } from "../../constants";
import { FaToilet, FaBed, FaBath } from "react-icons/fa";
import roomStyle from "./components/styles/roomamenity.module.css";
import { AmenityComposition, CreatePropertyInput } from "Types/PropertyTypes";
import DescriptionStep from "./Step5.Description";
import { PhotosStep } from "./Step6.Photos";
import TabsStep from "./Step7.Tabs";
import ArrivalInstructionsStep from "./Step8.ArrivalInstructions";
import { CheckInOutStep } from "./Step10.CheckInOut";
import { PaymentMethodStep } from "./Step11.PaymentMethods";
import { TermsAndConditionsStep } from "./Step12.TermsAndConditions";
import { CancellationPoliciesStep } from "./Step13.CancelationPolicies";
const MAX_STEPS = 18;

const amenitycomposition: AmenityComposition[] = [
  {
    id: 0,
    name: "bedrooms",
    icon: <FaBed className={roomStyle.image} />,
    count: 0,
    subTitle: "keep 0 if studio",
  },
  {
    id: 1,
    name: "bathrooms",
    icon: <FaBath className={roomStyle.image} />,
    count: 0,
    subTitle: "For shower rooms",
  },
  {
    id: 2,
    name: "toilets",
    icon: <FaToilet className={roomStyle.image} />,
    count: 0,
    subTitle: "That are seperate from bathrooms",
  },
];

const PropertCreate = () => {
  const [currentStep, setCurrentStep] = useState(1);
  console.log("currentStep", currentStep);

  const [roomsCompositions, setRoomsCompositions] = React.useState<CreatePropertyInput["compositionRoomAmenitiesList"]>(
    [],
  );

  const [roomsDropdownOptions, setRoomsDropdownOptions] = useState<{ label: string; value: number }[]>([]);

  //step3
  const [composition, setComposition] = useState(amenitycomposition);
  const [currentGeneralAmenities, setCurrentGeneralAmenities] = useState(amenities);

  useEffect(() => {
    const options: { label: string; value: number }[] = [];

    const bedroomsCount = composition[0].count || 0;
    const bathroomsCount = composition[1].count || 0;

    // Create dropdown options for bedrooms
    for (let i = 1; i <= bedroomsCount; i++) {
      options.push({ label: `Bedroom ${i}`, value: i });
    }

    // Create dropdown options for bathrooms
    for (let i = 1; i <= bathroomsCount; i++) {
      options.push({ label: `Bathroom ${i}`, value: options.length + 1 });
    }

    setRoomsDropdownOptions(options);
  }, [composition]);

  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);

  const formMethods = useForm<yup.InferType<typeof schemas>>({
    mode: "all",
    resolver: yupResolver(schemas),
  });

  type StepNameTypes = keyof yup.InferType<typeof schemas>;

  const handleQuantityChange = (id: number, quantity: number) => {
    setComposition((prevComposition) =>
      prevComposition.map((composition) =>
        composition.id === id
          ? { ...composition, count: quantity } // Update count based on user input
          : composition,
      ),
    );
  };

  const steps: { [key in StepNameTypes]: React.ReactNode } = {
    step1: <Step1 />,
    step2: <Step2 />,
    step3: (
      <CompositionStep
        composition={composition}
        onQuantityChange={handleQuantityChange}
        generalAmenities={currentGeneralAmenities}
        setGeneralAmenities={setCurrentGeneralAmenities}
      />
    ),
    step4: <RoomAmenitiesStep roomDropdownOptions={roomsDropdownOptions} />,
    step5: <DescriptionStep />,
    step6: <PhotosStep />,
    step7: <TabsStep />,
    step8: <ArrivalInstructionsStep />,
    step9: <CheckInOutStep />,
    step10: <PaymentMethodStep />,
    step11: <TermsAndConditionsStep />,
    step12: <CancellationPoliciesStep />,
  };

  const STEPS_TO_STEP_NAMES: { [key: number]: StepNameTypes } = {
    1: "step1",
    2: "step2",
    3: "step3",
    4: "step4",
    5: "step5",
    6: "step6",
    7: "step7",
    8: "step8",
    9: "step9",
    10: "step10",
    11: "step11",
    12: "step12",
  };

  // Get the current step name
  const currentStepName = STEPS_TO_STEP_NAMES[currentStep];

  const isFirstStep = Object.keys(steps)[0] === currentStepName;
  const isLastStep = currentStep === Object.keys(steps).length;

  const handleNextStep = async (e: any) => {
    console.log(formMethods.getValues());
    e.stopPropagation();
    e.preventDefault();

    //Trigger validation for the current step
    // and if there are no errors, move to the next step
    // await formMethods.trigger(currentStepName);
    const currentStepHasErrors = formMethods.getFieldState(currentStepName).error;

    // if (currentStepHasErrors) return;
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
    console.log(formMethods.getValues());
  };
  function handleFormSubmit(data: any) {
    console.log(data);
  }

  const handleGoBack = () => {
    navigate("/apartmentpage");
  };

  return (
    <PageContainer>
      <Button onClick={handleGoBack}>
        <ChevronLeft /> All properties
      </Button>
      <FormProvider {...formMethods}>
        <form ref={formRef} onSubmit={formMethods.handleSubmit(handleFormSubmit)}>
          {steps[currentStepName]}
          <div className="mt-10">
            <Button disabled={isFirstStep} onClick={handlePreviousStep} type="button">
              <ChevronLeft /> Previous
            </Button>

            <Button type="button" onClick={(event: any) => handleNextStep(event)}>
              Next <ChevronRight />
            </Button>
          </div>
        </form>
      </FormProvider>
    </PageContainer>
  );
};

export default PropertCreate;

export interface PropertyCreateInputs {
  ruPropertyId: number; //should be removed
  name: string;
  ownerID: number;
  typedetailedLocationId: number;
  detailedLocationID: number;
  space: number;
  standardGuests: number;
  canSleepMax: number;
  propertyTypeID: number;
  noOfUnits: number;
  floor: number;
  numberOfFloors: number;
  street: string;
  zipCode: string;
  coordinates: {
    longitude: number;
    latitude: number;
  };
  distances: {
    destinationID: number | null;
    distanceUnitID: number | null;
    distanceValue: number | null;
  }[];
  amenities: {
    count: number;
    amenityID: number;
  }[];
  images: {
    imageTypeID: number;
    imageReferenceID: number;
    imageUrl: string;
  }[];
  imageCaptions: {
    languageID: number;
    imageReferenceID: number;
    caption: string;
  }[];
  imageSecondaryTypes: {
    imageReferenceID: number;
    imageSecondaryTypeID: number;
  }[];
  arrivalInstructions: {
    landlord: string;
    email: string;
    phone: string;
    daysBeforeArrival: number;
    howToArrive: {
      languageID: number;
      text: string;
    }[];
    pickupService: {
      languageID: number;
      text: string;
    };
  };
  checkInOut: {
    checkInFrom: string;
    checkInTo: string;
    checkOutUntil: string;
    place: string;
    lateArrivalFees: {
      from: string;
      to: string;
      fee: number;
    }[];
    earlyDepartureFees: {
      from: string;
      to: string;
      fee: number;
    }[];
  };
  paymentMethods: {
    id: number;
    methodName: string;
    idPaymentMethod: number;
  }[];
  termsAndConditionsLinks: {
    languageID: number;
    link: string;
  }[];
  deposit: {
    depositTypeID: number;
    amount: number;
  };
  cancellationPolicies: {
    validFrom: number;
    validTo: number;
    percentage: number;
  }[];
  descriptions: {
    languageID: number;
    text: string;
  }[];
  compositionRoomAmenitiesList: {
    compositionRoomID: number;
    amenities: {
      id: number;
      amenityID: number;
      amenityDescription: string;
    }[];
  }[];

  securityDeposit: {
    depositTypeID: number;
    amount: number;
  };
  additionalFees: {
    feeTaxType: number;
    discriminatorID: number;
    order: number;
    value: number;
  }[];
  licenceInfo: {
    licenceNumber: string;
  };
  active: boolean;
  archived: boolean;
}
