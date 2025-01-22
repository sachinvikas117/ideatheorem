import { memo } from "react";
import { TextField } from "@mui/material";

const ContactNumberField = memo(({ value, onChange,onBlur, error }) => {
  return (
    <TextField
      fullWidth
      required
      label="Contact Number"
      type="tel"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      error={!!error}
      helperText={error}
      margin="normal"
      onBlur={onBlur}
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

export default ContactNumberField;