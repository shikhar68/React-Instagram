import { Grid } from "@mui/material";
import { Box, Container } from "@mui/system";
import "./App.css";
import ImageField from "./ImageField";

function PostImage() {
  return (
    <Container sx={{ marginTop: "4rem", marginBottom: "4rem" }}>
      <Box sx={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1>Instagram Post Page</h1>
      </Box>
      <Grid container spacing={10}>
        <ImageField />
        <Grid item xs={12} md={5}>
          Filter
        </Grid>
      </Grid>
    </Container>
  );
}

export default PostImage;
