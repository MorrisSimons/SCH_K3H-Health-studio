import React from "react";

function LoginDashboard() {
    function handleSignOut() {
        localStorage.removeItem('user');
        window.location.reload();
    }


  const user = JSON.parse(localStorage.getItem('user'));
  
  return (
    <div>
      <h1>LoginDashboard</h1>
      <p>{user.name}</p>
      <p>{user.email}</p>
      {/* ... */}
        <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}

export default LoginDashboard;
