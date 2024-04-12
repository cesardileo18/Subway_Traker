import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import '../Scss/Footer.scss'
const Footer = () => {
    return (
        <footer className="footer p-3">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mb-2">
                        <h5>Descripción</h5>
                        <p className='mt-1'>Desarrollado por Cesar Acacio Di Leonardo, esta aplicación ofrece información en tiempo real
                            sobre el servicio del subte de Buenos Aires. Consume datos del gobierno de la
                            ciudad para proporcionar horarios precisos, notificaciones de retrasos y
                            precios de pasajes actualizados. También incluye imágenes del mapa del subte
                            y horarios de funcionamiento de las estaciones.</p>
                    </div>
                    <div className="col-md-6 mt-2">
                        <div className='d-flex justify-content-center'>
                            <h5>Contacto</h5>
                        </div>
                        <div className='d-flex align-items-center justify-content-evenly mt-2'>
                            <a target='_blank' href="https://portfolio-cesar.web.app/#/contact">
                                <div className='contenedorIconPortfolio'>
                                    <FontAwesomeIcon className='text-white icon-any' icon={faBriefcase} title='Portfolio' />
                                </div>
                            </a>

                            <a target='_blank' href="https://www.linkedin.com/in/cesar-acacio-di-leonardo">
                                <div className='contenedorIcon'>
                                    <FontAwesomeIcon className='text-white icon-any' icon={faLinkedin} title='Linkedin' />
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;