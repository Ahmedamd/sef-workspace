
import { useState } from 'react';
import { useEffect } from 'react';
import {storage}  from "../firebase";


const UseStorage = (image) =>{
const [progress, setProgress] = useState(0);
const [error,setError] = useState(null)
const [url,setUrl] = useState(null)

useEffect(() => {

    const storageRef = storage.ref(image.name);
    storageRef.put(image).on('state_changed',snap=>{
        let percentage = (snap.bytesTransferred/ snap.totalBytes)*100;
        setProgress(percentage);

    },(err)=>{
        setError(err);
    }, async()=>{
        const url = await storageRef.getDownloadURL();
        
        setUrl(url)
    })
}, [image])

return {progress, url , error}

}


export default UseStorage;