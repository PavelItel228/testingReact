import React, { useState, useEffect } from 'react';
import { validateRegistrationForm } from '../Helpers/FormValidators';
import "../Forms.css";
import ReactIsCapsLockActive from '@matsun/reactiscapslockactive';


export const RegistrationForm = (props) => {
    
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [usernameError, setUserameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmedPasswordError, setConfirmedPasswordError] = useState('');
    const [hasErrors, setHasErrors] = useState(true);
    const [formIsBlank, setFormIsBlank] = useState(true);

    const handleChange = (handleType) => (event) => {
        const targetValue = event.target.value;

        switch(handleType) {
            case 'username':
                setUsername(targetValue);
                break;
            case 'email':
                setEmail(targetValue);
                break;
            case 'password':
                setPassword(targetValue);
                break;
            case 'confirmedPassword':
                setConfirmedPassword(targetValue);
                break;
            default:
                console.log('missed handle type');
        }
    }

    useEffect(() => {
        if (!password && !email && !confirmedPassword && !username) {
            setFormIsBlank(true);
        } else {
            setFormIsBlank(false);
        }
    }, [
        username, email, password, confirmedPassword,
    ]);

    useEffect(() => {
        if (!formIsBlank) {
            const errMsgs = validateRegistrationForm(
                password, username, email, confirmedPassword
            );

            setUserameError(errMsgs.usernameErrMsg);
            setEmailError(errMsgs.emailErrMsg);
            setPasswordError(errMsgs.passwordErrMsg);
            setConfirmedPasswordError(errMsgs.confirmedPasswordErrMsg);

            if (Object.values(errMsgs).some(err => err)) {
                setHasErrors(true);
            } else {
                setHasErrors(false);
            }
        }
    }, [
        username, email, password, confirmedPassword, formIsBlank,
    ]);

    return (
        <div id="RegistrationForm" className="Form">
            <form action="/accounts/registration" method="post">
                <h2 className="text-center">
                    Registration
                </h2>
                <div className="form-group">
                    <input 
                        name="username" 
                        id="username" 
                        type="text"
                        className={'form-control ' + ((username === "") ? "" : ((usernameError) ? "is-invalid" : "is-valid"))}
                        placeholder="username"
                        required="required"
                        value={username}
                        onChange={handleChange('username')}>
                    </input>
                    <span className="error">{!formIsBlank && usernameError}</span>
                </div>
                <div className="form-group">
                    <input 
                        name="email" 
                        id="email" 
                        type="email"
                        className={'form-control ' + ((email === "") ? "" : ((emailError) ? "is-invalid" : "is-valid"))}
                        placeholder="email"
                        required="required"
                        value={email}
                        onChange={handleChange('email')}>
                    </input>
                    <span className="error">{!formIsBlank && emailError}</span>
                </div>
                <div className="form-group">
                    <input 
                        type="password" 
                        name="password" 
                        id="password"
                        className={'form-control ' + ((password === "") ? "" : ((passwordError) ? "is-invalid" : "is-valid"))}
                        placeholder="password"
                        value={password}
                        onChange={handleChange('password')}
                        required="required">
                    </input>
                    <span className="error">{!formIsBlank && passwordError}</span>
                </div>
                <div className="form-group">
                    <input 
                        type="password" 
                        name="confirmedPassword" 
                        id="confirmedPassword"
                        className={'form-control ' + ((confirmedPassword === "") ? "" : ((confirmedPasswordError) ? "is-invalid" : "is-valid"))}
                        placeholder="confirmedPassword"
                        value={confirmedPassword}
                        onChange={handleChange('confirmedPassword')}
                        required="required">
                    </input>
                    <span className="error">{!formIsBlank && confirmedPasswordError}</span>
                </div>
                <div className="form-group">
                    <ReactIsCapsLockActive>
                        {active => !formIsBlank && active && <span className="error">note: Capslock is active </span>}
                    </ReactIsCapsLockActive>
                </div>
                <div className="form-group">
                    <button 
                        type="submit" 
                        className="btn btn-primary btn-block" 
                        disabled={hasErrors}
                    >
                        Sing up
                    </button>
                </div>
            </form>
            <p className="text-center">
                <a href="/accounts/login">
                    i already have an account
                </a>
            </p>
            <ul id="lang">
                <li><a className="underlineHover" href="?lang=en">EN</a></li>
                <li><a className="underlineHover" href="?lang=ua">UA</a></li>
            </ul>
        </div>
    );
}