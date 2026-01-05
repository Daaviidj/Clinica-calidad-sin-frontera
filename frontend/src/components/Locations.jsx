import React from 'react';
import { Phone, MapPin, Clock, Navigation } from 'lucide-react';
import { locations } from '../data/mock';

const Locations = () => {
  return (
    <section id="ubicaciones" className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Nuestras Clínicas
          </h2>
          <p className="text-lg text-slate-600">
            3 ubicaciones en Madrid para estar cerca de ti y tu mascota
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {locations.map((location, index) => (
            <div
              key={location.id}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Header with gradient */}
              <div className={`h-32 bg-gradient-to-br ${
                index === 0 ? 'from-blue-500 to-blue-600' :
                index === 1 ? 'from-amber-500 to-orange-500' :
                'from-green-500 to-emerald-600'
              } p-6 text-white relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                <h3 className="text-2xl font-bold relative z-10">{location.name}</h3>
                <div className="flex items-center gap-2 mt-2 relative z-10">
                  <MapPin className="w-4 h-4" />
                  <p className="text-sm text-white/90">{location.address}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Phones */}
                <div>
                  <div className="flex items-center gap-2 text-slate-700 font-semibold mb-2">
                    <Phone className="w-5 h-5 text-blue-600" />
                    <span>Teléfonos</span>
                  </div>
                  <div className="space-y-1 ml-7">
                    {location.phones.map((phone, idx) => (
                      <a
                        key={idx}
                        href={`tel:${phone.replace(/\s/g, '')}`}
                        className="block text-slate-600 hover:text-blue-600 transition-colors font-medium"
                      >
                        {phone}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Schedule */}
                <div>
                  <div className="flex items-center gap-2 text-slate-700 font-semibold mb-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <span>Horario</span>
                  </div>
                  <div className="space-y-1 ml-7 text-sm text-slate-600">
                    <p>{location.schedule.weekdays}</p>
                    <p>{location.schedule.saturday}</p>
                    <p className="text-red-600 font-medium">{location.schedule.sunday}</p>
                  </div>
                </div>

                {/* CTA Button */}
                <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-all hover:scale-105 flex items-center justify-center gap-2">
                  <Navigation className="w-4 h-4" />
                  Cómo Llegar
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Map or Additional Info */}
        <div className="mt-16 max-w-4xl mx-auto bg-blue-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">
            ¿Tienes dudas sobre cuál clínica está más cerca?
          </h3>
          <p className="text-slate-600 mb-6">
            Llámanos o escríbenos por WhatsApp y te ayudaremos a elegir la mejor opción
          </p>
          <a
            href="https://chat.whatsapp.com/EpZZstdpeuX0UaGoc9h6RQ"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold transition-all hover:scale-105"
          >
            Unirse al Grupo WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default Locations;
