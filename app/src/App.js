import  { useEffect, useState} from 'react';
import jwt_decode from "jwt-decode";
import './App.css';


function App() {
  const [ user, setUser ] = useState({});

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject)
    setUser(userObject);
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large"}
    );
    
  }, []);
  //if we have no user show login button
  //if we have a user show log out button 
  return (
    <div className="App">
      <div id= "signInDiv"></div>
      { user &&
        <div>
          <img src={user.picture} alt="user profile" />
          <h1> Welcome {user.name} </h1>
          <h2> Email: {user.email} </h2>
          <h2> User ID: {user.sub} </h2>
        </div>
      }
    </div>
  );
}

export default App;