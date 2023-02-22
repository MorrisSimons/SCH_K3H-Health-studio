import React from "react";
import { useState } from "react";



function LoginDashboard() {
  const [user, setUser] = useState({});
  var userObject = JSON.parse(localStorage.getItem('user'));
    setUser(userObject);

  function handleSignOut(event) {
    setUser({});
    document.getElementById('signInDiv').hidden = false;

    // Clear the JWT token from local storage
    localStorage.removeItem('jwt');
  }

  return (
    <div>
      <h1>LoginDashboard us</h1>
      <p>{user.name}</p>
      <p>{user.email}</p>
        <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
      {/* ... */}
    </div>
  );
}

export default LoginDashboard;
