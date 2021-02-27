import { useEffect, useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import '../css/signup.css';
import { useMutation, useQuery } from '@apollo/client';
import { sendOtpMutation, verifyMutation } from '../queries/mutations';
import { loadUserQuery } from '../queries/queries';
import { userInfo } from '../config/cache';

var clock;

function Signup(props){
    const [number, setNumber] = useState(localStorage.getItem('number') || '');
    const [session, setSession] = useState(localStorage.getItem('session') || '');
    const [password, setPassword] = useState('');
    const [otp, setOtp] =  useState('');
    const [name, setName] =  useState('');
    const [email, setEmail] =  useState('');

    const { loading, error, data } = useQuery(loadUserQuery);
    const [sendOtp, { loading: sendOtpLoading, error: sendOtpError, data: sendOtpData }] = useMutation(sendOtpMutation);
    const [verify, { loading: verifyLoading, error: verifyError, data: verifyData }] = useMutation(verifyMutation);


    const [watch, setWatch] = useState('');

    const history = useHistory();
    const [visibleA, setVisibleA] = useState(false);
    const [visibleB, setVisibleB] = useState(false);


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


    const setCounter = v => {
        if(v && !localStorage.getItem('time')) return;

        let time;

        if(v) {
            time = localStorage.getItem('time');
        } else {
            time = new Date().getTime() + 1000 * 60;
            localStorage.setItem('time', time);
        } 

        clock = setInterval(() => {

            // Get today's date and time
            let now = new Date().getTime();

            // If the count down is finished, write some text
            if (time - now < 0) {
                clearInterval(clock);
                setWatch('');
                return;
            }          

            let seconds =  Math.floor((time - now) / 1000);
          
            // Display the result in the element with id="demo"

            setWatch(`${seconds}`);
           
        }, 1000);
    };

    useEffect(() => {

        setVisibleA(false);
        setVisibleB(false);
        
    }, [props]);

    useEffect(() => {

        setCounter(true);

        return () => {
            clearInterval(clock);
        }
        
    }, []);


    if(loading || error) return <div className="lds-circle"><div></div></div>;

    if(data.userInfo === "start") return <div className="lds-circle"><div></div></div>;    // Login status loading

    if(data.userInfo !== null) { // Logged in 
        return transition();
    }    


    if(!visibleA && sendOtpLoading) setVisibleA(true);

    if(!visibleB && verifyLoading) setVisibleB(true);  
        

    const handleSubmit = e => {
        e.preventDefault();

        if(!session){
            alert('Please generate an OTP first.');
            return;
        }

        verify({
            variables: {
                session,
                otp,
                password,
                name,
                email: email.toLowerCase(),
                old: !props.lana
            }
        }).then(({data}) => {

            userInfo(data.verify);   

        }).catch(()=>{

        });
    };

    const callMe = e => {
        e.preventDefault();
        localStorage.setItem("number", number);

        sendOtp({
            variables: {
                number,
                old: !props.lana
            }
        }).then(({data}) => {

            if(data.sendOtp.value){

                localStorage.setItem("session", data.sendOtp.message);
                setSession(data.sendOtp.message);

                setCounter();
            }
        }).catch(()=>{

        });

    };

    const move = () => {

        if(verifyLoading || sendOtpLoading) return;

        history.push('/signup' + window.location.search);
    };


    return(
        <main className="main_signup">
            <h2 className="heading_hello">
                {props.lana? 'Create your Account' : 'Reactivate your Account'}
            </h2>

            <div className="body_signup body_signup1">
                <form className="form_signup form_signup1" onSubmit={callMe}>
                    <label className="label_signup" htmlFor="phone">Phone no.</label>
                    <input required value={number} onChange={e => setNumber(e.target.value)} inputMode="tel" pattern=".{10}" className="input_signup" name="phone" type="tel" placeholder="10 digit Indian mobile no." />

                    <input disabled={watch} className="button_signup button_signup_gen" type="submit" value="Generate OTP" />
                </form>
                
                {watch && <div className="message_signup">Resend in {watch}s</div>}

                {!watch && sendOtpLoading && <div className="message_signup">Please wait...</div>}
                {visibleA && !watch && sendOtpError && <div className="message_signup message_signup_error">{sendOtpError.message}</div>}
                {visibleA && !watch && sendOtpData && !sendOtpData.sendOtp.value && <div className="message_signup message_signup_error">{sendOtpData.sendOtp.message}</div>}
           
            </div>

            <div className="body_signup body_signup2">
                <form className="form_signup form_signup2" onSubmit={handleSubmit}>
                    <label className="label_signup" htmlFor="otp">Enter your OTP</label>
                    <input required value={otp} onChange={e => setOtp(e.target.value)} className="input_signup" name="otp" type="text" inputMode="numeric" placeholder="Enter your one time password" />

                    {props.lana &&
                        <label className="label_signup" htmlFor="name">Name</label>
                    }
                    {props.lana &&
                        <input required value={name} onChange={e => setName(e.target.value)} className="input_signup" name="name" type="text" inputMode="text" placeholder='Enter your name' />
                    }

                    {props.lana &&
                        <label className="label_signup" htmlFor="email">Email</label>
                    }
                    {props.lana &&
                        <input required value={email} onChange={e => setEmail(e.target.value)} className="input_signup" name="email" type="email" inputMode="email" placeholder='Enter your email address' />
                    }


                    <label className="label_signup" htmlFor="password">Create a {!props.lana && 'new'} password</label>
                    <input required value={password} onChange={e => setPassword(e.target.value)} inputMode="text" minLength="8" className="input_signup" name="password" type="password" placeholder={props.lana? "Password" : "New Password"} />

                    <input className="button_signup" type="submit" value="Sign up" />
                </form>
                
                {verifyLoading && <div className="message_signup">Please wait...</div>}
                {visibleB && verifyError && <div className="message_signup message_signup_error">{verifyError.message}</div>}
                {visibleB && verifyData && !verifyData.verify && <div className="message_signup message_signup_error">Incorrect OTP or session expired</div>}
            </div>

            {props.lana && <Link className="redirect_signup" to={'/' + window.location.search}>Already created your account? Sign in</Link>}
            {!props.lana && <div className="redirect_signup" onClick={move}>First time here? Create your account</div>}
        </main>
    );
}

export default Signup;