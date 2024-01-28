import React, { useEffect, useState } from "react";

export default function EnquiriesTable({ token }) {
  const [data, setData] = useState([]);

  const [displayedData, setDisplayedData] = useState(10);

  const loadMoreData = () => {
    setDisplayedData((prevCount) => prevCount + 10);
  };

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
          {data.slice(0, displayedData).map((enquiry) => (
            <tr key={enquiry.id}>
              <td>{enquiry.user.username}</td>
              <td>{enquiry.user.email}</td>
              <td>{enquiry.property.title}</td>
              <td>{enquiry.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {data.length > displayedData && (
        <div className="col-sm-12 text-center mt-3">
          <button className="btn btn-primary main-btn" onClick={loadMoreData}>
            Load More
          </button>
        </div>
      )}
    </>
  );
}
