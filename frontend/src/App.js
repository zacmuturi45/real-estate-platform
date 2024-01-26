import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginUser from "./Pages/LoginUser";
import SignUpUser from "./Pages/SignUpUser";
import Home from "./Pages/Home";
import SingleProperty from "./Pages/SingleProperty";
import { PropertyContext } from "./Contexts/PropertyContext";
import { useEffect, useState } from "react";

// states

function App() {
  const [propertyData, setPropertyData] = useState([]);
  const [user, setUser] = useState("")
  let accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    fetch("/user-token", {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .then((res)=>res.json())
    .then((data)=> setUser(data.username))
  }, [accessToken]);

  useEffect(() => {
    fetch("/properties")
      .then((res) => res.json())
      .then((data) => setPropertyData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <PropertyContext.Provider value={{ propertyData, user }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signin" element={<LoginUser />}></Route>
          <Route path="/signup" element={<SignUpUser />}></Route>
          <Route path="/property/:id" element={<SingleProperty />}></Route>
        </Routes>
      </BrowserRouter>
    </PropertyContext.Provider>
  );
}

export default App;
