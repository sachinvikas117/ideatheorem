import React, { useState, useMemo, useCallback } from "react";
import {
  Grid,
  Button,
  Box,
  Typography,
  styled,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import FullNameField from "./FullNameField";
import EmailField from "./EmailField";
import ContactNumberField from "./ContactNumberField";
import PasswordField from "./PasswordField";
import BirthDayFields from "./BirthDayField";
import AlertPopUp from "./Alert";

const Div = styled("div")(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
  fontWeight: 600,
  textAlign: "left",
  padding: 0,
  fontSize: "16px",
  textTransform: "none",
  lineHeight: "24px",
  letterSpacing: "0.15px",
}));
const Form = () => {
  const [formValues, setFormValues] = useState({
    fullName: "",
    email: "",
    contactNumber: "",
    day: "",
    month: "",
    year: "",
    password: "",
    confirmPassword: "",
  });

  const [submitValues, SetSubmitValue] = useState({
    status: false,
    message: "",
    type: "",
  });

  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [touchedFields, setTouchedFields] = useState({});

  const handleBlur = useCallback((field) => {
    setTouchedFields((prev) => ({ ...prev, [field]: true }));
  }, []);

  const errors = useMemo(() => {
    const newErrors = {};
    const nameRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+1 \d{3}-\d{3}-\d{4}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!formValues.fullName) newErrors.fullName = "Full Name is required.";
    else if (!nameRegex.test(formValues.fullName))
      newErrors.fullName = "Only letters and spaces are allowed.";

    if (!formValues.email) newErrors.email = "Email is required.";
    else if (!emailRegex.test(formValues.email))
      newErrors.email = "Enter a valid email address.";

    if (!formValues.contactNumber)
      newErrors.contactNumber = "Contact number is required.";
    else if (!phoneRegex.test(formValues.contactNumber))
      newErrors.contactNumber = "Enter a valid Canadian phone number.";

    if (!formValues.day) newErrors.day = "Day is required.";
    if (!formValues.month) newErrors.month = "Month is required.";
    if (!formValues.year) newErrors.year = "Year is required.";

    if (!formValues.password) newErrors.password = "Password is required.";
    else if (!passwordRegex.test(formValues.password))
      newErrors.password =
        "Password must be at least 8 characters long, with uppercase, lowercase, and numbers.";

    if (!formValues.confirmPassword)
      newErrors.confirmPassword = "Confirm Password is required.";
    else if (formValues.confirmPassword !== formValues.password)
      newErrors.confirmPassword = "Passwords must match.";

    return newErrors;
  }, [formValues]);

  const isValidForm = useMemo(() => Object.keys(errors).length === 0, [errors]);

  const closeAlert = () => {
    SetSubmitValue({
      status: false,
      message: "",
      type: "",
    });
  };

  const handleChange = useCallback((field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (isValidForm) {
        formSubmission(formValues);
      } else {
        setTouchedFields({
          fullName: true,
          email: true,
          contactNumber: true,
          day: true,
          month: true,
          year: true,
          password: true,
          confirmPassword: true,
        });
      }
    },
    [isValidForm, formValues]
  );

  const formSubmission = async (formValues) => {
    try {
      let data = JSON.stringify({
        full_name: formValues.fullName,
        contact_number: formValues.contactNumber,
        email: formValues.email,
        date_of_birth: `${formValues.day}-${formValues.month}-${formValues.year}`,
        password: formValues.password,
      });
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const response = await fetch(
        "https://fullstack-test-navy.vercel.app/api/users/create",
        {
          method: "POST",
          body: data,
          headers: myHeaders,
        }
      );

      const responseData = await response.json();
      console.log("responseData", responseData.dev_message);
      SetSubmitValue({
        status: true,
        message: responseData.dev_message,
        type: "success",
      });
    } catch (error) {
      SetSubmitValue({
        status: true,
        message: "There was error creating the account",
        type: "error",
      });
    }
  };

  return (
    <>
      <Box
        p={3}
        mx="auto"
        sx={{
          width: {
            sm: 480, // Padding on small and larger screens
          },
        }}
        width={400}
      >
        <Typography variant="h6" align="left " style={{ fontWeight: 700 }}>
          Create User Account
        </Typography>
      </Box>

      <Box
        p={3}
        mx="auto"
        maxWidth={400}
        sx={{ boxShadow: 1, borderRadius: 1, padding: 5 }}
      >
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Div align="left" variant="subtitle1">
                Full Name
              </Div>
              <FullNameField
                value={formValues.fullName}
                onChange={(value) => handleChange("fullName", value)}
                onBlur={() => handleBlur("fullName")}
                error={touchedFields.fullName ? errors.fullName : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <Div align="left" variant="subtitle1">
                Contact Number
              </Div>
              <ContactNumberField
                value={formValues.contactNumber}
                onChange={(value) => handleChange("contactNumber", value)}
                onBlur={() => handleBlur("contactNumber")}
                error={touchedFields.contactNumber ? errors.contactNumber : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <Div align="left" variant="subtitle1">
                Birthdate
              </Div>
              <BirthDayFields
                day={formValues.day}
                month={formValues.month}
                year={formValues.year}
                onChange={(field, value) => handleChange(field, value)}
                onBlur={(field) => handleBlur(field)}
                errors={{
                  day: touchedFields.day ? errors.day : "",
                  month: touchedFields.month ? errors.month : "",
                  year: touchedFields.year ? errors.year : "",
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Div align="left" variant="subtitle1">
                Email address
              </Div>
              <EmailField
                value={formValues.email}
                onChange={(value) => handleChange("email", value)}
                onBlur={() => handleBlur("email")}
                error={touchedFields.email ? errors.email : ""}
              />
            </Grid>

            <Grid item xs={12}>
              <Div align="left" variant="subtitle1">
                Password
              </Div>
              <PasswordField
                label="Password"
                value={formValues.password}
                onChange={(value) => handleChange("password", value)}
                onBlur={() => handleBlur("password")}
                error={touchedFields.password ? errors.password : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <Div align="left" variant="subtitle1">
                Confirm Password
              </Div>
              <PasswordField
                label="Confirm Password"
                value={formValues.confirmPassword}
                onChange={(value) => handleChange("confirmPassword", value)}
                onBlur={() => handleBlur("confirmPassword")}
                error={
                  touchedFields.confirmPassword ? errors.confirmPassword : ""
                }
              />
            </Grid>
          </Grid>
        </form>
{isMobile?submitValues.status?<AlertPopUp
            status={submitValues.status}
            type={submitValues.type}
            message={submitValues.message+"qwew"}
            closeAlert={closeAlert}
          />:"":""}
          {
            !isMobile?submitValues.status? <AlertPopUp
            status={submitValues.status}
            type={submitValues.type}
            message={submitValues.message}
            closeAlert={closeAlert}
            style={
              { top:"70px", right:"40px",padding:"20px",position:"absolute" }
            }
          />:"":""
          }
      
  
      </Box>

      <Box p={3} mx="auto" maxWidth={400}>
        <Grid container spacing={2}>
          <Grid item sm={6} xs={12}>
            <Button
              fullWidth
              variant="outlined"
              sx={{
                backgroundColor: "white",
                color: "#127c95",
                border: "1px solid #127c95",
                padding: "16px 32px",
              }}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item sm={6} xs={12}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              onClick={handleSubmit}
              sx={{
                backgroundColor: "#127c95",
                color: "white",
                padding: "16px 32px",
                border: "1px solid #white",
              }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Form;
