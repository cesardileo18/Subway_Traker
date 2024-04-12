import React from 'react'
import imgSubte from '../assets/subte.png'
import "../Scss/Loading.scss"
const Loading = () => {
    return (
        <div className="container_loading">
            <img src={imgSubte} alt="Imagen Subte" className='imagen_Subte'/>
        </div>
    );
}

export default Loading;