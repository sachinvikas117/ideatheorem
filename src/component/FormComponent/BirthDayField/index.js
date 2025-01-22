import React, { useEffect } from "react";
import { Grid, MenuItem, Select, FormControl, InputLabel, FormHelperText } from "@mui/material";

const BirthDayFields = ({ day, month, year, onChange, onBlur, errors }) => {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const generateNumberOptions = (start, end) => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i).reverse();
  };

  const handleFieldChange = (field, value) => {
    onChange(field, value);
    
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <FormControl fullWidth error={!!errors.day}>
          <InputLabel>Day</InputLabel>
          <Select
            value={day}
            onChange={(e) => handleFieldChange("day", e.target.value)}
            onBlur={() => onBlur("day")}
            label="Day"
          >
            {generateNumberOptions(1, 31).map((number) => (
              <MenuItem key={number} value={number}>
                {number}
              </MenuItem>
            ))}
          </Select>
          {errors.day && <FormHelperText>{errors.day}</FormHelperText>}
        </FormControl>
      </Grid>
      <Grid item xs={4}>
        <FormControl fullWidth error={!!errors.month}>
          <InputLabel>Month</InputLabel>
          <Select
            value={month}
            onChange={(e) => handleFieldChange("month", e.target.value)}
            onBlur={() => onBlur("month")}
            label="Month"
          >
            {months.map((monthName, index) => (
              <MenuItem key={monthName} value={monthName}>
                {monthName}
              </MenuItem>
            ))}
          </Select>
          {errors.month && <FormHelperText>{errors.month}</FormHelperText>}
        </FormControl>
      </Grid>
      <Grid item xs={4}>
        <FormControl fullWidth error={!!errors.year}>
          <InputLabel>Year</InputLabel>
          <Select
            value={year}
            onChange={(e) => handleFieldChange("year", e.target.value)}
            onBlur={() => onBlur("year")}
            label="Year"
          >
            {generateNumberOptions(1900, new Date().getFullYear()).map((number) => (
              <MenuItem key={number} value={number}>
                {number}
              </MenuItem>
            ))}
          </Select>
          {errors.year && <FormHelperText>{errors.year}</FormHelperText>}
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default BirthDayFields;
