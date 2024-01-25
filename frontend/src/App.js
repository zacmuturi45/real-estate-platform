import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginUser from "./Pages/LoginUser";
import SignUpUser from "./Pages/SignUpUser";
import Home from "./Pages/Home";
import SingleProperty from "./Pages/SingleProperty";
import Header from "./Header";
import Footer from "./Footer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signin" element={<LoginUser />}></Route>
        <Route path="/signup" element={<SignUpUser />}></Route>
        <Route path="/property/:id" element={<SingleProperty />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
