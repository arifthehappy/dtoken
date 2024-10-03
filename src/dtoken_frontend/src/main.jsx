import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { AuthClient } from '@dfinity/auth-client';
import './index.scss';

const init = async () => {
const authClient = await AuthClient.create();

const isAuthenticated = await authClient.isAuthenticated();
console.log(isAuthenticated);
if (isAuthenticated){
  await handleAuthenticated(authClient);
} else{
  
    await authClient.login({
      identityProvider: 'https://identity.ic0.app/#authorize',
      onSuccess: () => {
        handleAuthenticated(authClient);  
      },
    });
  }
};

async function handleAuthenticated(authClient) {
  const identity = await authClient.getIdentity();
  const userPrincipal = await identity._principal.toString();
  console.log(userPrincipal);
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App loggedInPrincipal={userPrincipal}/>
    </React.StrictMode>
  )
} 

init();

