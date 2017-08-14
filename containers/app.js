import React, { Component } from 'react';
import '../commons/style';
import List from './list.js';
import {
  ApolloClient,
  createNetworkInterface,
  ApolloProvider
} from 'react-apollo';

const networkInterface = createNetworkInterface({
  uri: 'http://192.168.101.70:3000/graphql'
});
const client = new ApolloClient({
  networkInterface: networkInterface
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <List />
      </ApolloProvider>
    );
  }
}

export default App;
