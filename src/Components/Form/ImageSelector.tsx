import React, { useState } from "react";
import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  MenuItem,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import RHFSelect from "./RHFSelect";

export const ImageSelector: React.FC = () => {
  const [image, setImage] = React.useState("");
  const imageRef = React.useRef(null);

  function useDisplayImage() {
    const [result, setResult] = React.useState("");

    function uploader(e: any) {
      const imageFile = e.target.files[0];

      const reader = new FileReader();
      reader.addEventListener("load", (e: any) => {
        setResult(e.target.result);
      });

      reader.readAsDataURL(imageFile);
    }

    return { result, uploader };
  }

  const { result, uploader } = useDisplayImage();

  return (
    <div
      style={{
        width: "200px",
        height: "250px",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      <Card
        sx={{ width: "180px", height: "180px", margin: "10px" }}
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#4f734c",
          backgroundImage: `url(${result})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <IconButton
          onClick={() => document.getElementById("image-input")!.click()}
        >
          <PhotoCamera
            sx={{ width: "50px", height: "50px", cursor: "pointer" }}
          />
        </IconButton>
      </Card>

      <input
        type="file"
        onChange={(e: any) => {
          setImage(e.target.files[0]);
          uploader(e);
        }}
        id="image-input"
        style={{ display: "none" }}
      />
      {/* {result && <img ref={imageRef} src={result} alt="" />} */}
      <div style={{ width: "" }}>
        <RHFSelect label="Image Type" name="imageType" style={{ width: "" }}>
          <MenuItem value="1">Floorplan</MenuItem>
          <MenuItem value="2">Photo</MenuItem>
        </RHFSelect>
      </div>
    </div>
  );
};
