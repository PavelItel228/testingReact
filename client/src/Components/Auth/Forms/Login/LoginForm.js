import React, { useState, useEffect } from 'react';
import { validateLoginForm } from '../Helpers/FormValidators';
import "../Forms.css";
import axios from 'axios';
import qs from 'qs';
import ReactIsCapsLockActive from '@matsun/reactiscapslockactive';


export const LoginForm = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState('');
    const handleChange = (emailOrPassword) => (event) => {
        event.preventDefault();
        const targetValue = event.target.value;

        if (emailOrPassword === 'email') {
            setEmail(targetValue);
        } else {
            setPassword(targetValue);
        }
    }
    const handleSubmit = (event) => {
        event.preventDefault();

        const data = qs.stringify({
            'grant_type': 'password',
            'username': email,
            password,
        });

        const config = {
            method: 'post',
            url: 'http://localhost:4321/auth/oauth/token',
            headers: {
                'Authorization': 'Basic c2VydmVyOnNlY3JldA==',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data,
        };

        axios(config)
            .then(res => {
                console.log(JSON.stringify(res.data));
                const token = res.data.access_token;
                localStorage.setItem("token", token)
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        if (email) {
            const errMsgs = validateLoginForm(email);

            setEmailError(errMsgs.emailErrMsg);
        }
    }, [email])

    return (
        <div id="LoginForm" className="Form">
            <form onSubmit={handleSubmit} method="post">
                <h2 className="text-center">
                    Login
                </h2>
                <div className="form-group">
                    <input 
                        name="email" 
                        id="email" 
                        type="email" 
                        className="form-control"
                        placeholder="email"
                        required="required"
                        value={email}
                        onChange={handleChange('email')}
                    />
                    {email && (
                        <div className="error">
                            <span >{emailError}</span>
                        </div>
                        )
                    }
                </div>
                <div className="form-group">
                    <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        className="form-control"
                        placeholder="password"
                        required="required"
                        value={password}
                        onChange={handleChange('password')}
                    />
                </div>
                <div className="form-group">
                    <ReactIsCapsLockActive>
                        {active => (password || email) && active && <span className="capslock">note: Capslock is active </span>}
                    </ReactIsCapsLockActive>
                </div>
                <div className="form-group">
                    <button 
                        type="submit" 
                        className="btn btn-primary btn-block"
                    >
                        Sing In
                    </button>
                </div>
                <div className="clearfix">
                    <label className="pull-left checkbox-inline">
                        <input 
                            type="checkbox" 
                            name="remember-me" 
                            value={"remember me"}
                        />
                    </label>
                    <a href="#" className="pull-right">
                        forgot password
                    </a>
                </div>
                {/*<div style="display: flex; align-items: center; justify-content: center">*/}
                {/*    <p className="error" th:if="${param.error}"*/}
                {/*       th:text="#{string.login.invalid.username.password}"></p>*/}
                {/*    <p id="logout" className="FadeIn fifth" th:if="${param.logout}"*/}
                {/*       th:text="#{string.login.user.been.logged.out}"></p>*/}
                {/*</div>*/}
            </form>
            <p className="text-center">
                <a href="/accounts/registration"> 
                    create an account 
                </a>
            </p>
            {/*<ul style="display: flex; align-items: center; justify-content: center" id="lang">*/}
            {/*    <li><a className="underlineHover" href="?lang=en"></a></li>*/}
            {/*    <li><a className="underlineHover" href="?lang=ua" th:text="UA"></a></li>*/}
            {/*</ul>*/}
        </div>
    );
}