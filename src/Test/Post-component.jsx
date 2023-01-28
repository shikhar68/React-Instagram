import React, { useState } from "react";
import "./App.css";
const PostCreate = () => {
  const [selectedImage, setselectedImage] = useState([]);
  const onSelectFile = (e) => {
    const selectedFile = e.target.files;
    const SelectedFilesArray = Array.from(selectedFile);
    const ImageArray = SelectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setselectedImage((PrevImage) => PrevImage.concat(ImageArray));
  };

  return (
    <section>
      <h1>Instagram Post Section</h1>
      <label>
        Click to ADD Post
        <input
          type="file"
          name="image"
          onChange={onSelectFile}
          //   multiple
          //   accept="image/png,image/jpeg"
        />
      </label>

      {selectedImage &&
        selectedImage.map((image) => {
          return (
            <div key={image}>
              <img src={image} height="350" width="250" />
            </div>
          );
        })}
    </section>
  );
};

export default PostCreate;
