import React from 'react';
import './Auth.css';

interface Props{
    username?: string,
    password: string,
    email: string,
}

export const Auth = ({username = '', email, password }: Props) => {
    

    return (
        <h1>Welcome {email}</h1>        
    );
}

