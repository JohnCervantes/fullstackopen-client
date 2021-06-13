import React, { useState, useEffect } from "react";
import {gql, useQuery} from '@apollo/client';
import {animalsVar} from "../cache";
import { Link } from "react-router-dom";


const ALL_ANIMALS_VAR = gql`
query {
  animalsVar @client{
    _id
    age
    color
    name
  }
}
`


function Details() {
  const { loading, error, data } = useQuery(ALL_ANIMALS_VAR)
 
  function handleAddAnimal() {
    animalsVar([...data.animalsVar, {_id: "dsadasdasdas", name: 'test', age: 'test', color: "test"}])
  }

  return (
    <div>
        {data.animalsVar.map(animal => <p>name: {animal.name}, age: {animal.age} </p>)}

        <button onClick={handleAddAnimal}>click</button>
        <Link to="/">Go back</Link>
    </div>
  );
}

export default Details;
