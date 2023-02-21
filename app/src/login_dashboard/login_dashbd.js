//import logo from './logo.svg';
import '../login_dashboard.css';
import  { useEffect, useState} from 'react';
import jwt_decode from "jwt-decode";
import config from '../config.json';


function LoginDashboard() {
  const [ user, setUser ] = useState({});

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject)
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
    document.getElementById("profile").hidden = true;
  }



  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: config['client-id'],
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large"}
    );
    
    google.accounts.id.prompt();
  }, []);
  //if we have no user show login button
  //if we have a user show log out button
return (
    <div className="App">
    { Object.keys(user).length !== 0 &&
        <div id='profile'>
        <img src={user.picture} alt="user profile" />
        <h1> Welcome {user.name} </h1>
        <h2> Email: {user.email} </h2>
        <h2> User ID: {user.sub} </h2>
    </div>
    }
    </div>
);
}

export default LoginDashboard;