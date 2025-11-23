import { useState, useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';

export default function Home() {
  const [form, setForm] = useState({
    name: '', dni: '', email: '', phone: '', plates: '', billing: '', acepta: false
  });
  const sigRef = useRef<any>();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!form.acepta || sigRef.current?.isEmpty()) {
      alert('Debes firmar y aceptar la política de protección de datos');
      return;
    }

    const signature = sigRef.current?.toDataURL();

    const res = await fetch('/api/registro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, signature })
    });

    if (res.ok) {
      alert('¡Registro enviado! Revisa tu email.');
      sigRef.current?.clear();
      setForm({ name: '', dni: '', email: '', phone: '', plates: '', billing: '', acepta: false });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Petroleos Libres S.L.</h1>
          <p className="text-gray-600 mt-2">Registro para facturación</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input required placeholder="Nombre o Razón Social" className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent" onChange={e => setForm({...form, name: e.target.value})} />
          <input required placeholder="DNI / CIF" className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500" onChange={e => setForm({...form, dni: e.target.value})} />
          <input required type="email" placeholder="Email" className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500" onChange={e => setForm({...form, email: e.target.value})} />
          <input required placeholder="Teléfono" className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500" onChange={e => setForm({...form, phone: e.target.value})} />
          <textarea placeholder="Matrículas (una por línea)" rows={3} className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500" onChange={e => setForm({...form, plates: e.target.value})} />

          <select required className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500" onChange={e => setForm({...form, billing: e.target.value})}>
            <option value="">Tipo de facturación</option>
            <option>Diaria</option>
            <option>Semanal</option>
            <option>Quincenal</option>
            <option>Mensual</option>
          </select>

          <label className="flex items-start gap-3">
            <input type="checkbox" required className="mt-1" onChange={e => setForm({...form, acepta: e.target.checked})} />
            <span className="text-sm text-gray-700">Acepto la <a href="/politica" className="text-blue-600 underline">Política de Protección de Datos</a> (obligatorio)</span>
          </label>

          <div className="border-2 border-gray-300 rounded-xl p-4 bg-white">
            <p className="text-sm font-medium mb-2">Firma aquí con el dedo:</p>
            <SignatureCanvas ref={sigRef} canvasProps={{className: 'border border-gray-400 rounded-lg w-full h-48 bg-white'}} />
            <button type="button" onClick={() => sigRef.current?.clear()} className="text-sm text-blue-600 mt-2">Borrar firma</button>
          </div>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 rounded-xl text-lg transition">
            Enviar y Firmar
          </button>
        </form>
      </div>
    </div>
  );
}
