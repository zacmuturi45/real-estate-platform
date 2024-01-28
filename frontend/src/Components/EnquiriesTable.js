import React, { useEffect, useState } from "react";

export default function EnquiriesTable({ token }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (token) {
      fetch("/enquiries", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          console.log(data);
        });
    }
  }, [token]);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h5 className="mt-4">Enquiries 🗳</h5>
      </div>
      <div
        style={{
          height: "650px",
          overflow: "auto",
          position: "relative",
          display: "block",
        }}
      >
        <table className="table table-striped table-hover mt-4 custom-table table-bordered">
          <thead>
            <tr>
              <th scope="col">Enquired By</th>
              <th scope="col">Contact</th>
              <th scope="col">Enquired On (Property Name)</th>
              <th scope="col">Enquiry Message</th>
            </tr>
          </thead>
          <tbody>
            {data.map((enquiry) => (
              <tr key={enquiry.id}>
                <td>{enquiry.user.username}</td>
                <td>{enquiry.user.email}</td>
                <td>{enquiry.property.title}</td>
                <td>{enquiry.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
