import { Box, Button } from "@mui/material";
import { useState } from "react";
import Step1 from "./Step1";
import { PageContainer } from "./styles";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

const MAX_STEPS = 3;

const PropertCreate = () => {
  const navigate = useNavigate();
  const methods = useForm<PropertyCreateInputs>();
  const { register, reset, watch, setValue, getValues } = methods;

  const [currentStep, setCurrentStep] = useState(1);

  const onSubmit: SubmitHandler<PropertyCreateInputs> = (data) => console.log(data);

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };
  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };
  const handleFormSubmit = () => {};
  const handleGoBack = () => {
    navigate("/apartmentpage");
  };
  const handleAddAttraction = () => {
    const currentValues = getValues("distances") || [];

    console.log("handleAddAttraction called", currentValues);

    setValue("distances", [...currentValues, { destinationID: null, distanceValue: null, distanceUnitID: null }]);
  };
  const handleDeleteAttraction = (itemIndex: number) => {
    const currentValues = getValues("distances") || [];
    setValue(
      "distances",
      currentValues.filter((_, index) => index !== itemIndex),
    );
  };

  return (
    <PageContainer>
      <Button onClick={handleGoBack}>
        <ChevronLeft /> All properties
      </Button>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {currentStep === 1 && <Step1 />}
          {currentStep === 2 && (
            <Step2 handleDeleteAttraction={handleDeleteAttraction} handleAddAttraction={handleAddAttraction} />
          )}
          {currentStep === 3 && <Step3 />}

          <div>
            <Button disabled={currentStep === 1} onClick={handlePreviousStep}>
              <ChevronLeft /> Previous
            </Button>
            <Button disabled={currentStep === MAX_STEPS} onClick={handleNextStep}>
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
  ruPropertyId: number;
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
      count: number;
      amenityID: number;
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
