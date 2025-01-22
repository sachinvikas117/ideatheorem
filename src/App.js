import logo from './logo.svg';
import './App.css';
import HeaderComponent from './component/HeaderComponent';
import FormComponent from './component/FormComponent';
import { Typography } from '@mui/material';

function App() {
  const initialValues = {
    fullName: "John Doe",
    contactNumber: "+1234567890",
    email: "john.doe@example.com",
    day: "12",
    month: "Jun",
    year: "1985",
    password: "Password123",
    confirmPassword: "Password123",
  };
  
  return (
    <div className="App">
      <HeaderComponent></HeaderComponent>
     
      <FormComponent initialValues={initialValues}></FormComponent>
    </div>
  );
}

export default App;
