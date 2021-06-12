import React, { useState, useEffect } from "react";
import {useReactiveVar} from '@apollo/client';
import {allAnimalsVar} from "..";


function Details() {
  const allAnimals = useReactiveVar(allAnimalsVar);

  return (
    <div>
        {allAnimals.map(animal => <p>name: {animal.name}, age: {animal.age} </p>)}
        <button onClick={()=>{
          const test = [...allAnimalsVar()]
          test.push({name: 'test', age: 'test'})
          allAnimalsVar(test)
        }}>click</button>
    </div>
  );
}

export default Details;
