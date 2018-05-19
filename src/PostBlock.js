import React from 'react'
import './style.css'


const PostBlock = ({name, imageUrl, text, postImg}) => {
    return <div className="news">
        <div className="news-header">
            <img src={imageUrl}/>
            <span>{name}</span>
        </div>
        <img src={postImg}/>
        <p>
            {text}
        </p>
    </div>;
};

export default PostBlock;
