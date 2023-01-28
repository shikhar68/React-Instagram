import { createContext, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Styled from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import FilterSection from "./SFilter";
import axios from "axios";

const btn = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  border: "1px solid #000",
  justifyContent: "center",
};
const style = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 500,
  bgcolor: "white",
  border: "1px solid #000",
};

export const filterContext = createContext();
const FilterContextProvider = filterContext.Provider;

const BasicModal = () => {
  const [filterClass, setFilterClass] = useState("");

  const [imageFile, setImageFile] = useState(null);
  const [caption, setCaption] = useState();
  const [post, setPost] = useState([]);
  const [open, setOpen] = useState(false);

  const handleInputChange = (e) => {
    setImageFile(URL.createObjectURL(e.target.files[0]));
  };

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    console.log("Model close");
  };

  const postOnPage = () => {
    setPost((prev) => [
      {
        image: imageFile,
        class: filterClass,
        caption: caption,
      },
      ...prev,
    ]);
    setOpen(false);
    setImageFile(null);
    console.log("@SP image", imageFile);

    //Backend calling code
    let formData = new FormData();
    formData.append("file", imageFile);

    axios
      .post("http://localhost:4000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        // console.log('SK@', res.data[0].name);
        axios.post("http://localhost:4000/post", {
          userId: "2025",
          description: "this is testing only",
          attachments: res.data,
        });
      });
  };

  return (
    <FilterContextProvider value={{ filterClass, setFilterClass }}>
      <div>
        <Button onClick={handleOpen}>Create Post</Button>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {imageFile ? (
              <>
                <FilterSection />
                <Box>
                  <InputLabel sx={{ margin: "1rem" }}>Select Filter</InputLabel>
                  <Select
                    value={filterClass}
                    label="fdfsffsdfsf"
                    onChange={handleChange}
                  >
                    {filterValues.map((item, index) => (
                      <MenuItem value={item.class} key={index}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>

                <img
                  src={imageFile}
                  className={filterClass}
                  style={{ height: "250px", width: "250px" }}
                  alt=""
                />

                <div>
                  <label>Caption</label>
                  <input
                    type="text"
                    onChange={(e) => {
                      setCaption(e.target.value);
                    }}
                  />
                </div>
                <Button sx={btn} onClick={postOnPage}>
                  Post
                </Button>
              </>
            ) : (
              <>
                <h2>Select Image</h2>
                <Button variant="contained" component="label">
                  Select
                  <input
                    hidden
                    accept="image/*"
                    onChange={handleInputChange}
                    multiple
                    type="file"
                  />
                </Button>
              </>
            )}
          </Box>
        </Modal>
        <div>
          {post.map((data) => {
            return (
              <>
                <img
                  src={data.image}
                  className={data.class}
                  style={{ height: "250px", width: "250px" }}
                />
                <p>{data.caption}</p>
              </>
            );
          })}
        </div>
      </div>
    </FilterContextProvider>
  );
};

export default BasicModal;
