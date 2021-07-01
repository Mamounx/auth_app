import React from 'react';
import './Login.css';

interface Props{
  username?: string,
  password?: string,
  email?: string,
}

export const Signup = ({username, email, password }: Props)  => {
  const [cred, setCred] = React.useState({username, email, password});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(e.currentTarget.id);     
    setCred({email: (e.currentTarget[2] as HTMLInputElement).value, password: (e.currentTarget[1] as HTMLInputElement).value, username: (e.currentTarget[0] as HTMLInputElement).value});
    sendRequest().then(res => {
        console.log(res);
    });
    e.preventDefault();
}

const sendRequest = async () => {
  console.log(cred.email);

  var url = `http://localhost:4010/api?username=${cred.username}&email=${cred.email}&password=${cred.password}`;
  console.log(url);
      
  fetch(url)
  .then(res => res.json())
  .then(
      (result) => {         
      console.log(result)     
      });
  }
  

  return (
    <form id="signup_form" className='hide' onSubmit={handleSubmit}>
    <input type="text" id="username" className="fadeIn second" name="login" placeholder="Username" required/>
    <input type="password" id="new_password" className="fadeIn third" name="login" placeholder="Password" required/>
    <input type="text" id="new_email" className="fadeIn fourth" name="login" placeholder="Email" required/>
    <input type="submit" className="fadeIn fourth" value="Sign up"/>
    </form>
  );
}
