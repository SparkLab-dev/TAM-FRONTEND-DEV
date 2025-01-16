import React, { useState } from "react";

import stepStyles from "./styles/stepgen.module.css";
import classes from "./styles/step7.module.css";
import { Button, Grid } from "@mui/material";
import { Add } from "@mui/icons-material";
import { ImageSelector } from "Components/Form/ImageSelector";
import { schemas } from "Schemas/Property";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import RHFSelect from "Components/Form/RHFSelect";

// Image types and languages for dropdowns
const imageTypes = [
  { id: 1, label: "Main" },
  { id: 2, label: "Property Plan" },
  { id: 3, label: "Exterior" },
];

const languages = [
  { id: 1, label: "English" },
  { id: 2, label: "French" },
  { id: 3, label: "Spanish" },
];

interface ImageData {
  file: File;
  imageTypeID: number;
  imageReferenceID: number;
  imageUrl: string;
}

interface CaptionData {
  languageID: number;
  imageReferenceID: number;
  caption: string;
}
export const PhotosStep: React.FC = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [showAddImage, setShowAddImage] = useState(false);

  const { control, setValue, getValues, formState } =
    useFormContext<yup.InferType<typeof schemas>>();

  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({
    control,
    name: "step6.images",
  });

  const {
    fields: captionFields,
    append: appendCaption,
    remove: removeCaption,
  } = useFieldArray({
    control,
    name: "step6.imageCaptions",
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach((file, index) => {
        const imageReferenceID = images.length + index + 1;
        const newImage = {
          file,
          imageTypeID: 0,
          imageReferenceID,
          imageUrl: URL.createObjectURL(file),
        };
        appendImage(newImage);
        setImages((prev) => [...prev, newImage]);
      });
    }
  };

  const handleAddCaption = (imageReferenceID: number) => {
    appendCaption({ languageID: 0, imageReferenceID, caption: "" });
  };

  const handleRemoveImage = (index: number) => {
    const imageToRemove = imageFields[index];

    removeImage(index);
    removeCaption(index);

    const updatedCaptions = captionFields.filter(
      (caption) => caption.imageReferenceID !== imageToRemove.imageReferenceID
    );

    setValue("step6.imageCaptions", updatedCaptions);
  };

  console.log(formState.errors.step6);

  return (
    <div className={stepStyles.StepWrapper}>
      <h1 className={stepStyles.stepHeading}> Photos </h1>
      <div className={classes.paragraphs}>
        <p className="text-sm">
          Choose to add photos individually or in a bulk. Reorder by dragging.
          The photo size cannot exceed 2 MB. For every time you upload in bulk
          the total size cannot exceed 10 MB. <br />
          HomeAway will not accept pictures under 1920 x 1080 pixels so upload
          your largest photos.
        </p>
      </div>
      <div>
        <div className="max-w-2xl mx-auto p-6 border border-gray-300 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Photos</h2>
          <p className="text-sm text-gray-600 mb-4">
            Upload images, assign image types, and add captions.
          </p>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="mb-4"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {imageFields.map((image, index) => (
              <div
                key={image.id}
                className="relative border border-gray-300 p-2 rounded-md"
              >
                <img
                  src={getValues(`step6.images.${index}.imageUrl`)}
                  alt={`Uploaded ${index}`}
                  className="w-full h-32 object-cover rounded-md mb-2"
                />
                <Controller
                  control={control}
                  name={`step6.images.${index}.imageTypeID`}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="w-full border border-gray-300 rounded-md p-1 text-sm"
                      placeholder="Image type"
                    >
                      <option value={0} disabled>
                        Select Image type
                      </option>
                      {imageTypes.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  )}
                />
                <button
                  type="button"
                  onClick={() => handleAddCaption(image.imageReferenceID)}
                  className="mt-2 px-4 py-1 bg-blue-500 text-white rounded-md"
                >
                  Add Caption
                </button>
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 text-red-500 text-sm"
                >
                  &times;
                </button>
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="text-red-500 text-sm ml-4"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-medium mb-4">Captions</h3>
            {captionFields.map((caption, index) => {
              // Find the corresponding image based on imageReferenceID
              const imageIndex = imageFields.findIndex(
                (image) => image.imageReferenceID === caption.imageReferenceID
              );
              const imageLabel =
                imageIndex !== -1 ? `Image ${imageIndex + 1}` : "Unknown Image";

              return (
                <div key={caption.id} className="flex items-center gap-4 mb-2">
                  <span className="font-semibold text-xs">{imageLabel}</span>

                  <Controller
                    control={control}
                    name={`step6.imageCaptions.${index}.languageID`}
                    render={({ field }) => (
                      <select
                        {...field}
                        className="border border-gray-300 rounded-md p-1 text-sm"
                      >
                        <option value={0} disabled>
                          Select Language
                        </option>
                        {languages.map((lang) => (
                          <option key={lang.id} value={lang.id}>
                            {lang.label}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                  <Controller
                    control={control}
                    name={`step6.imageCaptions.${index}.caption`}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        placeholder="Enter caption"
                        className="border border-gray-300 rounded-md p-1 w-full text-sm"
                      />
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => removeCaption(index)}
                    className="text-red-500 text-sm"
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>
          {formState?.errors?.step6 && (
            <div>
              <p className="text-red-400">
                {formState?.errors?.step6?.imageCaptions?.message}
              </p>
              <p className="text-red-400">
                {formState?.errors?.step6?.images?.message}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
