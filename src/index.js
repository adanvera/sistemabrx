import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloLink, ApolloProvider, HttpLink } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';


const root = ReactDOM.createRoot(document.getElementById('root'));

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
})

const link = ApolloLink.from([
  errorLink,
  new HttpLink({ uri: 'https://api.beta.luxor.tech/graphql' }),
])

const client = new ApolloClient({
  link: link,
  headers: {
    'x-lux-api-key': 'lxk.26d95b3c433f82192765db00837b8d08',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': 'POST',
    'Access-Allow-header': 'x-lux-api-key',
  },
  cache: new InMemoryCache(),
  credentials: 'include',
})

root.render(

  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
