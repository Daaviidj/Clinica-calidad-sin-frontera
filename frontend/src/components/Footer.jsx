import React from 'react';
import { Heart, Phone, MapPin, Mail, Instagram, MessageCircle } from 'lucide-react';
import { clinicInfo, locations } from '../data/mock';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img 
                src={clinicInfo.logo} 
                alt={clinicInfo.name}
                className="h-10 w-10 object-contain"
              />
              <h3 className="text-xl font-bold">CALIDAD SIN FRONTERA</h3>
            </div>
            <p className="text-slate-400 mb-4 leading-relaxed">
              {clinicInfo.slogan}
            </p>
            <div className="flex items-center gap-2 text-amber-500">
              <Heart className="w-5 h-5 fill-amber-500" />
              <span className="font-semibold">Cuidando mascotas desde hace más de 10 años</span>
            </div>
          </div>

          {/* Locations */}
          <div>
            <h4 className="text-lg font-bold mb-4">Nuestras Clínicas</h4>
            <ul className="space-y-3">
              {locations.map(location => (
                <li key={location.id} className="text-slate-400 hover:text-white transition-colors">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5 text-blue-400" />
                    <div>
                      <div className="font-semibold text-white">{location.name}</div>
                      <div className="text-sm">{location.address}</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-4">Servicios</h4>
            <ul className="space-y-2 text-slate-400">
              <li className="hover:text-white transition-colors cursor-pointer">Consultas Generales</li>
              <li className="hover:text-white transition-colors cursor-pointer">Vacunación</li>
              <li className="hover:text-white transition-colors cursor-pointer">Desparasitación</li>
              <li className="hover:text-white transition-colors cursor-pointer">Urgencias</li>
              <li className="hover:text-white transition-colors cursor-pointer">Cirugías</li>
              <li className="hover:text-white transition-colors cursor-pointer">Peluquería</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="tel:911646681"
                  className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors"
                >
                  <Phone className="w-5 h-5 text-blue-400" />
                  <span>911 646 681</span>
                </a>
              </li>
              <li>
                <a 
                  href={clinicInfo.whatsappGroup}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors"
                >
                  <MessageCircle className="w-5 h-5 text-green-400" />
                  <span>Grupo WhatsApp</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors"
                >
                  <Instagram className="w-5 h-5 text-pink-400" />
                  <span>@calidadsinfrontera</span>
                </a>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="flex gap-3 mt-6">
              <a
                href={clinicInfo.whatsappGroup}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center transition-all hover:scale-110"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-pink-500 hover:bg-pink-600 rounded-full flex items-center justify-center transition-all hover:scale-110"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">
              © {currentYear} Veterinaria Calidad Sin Frontera. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <span>Hecho con</span>
              <Heart className="w-4 h-4 fill-red-500 text-red-500" />
              <span>para tus mascotas</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
