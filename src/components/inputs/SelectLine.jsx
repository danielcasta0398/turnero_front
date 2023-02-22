import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";

const SelectLine = ({ options, state, rol }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    state(option);
    setIsOpen(false);
  };

  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  return (
    <FormControlStyle variant="standard" sx={{ m: 1, width: "80%" }}>
      <InputLabelStyle id="demo-simple-select-standard-label">
        Selecciona el rol
      </InputLabelStyle>
      <SelectStyle
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={rol}
        onChange={handleChange}
        label="Age"
        MenuProps={MenuProps}
      >
        <MenuItem value="" onClick={() => handleOptionClick("")}>
          <em style={{ color: "#bbb" }}>Ninguno</em>
        </MenuItem>
        {options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            onClick={() => handleOptionClick(option.value)}
          >
            {option.label}
          </MenuItem>
        ))}
      </SelectStyle>
    </FormControlStyle>
  );

  /* return (
    <SelectWrapper>
      <SelectButton onClick={toggleOpen}>
        <SelectLabel isPlaceholder={selectedOption === "Seleccionar"}>
          {selectedOption}
        </SelectLabel>
      </SelectButton>
      <SelectList isOpen={isOpen}>
        <SelectListItem onClick={() => handleOptionClick("Opción 1")}>
          Opción 1
        </SelectListItem>
        <SelectListItem onClick={() => handleOptionClick("Opción 2")}>
          Opción 2
        </SelectListItem>
        <SelectListItem onClick={() => handleOptionClick("Opción 3")}>
          Opción 3
        </SelectListItem>
      </SelectList>
    </SelectWrapper>
  );*/
};

export default SelectLine;

const FormControlStyle = styled(FormControl)`
  margin-top: -20px !important;
  margin: 0;
`;

const InputLabelStyle = styled(InputLabel)`
  color: #bbb !important;

  &.Mui-focused {
    color: var(--color-primary) !important;
    font-size: 20px !important;
  }

  &.Mui-active {
    color: var(--color-primary) !important;
  }
`;

const SelectStyle = styled(Select)`
  &.MuiSelect-select {
    color: #333 !important;
    font-size: 20px !important;
  }

  &:before {
    border-bottom: 1px solid #bbb !important;
  }

  &:after {
    border-bottom: 2px solid var(--color-primary) !important;
  }

  div {
    &:focus {
      background-color: rgb(111 165 255 / 5%) !important;
      padding-right: 24px;
      min-width: 16px;
    }
  }
`;

const SelectLabel = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  text-align: start;

  width: 100%;
  height: 100%;
  color: ${(props) => (props.isPlaceholder ? "#bbb" : "#333")};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transform: translateY(15px);
`;

const SelectWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 80%;
  height: 40px;
  background-color: #fff;
  border-bottom: 1px solid #bbb;
  margin-top: -20px;
`;

const SelectButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  border: 0;
  border-radius: 4px;
  cursor: pointer;
`;

const SelectList = styled.ul`
  position: absolute;
  top: 100%;
  right: 0;
  left: 0;
  background-color: #fff;
  border: 1px solid #ddd;
  border-top: 0;
  border-radius: 0 0 4px 4px;
  margin: 0;
  padding: 0;
  list-style: none;
  display: ${(props) => (props.isOpen ? "block" : "none")};
`;

const SelectListItem = styled.li`
  display: block;
  width: 100%;
  height: 40px;
  padding: 12px 16px;
  font-size: 14px;
  color: #333;
  cursor: pointer;

  &:hover,
  &:focus {
    background-color: #f5f5f5;
  }
`;
