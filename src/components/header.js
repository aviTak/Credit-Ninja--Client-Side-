import { useEffect } from 'react';
import '../css/header.css';
import { useQuery, useMutation } from '@apollo/client';
import { loadUserQuery } from '../queries/queries';
import { logoutMutation } from '../queries/mutations';

const file = '<svg height="2.4rem" x="0px" y="0px" viewBox="0 0 320.002 320.002" style="fill: #f2dbe2; enable-background:new 0 0 320.002 320.002;" xml:space="preserve"><g id="XMLID_6_"><path id="XMLID_7_" d="M51.213,175.001h173.785c8.284,0,15-6.716,15-15c0-8.284-6.716-15-15-15H51.213l19.394-19.394c5.858-5.858,5.858-15.355,0-21.213c-5.857-5.858-15.355-5.858-21.213,0L4.396,149.393c-0.351,0.351-0.683,0.719-0.997,1.103c-0.137,0.167-0.256,0.344-0.385,0.515c-0.165,0.22-0.335,0.435-0.488,0.664c-0.14,0.209-0.261,0.426-0.389,0.64c-0.123,0.206-0.252,0.407-0.365,0.619c-0.118,0.22-0.217,0.446-0.323,0.67c-0.104,0.219-0.213,0.435-0.306,0.659c-0.09,0.219-0.164,0.442-0.243,0.664c-0.087,0.24-0.179,0.477-0.253,0.722c-0.067,0.222-0.116,0.447-0.172,0.672c-0.063,0.249-0.133,0.497-0.183,0.751c-0.051,0.259-0.082,0.521-0.119,0.782c-0.032,0.223-0.075,0.443-0.097,0.669c-0.048,0.484-0.073,0.971-0.074,1.457c0,0.007-0.001,0.015-0.001,0.022c0,0.007,0.001,0.015,0.001,0.022c0.001,0.487,0.026,0.973,0.074,1.458c0.022,0.223,0.064,0.44,0.095,0.661c0.038,0.264,0.069,0.528,0.121,0.79c0.05,0.252,0.119,0.496,0.182,0.743c0.057,0.227,0.107,0.456,0.175,0.681c0.073,0.241,0.164,0.474,0.248,0.71c0.081,0.226,0.155,0.453,0.247,0.675c0.091,0.22,0.198,0.431,0.3,0.646c0.108,0.229,0.21,0.46,0.33,0.685c0.11,0.205,0.235,0.4,0.354,0.599c0.131,0.221,0.256,0.444,0.4,0.659c0.146,0.219,0.309,0.424,0.466,0.635c0.136,0.181,0.262,0.368,0.407,0.544c0.299,0.364,0.616,0.713,0.947,1.048c0.016,0.016,0.029,0.034,0.045,0.05l45,45.001c2.93,2.929,6.768,4.394,10.607,4.394c3.838-0.001,7.678-1.465,10.606-4.393c5.858-5.858,5.858-15.355,0.001-21.213L51.213,175.001z"/><path id="XMLID_8_" d="M305.002,25h-190c-8.284,0-15,6.716-15,15v60c0,8.284,6.716,15,15,15s15-6.716,15-15V55h160v210.001h-160v-45.001c0-8.284-6.716-15-15-15s-15,6.716-15,15v60.001c0,8.284,6.716,15,15,15h190c8.284,0,15-6.716,15-15V40C320.002,31.716,313.286,25,305.002,25z"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>';

function Header(){    
    const { loading, error, data } = useQuery(loadUserQuery);
    const [logout, { loading: mutationLoading }] = useMutation(logoutMutation);

    
    useEffect(() => {
        try{
            document.getElementById('signout').innerHTML = file;
        } catch(e) {}
    });


    const work = () => {
        
        logout().then(({data}) => {

            if(data.logout.value){
                // userInfo(null);
                window.location.reload(); // So as to clear cache
            }

        });
    
    };


    const loggedOut = (
        <header className="header">
            <h1 className="main_app">
                Credit Ninja
            </h1>
        </header>
    );

    const loggedIn = (
        <header className="header">
            <h1 className="main_app">
                Credit Ninja
            </h1>

            {
                mutationLoading && 

                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>

            }

            {
                !mutationLoading && 

                <div id="signout" className="logout" onClick={work} title="Sign out">
                    
                </div>
            }

            
        </header>
    );


    if(loading || error) return loggedOut;

    if(data.userInfo === "start") return loggedOut;    // Login status loading

    if(data.userInfo !== null) return loggedIn;  // Logged in 

    // Logged out
    return loggedOut;

}

export default Header;


