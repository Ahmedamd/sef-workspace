import React from 'react';
import './NewsFeed.css';
import {useParams} from "react-router-dom";
import Posts from "./Posts.js"
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PhotoSizeSelectActualRoundedIcon from '@material-ui/icons/PhotoSizeSelectActualRounded';
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import PersonPinRoundedIcon from '@material-ui/icons/PersonPinRounded';
import { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import db from './firebase';
import { useEffect } from 'react';
import { ContactMailSharp } from '@material-ui/icons';
import {useStateValue}  from "./StateProvider";
//import url from "./useStorage";

import firebase from "firebase";

import useStorage from './hooks/UseStorage'
import {holder} from './ImageUpload'
import ImageUpload from './ImageUpload';
import {storage}  from "./firebase"

// or



function Newsfeed() {


    const [{user}] = useStateValue();
    const [input, setInput] = useState("");
    const{roomId} = useParams();
    const [roomDetails, setRoomDetails] = useState("");
    const [posts, setPosts] = useState([]);
    const [image, SetImage] = useState(null);
    const [error, setError] = useState(null);
    const [URL,setUrl] = useState(null);
    const [progress, setProgress] = useState(0);
    const[noLikes, setnumLikes] = useState(0);    



    //Room details
    useEffect(()=>{

        if(roomId){
            db.collection("rooms").doc(roomId).onSnapshot((snapshot)=>(setRoomDetails(snapshot.data())))
        }


    },[roomId])



const handleSubmit = (e) =>{
        e.preventDefault();
    // post status implementation

        if(roomId){
            db.collection("rooms").doc(roomId).collection('posts').add({
            message: input,
            username: user?.displayName,
            userImage: user?.photoURL,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            picture: URL,
            noLikes: noLikes,
          
            
        })
        }
        setInput("");
        SetImage(null);
        setUrl(null);
         
    }


    //Implememnt retreiving data from posts

     useEffect(()=>{

        if(roomId){
            db.collection("rooms").doc(roomId).collection("posts").orderBy("timestamp","asc").onSnapshot((snapshot) => setPosts(snapshot.docs.map(post => ({
                id: post.id,
               post: post.data()
                            
            }))))
        }

    },[roomId])


      const filechosenHandler = (e) =>{
        let selected = e.target.files[0];
        console.log("the image selected is", selected);
        

        //check if file is selected
        if(selected){
       
            SetImage(selected);
            console.log(selected);
            console.log("Image is ", image);
            setError("");
            //weired stuff is about to happen
            const storageRef = storage.ref(selected.name);
            storageRef.put(selected).on('state_changed');
            console.log("we are certainly here");
            
        async function asyncCall (){
            const url = await storageRef.getDownloadURL();
            
            console.log("we are certainly here two");
            setUrl(url);
            console.log("url two is ", url);
           
            console.log("actual", URL);
            console.log("actual setFile", setUrl(url));

        };
          
 asyncCall();
        
        }else{
            SetImage(null);
            setError("Please select an image file");
           
        }

        
    
    }


    //RENDERING ITEMS

    return (
        <div className = "Newsfeed">
      
        <div className="picture-section">

        <img className = "img"src= "/coverPages/FB-wp.jpg"alt=""/>

        </div>
         {/* end of header section */}

        <div className="header-section">
            <div className="header__left">
                <div className="group-name">
                 {roomDetails?.name}
                </div>
                <div className="number-members">
                    Closed group . 15 members
      
                       <i class="far fa-comment-alt"></i>
                </div> 
            </div>

            <div className="header__right">
               <button className= "btn-a" > <PersonAddIcon className ="btnIcon-ppl"/>
                    <div className="title-ab">
                  Add People
                  </div> </button>
            </div> 


        </div>
        {/* end of header section */}

        <div className="status-box">
           
           <div className="part-a">
          
               <div className="user">
                   <Avatar src = {user?.photoURL}/>
               </div>

             
                    <form  class = "input-part"action="">
                    <input type="text" name="" id="" className = "status-input" 
                    value = {input}
                    onChange = {(e)=> setInput(e.target.value)}
                    placeholder = "Please write something"/>


                    <button onClick={handleSubmit} type = "submit">Hidden submit</button>
                    </form>
                

           </div>

          <div className="part-b">

                <input type="file" 
                id ="file"
                className="btn-status" onChange={filechosenHandler}/>

               

                <label  htmlFor="file"> <PhotoSizeSelectActualRoundedIcon className= "photo"/> Photo/Video</label>

                <button className= "btn-status" > <StarRoundedIcon className="star"/>Achievements</button>

                 <button className= "btn-status" > <PersonPinRoundedIcon className="tag"/>Tag People</button>

          </div>

        </div>

        <div className="URL-THINGS" className = "URL">
            <h1>
                url is  {URL}
                </h1>
        </div>
     


          

{posts.map(({id,post}) =>(

<Posts
        userImage = {post.userImage}
        message = {post.message}
        timestamp = {post.timestamp}
        username = {post.username}
        picture =  {post.picture}
        postId = {id}
        userId = {user.uid}
        noLikes = {post.noLikes}
        
        
        />

))}

        </div>
        

    )
}



export default Newsfeed;
