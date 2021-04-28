import React, {useEffect, useState} from 'react'
import './MainSidebar.css'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import Groups from '../Groups.js';
import EmojiObjectsOutlinedIcon from '@material-ui/icons/EmojiObjectsOutlined';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import AddIcon from "@material-ui/icons/Add";
import db from "../firebase";
import array from "../IconGen";
import People from "../People.js";
import {useContacts} from "../contexts/ContactsProvider";


function MainSidebar() {

    const [channels, setChannels] = useState([]); 
    
 
  
    const ex = array;
    const max = ex.length;
    const res =  Math.floor(Math.random()*max);
      const {contacts} = useContacts()

    
    useEffect(() => {

        db.collection("rooms").onSnapshot(snapshot =>(

            setChannels(
                snapshot.docs.map(doc=>({
                    id: doc.id,
                    name: doc.data().name
                }))
            )
        ))
        //run code when sidebarComponent loads
    }, [ ])
   
    return (
           
             <div className ="MainSidebar">
            <div className="search-bar-container">
                <SearchOutlinedIcon/>
            <input type="text" placeholder = "Search" className="search-bar"/>
            </div>

            <div className="home-section">
               <h2>Home</h2>
            </div>

            <div className="group-section">
                <h3 className= "group-title">Groups</h3>
               <Groups Icon = {EmojiObjectsOutlinedIcon} title = "Announcments"/>

                <Groups Icon = {AccountBalanceIcon} title = "Finance"/>
                
                {channels.map((channel) =>(
                    

                    <Groups Icon = {ex[1]} title = {channel.name} id={channel.id}/>
                ))}

                <Groups Icon = {AddIcon} title = "Add group" addChannelOption />

            </div>

              <div className="people-section group-section">
                <h3 className= "group-title people-title">People</h3>

                <People/>

                {contacts.map(contact=>(
                <div className="contacts-list">
                        <h3>{contact.username}</h3>
                        <h3>
                            {/* {contact.userid} */}
                        </h3>
                        {console.log("I'm in Main sidebar")}
                </div>
               
            
            ))}

            </div>
        </div>
     
      
    )
}

export default MainSidebar
