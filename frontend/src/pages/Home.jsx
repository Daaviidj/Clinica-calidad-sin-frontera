import React, { useState } from 'react';
import { Phone, MapPin, Clock, Star, Heart, Users, Award } from 'lucide-react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Locations from '../components/Locations';
import Testimonials from '../components/Testimonials';
import AppointmentForm from '../components/AppointmentForm';
import Footer from '../components/Footer';
import { clinicInfo } from '../data/mock';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header />
      <Hero />
      
      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <Heart className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-slate-800 mb-1">+5000</div>
              <div className="text-sm text-slate-600">Mascotas Atendidas</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
                  <Star className="w-8 h-8 text-amber-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-slate-800 mb-1">{clinicInfo.rating}</div>
              <div className="text-sm text-slate-600">Valoración Google</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-slate-800 mb-1">3</div>
              <div className="text-sm text-slate-600">Clínicas en Madrid</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center">
                  <Award className="w-8 h-8 text-rose-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-slate-800 mb-1">+10</div>
              <div className="text-sm text-slate-600">Años Experiencia</div>
            </div>
          </div>
        </div>
      </section>

      <Services />
      <Testimonials />
      <Locations />
      <AppointmentForm />
      <Footer />
    </div>
  );
};

export default Home;
