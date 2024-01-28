import { Link } from "react-router-dom";
import React, { useState } from "react";

export default function UserTable({ data, token, setUsers }) {
  const [displayedData, setDisplayedData] = useState(10);

  const loadMoreData = () => {
    setDisplayedData((prevCount) => prevCount + 10);
  };

  const handleDelete = (id) => {
    fetch(`/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then(() => {
        alert("User deleted successfully");
        console.log("User deleted successfully");
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting user:", error.message);
      });
  };

  return (
    <>
      <table className="table table-striped table-hover mt-4 custom-table table-bordered">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">User Name</th>
            <th scope="col">Email</th>
            <th scope="col">User Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.slice(0, displayedData).map((userData) => (
            <tr key={userData.id}>
              <th scope="row">{userData.id}</th>
              <td>{userData.username}</td>
              <td>{userData.email}</td>
              <td>{userData.isAdmin === false ? "Client" : "Admin"}</td>
              <td>
                <Link to="#" onClick={() => handleDelete(userData.id)}>
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {data.length > displayedData && (
        <div className="col-sm-12 text-center mt-3">
          <button
            className="btn btn-primary main-btn"
            onClick={loadMoreData}
          >
            Load More
          </button>
        </div>
      )}
    </>
  );
}
