import { useContext, useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import { PropertyContext } from "../Contexts/PropertyContext";
import AuthGuard from "../Components/AuthGuard";
import UserTable from "../Components/UserTable";
import { Link } from "react-router-dom";
import PropertyTable from "../Components/PropertyTable";

export default function AdminPage() {
  const { user, isAdmin, propertyData, accessToken } =
    useContext(PropertyContext);

  // state

  const [userStats, setUserStats] = useState([]);
  const [adminStats, setAdminStats] = useState([]);
  const [enquiryStats, setEnquiryStats] = useState([]);

  useEffect(() => {
    if (accessToken) {
      fetch("/users", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
        .then((res) => res.json())
        .then((data) => {
          setUserStats(data);
        });
    } else {
      //setUser("");
    }
  }, [accessToken]);

  useEffect(() => {
    if (accessToken) {
      fetch("/admins/all", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
        .then((res) => res.json())
        .then((data) => {
          setAdminStats(data);
        });
    } else {
    }
  }, [accessToken]);

  useEffect(() => {
    if (accessToken) {
      fetch("/enquiries", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
        .then((res) => res.json())
        .then((data) => {
          setEnquiryStats(data);
        });
    } else {
    }
  }, [accessToken]);

  return (
    <div>
      {!isAdmin ? (
        <>
          <AuthGuard />
        </>
      ) : (
        <>
          <Navbar />
          <div className="container-lgs mt-4 dashboard">
            <div className="d-flex align-content-center mt-3 mb-3">
              <Link>
                User {`>`} {user}
              </Link>
            </div>
            <h5>Dashboard 🖥</h5>
            <div className="row gx-2 mt-4">
              <div className="col-sm-3 stats-cards">
                <h6>No of Properties</h6>
                <h3>{propertyData.length}</h3>
              </div>
              <div className="col-sm-3 stats-cards">
                <h6>No of Users</h6>
                <h3>{userStats.length}</h3>
              </div>
              <div className="col-sm-3 stats-cards">
                <h6>No of Enquiries</h6>
                <h3>{enquiryStats.length}</h3>
              </div>
              <div className="col-sm-3 stats-cards">
                <h6>No of Admins</h6>
                <h3>{adminStats.length}</h3>
              </div>
            </div>
            <h5 className="mt-4">Users 🙍‍♂️</h5>
            <UserTable
              data={userStats}
              token={accessToken}
              setUsers={setUserStats}
            />
            <PropertyTable data={propertyData} token={accessToken} />
          </div>
        </>
      )}
    </div>
  );
}
