import { createContext, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Styled from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { filterValues } from "../utils";
import "../instagram.css";
import InputLabel from "@mui/material/InputLabel";

import { MenuItem, Select } from "@mui/material";
import LikeFeature from "./Like-Component";
import { border } from "@mui/system";

const topbtn = {};
// const Boxstyle = {
//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "center",
//   alignItems: "center",
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 550,
//   height: 550,
//   bgcolor: "white",
//   border: "1px dotted black",
// };

const PostSection = () => {
  const [filterClass, setFilterClass] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [caption, setCaption] = useState(false);
  const [post, setPost] = useState([]);
  const [open, setOpen] = useState(false);
  const [captionvisible, setCaptionVisible] = useState(false);

  const handleInputChange = (e) => {
    setImageFile(URL.createObjectURL(e.target.files[0]));
  };

  // const handleChange = (e) => {
  //   setFilterClass(e.target.value);
  // };
  // console.log("@SP filter ", filterClass);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    console.log("Model close");
  };

  const showCaption = () => {
    setCaptionVisible(!captionvisible);
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

    setCaptionVisible(false);
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
    <div className="main">
      <Button className="btn" onClick={handleOpen} variant="contained">
        Create Post
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="Boxstyle">
          {imageFile ? (
            <>
              <Button sx={topbtn} onClick={showCaption} variant="contained">
                {captionvisible ? "Back" : "Add Caption"}
              </Button>
              <div className="InnerBoxstyle">
                <div style={{ border: "2px dotted black", padding: "2px" }}>
                  <img
                    src={imageFile}
                    className={filterClass}
                    style={{ height: "260px", width: "240px" }}
                    alt=""
                  />
                </div>

                <div className="filter-grid">
                  {filterValues.map((item, index) => (
                    <div key={index} style={{ padding: 3 }}>
                      <img
                        style={{ width: 70, height: 100, cursor: "pointer" }}
                        className={item.class}
                        onClick={() => setFilterClass(item.class)}
                        src={imageFile}
                        alt=""
                      />

                      <div
                        className="filter-item"
                        key={index}
                        onClick={() => setFilterClass(item.class)}
                      >
                        {item.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {captionvisible && (
                <div>
                  <h3>Caption</h3>
                  <textarea
                    placeholder="Write caption here..."
                    style={{ width: 500, height: 100, cursor: "pointer" }}
                    onChange={(e) => {
                      setCaption(e.target.value);
                    }}
                  />
                </div>
              )}
              {captionvisible && (
                <Button variant="contained" onClick={postOnPage}>
                  Post
                </Button>
              )}
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
      <div className="Post-Section">
        {post.map((data) => {
          return (
            <div>
              <img
                src={data.image}
                className={data.class}
                style={{ height: "250px", width: "250px" }}
                // onClick={handleLike}
              />
              <h3>{data.caption}</h3>
              <div>
                <LikeFeature />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PostSection;
