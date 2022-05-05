import React from 'react'
import RegistrationForm from './RegistrationForm'
import LoginForm from './LoginForm'
import { useEffect } from 'react'


const SignIn = () => {

    useEffect(() => {
        document.title = "NutritarianEats - SignIn"
    }, []);

    return (
        <div className="container">
            <div className="container-xxl px-md-5 bg-white p-4">
                <div className="row">
                    <div className="col">
                        <h1 className="mb-5">Sign in below </h1>
                        <RegistrationForm />
                    </div>

                    <div className="col">
                        <h1 className="mb-5">Already Registered? </h1>
                        <LoginForm />
                    </div>
                </div>
                <footer className="py-5">
                    Build by Jen E.
                </footer>
            </div>
        </div>
    )
}

export default SignIn;