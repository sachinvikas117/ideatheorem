import {  styled } from "@mui/styles";


const Div = styled
('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
  fontWeight:600,
  textAlign:"left",
  padding:0,
  fontSize:"16px",
  textTransform:"none",
  lineHeight: "24px",
  letterSpacing:"0.15px"
}));


export default Div