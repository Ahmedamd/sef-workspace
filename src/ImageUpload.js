import React from 'react';
import UseStorage from './hooks/UseStorage';
import {useParams} from "react-router-dom";


const holder = "";

const ImageUpload = ({image, SetImage}) =>{

    const {url,progress} = UseStorage(image);
    
    console.log("url is",url);
   

return url;
    
}
export {holder};
export default ImageUpload;
