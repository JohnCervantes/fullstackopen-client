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

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "http://localhost:4000/graphql",
  }),
});

export const allAnimalsVar = client.cache.makeVar([]);

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
