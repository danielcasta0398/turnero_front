import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import styled from "styled-components";

export default function InputAutocompleteSearch({
  colorLabel,
  option,
  ...props
}) {
  React.useEffect(() => {
    console.log(option);
  }, [option]);

  const [value, setValue] = React.useState(null);

  const handleChange = (event) => {
    setValue(event.target.value);
    console.log(event.target.value);
  };

  return (
    <MainContainer colorLabel={colorLabel}>
      {option && (
        <Autocomplete
          options={option}
          id="open-on-focus"
          openOnFocus
          getOptionLabel={(option) => option.label}
          {...props}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Asignar a:"
              variant="standard"
              onChange={handleChange}
            />
          )}
        />
      )}
    </MainContainer>
  );
}

const MainContainer = styled.div`
  width: 80%;
  margin-top: -20px;

  .css-1c2i806-MuiFormLabel-root-MuiInputLabel-root.Mui-focused {
    font-size: 20px;
    color: ${(props) =>
      props.colorLabel ? props.colorLabel : "var(--color-primary)"};
  }

  .css-l4u8b9-MuiInputBase-root-MuiInput-root:hover:not(
      .Mui-disabled,
      .Mui-error
    ):before {
    border-bottom: 2px solid var(--color-primary);
  }

  .css-1c2i806-MuiFormLabel-root-MuiInputLabel-root {
    font-size: 20px;
    color: ${(props) =>
      props.colorLabel ? props.colorLabel : "var(--color-primary)"};
  }

  .css-l4u8b9-MuiInputBase-root-MuiInput-root:after {
    border-bottom: 2px solid var(--color-primary);
  }
`;
