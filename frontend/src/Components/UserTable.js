import { Link } from "react-router-dom";

export default function UserTable({ data }) {
  const handleDelete = (id) => {
    fetch()
  };
  return (
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
        {data.map((userData) => (
          <tr key={userData.id}>
            <th scope="row">{userData.id}</th>
            <td>{userData.username}</td>
            <td>{userData.email}</td>
            <td>{userData.isAdmin === false ? "Admin" : "Client"}</td>
            <td>
              <Link onClick={() => handleDelete(userData.id)}>Delete</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
