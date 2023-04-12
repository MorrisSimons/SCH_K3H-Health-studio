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
    <div>
       <Header />
    <div className="site__settings">
    {/* Sök bar och panel*/}
    
    <h1>Coach Dashboard</h1>
    <section className="dashboard__section_coach">  
    
   
    <div className="search-bar">
        <input className="search-input" type="text" placeholder="Sök spelare..." />
        <button className="button-search">Sök</button>
    </div>
    
    

    <div className="panel-container">
    <Link to="/se_data"><button className="coach_panel_btn">Se data</button></Link>
    <Link to="/analys"><button className="coach_panel_btn"> analys</button></Link>
    <Link to="/add_user"><button className="coach_panel_btn">Lägg till spelare</button></Link>
    <div></div>
      <button className="coach_panel_btn" onClick={handleSignOut}>Logga ut</button>
    </div>
   
    </section>


    {/*END av Sök bar och panel*/}


        <div className="container dashboard__container">
          {data.map(({ id, status, name, navigation }) => {
            return (
              <Link key={id} to={navigation}>
                <button className={`dashboard__article dashboard__article--${status}`}>
                  <h2 className="player__article">{name}</h2>
                </button>
              </Link>
            );
          })}
        </div>

        <Footer />
    
    </div>
    </div>
  );
}

export default LoginDashboard;
