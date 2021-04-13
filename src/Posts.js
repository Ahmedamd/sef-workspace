import React from 'react';
import { useState , useEffect} from 'react';
import {useParams} from "react-router-dom";
import './Post-style.css'
import ThumbUpAltRoundedIcon from '@material-ui/icons/ThumbUpAltRounded';
import ChatBubbleOutlineRoundedIcon from '@material-ui/icons/ChatBubbleOutlineRounded';
import NearMeRoundedIcon from '@material-ui/icons/NearMeRounded';
import Avatar from '@material-ui/core/Avatar';
import db from './firebase';
import {useStateValue}  from "./StateProvider";
import firebase from "firebase";




// or


function Posts({postId, userImage, username, message, timestamp, picture,id, userId, noLikes}) {

     const [{user}] = useStateValue();
     const [commentInput,setComment]= useState("");
    const [num,setNum]= useState(0);
     const [numB,setNumB]= useState(0);
     const [postIds, setPostId] = useState([]);
     const{roomId} = useParams();
     const count = document.querySelectorAll(".Posts");
     const [comments, setCommentThread]= useState([]);
     const [like, setLike] = useState(false);
     
     const [ blue, setBlue] = useState("blue");
     const [inherit, setInherit] = useState("inherit");
     const [colour,setColour] = useState("inherit");
     const [uniqueUsers, setUniqueUsers ] = useState(0);



       
   
 
  useEffect(() => {

        db.collection("rooms").doc(roomId).collection('posts').onSnapshot(snapshot =>(

            setPostId(
                snapshot.docs.map(doc=>({
                    id: doc.id,
                   
                }))
            )

        ))
     
    }, roomId)
    //end of useEffect

    useEffect(()=>{
        db.collection("rooms").doc(roomId).collection('posts').doc(postId).collection("likes").doc(userId).get().then(doc2=>{
            if(doc2.data()){
                if(colour==="inherit")
                setColour("blue");
            }else{
                setColour("inherit")
            }
            
        })

    },[postId,userId]);


 
    useEffect(()=>{

        const res = comments.reduce((acc,message)=>{
         if(!acc.includes(message.username)){
        
            acc.push(message.username);
            
          
         }
         return acc;
        },[]);

        const numofAccUsers = res.length ;
             console.log("length is ", numofAccUsers)
        setUniqueUsers(numofAccUsers);

    },[])

  
//    const x = uniqueUsersfunction(comments);
   console.log("unique ID is", userId);

      //retriveing data from posts
       useEffect(()=>{
         let unsubscribe;
           
            if(postId){
       unsubscribe =  db.collection("rooms").doc(roomId).collection("posts").doc(postId).collection("comments").orderBy("timestamp","asc").onSnapshot((snapshot) => setCommentThread(snapshot.docs.map(comment => 
                        
                comment.data()
                            
                )))

        }
        
        return()=>{
            unsubscribe();
        }

    
        },[postId])

    console.log("comment is",comments)
    /*****end of retrieving method */

     // append to comments collection
     const handleSubmit = (e) =>{
        e.preventDefault();
    
      
         if(roomId ){
        db.collection("rooms").doc(roomId).collection('posts').doc(postId).collection("comments").add({

            comment: commentInput,
            username: user?.displayName,
            userImage: user?.photoURL,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        }
    //end of handle submit

     console.log("Appending might be working");
     setComment("");
         
    }


     //return queery of all like btns in the feed for ex. 4/5 posts
    // if specific like btn is clicked
    // set Like to true or false(State)
    // set setLike num to 1(State)


    const addLike = (e) =>{
     e.preventDefault();
        console.log("btn has been clicked");

        
        if (colour == "blue"){
            setColour("inherit")

        }
        if(colour == "inherit"){
            setColour("blue")
        } 

        db.collection("rooms").doc(roomId).collection("posts").doc(postId).get().then(docc=>{
            const data = docc.data();
            if(colour == "inherit"){
                db.collection("rooms").doc(roomId).collection("posts").doc(postId).collection("likes").doc(userId).get().then(doc2 =>{
                    if(doc2.data()){
                        console.log(doc2.data());
                    }else{
                         db.collection("rooms").doc(roomId).collection("posts").doc(postId).collection("likes").doc(userId).set({
                             likes:1
                         });
                         db.collection("rooms").doc(roomId).collection("posts").doc(postId).update({
                             noLikes:data.noLikes + 1,
                         });
                    }
                })
            }else{
                db.collection("rooms").doc(roomId).collection("posts").doc(postId).collection("likes").doc(userId).delete().then(function(){
                    db.collection("rooms").doc(roomId).collection("posts").doc(postId).update({
                        noLikes: data.noLikes - 1,
                    });
                })
            }
        })
    }

    
    

     //retrieve from comments collection

    return (
        <div className = "Posts">

{/* <div className="sos">
    <h2>number of unique user</h2>
    <h2>{uniqueUsers}</h2>
</div> */}

            <div className="post-dummyid">
                {postIds.map((postid) =>(

                    <div className="idss">
                
                        {postid.id}
                    </div>

                ))}
            </div>

                <div className="post-top">
                    <div className="profile-pic">
                        <Avatar alt="" src = {userImage} />
                    </div>

                    <div className="userandTime">
                        <div className="username">
                        {username}
                        </div>
                        <p className="timestamp">
                            {new Date(timestamp?.toDate()).toUTCString()}
                        </p>

                    </div>
                   
                </div>

                <div className="post-content">
                {message} 
                </div>

                <div className="image-post">
                    <img src={picture} alt=""/>
                </div>

                <div className="likes">
                    <div className="like-section">
                         <div className="like-icon">
                        <ThumbUpAltRoundedIcon style={{ color: "white" ,background: "blue", padding:"3px", borderRadius:"2rem",fontSize:"0.8rem"}}/>
                     
                         </div>

                         <div className="num-likes"> {noLikes}</div> 
                    </div>
                

                    <div className="comments">
                        {comments.length} <br/> {comments.length > 1 ? <div className="space">comments</div> : <div  className="space">comment</div> }
               
                    </div>
                </div>





                <div className="post-bottom">
                 <button className= "btn-post"   style={{ color: colour }} onClick={addLike} > <ThumbUpAltRoundedIcon style={{ color: colour }} />
                 Like</button>
                 <button className= "btn-post" > <ChatBubbleOutlineRoundedIcon className="star"/>Comment</button>

                 <button className= "btn-post" > <NearMeRoundedIcon className="tag"/>Share</button>
                </div>


                 {comments.map(({comment,userImage,timestamp,username})=>(

            
     <div className="comments-thread">
                         <div className="username-comment">
                           <Avatar src = {userImage}/>
                        </div>

                        <div className="comment-box">
                        <div className="username">  
                       {username}
                        </div>
                        <div className="comment-text">
                        {comment}
                        </div>
                        </div>

                 
                    </div>
    
    ))}

                   <div className="post-comment">
                    <div className="username-comment">
                           <Avatar src = {userImage}/>
                    </div>

                    <div className="comment">
                        <form action="">

                        <input type="text" 
                        className= "comment-input"
                        
                         value = {commentInput}
                         
                         onChange = {(e)=> setComment(e.target.value)}
                        placeholder="Write a comment...
                        "/>

                        
                    <button onClick={handleSubmit} type = "submit">Hidden submit</button>
                    <p className="Please">Press Enter to post</p>
                        </form>
                       
                        {/* add other stuff later */}
                    </div>

               
                    </div> 


       

                    
            
        </div>
        
    )
}

export default Posts
