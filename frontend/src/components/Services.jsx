import React from 'react';
import { Stethoscope, Syringe, ShieldCheck, AlertCircle } from 'lucide-react';
import { services } from '../data/mock';

const iconMap = {
  Stethoscope,
  Syringe,
  ShieldCheck,
  AlertCircle
};

const Services = () => {
  return (
    <section id="servicios" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Nuestros Servicios
          </h2>
          <p className="text-lg text-slate-600">
            Atención veterinaria integral para el bienestar de tus mascotas
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon];
            return (
              <div
                key={service.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Why Choose Us */}
        <div className="mt-20 bg-gradient-to-br from-blue-50 to-amber-50 rounded-3xl p-8 md:p-12 max-w-6xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center">
            ¿Por qué elegirnos?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Profesionalidad</h4>
              <p className="text-slate-600">
                Equipo veterinario con amplia experiencia y formación continua
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Stethoscope className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Trato Cercano</h4>
              <p className="text-slate-600">
                Atención personalizada y cariñosa para cada mascota
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Precios Ajustados</h4>
              <p className="text-slate-600">
                Calidad veterinaria accesible para todas las familias
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
