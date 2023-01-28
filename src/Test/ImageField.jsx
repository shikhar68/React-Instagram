import { Box, Grid } from "@mui/material";
import { styled } from "@mui/material";
import { useState, useRef } from "react";

const StyleBox = styled(Box)({
  background: "#ddd",
  minHeight: "20rem",
  maxHeight: "1vh",
  marginBottom: "1rem",
  borderRadius: "2rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
});

const ImageField = () => {
  const uploadInputRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);

  const handleChangeInput = (e) => {
    setImageFile(URL.createObjectURL(e.target.files[0]));
    console.log(setImageFile);
  };

  const renderImage = () => {
    <figure style={{ width: "100%", height: "100%" }}>
      <img src={imageFile} alt="" />
    </figure>;
  };

  return (
    <Grid item xs={12} md={5}>
      <StyleBox
        onClick={() => uploadInputRef.current && uploadInputRef.current.click()}
      >
        {imageFile ? renderImage() : <p>upload Image</p>}
      </StyleBox>
      <input
        type="file"
        accept="image/*"
        onChange={handleChangeInput}
        ref={uploadInputRef}
      />
    </Grid>
  );
};

export default ImageField;
