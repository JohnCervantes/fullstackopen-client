import React, { useState, useEffect } from "react";
import {useMutation, useQuery} from '@apollo/client';
import { Link } from "react-router-dom";
import {
  ALL_ANIMALS_VAR
} from "../operations/query";
import { ADD_ANIMAL, addAnimal } from "../operations/mutation";


function Details() {
  const { loading, error, data } = useQuery(ALL_ANIMALS_VAR)
  const [addAnimalMut] = useMutation(ADD_ANIMAL);
 
  async function handleAddAnimal() {
    try {
      const { data } = await addAnimalMut({
        variables: { name: 'cat', age: 10, color: "yellow"}
      });
      addAnimal(data.addAnimal);
    } catch (e) {
      console.log(e);
    }  }

  return (
    <div>
        {data.animalsVar.map(animal => <p>name: {animal.name}, age: {animal.age} </p>)}

        <button onClick={handleAddAnimal}>click</button>
        <Link to="/">Go back</Link>
    </div>
  );
}

export default Details;
