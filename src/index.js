import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import { ApolloClient, ApolloProvider } from '@apollo/client';
import { cache } from './config/cache';
import reportWebVitals from './reportWebVitals';


const client = new ApolloClient({
  uri: 'https://server.creditninja.in/graphql',
  credentials: 'include',
  cache
});


ReactDOM.render(
  <ApolloProvider client = {client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

reportWebVitals();