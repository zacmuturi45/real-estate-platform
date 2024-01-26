import { useContext, useState ,useEffect} from "react";
import Navbar from "../Components/Navbar";
import { PropertyContext } from "../Contexts/PropertyContext";
import AuthGuard from "../Components/AuthGuard";

export default function AdminPage() {
  const { user, isAdmin, propertyData, accessToken } = useContext(PropertyContext);

  // state

  const [userStats, setUserStats] = useState({});
  const [adminStats, setAdminStats] = useState({});

  useEffect(() => {
    if (accessToken) {
      fetch("/users", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
        .then((res) => res.json())
        .then((data) => {
            setUserStats(data)
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
            setAdminStats(data)
        });
    } else {
    }
  }, [accessToken]);
  

  return (
    <div>
      {!user ? (
        <>
          <AuthGuard />
        </>
      ) : (
        <>
          <Navbar />
          <div className="container-lgs mt-4 dashboard">
            <h5>Dashboard 🖥</h5>
            <div className="row mt-4 gx-2">
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
                <h3>11</h3>
              </div>
              <div className="col-sm-3 stats-cards">
                <h6>No of Admins</h6>
                <h3>{adminStats.length}</h3>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
