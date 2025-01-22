import { TextField } from "@mui/material";
import { memo } from "react";

const EmailField = memo(({ value, onChange,onBlur, error }) => {
  return (
    <TextField
      fullWidth
      required
      label="Email"
      type="email"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      error={!!error}
      helperText={error}
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

export default EmailField