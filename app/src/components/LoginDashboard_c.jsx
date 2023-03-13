import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./LoginDashboard_c.css";
import { Link } from "react-router-dom";

function LoginDashboard() {
  function handleSignOut() {
    localStorage.removeItem("user");
    window.location.reload();
  }

  const user = JSON.parse(localStorage.getItem("user"));
  console.log("user: " + user);

  const data = [
    {
      id: 1,
      status: "active",
      name: "Joe Doe",
      navigation: "/joe_doe_coach1",
    },
    {
      id: 2,
      status: "inactive",
      name: "John Smith",
      navigation: "/john_smith_coach2",
    },
    {
      id: 3,
      status: "active",
      name: "Emma Johnson",
      navigation: "/emma_johnson_coach2",
    },
    {
      id: 4,
      status: "inactive",
      name: "Michael Brown",
      navigation: "/michael_brown_coach2",
    },
    {
      id: 5,
      status: "pending",
      name: "Sarah Lee",
      navigation: "/sarah_lee_coach2",
    },
    {
      id: 6,
      status: "pending",
      name: "David Garcia",
      navigation: "/david_garcia_coach2",
    },
    {
      id: 7,
      status: "active",
      name: "Emily Davis",
      navigation: "/emily_davis_coach2",
    },
  ];

  return (
    <section className="dashboard__section_admin">

    <Header />
        <h1>LoginDashboard</h1>

    <div className="panel-container">
        <div className="search-bar">
        <input type="text" placeholder="Search..." />
        <button>Search</button>
    </div>

    <Link to="/se_data"><button>Se data</button></Link>
    <Link to="/analys"><button>analys</button></Link>
    <Link to="/add_user"><button>Lägg till spelare</button></Link>
    <button onClick={handleSignOut}>Logga ut</button>

    </div>

        

        <div className="container dashboard__container">
          {data.map(({ id, status, name, navigation }) => {
            return (
              <Link key={id} to={navigation}>
                <button className={`dashboard__article dashboard__article--${status}`}>
                  <h2>{name}</h2>
                </button>
              </Link>
            );
          })}
        </div>
        <h1>Admin</h1>
        <p>{user?.name}</p>
        <p>{user?.email}</p>
        <button onClick={handleSignOut}>Sign Out</button>
        
        <Footer />
    </section>
  );
}

export default LoginDashboard;
