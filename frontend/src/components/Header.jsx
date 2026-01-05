import React, { useState, useEffect } from 'react';
import { Phone, Menu, X } from 'lucide-react';
import { clinicInfo } from '../data/mock';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg py-3' : 'bg-white/95 backdrop-blur-sm py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img 
              src={clinicInfo.logo} 
              alt={clinicInfo.name}
              className="h-12 w-12 object-contain"
            />
            <div>
              <h1 className="text-lg md:text-xl font-bold text-blue-700 leading-tight">
                CALIDAD SIN FRONTERA
              </h1>
              <p className="text-xs text-slate-600 hidden md:block">Clínica Veterinaria</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('inicio')}
              className="text-slate-700 hover:text-blue-600 font-medium transition-colors"
            >
              Inicio
            </button>
            <button
              onClick={() => scrollToSection('servicios')}
              className="text-slate-700 hover:text-blue-600 font-medium transition-colors"
            >
              Servicios
            </button>
            <button
              onClick={() => scrollToSection('ubicaciones')}
              className="text-slate-700 hover:text-blue-600 font-medium transition-colors"
            >
              Ubicaciones
            </button>
            <button
              onClick={() => scrollToSection('testimonios')}
              className="text-slate-700 hover:text-blue-600 font-medium transition-colors"
            >
              Opiniones
            </button>
            <button
              onClick={() => scrollToSection('citas')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-all hover:scale-105 shadow-md"
            >
              Solicitar Cita
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:text-blue-600 transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t pt-4 space-y-3">
            <button
              onClick={() => scrollToSection('inicio')}
              className="block w-full text-left text-slate-700 hover:text-blue-600 font-medium py-2 transition-colors"
            >
              Inicio
            </button>
            <button
              onClick={() => scrollToSection('servicios')}
              className="block w-full text-left text-slate-700 hover:text-blue-600 font-medium py-2 transition-colors"
            >
              Servicios
            </button>
            <button
              onClick={() => scrollToSection('ubicaciones')}
              className="block w-full text-left text-slate-700 hover:text-blue-600 font-medium py-2 transition-colors"
            >
              Ubicaciones
            </button>
            <button
              onClick={() => scrollToSection('testimonios')}
              className="block w-full text-left text-slate-700 hover:text-blue-600 font-medium py-2 transition-colors"
            >
              Opiniones
            </button>
            <button
              onClick={() => scrollToSection('citas')}
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all text-center"
            >
              Solicitar Cita
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
