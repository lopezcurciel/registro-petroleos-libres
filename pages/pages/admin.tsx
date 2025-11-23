import { useState } from 'react';

export default function Admin() {
  const [pass, setPass] = useState('');
  const [logged, setLogged] = useState(false);

  if (!logged) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
        <div className="bg-white p-12 rounded-2xl shadow-2xl max-w-md w-full text-center">
          <h1 className="text-4xl font-bold mb-10">Backoffice Petroleos Libres</h1>
          <input type="password" placeholder="Contraseña" className="w-full p-4 text-xl border rounded-xl mb-6" onChange={e => setPass(e.target.value)} />
          <button onClick={() => pass === 'petroleos2025' && setLogged(true)} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 rounded-xl text-xl">
            Entrar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold text-center mb-10">Clientes registrados</h1>
      <p className="text-center text-2xl text-gray-700">¡Todo listo! En cuanto alguien rellene el formulario aparecerá aquí con su PDF.</p>
    </div>
  );
}
