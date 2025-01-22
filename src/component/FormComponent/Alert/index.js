import { Alert } from "@mui/material";

const AlertPopUp = ({ message, type, closeAlert,style }) => {
    console.log(message)
  return (
    <Alert
      severity={type}
      onClose={() => closeAlert()}
      sx={{ marginBottom: 2,...style }}
      
    >
      {message}
    </Alert>
  );
};

export default AlertPopUp;
