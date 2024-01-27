import { Link } from "react-router-dom";
import PropertyModal from "./PropertyModal";

export default function PropertyTable({ data }) {
  const openModal = () => {
    const modal = new window.bootstrap.Modal(
      document.getElementById("propertyModal")
    );
    modal.show();
  };

  const handleClick = (id) => {
    console.log("Clicked id: ", id);
  };
  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h5 className="mt-4">Properties 🏢</h5>
        <button
          type="button"
          className="btn properties-add"
          onClick={openModal}
        >
          +
        </button>
      </div>
      <table className="table table-striped table-hover mt-4 custom-table table-bordered">
        <thead>
          <tr>
            <th scope="col">Property Id</th>
            <th scope="col">Property Type</th>
            <th scope="col">Property Title</th>
            <th scope="col">Property Location</th>
            <th scope="col">Property Price</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((property) => (
            <tr key={property.id}>
              <td>{property.id}</td>
              <td>{property.property_type}</td>
              <td>{property.title}</td>
              <td>{property.location}</td>
              <td>{property.price}</td>
              <td>
                <Link onClick={() => handleClick(property.id)}>Delete</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <PropertyModal />
    </>
  );
}
