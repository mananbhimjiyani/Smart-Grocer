import React from "react";
import {signInWithGoogle} from './firebase';

export default function SignInPage() {
    return (
        <div className={"App"}>
            <div className="background-container">
                <div className={'overlay'}>
                    <div className="container">
                        <h1>Smart Grocer AI</h1>
                        <p>Sign in to continue</p>
                        <button onClick={signInWithGoogle}>
        <span className="google-icon">
            <i className="fab fa-google"></i>
        </span>
                            Sign in With Google
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
