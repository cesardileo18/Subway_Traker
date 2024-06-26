import React from 'react';
import '../Scss/Error.scss';
import imgError from '../assets/error404/error.png'
import { Link } from 'react-router-dom';


const Error = () => {
  return (
    <section className="error">
      <header className="error__header">
        <h1 className="error__heading">Oops! Algo salió mal...</h1>
        <p className="error__message">Parece que has llegado a una página que no existe.</p>
      </header>
      <article className="error__content">
        <img
          className="error__image"
          src={imgError}
          alt="Error 404"
        />
        <p className="error__back">
          <Link to={'/Home'}>Página principal</Link>
        </p>
      </article>
    </section>
  );
};

export default Error;
