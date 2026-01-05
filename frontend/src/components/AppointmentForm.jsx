import React, { useState } from 'react';
import { Calendar, User, Phone, Mail, MessageSquare, MapPin, Send, CheckCircle } from 'lucide-react';
import { locations } from '../data/mock';
import { toast } from 'sonner';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    petName: '',
    ownerName: '',
    phone: '',
    email: '',
    location: '',
    description: '',
    preferredDate: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validación básica
    if (!formData.ownerName || !formData.phone || !formData.description) {
      toast.error('Por favor completa los campos obligatorios');
      return;
    }

    setIsSubmitting(true);

    try {
      // Enviar al backend
      const response = await axios.post(`${BACKEND_URL}/api/appointments`, {
        pet_name: formData.petName,
        owner_name: formData.ownerName,
        phone: formData.phone,
        email: formData.email,
        location: formData.location,
        preferred_date: formData.preferredDate,
        description: formData.description
      });

      if (response.data) {
        setIsSubmitted(true);
        toast.success('¡Solicitud enviada! Te contactaremos pronto');

        // Reset después de 3 segundos
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            petName: '',
            ownerName: '',
            phone: '',
            email: '',
            location: '',
            description: '',
            preferredDate: ''
          });
        }, 3000);
      }
    } catch (error) {
      console.error('Error al enviar solicitud:', error);
      toast.error('Error al enviar la solicitud. Por favor intenta de nuevo.');
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section id="citas" className="py-16 md:py-24 bg-gradient-to-br from-blue-50 via-white to-amber-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-4">
                ¡Solicitud Recibida!
              </h3>
              <p className="text-lg text-slate-600 mb-2">
                Hemos recibido tu solicitud de cita correctamente.
              </p>
              <p className="text-slate-600">
                Nos pondremos en contacto contigo en las próximas horas para confirmar la cita.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="citas" className="py-16 md:py-24 bg-gradient-to-br from-blue-50 via-white to-amber-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Solicita tu Cita
          </h2>
          <p className="text-lg text-slate-600">
            Cuéntanos qué le pasa a tu mascota y nos pondremos en contacto contigo
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid lg:grid-cols-5">
              {/* Left Side - Info */}
              <div className="lg:col-span-2 bg-gradient-to-br from-blue-600 to-blue-700 p-8 md:p-10 text-white">
                <h3 className="text-2xl font-bold mb-6">¿Por qué solicitar cita online?</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Rápido y Fácil</h4>
                      <p className="text-sm text-blue-100">Sin necesidad de llamar, solicita tu cita en minutos</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Atención Personalizada</h4>
                      <p className="text-sm text-blue-100">Nos adaptamos a tus necesidades y horarios</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Respuesta Inmediata</h4>
                      <p className="text-sm text-blue-100">Te contactaremos en las próximas horas</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/20">
                  <p className="text-sm text-blue-100 mb-2">¿Prefieres llamar?</p>
                  <p className="font-semibold">Consulta nuestras ubicaciones</p>
                </div>
              </div>

              {/* Right Side - Form */}
              <div className="lg:col-span-3 p-8 md:p-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Pet Name */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Nombre de tu mascota
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        name="petName"
                        value={formData.petName}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        placeholder="Ej: Luna, Max, Toby..."
                        className="w-full pl-11 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Owner Name */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Tu nombre <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        name="ownerName"
                        value={formData.ownerName}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        required
                        placeholder="Tu nombre completo"
                        className="w-full pl-11 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Phone and Email */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Teléfono <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          disabled={isSubmitting}
                          required
                          placeholder="600 123 456"
                          className="w-full pl-11 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          disabled={isSubmitting}
                          placeholder="tu@email.com"
                          className="w-full pl-11 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Clínica preferida
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <select
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="w-full pl-11 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors appearance-none bg-white"
                      >
                        <option value="">Selecciona una clínica</option>
                        {locations.map(loc => (
                          <option key={loc.id} value={loc.name}>
                            {loc.name} - {loc.address}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Preferred Date */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Fecha preferida
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="date"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="w-full pl-11 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      ¿Qué le pasa a tu mascota? <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        required
                        rows="4"
                        placeholder="Describe brevemente el motivo de la consulta..."
                        className="w-full pl-11 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors resize-none"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
                    <Send className="w-5 h-5" />
                  </button>

                  <p className="text-xs text-slate-500 text-center">
                    Al enviar este formulario, aceptas que nos pongamos en contacto contigo
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentForm;

  if (isSubmitted) {
    return (
      <section id="citas" className="py-16 md:py-24 bg-gradient-to-br from-blue-50 via-white to-amber-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-4">
                ¡Solicitud Recibida!
              </h3>
              <p className="text-lg text-slate-600 mb-2">
                Hemos recibido tu solicitud de cita correctamente.
              </p>
              <p className="text-slate-600">
                Nos pondremos en contacto contigo en las próximas horas para confirmar la cita.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="citas" className="py-16 md:py-24 bg-gradient-to-br from-blue-50 via-white to-amber-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Solicita tu Cita
          </h2>
          <p className="text-lg text-slate-600">
            Cuéntanos qué le pasa a tu mascota y nos pondremos en contacto contigo
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid lg:grid-cols-5">
              {/* Left Side - Info */}
              <div className="lg:col-span-2 bg-gradient-to-br from-blue-600 to-blue-700 p-8 md:p-10 text-white">
                <h3 className="text-2xl font-bold mb-6">¿Por qué solicitar cita online?</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Rápido y Fácil</h4>
                      <p className="text-sm text-blue-100">Sin necesidad de llamar, solicita tu cita en minutos</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Atención Personalizada</h4>
                      <p className="text-sm text-blue-100">Nos adaptamos a tus necesidades y horarios</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Respuesta Inmediata</h4>
                      <p className="text-sm text-blue-100">Te contactaremos en las próximas horas</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/20">
                  <p className="text-sm text-blue-100 mb-2">¿Prefieres llamar?</p>
                  <p className="font-semibold">Consulta nuestras ubicaciones</p>
                </div>
              </div>

              {/* Right Side - Form */}
              <div className="lg:col-span-3 p-8 md:p-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Pet Name */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Nombre de tu mascota
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        name="petName"
                        value={formData.petName}
                        onChange={handleChange}
                        placeholder="Ej: Luna, Max, Toby..."
                        className="w-full pl-11 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Owner Name */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Tu nombre <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        name="ownerName"
                        value={formData.ownerName}
                        onChange={handleChange}
                        required
                        placeholder="Tu nombre completo"
                        className="w-full pl-11 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Phone and Email */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Teléfono <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          placeholder="600 123 456"
                          className="w-full pl-11 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="tu@email.com"
                          className="w-full pl-11 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Clínica preferida
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <select
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full pl-11 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors appearance-none bg-white"
                      >
                        <option value="">Selecciona una clínica</option>
                        {locations.map(loc => (
                          <option key={loc.id} value={loc.name}>
                            {loc.name} - {loc.address}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Preferred Date */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Fecha preferida
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="date"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleChange}
                        className="w-full pl-11 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      ¿Qué le pasa a tu mascota? <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows="4"
                        placeholder="Describe brevemente el motivo de la consulta..."
                        className="w-full pl-11 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors resize-none"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    Enviar Solicitud
                    <Send className="w-5 h-5" />
                  </button>

                  <p className="text-xs text-slate-500 text-center">
                    Al enviar este formulario, aceptas que nos pongamos en contacto contigo
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentForm;
