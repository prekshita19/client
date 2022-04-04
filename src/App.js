import './App.css';
import GoogleLogin from 'react-google-login'
import { useState } from 'react';

function App() {

  const [loginData, setLoginData]=useState(
    localStorage.getItem('loginData')?
    JSON.parse(localStorage.getItem('loginData'))
    :null
  )

  const handleFailure=(res)=>{
    
  }
  const handleLogin = async (googleData) =>{
    const res = await fetch('531030834903-ft8mt8n69afpkbioqhusihh3erm8auv1.apps.googleusercontent.com',{
      method:'POST',
      body: JSON.stringify({
        token: googleData.tokenId,
      }),
      headers:{
        'Content-Type':'application/json',
      },
    });
    const data = await res.json()
    console.log(data)
    setLoginData(data)
    localStorage.setItem('loginData',JSON.stringify(data))
  }
  const handleLogout =()=>{
    localStorage.removeItem('loginData')
    setLoginData(null)
  }
  return (
  <div className='App'>
    <header className="App-header">
      <h1>React Google Login App</h1>  
      <div >
        {
          loginData ? (
            <div>
              <h3>You Logged in as {loginData.email}</h3>
              <button className='button-login' onClick={handleLogout}>Logout</button>
            </div>
          ):
      (< div className="g-signin2">   
            <GoogleLogin
        clientId={'531030834903-ft8mt8n69afpkbioqhusihh3erm8auv1.apps.googleusercontent.com'}
        buttonText="Log in with Google"
        onSuccess={handleLogin}
        onFailure={handleFailure}
        cookiePolicy={'single_host_origin'}
        >
          
        </GoogleLogin>
          </div>)
        }
        
      </div>
    </header>
  </div>
  );
}

export default App;
