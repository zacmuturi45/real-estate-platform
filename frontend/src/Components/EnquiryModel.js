import { useContext, useState } from "react";
import { PropertyContext } from "../Contexts/PropertyContext";

export default function EnquiryModel({ property_id }) {
  const { user, accessToken, userid } = useContext(PropertyContext);

  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(message);
    fetch("/enquiries", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userid,
        property_id: property_id,
        message: message,
      }),
    })
    .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then(() => {
        alert("Message added successfully");
        console.log("Message added successfully");
        setMessage("")
      })
      .catch((error) => {
        console.error("Error adding Message:", error.message);
      });
  };

  return (
    <>
      <div
        className="modal fade"
        id="enquiryModel"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modal-heading">
                New message
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="col-form-label">User:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="user_name"
                    placeholder={user}
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Message:</label>
                  <textarea
                    className="form-control"
                    id="message-text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary custom-close-btn"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary custom-submit-btn"
                  >
                    Send message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
