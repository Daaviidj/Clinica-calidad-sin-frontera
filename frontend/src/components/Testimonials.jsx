import React from 'react';
import { Star, Quote } from 'lucide-react';
import { testimonials } from '../data/mock';

const Testimonials = () => {
  return (
    <section id="testimonios" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Lo que Dicen Nuestros Clientes
          </h2>
          <p className="text-lg text-slate-600">
            La satisfacción de nuestros clientes y sus mascotas es nuestra mejor carta de presentación
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gradient-to-br from-blue-50 to-amber-50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 opacity-20">
                <Quote className="w-12 h-12 text-blue-600" />
              </div>

              {/* Image */}
              <div className="mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-full h-40 object-cover rounded-xl"
                />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                ))}
              </div>

              {/* Text */}
              <p className="text-slate-700 mb-4 leading-relaxed text-sm">
                "{testimonial.text}"
              </p>

              {/* Name */}
              <p className="font-semibold text-slate-900">{testimonial.name}</p>
            </div>
          ))}
        </div>

        {/* Google Rating CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 bg-white shadow-xl rounded-2xl px-8 py-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Star className="w-6 h-6 fill-amber-500 text-amber-500" />
                <span className="text-3xl font-bold text-slate-900">4.9</span>
              </div>
              <p className="text-sm text-slate-600">Valoración en Google</p>
            </div>
            <div className="h-12 w-px bg-slate-200" />
            <div>
              <div className="text-3xl font-bold text-slate-900 mb-1">62</div>
              <p className="text-sm text-slate-600">Reseñas</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
