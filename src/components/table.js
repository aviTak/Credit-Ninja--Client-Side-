import '../css/table.css';
import { useQuery } from '@apollo/client';
import { getCompanyQuery } from '../queries/queries';
// import { userInfo } from '../config/cache';

function Table(props){

    const { loading, error, data } = useQuery(getCompanyQuery, {
        variables: { id: props.id },
        // errorPolicy: 'all'
    });


    if(error && error.message === 'UNAUTHENTICATED') {
        // userInfo(null);      

        window.location.reload();

        return null;
    }   

    if(loading || error) return <div className="lds-ripple"><div></div><div></div></div>;

    if(!data.company) return 'No records found';


    const toTitleCase = (str) => {
        return str.replace(
          /\w\S*/g,
          function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          }
        );
    };


    return(
        <table className="table">
            <caption className="caption">{toTitleCase(data.company.Employer_Name)}</caption>

            <thead className="table_heading">
                <tr className="row row_head">
                    <th className="column column_head">
                        Bank Name
                    </th>

                    <th className="column column_head">
                        Category
                    </th>
                </tr>
            </thead>

            <tbody className="table_body">
                {data && data.company && data.company.banks && data.company.banks.map((bank, key) => {

                    if(!bank.category)  return null;

                    return (
                        <tr className="row row_body" key={key}>
                        
                            <td className="column column_body">
                                {bank.name}
                            </td>

                            <td className="column column_body">
                                {bank.category}
                            </td>
                
                        </tr>
                    );
                    
                })}
            </tbody>
            
        </table>
    );
}

export default Table;