import { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
function Data() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/getUsers", { method: "GET" })
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        setUsers(data);
      })
      .catch(error => {
        setError(error);
      });
  }, []);

  return (
    <div>
	<Header />
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <div key={user.id}>
			<p>First name: {user.firstName}</p> 
			<p>Last name: {user.lastName}</p>
			<p>Email: {user.email}</p>
			<p>Account type: {user.accountType}</p>
		  </div>
        ))}
      </ul>
      {error && <div>Error: {error.message}</div>}
	  <Footer />
    </div>
  );
}

export default Data;

