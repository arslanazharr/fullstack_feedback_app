import { createTheme } from "@mui/material";
import Header from "./Header";
import Login from "./modules/auth/Login";
import Signup from "./modules/auth/Signup";
import Review from "./modules/feedback/Review";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#c002c0",
    },
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Review />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
