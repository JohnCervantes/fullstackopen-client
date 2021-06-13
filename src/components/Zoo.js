import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { animalsVar, initialDataLoad } from "../cache";

const ALL_ANIMALS = gql`
  query {
    animals {
      _id
      age
      color
      name
    }
  }
`;

const ALL_ANIMALS_VAR = gql`
  query {
    animalsVar @client {
      _id
      age
      color
      name
    }
  }
`;

const INITIAL_DATA_LOAD_VAR = gql`
  query {
    initialDataLoadVar @client
  }
`;

function Zoo() {
  const { loading, error, data } = useQuery(ALL_ANIMALS);
  const { data: animalsVarData } = useQuery(ALL_ANIMALS_VAR);
  const { data: initialDataLoadData } = useQuery(INITIAL_DATA_LOAD_VAR);

  useEffect(() => {
    if (loading) {
      return <div>loading...</div>;
    }
    if (error) console.log(error);
    if (!initialDataLoadData.initialDataLoadVar) {
      animalsVar(data.animals);
      initialDataLoad(true);
    }
  }, [data, animalsVarData]);

  function handleAddAnimal() {
    animalsVar([
      ...animalsVarData.animalsVar,
      { _id: "123", name: "elephant", age: "5", color: "green" },
    ]);
  }

  return (
    <div className="w-10/12 m-auto text-center">
      <div className="flex">
        <Link to="/animal/1">click me</Link>
        <div>
          <h1 className="headline">left content</h1>
          <p className="content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nec
            scelerisque mauris, quis congue arcu. Quisque tincidunt consectetur
            justo, sit amet posuere dolor lobortis vitae. Aliquam sed nisi
            nulla. Nulla a purus urna. Integer dapibus a nisl in maximus.
            Aliquam cursus, nibh vitae vehicula sodales, nisi mi ultricies nunc,
            et laoreet eros diam ut quam. Nullam commodo lorem velit, et
            elementum ligula egestas non. Proin porttitor dolor in mollis
            congue. Ut id sem ut ligula lobortis feugiat id et justo. In hac
            habitasse platea dictumst. Etiam eget nibh eget ligula condimentum
            aliquam et sed nunc. Morbi vitae erat eu felis ullamcorper elementum
            eu vitae ipsum. Morbi eget dictum enim. Vivamus in enim iaculis,
            laoreet neque laoreet, accumsan neque. Sed nec nisl eget mauris
            rutrum dapibus. Morbi interdum mi sed massa sollicitudin eleifend eu
            sit amet risus. Vestibulum nisi leo, bibendum nec ligula non, varius
            egestas ante. Donec purus nunc, venenatis malesuada molestie
            sodales, convallis sit amet nisl. Donec ut nulla diam. Proin id
            lacus urna. Sed vel ex leo. Donec feugiat mi quis augue volutpat,
            nec vestibulum quam vestibulum. Nullam auctor tortor purus, ut
            rhoncus mi dictum eget. Donec a ipsum varius, tristique nulla nec,
            cursus orci. Suspendisse accumsan metus augue, vel eleifend magna
            rutrum ut. Etiam maximus ac tortor vestibulum iaculis. Nam pharetra
            sit amet justo vel convallis. Sed non pretium lacus. Praesent
            dapibus turpis eget lorem eleifend elementum. Etiam bibendum varius
            est, id condimentum felis placerat vulputate.
          </p>
        </div>
        <div>
          <h1 className="headline">right content</h1>
          <p className="content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nec
            scelerisque mauris, quis congue arcu. Quisque tincidunt consectetur
            justo, sit amet posuere dolor lobortis vitae. Aliquam sed nisi
            nulla. Nulla a purus urna. Integer dapibus a nisl in maximus.
            Aliquam cursus, nibh vitae vehicula sodales, nisi mi ultricies nunc,
            et laoreet eros diam ut quam. Nullam commodo lorem velit, et
            elementum ligula egestas non. Proin porttitor dolor in mollis
            congue. Ut id sem ut ligula lobortis feugiat id et justo. In hac
            habitasse platea dictumst. Etiam eget nibh eget ligula condimentum
            aliquam et sed nunc. Morbi vitae erat eu felis ullamcorper elementum
            eu vitae ipsum. Morbi eget dictum enim. Vivamus in enim iaculis,
            laoreet neque laoreet, accumsan neque. Sed nec nisl eget mauris
            rutrum dapibus. Morbi interdum mi sed massa sollicitudin eleifend eu
            sit amet risus. Vestibulum nisi leo, bibendum nec ligula non, varius
            egestas ante. Donec purus nunc, venenatis malesuada molestie
            sodales, convallis sit amet nisl. Donec ut nulla diam. Proin id
            lacus urna. Sed vel ex leo. Donec feugiat mi quis augue volutpat,
            nec vestibulum quam vestibulum. Nullam auctor tortor purus, ut
            rhoncus mi dictum eget. Donec a ipsum varius, tristique nulla nec,
            cursus orci. Suspendisse accumsan metus augue, vel eleifend magna
            rutrum ut. Etiam maximus ac tortor vestibulum iaculis. Nam pharetra
            sit amet justo vel convallis. Sed non pretium lacus. Praesent
            dapibus turpis eget lorem eleifend elementum. Etiam bibendum varius
            est, id condimentum felis placerat vulputate.
          </p>
        </div>
      </div>
      <div className="text-center text-yellow-500 text-9xl">
        {animalsVarData.animalsVar.map((animal) => {
          return <p key={animal._id}>{animal.name + ", "}</p>;
        })}
        <button onClick={handleAddAnimal}>Click me</button>
      </div>
      <div>
        <p>data from db</p>
        {animalsVarData.animalsVar.map((item) => (
          <p key={item._id}>{item.name}</p>
        ))}
      </div>
    </div>
  );
}

export default Zoo;
