import {useState, useEffect} from 'react';
import Error from './Error';

const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {
  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');

  const [error, setError] = useState(false);

  useEffect( () => {
    // detecta que paciente no esté vacio
    if( Object.keys(paciente).length > 0) {
      // y cambiamos el valor al set
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(paciente.fecha)
      setSintomas(paciente.sintomas)
    }
  }, [paciente])

  const generarId = () => {
    const random = Math.random().toString(36).substr(2);
    const fecha = Date.now().toString(36);

    return random + fecha
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validacion de formulario
    if([ nombre, propietario, email, fecha, sintomas ].includes('')) {
      console.log('todos deben estar llenos')

      setError(true)
      return;
    } 

    setError(false);

    // Objeto de paciente
    const objetoPaciente = {
      nombre,
      propietario,
      email,
      fecha,
      sintomas
    }

    if(paciente.id){
      // Editando el registro
      objetoPaciente.id = paciente.id;

      const pacienteActualizado = pacientes.map( pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState )

      setPacientes(pacienteActualizado);
      setPaciente({})

    } else {
      // nuevo registro
      objetoPaciente.id = generarId();
        // toma una copia de paciente y agrega un nuevo objeto
        setPacientes([...pacientes, objetoPaciente]); // metodo inmutable
    }
  
    // Reiniciar el form
    setNombre('')
    setPropietario('')
    setEmail('')
    setFecha('')
    setSintomas('')
    
  }


  return (
    <div className="md:w-1/2 lg:w-2/5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
    
      <p className="text-lg mt-5 text-center mb-10">
        Añade Pacientes y <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form 
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg py-10 px-5 mb-10 mx-5"
      >

        {error && <Error><p>Todos los campos son obligatorios</p></Error>}
        
        <div className="mb-5">
          <label className="block text-gray-700 uppercase" htmlFor="mascota">Nombre Mascota</label>

          <input 
            type="text" 
            placeholder="Nombre de la Mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            id="mascota"
            value={nombre}
            onChange={ (e) => setNombre(e.target.value)}
          />

        </div>

        <div className="mb-5">
          <label className="block text-gray-700 uppercase" 
                  htmlFor="propietario">
            Nombre del propietario
          </label>

          <input 
            type="text" 
            placeholder="Nombre del Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            id="propietario"
            value={propietario}
            onChange={ (e) => setPropietario(e.target.value) }
          />

        </div>

        <div className="mb-5">
          <label className="block text-gray-700 uppercase" 
                  htmlFor="email">
            Tu Correo
          </label>

          <input 
            type="email" 
            placeholder="Tu Email de contacto"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            id="email"
            value={email}
            onChange={ (e) => setEmail(e.target.value) }
          />

        </div>

        <div className="mb-5">
          <label className="block text-gray-700 uppercase" 
                  htmlFor="alta">
            Alta
          </label>

          <input 
            type="date" 
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            id="alta"
            value={fecha}
            onChange={ (e) => setFecha(e.target.value) }
          />

        </div>

        <div className="mb-5">
          <label className="block text-gray-700 uppercase" 
                  htmlFor="síntomas">
            Sintomas
          </label>

          <textarea 
            id="sintomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Describre los síntomas"
            value={sintomas}
            onChange={ (e) => setSintomas(e.target.value) }
          />

        </div>

        <input 
          type="submit" 
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all"
          value={ paciente.id ? 'Editar Paciente' : 'Agregar Paciente'}

        />
      </form>
    </div>
  )
}

export default Formulario
