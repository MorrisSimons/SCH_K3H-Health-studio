import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import config from '../config.json';
import Cookies from 'js-cookie'; // Add this line

function LoginFunction() {
  const [user, setUser] = useState({});

  function handleCallbackResponse(response) {
    console.log('Encoded JWT ID token: ' + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById('signInDiv').hidden = true;
    document.getElementById('profile').hidden = true;

    // Save the JWT token in local storage
    localStorage.setItem('jwt', response.credential);
  }

  function handleSignOut(event) {
    setUser({});
    document.getElementById('signInDiv').hidden = false;

    // Clear the JWT token from local storage
    localStorage.removeItem('jwt');
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: config['client-id'],
      callback: handleCallbackResponse,
    });
  
    google.accounts.id.renderButton(document.getElementById('signInDiv'), {
      theme: 'outline',
      size: 'large',
    });
  
    google.accounts.id.prompt();
  
    console.log(document.getElementById('signInDiv')); // Add this line
    console.log(document.getElementById('profile')); // Add this line
  
    // Check if the JWT cookie exists and decode it
    const jwtCookie = Cookies.get('jwt');
    if (jwtCookie) {
      const userObject = jwt_decode(jwtCookie);
      setUser(userObject);
    }
  }, []);
  

  return (
    <div className="LoginFunction">
      <div id="signInDiv"></div>
      {Object.keys(user).length !== 0 && (
        <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
      )}
      <p>hello</p>
    </div>
  );
}

export default LoginFunction;

