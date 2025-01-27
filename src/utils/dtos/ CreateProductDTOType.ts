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
