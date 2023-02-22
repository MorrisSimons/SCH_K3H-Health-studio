import  { useEffect, useState} from 'react';
import jwt_decode from "jwt-decode";
import config from '../config.json';


function App() {
  const [ user, setUser ] = useState({});

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject)
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
    document.getElementById("profile").hidden = true;
  }

function handleSignOut(event) {
  setUser({});
  document.getElementById("signInDiv").hidden = false;
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
      <div id= "signInDiv"></div>
      { Object.keys(user).length !== 0 &&
        <button onClick= {(e) => handleSignOut(e)}>Sign Out</button>
        
      }

    </div>
  );
}

export default App;