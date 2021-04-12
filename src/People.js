import React from 'react';
import {useStateValue}  from "./StateProvider";

function People() {
    const [{user}] = useStateValue();

    console.log("user is",user);

    return (
        <div className = "People">

            <h3>user is </h3>
         

            <h1>{user?.displayName}</h1>
        </div>
    )
}

export default People;
