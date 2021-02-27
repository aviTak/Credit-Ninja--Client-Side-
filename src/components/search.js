import { useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../css/search.css';
import { useQuery, useLazyQuery } from '@apollo/client';
import { getCompaniesQuery, loadUserQuery } from '../queries/queries';
import Table from './table';
// import { userInfo } from '../config/cache';

const TYPING_TIMER_LENGTH = 400;
var timeout, input;

function Search(props){
    var mouse = false;

    const transition = () => {
        if(Object.keys(props.match.params).length === 0) {               
            return <Redirect to={`/?page=search`} />;     
        } 
        
        return <Redirect to={`/?page=search&value=${props.match.params.id}`} />;
    };

    useEffect(() => {

        return () => {
            clearTimeout(timeout);
        };

    }, []);


    useEffect(() => {

        try{
            document.getElementById('searchy').blur();
        } catch(e) {}

    }, [props]);


    const { loading, error, data } = useQuery(loadUserQuery);

    const [automatic, { loading: loadingResult, error: errorResult, data: result }]  = useLazyQuery(
        getCompaniesQuery
    );

    if(loading || error) return <div className="lds-circle"><div></div></div>;

    if(data.userInfo === "start") return <div className="lds-circle"><div></div></div>;    // Login status loading

    if(data.userInfo === null) { // Logged out 
        return transition();
    }    


    const output = () => {        

        clearTimeout(timeout);

        timeout = setTimeout(() => {
            
            automatic({
                variables: {
                        search: input.value
                    }
                }
            );

        }, TYPING_TIMER_LENGTH);
 
    };

    const clear = e => {

        if(mouse){
            e.target.focus();
            mouse = false;
            return;
        }

        try{
            document.getElementById('automatic').style.display = 'none';
        } catch(e) {}
        
    };

    const unclear = () => {
        try{
            document.getElementById('automatic').style.display = 'block';
        } catch(e) {}
    };

    const boy = () => {
        mouse = true;
    };

    
    if(errorResult && errorResult.message === 'UNAUTHENTICATED') {
        // userInfo(null);

        window.location.reload();

        return null;
    }

    const toTitleCase = (str) => {
        return str.replace(
          /\w\S*/g,
          function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          }
        );
    };


    return(
        <main>
            <h2 className="heading_search">
                Get Company Category in all Banks
            </h2>

            <div className='search_can'>
                <input
                    ref={node => {
                        input = node;
                    }}
                    className="search_bar"
                    type="text"
                    inputMode="text"
                    onChange={output}
                    onBlur={clear}
                    onFocus={unclear}
                    id="searchy"
                    autoComplete="off"
                    placeholder="Slowly type your company name here..."
                />

                {
                    (loadingResult || errorResult)?
                    
                        <div className="lds-hourglass"></div>
                    :
                        null

                }

            </div>
            

            {result && result.companies && result.companies.length === 0 &&
                
                <div className="auto_container" id="automatic" onMouseDown={boy}>
                    <div className="zero">No results found</div>
                </div>

            }

            {result && result.companies && result.companies.length !== 0 &&
            
                <div className="auto_container" id="automatic" onMouseDown={boy}>
                    {result.companies.map(company => (
                        <Link to={`/search/${company._id}`} key={company._id} className="auto_link">
                            {toTitleCase(company.Employer_Name)}
                        </Link>
                    ))}
                </div>

            }

            {
                Object.keys(props.match.params).length > 0 && !!props.match.params.id && <Table id={props.match.params.id} /> 
            }
            

        </main>
    );
}

export default Search;