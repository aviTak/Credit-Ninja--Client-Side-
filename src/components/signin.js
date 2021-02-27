import { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../css/signin.css';
import { useMutation, useQuery } from '@apollo/client';
import { loginMutation } from '../queries/mutations';
import { loadUserQuery } from '../queries/queries';
import { userInfo } from '../config/cache';

function Signin(){
    const [number, setNumber] = useState('');
    const [password, setPassword] = useState('');
    

    const transition = () => {
        const params = new URLSearchParams(window.location.search);
        let page, value;

        localStorage.removeItem('session');
        localStorage.removeItem('number');
        localStorage.removeItem('time');
      
        page = params.get("page");
        value = params.get("value");

        if(!page) return <Redirect to='/search' />; // Default i.e. home page

        if(!value) return <Redirect to={`/${page}`} />; // Specific page

        return <Redirect to={`/${page}/${value}`} />; // Special search result of a particular page
        
    };


    const { loading, error, data } = useQuery(loadUserQuery);
    const [login, { loading: mutationLoading, error: mutationError, data: mutationData }] = useMutation(loginMutation);

    if(loading || error) return <div className="lds-circle"><div></div></div>;

    if(data.userInfo === "start") return <div className="lds-circle"><div></div></div>    // Login status loading

    if(data.userInfo !== null) { // Logged in 
        return transition();
    }    


    const handleSubmit = e => {
        e.preventDefault();

        login(
            {
                variables: {
                    number,
                    password
                }
                
        }).then(({data}) => {

            userInfo(data.login);      

        });
    };
    

    return(
        <main className="main_signin">
            <h2 className="heading_welcome">
                Gateway to Best Personal Loan deals for your Clients
            </h2>

            <div className="body_signin">
                <form className="form_signin" onSubmit={handleSubmit}>
                    <label className="label_signin" htmlFor="phone">Phone no.</label>
                    <input required value={number} onChange={e => setNumber(e.target.value)} inputMode="tel" pattern=".{10}" className="input_signin" name="phone" type="tel" placeholder="10 digit Indian mobile no." />

                    <label className="label_signin" htmlFor="password">Password</label>
                    <input required value={password} onChange={e => setPassword(e.target.value)} inputMode="text" className="input_signin" name="password" type="password" placeholder="Password" />
                
                    <Link className="forgot" to={'/forgot' + window.location.search}>Forgot your password?</Link>
                    <input className="button_signin" type="submit" value="Sign in" />

                </form>
                
                {mutationLoading && <div className="message_signin">Please wait...</div>}
                {mutationError && <div className="message_signin message_signin_error">Something went wrong.</div>}
                {mutationData && !mutationData.login && <div className="message_signin message_signin_error">Credentials do not match</div>}
            </div>

            <Link className="redirect_signin" to={'/signup' + window.location.search}>First time here? Create your account</Link>
        </main>
    );
}

export default Signin;