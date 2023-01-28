import React, { createContext, useContext, useState } from "react";
import Box from "@mui/material/Box";

import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { Button, Link, MenuItem, Select } from "@mui/material";
import { filterValues } from "../utils";
import BasicModal, { filterContext } from "./SImage";
import "../instagram.css";
const FilterSection = () => {
  const { filterClass, setFilterClass } = useContext(filterContext);

  const handleChange = (e) => {
    setFilterClass(e.target.value);
  };
  console.log("@SP ", filterClass);
  return (
    <>
      <div>
        <Box>
          <InputLabel sx={{ margin: "1rem" }}>Select Filter</InputLabel>

          {/* {filterValues.map((item, index) => (
            <Button variant={filterClass} key={index} onChange={handleChange}>
              {item.name}
            </Button>
          ))} */}

          <Select value={filterClass} label="xyz" onChange={handleChange}>
            {filterValues.map((item, index) => (
              <MenuItem value={item.class} key={index}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </div>
    </>
  );
};

export default FilterSection;
