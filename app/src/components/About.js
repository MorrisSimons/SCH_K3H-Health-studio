import React from "react";

function About() {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <div>
      <h1>About us</h1>
      <p>{user.name}</p>
      <p>{user.email}</p>
      {/* ... */}
    </div>
  );
}

export default About;
