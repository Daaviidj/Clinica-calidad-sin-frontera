import React, { useState, useEffect } from 'react';
import { Phone, MapPin, Star, ArrowRight } from 'lucide-react';
import { clinicInfo, heroImages } from '../data/mock';

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="inicio" className="pt-24 md:pt-28 pb-16 md:pb-20 bg-gradient-to-br from-blue-50 via-white to-amber-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Left Content */}
          <div className="space-y-6 lg:space-y-8">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-semibold">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>{clinicInfo.rating} en Google • {clinicInfo.totalReviews} reseñas</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
              Cuidado Veterinario con{' '}
              <span className="text-blue-600">Amor y Profesionalidad</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
              {clinicInfo.slogan}. Atendemos a tus mascotas con la dedicación y cariño que merecen en nuestras 3 clínicas de Madrid.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollToSection('citas')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
              >
                Solicitar Cita
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href={clinicInfo.whatsappGroup}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105 shadow-lg hover:shadow-xl text-center"
              >
                Únete al Grupo WhatsApp
              </a>
            </div>

            {/* Quick Info */}
            <div className="flex flex-col sm:flex-row gap-6 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900">3 Clínicas</div>
                  <div className="text-sm text-slate-600">Madrid</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900">Llámanos</div>
                  <div className="text-sm text-slate-600">Varias líneas</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Images */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              {heroImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Veterinaria ${index + 1}`}
                  className={`w-full h-[400px] md:h-[500px] object-cover transition-opacity duration-1000 ${
                    index === currentImageIndex ? 'opacity-100' : 'opacity-0 absolute inset-0'
                  }`}
                />
              ))}
            </div>

            {/* Floating Cards */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 hidden md:block">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-green-600 fill-green-600" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">+5000</div>
                  <div className="text-sm text-slate-600">Mascotas Felices</div>
                </div>
              </div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentImageIndex ? 'w-8 bg-blue-600' : 'w-2 bg-slate-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
