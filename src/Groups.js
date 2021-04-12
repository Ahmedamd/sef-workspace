import { Dvr } from '@material-ui/icons';
import React from 'react';
import { useHistory } from 'react-router-dom';
import db from './firebase';
import './Groups.css'
import array from './IconGen';

function Groups({Icon,title, id, addChannelOption}) {
    const history = useHistory();
    const selectChannel = () =>{
        if(id){
            history.push(`/room/${id}`);
        }else{
            history.push('title');
        }
    }

    const addChannel = () =>{
        const channelName = prompt("Please enter group name");

        if(channelName){
            
            db.collection('rooms').add({
                name: channelName,
            })
        }
    }
    return (
        <div>
            <div className="group-options" onClick= {addChannelOption ? addChannel:selectChannel}>
            
            {Icon && <Icon className= "group-option-icon "/> }
            <div className="group-name">
            {title}
            </div>
           
            </div>
          
               
            
        </div>
    )
}

export default Groups;
