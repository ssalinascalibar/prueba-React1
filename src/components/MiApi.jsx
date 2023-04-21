import React from 'react'
import { useState, useEffect } from "react";
import Modal from './Modal';
import logo from '../assets/img/harry-logo.png'

const MiApi = () => {

    // 3. info guardará los valores traídos desde la API 
    const [buscarPersonajes, setBuscarPersonajes] = useState('');
   
    const [sortAz, setSortAz] = useState(''); // estado para ordenar los personajes
    
    const [personajes, setPersonajes] = useState([]); // estado para el endPoint de los personajes
    const [hechizos, setHechizos] = useState([]); // estado para el endPoint de hechizos

    // 2. LLamamos al función que consume la API al momento de montar el componente
    useEffect(() => { 
        consultarInformacion();
        consultarInformacionHechizos();

    }, []);

    // 1. Función que consulta la API
    const consultarInformacion = async () => {
        // const url = 'https://fedeperin-harry-potter-api.herokuapp.com/personajes'; 
        const url = 'https://harry-potter-api.onrender.com/personajes'; 
        const response = await fetch(url)
        const data = await response.json()

        console.log(data)

        setPersonajes([...personajes,...data]);
        
        // setInfo(`${data[1].personaje}`); 
        // // con setInfo actualizamos el estado
        
    }

    const consultarInformacionHechizos = async () => {
        // const url = 'https://fedeperin-harry-potter-api.herokuapp.com/hechizos'; 
        const url = 'https://harry-potter-api.onrender.com/hechizos'; 
        const response = await fetch(url)
        const data = await response.json()
        
        // Se crea una nueva propiedad en el array para luego utilizar hechizo_iso
        // para luego reemplazar los caracteres '/' y espacios ' ' que no permitían desplegar el Modal de Bootstrap
        data.forEach(d => {
             d['hechizo_iso'] = d.hechizo.replace('/','').replaceAll(' ', '')
             
        })


        console.log(data)
        setHechizos([...hechizos,...data]);
        
        // setInfo(`${data[1].personaje}`); 
        // // con setInfo actualizamos el estado
        
    }

    const filtrarPorPersonaje = (e) => {
        setBuscarPersonajes(e.target.value);
        console.log(buscarPersonajes);
    }
    

  return (
    <div className='cuerpo'>
        <header>
            <div className='logo'>
                <img src={logo} alt="harryPotter" />
                <h1 className='header-title'>Api</h1>
            </div>
            <form>
                <input onChange={filtrarPorPersonaje} value={buscarPersonajes} className="form-control" type="text" placeholder="Busca un personaje"/>
                <button onClick={() => setSortAz('1')} type="button" className="btn btn-dark">Ordenar de la A a Z</button>
                <button onClick={() => setSortAz('0')} type="button" className="btn btn-dark">Ordenar de la Z a A</button>
                {/* <select onChange={(e) => setSortAz(e.target.value)} value={sortAz} className="form-select" aria-label="Default select example">
                    <option selected>Open this select menu</option>
                    <option value={sortAz}>Ordena de A-Z</option>
                    <option value=''>Ordena de </option>
                        
                </select> */}
            </form>
        </header>
        
        <div className='container'>
            <main>
                
                <div className='row gx-4'>
                    {personajes.filter((e) => {
                        if(buscarPersonajes === '') {
                            return e;
                        } else if (e.apodo.toLocaleLowerCase().startsWith(buscarPersonajes.toLocaleLowerCase())
                        ) {
                            return e;
                        }
                        }).sort((e, e2) => {
                            if (sortAz === '1')
                                return (e.apodo > e2.apodo)?1:((e.apodo < e2.apodo)?-1:0)
                            else if (sortAz === '0')
                                return (e.apodo < e2.apodo)?1:((e.apodo > e2.apodo)?-1:0)
                        }
                        )
                        // opción con operador ternario, misma solución
                        // sort((e, e2) => (
                        //     (sortAz === '1')?(e.apodo > e2.apodo)?1:((e.apodo < e2.apodo)?-1:0)
                        //     :
                        //     (sortAz === '0')?(e.apodo < e2.apodo)?1:((e.apodo > e2.apodo)?-1:0)
                        //     :0
                        // )
                        // )
                        
                        .map(p =>
                        <div className='col-12 col-md-6 col-lg-3 text-white mb-4' key={p.personaje}>
                            <div className='card' >
                                <div className='card-header'><h5>{p.personaje}</h5></div>    
                                <img src={p.imagen} className="card-img-top" alt="..."></img>
                                <div className='card-body'>
                                    <div className='card-title'><h2>{p.apodo}</h2></div>    
                                </div>
                                <ul className='list-group list-group-flush'>
                                    <li className='list-group-item list-group-item-dark'>Casa : {p.casaDeHogwarts}</li>
                                </ul>
                            </div>
                        </div>    
                    )
                    }
                </div>
            </main>

            <section className='hechizos-section'>
                    <div className='row gx-4'>
                        <h2 className='section-title'>Hechizos</h2>
                        {hechizos.map(h =>
                            <div className='col-6 col-md-6 col-lg-3 text-white mb-2' key={h.id}>
                                
                                <Modal hechizo_iso={h.hechizo_iso} uso={h.uso}/>
                                
                            </div>
                        )
                        }
                    </div>
            </section>
        </div>
        
    </div>
  )
}

export default MiApi