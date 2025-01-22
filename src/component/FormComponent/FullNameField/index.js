import { memo } from "react";
import { TextField } from "@mui/material";

const FullNameField = memo(({ value, onChange,onBlur, error }) => {
  return (
    <TextField
      fullWidth
      required
      label="Full Name"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      error={!!error}
      helperText={error}
      onBlur={onBlur}
      margin="normal"
      InputLabelProps={{
        sx: {
          "& .MuiFormLabel-asterisk": {
            color: "red",
          },
        },
      }}
    />
  );
});

export default FullNameField;
