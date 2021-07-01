import React from 'react';
import './Login.css';
import './Auth.css';
import {Signup} from './Signup'
import {Auth} from './Auth'
import {PassReset} from './PassReset'

interface Props{
    username?: string;
    email: string;
    password: string;
}

export type loginRequest = {
    username: string;
    email: string;
    password: string;
}

export const Login = ({username, email, password }: Props) => {
    const [cred, setCred] = React.useState({username, email, password});
    const [isLoggedIn, setIsLoggedIn] = React.useState(Boolean)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        console.log(e.currentTarget.id);
        // setCred({email: (e.currentTarget[0] as HTMLInputElement).value, password: (e.currentTarget[1] as HTMLInputElement).value, username: ''});
        sendRequest({email: (e.currentTarget[0] as HTMLInputElement).value, password: (e.currentTarget[1] as HTMLInputElement).value, username: ''});                
        e.preventDefault();
    }

    const handleSignupClick = (e: React.MouseEvent<HTMLHeadingElement>) => {
        (document.getElementById('login_body') as HTMLDivElement).className = "show";
        (document.getElementById('login_form') as HTMLFormElement).className = 'hide';
        (document.getElementById('signin') as HTMLHeadingElement).className = "inactive underlineHover";
        (document.getElementById('signup_form') as HTMLFormElement).className = "show";
        (document.getElementById('pass_reset') as HTMLDivElement).className = "hide";
        e.currentTarget.className = "active";
    }

    const handleSigninClick = (e: React.MouseEvent<HTMLHeadingElement>) => {
        (document.getElementById('login_body') as HTMLDivElement).className = "show";
        (document.getElementById('signup_form') as HTMLFormElement).className = "hide";
        (document.getElementById('login_form') as HTMLFormElement).className = 'show';
        (document.getElementById('signup') as HTMLHeadingElement).className = "inactive underlineHover";
        (document.getElementById('pass_reset') as HTMLDivElement).className = "hide";
        e.currentTarget.className = "active";
    }

    const handlePassResetClick = (e: React.MouseEvent<HTMLHyperlinkElementUtils>) => {
        (document.getElementById('login_body') as HTMLDivElement).className = "hide";
        (document.getElementById('pass_reset') as HTMLDivElement).className = "show";
        (document.getElementById('signin') as HTMLHeadingElement).className = "inactive underlineHover";
        (document.getElementById('signup') as HTMLHeadingElement).className = "inactive underlineHover";
    }

    

    const sendRequest = async (args: loginRequest) => {
        console.log(args.email);

        var url = `http://localhost:4010/api?username=${args.username}&email=${args.email}&password=${args.password}`;
        console.log(url);
            
        fetch(url)
        .then(res => res.json())
        .then(
            (result) => {         
            console.log(result);
            if (result){
                setIsLoggedIn(true);
            }
            });
        }            

    return (
    <div className="centered">
        {isLoggedIn && <Auth email={cred.email} password={cred.password}/>}
        <div className="wrapper fadeInDown">
            <div id="formContent">
                    <h2 id="signin" className="active" onClick={handleSigninClick}> Sign In </h2>
                    <h2 id="signup" className="inactive underlineHover" onClick={handleSignupClick}> Sign Up </h2>

                <div id="login_body">

                    <div className="fadeIn first">
                    </div>

                    <form id="login_form" onSubmit={handleSubmit}>
                    <input type="text" id="login" className="fadeIn second" name="email" placeholder="Email" required/>
                    <input type="password" id="password" className="fadeIn third" name="password" placeholder="Password"  required/>
                    <input type="submit" className="fadeIn fourth" value="Log In"/>
                    </form>            

                    <Signup/>
                </div>
                <div id="pass_reset" className="hide">
                    <PassReset email={cred.email || ''} password=""/>
                </div>

                <div id="formFooter">
                <a className="underlineHover" href="#" onClick={handlePassResetClick}>Reset Password?</a>
                </div>

            </div>
            
        </div>
    </div>

    
    );
}

