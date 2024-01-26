import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginUser from "./Pages/LoginUser";
import SignUpUser from "./Pages/SignUpUser";
import Home from "./Pages/Home";
import SingleProperty from "./Pages/SingleProperty";
import { PropertyContext } from "./Contexts/PropertyContext";
import { useEffect, useState } from "react";
import AdminPage from "./Pages/AdminPage";

function App() {
  // states
  const [propertyData, setPropertyData] = useState([]);
  const [user, setUser] = useState("");

  const [userData, setUserData] = useState({});

  const [isAdmin, setIsAdmin] = useState(false);

  // session token
  let accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (accessToken) {
      fetch("/user-token", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
        .then((res) => res.json())
        .then((data) => {
          setUserData(data);
          setUser(data.username);
          setIsAdmin(data.isAdmin);
        });
    } else {
      setUser("");
    }
  }, [accessToken]);

  useEffect(() => {
    fetch("/properties")
      .then((res) => res.json())
      .then((data) => setPropertyData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setUser("");
  };

  return (
    <PropertyContext.Provider
      value={{
        propertyData,
        user,
        handleLogout,
        userData,
        setUser,
        isAdmin,
        accessToken,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signin" element={<LoginUser />}></Route>
          <Route path="/signup" element={<SignUpUser />}></Route>
          <Route path="/admin" element={<AdminPage />}></Route>
          <Route path="/property/:id" element={<SingleProperty />}></Route>
        </Routes>
      </BrowserRouter>
    </PropertyContext.Provider>
  );
}

export default App;
