import { useState, useEffect } from 'react'
import SubwayTraker from "../Services/subwayTraker.Services"
import horariosSubte from "../assets/horariosSubte.png"
import mapaSubte from "../assets/Mapa de red Esquemático 2023.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo, faClock, faDollarSign } from '@fortawesome/free-solid-svg-icons'
import { faClockFour } from '@fortawesome/free-regular-svg-icons/faClockFour'
import { faDownload } from '@fortawesome/free-solid-svg-icons/faDownload'
import '../Scss/Home.scss'
import Loading from './Loading'

const Home = () => {
    const [subwayInformation, setSubwayInformation] = useState()
    const [subwayAlert, setSubwayAlert] = useState()
    const [subwayPrices, setSubwayPrices] = useState()
    const [primerStopName, setPrimerStopName] = useState(null); // Almacena primerStopName
    const [loding, setLoding] = useState(false)
    useEffect(() => {
        setLoding(true);
        const subwayTraker = new SubwayTraker();
    
        const fetchData = async () => {
            try {
                const subwayInfo = await subwayTraker.getSubwayInformation();
                setSubwayInformation(subwayInfo);
                setPrimerStopName(subwayInfo.ida?.map(san => san.stations[0]?.stopName));
    
                const subwayStatus = await subwayTraker.getSubwayStatus();
                setSubwayAlert(subwayStatus);
    
                const subwayPrices = await subwayTraker.getSubwayPrices();
                setSubwayPrices(subwayPrices);
    
                // const updateSubwayPrices = await subwayTraker.getUpdateSubwayPrices();
                // console.log('updateSubwayPrices', updateSubwayPrices);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoding(false);
            }
        };
        fetchData();
    }, []);
    const titleSubte = (title) => {
        // Eliminar las letras finales "_A01", "_A02", "_B01", etc.
        const linea = title.replace(/_[A-Z]\d{2}$/, '');
        switch (linea) {
            case "LineaA":
                return {
                    linea: "A",
                    background: "#03AEE2",
                    entitiesInfo: subwayAlert && subwayAlert.entitiesInfo.find(info => info.idLinea === "Alert_LineaA")
                };
            case "LineaB":
                return {
                    linea: "B",
                    background: "#FF0612",
                    entitiesInfo: subwayAlert && subwayAlert.entitiesInfo.find(info => info.idLinea === "Alert_LineaB")
                };
            case "LineaD":
                return {
                    linea: "D",
                    background: "#00AF64",
                    entitiesInfo: subwayAlert && subwayAlert.entitiesInfo.find(info => info.idLinea === "Alert_LineaD")
                };
            case "LineaE":
                return {
                    linea: "E",
                    background: "#8E019E",
                    entitiesInfo: subwayAlert && subwayAlert.entitiesInfo.find(info => info.idLinea === "Alert_LineaE")
                };
            default:
                return {
                    linea: "",
                    background: "",
                    entitiesInfo: ""
                };
        }
    }
    const alertTitle = (title) => {
        const lineId = title.replace("Alert_", ""); // Eliminar "Alert_" del idLinea
        switch (lineId) {
            case "LineaA":
                return {
                    linea: "A",
                };
            case "LineaB":
                return {
                    linea: "B",
                };
            case "LineaD":
                return {
                    linea: "D",
                };
            case "LineaE":
                return {
                    linea: "E",
                };
            default:
                return {
                    linea: "No coincide",
                    background: "",
                    entitiesInfo: subwayAlert && subwayAlert.entitiesInfo.find(info => info.idLinea === title)
                };
        }
    }
    const handleDownloadHorarios = () => {
        const imgUrl = `${horariosSubte}`; // Reemplaza esto con la URL de tu imagen
        const fileName = 'horarios_del_servicio.jpg'; // Nombre del archivo de descarga
        setLoding(true)
        fetch(imgUrl)
            .then(response => response.blob())
            .then(blob => {
                setLoding(false)
                const url = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', fileName);
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
            })
            .catch((error) => {
                setLoding(false)
                console.log('Hubo un error en la descarga de la imagen', error)
            });
    };
    const handleDownloadMapa = () => {
        setLoding(true)
        const imgUrl = `${mapaSubte}`; // Reemplaza esto con la URL de tu imagen
        const fileName = 'mapa_del_subte.jpg'; // Nombre del archivo de descarga

        fetch(imgUrl)
            .then(response => response.blob())
            .then(blob => {
                setLoding(false)
                const url = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', fileName);
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
            })
            .catch((error) => {
                setLoding(false)
                console.log('Hubo un error en la descarga de la imagen', error)
            });
    };
    return (
        <>
            {loding ?
                <div className='container-loading'>
                    <Loading />
                </div> : (
                    <section className='Estado_del_Subte p-3'>
                        <div className='d-flex justify-content-center'>
                            <h1 className='mb-2 text-center'>Estado y Tiempos del Subte por Línea</h1>
                        </div>
                        <div className="accordion" id="accordionExample">
                            {
                                subwayInformation && subwayInformation?.vuelta.map((information, index) => {
                                    return (
                                        <div className="accordion-item" key={index}>
                                            <h2 className="accordion-header">
                                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="false" aria-controls={`collapse${index}`}>
                                                    <div className='d-flex align-items-center justify-content-between col-xxl-11 col-xl-11 col-lg-11 col-11'>
                                                        <div className="desing_line" style={{ backgroundColor: titleSubte(information.id).background }}>
                                                            {subwayAlert && titleSubte(information.id).linea}
                                                        </div>
                                                        {subwayAlert && titleSubte(information.id).entitiesInfo && titleSubte(information.id).entitiesInfo.alerta !== undefined ? (
                                                            titleSubte(information.id).entitiesInfo?.alerta.map((alerta, index) => (
                                                                <div key={index} className='contenedorAlerta'>
                                                                    <p className='text-danger text-center'>{alerta}</p>
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <p>Servicio normal</p>
                                                        )}
                                                        <div className='last_report  d-flex align-items-center'>
                                                            <span className='tooltip-price me-1'>
                                                                <FontAwesomeIcon icon={faCircleInfo} className="icon_report" />
                                                                <span className='tooltip-text-price'>Estos datos provienen de la API del Gobierno de
                                                                    la Ciudad y son procesados por una API que desarrollé en Node.js. Se
                                                                    convierten los tiempos de llegada y salida del subte al formato de
                                                                    fecha y hora local de Argentina. Se realiza un análisis estadístico
                                                                    para corregir discrepancias entre estaciones y obtener tiempos coherentes.
                                                                </span>
                                                            </span>
                                                            <FontAwesomeIcon className='px-1 reloj_estacion' icon={faClock} /> {information && information.line.startTime}
                                                        </div>
                                                    </div>
                                                </button>
                                            </h2>
                                            <div id={`collapse${index}`} className="accordion-collapse collapse" aria-labelledby={`heading${index}`} data-bs-parent="#accordionExample">
                                                <div className="accordion-body">
                                                    <div className="row d-flex justify-content-evenly">
                                                        <div className='col-xxl-5 col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12 p-3 container_uno'>
                                                            {
                                                                subwayInformation && subwayInformation?.ida.map((san, sanIndex) => {
                                                                    const primerName = san.stations[0]?.stopName;
                                                                    const segundoNombre = information.stations[0]?.stopName
                                                                    if (sanIndex === index) {
                                                                        return (
                                                                            <div key={sanIndex}>
                                                                                <div className='d-flex justify-content-center'>
                                                                                    <h6 className='mb-2'>De {primerName} a {segundoNombre}</h6>
                                                                                </div>
                                                                                {
                                                                                  san && san.stations.map((esta, estaIndex) => {
                                                                                        const isEven = estaIndex % 2 === 0;
                                                                                        return (
                                                                                            <div key={estaIndex} className={`d-flex justify-content-center ${isEven ? 'even-background' : 'odd-background'}`}>
                                                                                                <ul className='ul_padre'>
                                                                                                    Estación: {esta.stopName}
                                                                                                    <ul>
                                                                                                        <p className='llegada'>Llegada</p>
                                                                                                        <li><FontAwesomeIcon className='mx-2' icon={faClock} />{esta.arrival.time}</li>
                                                                                                        <li>Retraso: {esta.arrival.delay}</li>
                                                                                                    </ul>
                                                                                                    <ul className='mt-1'><p className='salida'>Salida</p>
                                                                                                        <li><FontAwesomeIcon className='mx-2' icon={faClock} />{esta.departure.time}</li>
                                                                                                        <li>Retraso: {esta.departure.delay}</li>
                                                                                                    </ul>
                                                                                                </ul>
                                                                                            </div>
                                                                                        )
                                                                                    })
                                                                                }
                                                                            </div>
                                                                        )
                                                                    } else {
                                                                        return null;
                                                                    }
                                                                })
                                                            }
                                                        </div>
                                                        <div className='col-xxl-5 col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12 p-3 container_dos'>
                                                            {
                                                                primerStopName && primerStopName.map((na, i) => {
                                                                    if (index === i) {
                                                                        return (
                                                                            <div key={i} className='d-flex justify-content-center'>
                                                                                <h6 className='mb-2'>De {information.stations[0]?.stopName} a {na}</h6>
                                                                            </div>
                                                                        )
                                                                    }
                                                                })
                                                            }
                                                            {information && information.stations.map((station, indice) => {
                                                                return (
                                                                    <div key={indice} className={`d-flex justify-content-center ${indice % 2 === 0 ? 'even-backgroundDos' : 'odd-backgroundDos'}`}>
                                                                        <ul>
                                                                            Estación: {station.stopName}
                                                                            <ul className='ul_padre'>
                                                                                <p className='llegada'>Llegada</p>
                                                                                <li><FontAwesomeIcon className='mx-2' icon={faClock} /> {station.arrival.time}</li>
                                                                                <li>Retraso: {station.arrival.delay}</li>
                                                                            </ul>
                                                                            <ul className='mt-1'>
                                                                                <p className='salida'>Salida</p>
                                                                                <li><FontAwesomeIcon className='mx-2' icon={faClock} />{station.departure.time}</li>
                                                                                <li>Retraso: {station.departure.delay}</li>
                                                                            </ul>
                                                                        </ul>
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <section className='alerta_no_coincidente'>
                            {/* Filtrar las alertas que no coinciden con ningún caso en titleSubte */}
                            {subwayAlert && subwayAlert?.entitiesInfo.map((info, index) => {
                                const title = alertTitle(info.idLinea)
                                if (title.linea === "No coincide") {

                                    return (
                                        <div key={index} className="alert alert-danger mt-2" role="alert">
                                            {info.linea + " "}
                                            {info.alerta.join(', ')}
                                        </div>
                                    );
                                }
                                return null;
                            })}
                        </section>
                        <section className='precios_subte'>
                            {subwayPrices && subwayPrices.map((price, index) => (
                                <div key={index} className='tarifa-card mt-2'>
                                    {price.tituloTarifa.map((title, i) => {
                                        return (
                                            <div key={i} className='tarifa-info'>
                                                <div className='m-'>
                                                    <div className='d-flex align-items-center justify-content-evenly precios_subte_contenedor'>
                                                        <h2 className='text-center pb-2'>{title.titulo}</h2>
                                                        <p className='text-center fecha'>
                                                            <FontAwesomeIcon className='px-1' icon={faClockFour} />
                                                            {price.fecha}
                                                            <span className='tooltip-price px-2'>
                                                                <FontAwesomeIcon icon={faCircleInfo} />
                                                                <span className='tooltip-text-price'>Esta información
                                                                    se actualiza automáticamente cada 3 días. Si el software
                                                                    no detecta cambios en los precios, la fecha y los precios
                                                                    permanecerán sin cambios.</span>
                                                            </span>
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className='precios'>
                                                    {price.preciosPorViaje.map((precio, inde) => {
                                                        return (
                                                            <p key={inde} className='mt-2'>
                                                                <span className='rango'>{precio.rango}: </span>
                                                                <span className='precio'><FontAwesomeIcon className='ms-1' icon={faDollarSign} />{precio.precio}</span>
                                                            </p>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            ))}
                        </section>
                        <section className='d-flex flex-column align-items-center m-1 horarios'>
                            <h2 className='m-2'>Horarios del servicio</h2>
                            <div className='img_sub'>
                                <img className='imgs_subte' src={horariosSubte} alt="Horarios del servicio" />
                                <FontAwesomeIcon icon={faDownload} onClick={handleDownloadHorarios} className="download-icon" />
                            </div>
                        </section>
                        <section className='d-flex flex-column align-items-center m-1 mapa'>
                            <h2 className='m-2'>Mapa del subte y combinaciones</h2>
                            <div className='img_sub_dos'>
                                <img className='imgs_subte' src={mapaSubte} alt="Mapa del subte y combinaciones" />
                                <FontAwesomeIcon icon={faDownload} onClick={handleDownloadMapa} className="download-icon" />
                            </div>
                        </section>
                    </section>
                )}

        </>
    );
}

export default Home;