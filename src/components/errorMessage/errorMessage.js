import React from 'react';
import img from '../../img/error.jpg';
import './errorMessage.css'

const ErrorMessage = () => {
    return (
        <>
            <img className="random-block" src={img} alt="error"></img>
            <span>Something goes wrong</span>
        </>
    )
}

export default ErrorMessage;