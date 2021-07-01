import React from 'react';
import './Login.css';

interface Props{
    email: string
    password: string
}

export const PassReset = (props: Props) => {
    const [state, setState] = React.useState(props)


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        console.log(e);
        setState({email: (document.getElementById('reset_email') as HTMLInputElement).value, password: (document.getElementById('reset_password') as HTMLInputElement).value})
        sendRequest().then(res => {
            console.log(res);
        });
                              
        e.preventDefault();
    }
    
    const sendRequest = async () => {
        console.log(props.email);

        var url = `http://localhost:4010/api/reset?username=&email=${state.email}&password=${state.password}`;
        console.log(url);
            
        fetch(url)
        .then(res => res.json())
        .then(
            (result) => {         
            console.log(result)                
            });
        }

    return (
        <form onSubmit={handleSubmit}>
        <input type="text" id="reset_email" className="fadeIn first" name="email" placeholder="Email" defaultValue={props.email} required/>
        <input type="password" id="reset_password" className="fadeIn second" name="reset_password" placeholder="New Password" required/>
        <input type="submit" className="fadeIn fourth" value="Reset"/>
        </form>
    );
}

