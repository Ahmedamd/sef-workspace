import React from 'react';
import {useStateValue}  from "./StateProvider";
import {useContacts} from "./contexts/ContactsProvider";
import {ContactsProvider} from "./contexts/ContactsProvider";

function People(username) {
    const [{user}] = useStateValue();

    const {contacts} = useContacts()// getting contacts list from provider

//     const {createContact} = useContacts();// getting create contact fcn from provider 

// function StoreLogin(){
//   createContact({user});
// }

// const res = StoreLogin();
// console.log("user loggin in is", res);

    console.log("user is",user);

    return (
        <div className = "People">

            <h3>user is </h3>
            {/* <h1>{user?.displayName}</h1>
            <h6>{user?.uid}</h6> 
            <div className="people-list">
               {contacts.map(contact =>(
                   <h3>{contact.username}</h3>
                  
               ))}
            </div> */}
            
        </div>
    )
}

export default People;
