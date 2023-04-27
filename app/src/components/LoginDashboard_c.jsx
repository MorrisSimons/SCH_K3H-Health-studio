import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./LoginDashboard_c.css";
import { Link } from "react-router-dom";
const API_PATH = process.env.REACT_APP_API_PATH;

function LoginDashboard() {
  const user = JSON.parse(localStorage.getItem("user"))
  const [data, setData] = useState([]);

  function handleSignOut() {
    localStorage.removeItem("user");
    window.location.reload();
  }

  console.log("user: " + user);
  useEffect(() => {
    (async () => {
			await getTeam()
		  })();
  }, []);

  async function getTeam() {
    fetch(API_PATH +"api/getTeam", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: user.email,
        }),
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        getTeamMembers(data.name);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function getTeamMembers(team) {
    fetch(API_PATH +"api/getTeamStatus", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        teamName: team,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(team)
        console.log("Team members:")
        setData(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
    <Link to="/data"><button className="coach_panel_btn">Se data</button></Link>
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
