import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Zoo from "./components/Zoo";
import reportWebVitals from "./reportWebVitals";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Details from "./components/Details";
import {cache} from './cache';

export const client = new ApolloClient({
  cache: cache,
  link: new HttpLink({
    uri:"https://dry-stream-85503.herokuapp.com/graphql",
    //uri: "http://localhost:8080/graphql",
  }),
});


ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter basename={"/"}>
      <Switch>
        <Route path="/animal/:id" render={() => <Details />} />
      </Switch>
      <Switch>
        <Route exact path="/" render={() => <Zoo />} />
      </Switch>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
