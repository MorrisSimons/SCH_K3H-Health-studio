import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import config from '../config.json';
import Cookies from 'js-cookie';

function LoginFunction() {
  const [user, setUser] = useState({});

  function handleCallbackResponse(response) {
    console.log('Encoded JWT ID token: ' + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    Cookies.set('jwt', response.credential);
    setUser(userObject);
  }

  function handleSignOut(event) {
    setUser({});
    document.getElementById('signInDiv').hidden = false;
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
  }, []);

  // Save user state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

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
