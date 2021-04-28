
import React, { useState} from 'react'
import NotificationsNoneRoundedIcon from '@material-ui/icons/NotificationsNoneRounded';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import ArrowForwardOutlinedIcon from '@material-ui/icons/ArrowForwardOutlined';
import AnnouncementOutlinedIcon from '@material-ui/icons/AnnouncementOutlined';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import SentimentSatisfiedOutlinedIcon from '@material-ui/icons/SentimentSatisfiedOutlined';
import './Sidebar.css';


function Sidebar() {
    



    return (
        <div className = "Sidebar">

            <div className ="top-section">
                <div className="icon">
                   <NotificationsNoneRoundedIcon/>
                </div>
                 <div className="icon">
                   <NotificationsNoneRoundedIcon/>
                </div>

                <div className="icon">
                   <ChatBubbleOutlineOutlinedIcon/>
                </div>
           
            </div>

            <div className="middle-section">

                <div className="middle-icon" >
                  
                 {/* <ArrowForwardOutlinedIcon/> */}
                </div>
            </div>

            <div className="bottom-section">
                <div className="bottom-icons">
                    <AnnouncementOutlinedIcon/>
                </div>
                 <div className="bottom-icons">
                    <HelpOutlineOutlinedIcon/>
                </div>
                 <div className="bottom-icons">
                    <SentimentSatisfiedOutlinedIcon/>
                </div>
            </div>
        
        </div>
    )
}


export default Sidebar;
