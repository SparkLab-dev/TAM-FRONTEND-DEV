import * as yup from "yup";

export const schemas = yup.object({
  step1: yup.object().shape({
    name: yup
      .string()
      .trim()
      .min(3, "Name must be at least 3 characters long")
      .max(100, "Name cannot exceed 100 characters")
      .required("Name is required"),

    propertyTypeID: yup
      .number()
      .integer("Property Type ID must be an integer")
      .min(1, "Property Type ID must be greater than 0")
      .required("Property Type is required"),

    canSleepMax: yup
      .number()
      .integer("Maximum sleeping capacity must be an integer")
      .min(1, "Must accommodate at least 1 person")
      .max(50, "Cannot accommodate more than 50 people")
      .required("Maximum sleeping capacity is required"),

    space: yup
      .number()
      .positive("Space must be a positive number")
      .min(10, "Space must be at least 10 square meters")
      .max(10000, "Space cannot exceed 10,000 square meters")
      .required("Space is required"),

    floor: yup
      .number()
      .integer("Floor must be an integer")
      .min(0, "Floor must be 0 or higher")
      .max(100, "Floor cannot exceed 100")
      .required("Floor is required"),

    street: yup
      .string()
      .trim()
      .min(5, "Street name must be at least 5 characters long")
      .max(255, "Street name cannot exceed 255 characters")
      .required("Street name is required"),

    zipCode: yup
      .string()
      .min(3, "Zip code must be at least 3 characters long")
      .max(20, "Zip code cannot exceed 20 characters")
      .required("Zip code is required"),

    detailedLocationID: yup
      .number()
      .integer("Location ID must be an integer")
      .min(1, "Location ID must be greater than 0")
      .required("City is required"),

    coordinates: yup
      .object({
        longitude: yup
          .number()
          .min(-180, "Longitude must be between -180 and 180")
          .max(180, "Longitude must be between -180 and 180")
          .required("Longitude is required"),
        latitude: yup
          .number()
          .min(-90, "Latitude must be between -90 and 90")
          .max(90, "Latitude must be between -90 and 90")
          .required("Latitude is required"),
      })
      .required("Coordinates are required"),
  }),
  step2: yup.object().shape({
    licenceInfo: yup
      .object({
        licenceNumber: yup
          .string()
          .min(5, "Licence number must be at least 5 characters long")
          .max(50, "Licence number cannot exceed 50 characters")
          .required("Licence number is required"),
      })
      .required("Licence information is required"),

    distances: yup
      .array()
      .of(
        yup.object({
          destinationID: yup
            .number()
            .nullable()
            .min(1, "Destination ID must be greater than 0 or null"),
          distanceUnitID: yup
            .number()
            .nullable()
            .min(1, "Distance Unit ID must be greater than 0 or null"),
          distanceValue: yup
            .number()
            .nullable()
            .min(0, "Distance value must be 0 or higher")
            .max(10000, "Distance value cannot exceed 10,000"),
        })
      )
      .min(1, "Atleast one attraction is required"),
  }),
  step3: yup.object().shape({
    amenities: yup
      .array()
      .of(
        yup.object({
          count: yup
            .number()
            .integer("Amenity count must be an integer")
            .min(1, "Amenity count must be greater than 0")
            .max(100, "Amenity count cannot exceed 100")
            .optional(),
          amenityID: yup
            .number()
            .integer("Amenity ID must be an integer")
            .min(1, "Amenity ID must be greater than 0")
            .optional(),
        })
      )
      .min(1, "Atleast 1 General Amenity are required"),
  }),

  step4: yup.object().shape({
    compositionRoomAmenitiesList: yup
      .array()
      .of(
        yup.object({
          compositionRoomID: yup
            .number()
            .integer("Room ID must be an integer")
            .min(1, "Room ID must be greater than 0")
            .required("Room ID is required"),
          amenities: yup
            .array()
            .of(
              yup.object({
                id: yup
                  .number()
                  .integer("Amenity ID must be an integer")
                  .min(1, "Amenity ID must be greater than 0")
                  .required("Amenity ID is required"),
                amenityID: yup
                  .number()
                  .integer("Amenity ID must be an integer")
                  .min(1, "Amenity ID must be greater than 0")
                  .required("Amenity ID is required"),
                amenityDescription: yup
                  .string()
                  .max(255, "Amenity description cannot exceed 255 characters")
                  .required("Amenity description is required"),
              })
            )
            .min(1, "Atleast 1 room amenity is required"),
        })
      )
      .min(1, "Room amenities list is required"),
  }),

  step5: yup.object().shape({
    descriptions: yup
      .array()
      .of(
        yup.object({
          languageID: yup
            .number()
            .integer("Language ID must be an integer")
            .min(1, "Language ID must be greater than 0")
            .required("Language ID is required"),
          text: yup
            .string()
            .min(10, "Description text must be at least 10 characters long")
            .max(500, "Description text cannot exceed 500 characters")
            .required("Description text is required"),
        })
      )
      .min(1, "Descriptions are required"),
  }),

  step6: yup.object().shape({
    images: yup
      .array()
      .of(
        yup.object({
          imageTypeID: yup
            .number()
            .integer("Image Type ID must be an integer")
            .min(1, "Image Type ID must be greater than 0")
            .required("Image Type ID is required"),
          imageReferenceID: yup
            .number()
            .integer("Image Reference ID must be an integer")
            .min(1, "Image Reference ID must be greater than 0")
            .required("Image Reference ID is required"),
          imageUrl: yup.string().required("Image URL is required"),
        })
      )
      .min(3, "Atleast 3 image is required"),
    imageCaptions: yup
      .array()
      .of(
        yup.object({
          languageID: yup
            .number()
            .integer("Language ID must be an integer")
            .min(1, "Language ID must be greater than 0")
            .required("Language ID is required"),
          imageReferenceID: yup
            .number()
            .integer("Image Reference ID must be an integer")
            .min(1, "Image Reference ID must be greater than 0")
            .required("Image Reference ID is required"),
          caption: yup
            .string()
            .min(5, "Caption must be at least 5 characters long")
            .max(255, "Caption cannot exceed 255 characters")
            .required("Caption is required"),
        })
      )
      .min(1, "Image captions are required"),
  }),

  step7: yup.object().shape({
    standardGuests: yup
      .number()
      .integer("Standard guests must be an integer")
      .min(1, "Standard guests must be at least 1")
      .max(20, "Standard guests cannot exceed 20")
      .required("Standard guests are required"),

    minStay: yup
      .number()
      .integer("Minimum stay must be an integer")
      .min(1, "Minimum stay must be at least 1 night")
      .max(365, "Minimum stay cannot exceed 365 nights")
      .required("Minimum stay is required"),

    additionalFees: yup
      .array()
      .of(
        yup.object({
          feeTaxType: yup
            .number()
            .integer("Fee/Tax type must be an integer")
            .min(1, "Fee/Tax type must be greater than 0")
            .required("Fee/Tax type is required"),
          discriminatorID: yup
            .number()
            .integer("Discriminator ID must be an integer")
            .min(1, "Discriminator ID must be greater than 0")
            .required("Discriminator ID is required"),
          order: yup
            .number()
            .integer("Order must be an integer")
            .required("Order is required"),
          value: yup
            .number()
            .positive("Value must be a positive number")
            .required("Value is required"),
        })
      )
      .min(1, "Additional fees are required"),

    securityDeposit: yup
      .object({
        depositTypeID: yup
          .number()
          .integer("Deposit type ID must be an integer")
          .min(1, "Deposit type ID must be greater than 0")
          .required("Deposit type ID is required"),
        amount: yup
          .number()
          .positive("Amount must be a positive number")
          .required("Security deposit amount is required"),
      })
      .required("Security deposit is required"),
    deposite: yup
      .object({
        depositTypeID: yup
          .number()
          .integer("Deposit type ID must be an integer")
          .min(1, "Deposit type ID must be greater than 0")
          .required("Deposit type ID is required"),
        amount: yup
          .number()
          .positive("Amount must be a positive number")
          .required("Security deposit amount is required"),
      })
      .required("Security deposit is required"),
  }),
  step8: yup.object().shape({
    arrivalInstructions: yup
      .object({
        landlord: yup
          .string()
          .min(5, "Landlord name must be at least 5 characters long")
          .max(100, "Landlord name cannot exceed 100 characters")
          .required("Landlord name is required"),
        email: yup
          .string()
          .email("Must be a valid email address")
          .required("Email is required"),
        phone: yup
          .string()
          .matches(/^\+?[0-9]{7,15}$/, "Phone number must be valid")
          .required("Phone number is required"),
        daysBeforeArrival: yup
          .number()
          .integer("Days before arrival must be an integer")
          .min(1, "Days before arrival must be at least 1")
          .max(30, "Days before arrival cannot exceed 30")
          .required("Days before arrival is required"),
        howToArrive: yup
          .array()
          .of(
            yup.object({
              languageID: yup
                .number()
                .integer("Language ID must be an integer")
                .min(1, "Language ID must be greater than 0")
                .required("Language ID is required"),
              text: yup
                .string()
                .min(10, "Instructions must be at least 10 characters long")
                .max(500, "Instructions cannot exceed 500 characters")
                .required("Instructions text is required"),
            })
          )
          .required("Arrival instructions are required"),
        pickupService: yup
          .object({
            languageID: yup
              .number()
              .integer("Language ID must be an integer")
              .min(1, "Language ID must be greater than 0")
              .required("Language ID is required"),
            text: yup
              .string()
              .min(
                10,
                "Pickup service details must be at least 10 characters long"
              )
              .max(500, "Pickup service details cannot exceed 500 characters")
              .required("Pickup service text is required"),
          })
          .required("Pickup service information is required"),
      })
      .required("Arrival instructions are required"),
  }),
  step9: yup.object().shape({
    checkInOut: yup
      .object({
        checkInFrom: yup
          .string()
          .matches(
            /^([0-1]\d|2[0-3]):([0-5]\d)$/,
            "Check-in time must be in HH:mm format"
          )
          .required("Check-in from time is required"),
        checkInTo: yup
          .string()
          .matches(
            /^([0-1]\d|2[0-3]):([0-5]\d)$/,
            "Check-in time must be in HH:mm format"
          )
          .required("Check-in to time is required"),
        checkOutUntil: yup
          .string()
          .matches(
            /^([0-1]\d|2[0-3]):([0-5]\d)$/,
            "Check-out time must be in HH:mm format"
          )
          .required("Check-out time is required"),
        place: yup
          .string()
          .min(3, "Place must be at least 3 characters long")
          .max(100, "Place cannot exceed 100 characters")
          .required("Place is required"),
        lateArrivalFees: yup
          .array()
          .of(
            yup.object({
              from: yup.string().required("Late arrival from time is required"),
              to: yup.string().required("Late arrival to time is required"),
              fee: yup
                .number()
                .positive("Fee must be a positive number")
                .required("Late arrival fee is required"),
            })
          )
          .required("Late arrival fees are required"),
        earlyDepartureFees: yup
          .array()
          .of(
            yup.object({
              from: yup
                .string()
                .required("Early departure from time is required"),
              to: yup.string().required("Early departure to time is required"),
              fee: yup
                .number()
                .positive("Fee must be a positive number")
                .required("Early departure fee is required"),
            })
          )
          .required("Early departure fees are required"),
      })
      .required("Check-in/out details are required"),
  }),
  step10: yup.object().shape({
    paymentMethods: yup
      .array()
      .of(
        yup.object({
          id: yup
            .number()
            .integer("Payment method ID must be an integer")
            .required("Payment method ID is required"),
          methodName: yup
            .string()
            .min(3, "Payment method name must be at least 3 characters long")
            .max(50, "Payment method name cannot exceed 50 characters")
            .required("Payment method name is required"),
          idPaymentMethod: yup
            .number()
            .integer("Payment method internal ID must be an integer")
            .required("Payment method internal ID is required"),
        })
      )
      .min(1, "Atleast 1 Payment method is required"),
  }),
  step11: yup.object().shape({
    termsAndConditionsLinks: yup
      .array()
      .of(
        yup.object({
          languageID: yup
            .number()
            .required("Language ID is required")
            .integer("Language ID must be an integer")
            .positive("Language ID must be a positive number"),
          link: yup
            .string()
            .required("Link is required")
            .url("Link must be a valid URL"),
        })
      )
      .min(1, "Terms and conditions are required"),
  }),

  step12: yup.object().shape({
    cancellationPolicies: yup
      .array()
      .of(
        yup.object({
          validFrom: yup
            .number()
            .positive("Valid from date must be a positive number")
            .required("Valid from date is required"),
          validTo: yup
            .number()
            .positive("Valid to date must be a positive number")
            .required("Valid to date is required"),
          percentage: yup
            .number()
            .min(0, "Percentage must be between 0 and 100")
            .max(100, "Percentage must be between 0 and 100")
            .required("Percentage is required"),
        })
      )
      .min(1, "Cancellation policies are required"),
  }),
});
