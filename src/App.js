import React, { useEffect, useState } from 'react'
import { app } from './credencialesFB'
import swal from 'sweetalert';

function App() {

  const [archivoUrl, setArchivoUrl] = useState("");
  const [docus, setDocus] = useState([]);

  const archivoHandler = async(e) =>{
    const archivo = e.target.files[0];
    const storageRef = app.storage().ref();
    const archivoPath = storageRef.child(archivo.name);
    await archivoPath.put(archivo);
    console.log("archivo cargado:", archivo.name);
    const enlaceUrl = await archivoPath.getDownloadURL();

    setArchivoUrl(enlaceUrl);
  }

  const submitHandler = async(e) =>{
    e.preventDefault();
    const nombreArchivo = e.target.nombre.value;
    if(!nombreArchivo){
      swal("Oops!", "la imágen debe tener un nombre", "error");
      return;
    }
    const coleccionRef = app.firestore().collection("archivos");
    const docu = await coleccionRef.doc(nombreArchivo).set({
        nombre: nombreArchivo,
        url: archivoUrl 
    })
    console.log(`archivo ${nombreArchivo} cargado con url: ${archivoUrl}`)
    swal("Imágen subida", "Tu imagen ha sido subida", "success");
  }

  const obtenerInfo = async() => {
    const docusList = await app.firestore().collection("archivos").get();
    setDocus(docusList.docs.map((doc)=> doc.data()));
  }

  useEffect(() => {
    obtenerInfo()
  }, [])
  

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input type="file" onChange={archivoHandler} />
        <input type="text" name='nombre' placeholder='ponle un nombre a la imagen'/>
        <button>Enviar</button>
      </form>

      <ul>
      {docus.map((doc) => <li key={doc.url}><h3>{doc.nombre}</h3> <img src={doc.url} width="300px" height="250px" style={{objectFit:  "scale-down"}} /></li>)}
      </ul>

    </div>
  );
}

export default App;
