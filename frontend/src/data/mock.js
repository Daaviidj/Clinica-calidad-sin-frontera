// Mock data para Veterinaria Calidad Sin Frontera

export const clinicInfo = {
  name: "VETERINARIA CALIDAD SIN FRONTERA",
  slogan: "Somos una familia, somos Calidad sin Frontera",
  whatsappGroup: "https://chat.whatsapp.com/EpZZstdpeuX0UaGoc9h6RQ",
  rating: 4.9,
  totalReviews: 62,
  logo: "https://customer-assets.emergentagent.com/job_petcare-madrid/artifacts/vv6t2w8g_image.png"
};

export const locations = [
  {
    id: 1,
    name: "MORATALAZ",
    address: "C/ Arroyo de Fontarrón 49",
    phones: ["911 646 681", "625 188 263"],
    schedule: {
      weekdays: "Lunes a Viernes: 9:15 - 19:30",
      saturday: "Sábados: 9:30 - 13:30",
      sunday: "Domingos: Cerrado"
    }
  },
  {
    id: 2,
    name: "VALLECAS",
    address: "C/ Benjamín Palencia 29",
    phones: ["910 270 057", "665 150 743"],
    schedule: {
      weekdays: "Lunes a Viernes: 9:15 - 19:30",
      saturday: "Sábados: 9:30 - 13:30",
      sunday: "Domingos: Cerrado"
    }
  },
  {
    id: 3,
    name: "VICÁLVARO",
    address: "C/ Villacarlos N° 9",
    phones: ["685 373 084"],
    schedule: {
      weekdays: "Lunes a Viernes: 9:15 - 19:30",
      saturday: "Sábados: 9:30 - 13:30",
      sunday: "Domingos: Cerrado"
    }
  }
];

export const services = [
  {
    id: 1,
    title: "Consultas Generales",
    description: "Atención veterinaria integral para tu mascota con profesionales experimentados.",
    icon: "Stethoscope",
    image: "https://images.unsplash.com/photo-1733783489145-f3d3ee7a9ccf"
  },
  {
    id: 2,
    title: "Vacunación",
    description: "Programas completos de vacunación para proteger la salud de tus peludos.",
    icon: "Syringe",
    image: "https://images.unsplash.com/photo-1719464454959-9cf304ef4774"
  },
  {
    id: 3,
    title: "Desparasitación",
    description: "Tratamientos preventivos y curativos contra parásitos internos y externos.",
    icon: "ShieldCheck",
    image: "https://images.unsplash.com/photo-1700665537604-412e89a285c3"
  },
  {
    id: 4,
    title: "Urgencias",
    description: "Atención de emergencias para cuando tu mascota más te necesita.",
    icon: "AlertCircle",
    image: "https://images.pexels.com/photos/6234975/pexels-photo-6234975.jpeg"
  }
];

export const testimonials = [
  {
    id: 1,
    name: "M Pg",
    rating: 5,
    text: "Maravilloso trato por parte de Jesús. Un gran profesional además de amable, simpático y cariñoso con los animales. De 10! Precios ajustados.",
    image: "https://images.unsplash.com/photo-1509205477838-a534e43a849f"
  },
  {
    id: 2,
    name: "Cliente Satisfecho",
    rating: 5,
    text: "Excelente trato, mucha profesionalidad y calidad como indica su nombre.",
    image: "https://images.unsplash.com/photo-1450778869180-41d0601e046e"
  },
  {
    id: 3,
    name: "Dueño Feliz",
    rating: 5,
    text: "Súper recomendable por el buen trato a los peludos, Lía, Noa y Gema os quieren!!",
    image: "https://images.unsplash.com/photo-1756459078941-4e2f042d161d"
  },
  {
    id: 4,
    name: "Familia Agradecida",
    rating: 5,
    text: "Excelente servicio pero sobre todo que trabajan con amor y compromiso.",
    image: "https://images.pexels.com/photos/5763563/pexels-photo-5763563.jpeg"
  }
];

export const heroImages = [
  "https://images.unsplash.com/photo-1700665537650-1bf37979aae0",
  "https://images.unsplash.com/photo-1721907043440-888865b86a1f",
  "https://images.pexels.com/photos/6235110/pexels-photo-6235110.jpeg"
];

// Mock function para simular guardado de citas
export const saveAppointment = (appointmentData) => {
  console.log("Cita guardada:", appointmentData);
  const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
  const newAppointment = {
    ...appointmentData,
    id: Date.now(),
    createdAt: new Date().toISOString()
  };
  appointments.push(newAppointment);
  localStorage.setItem('appointments', JSON.stringify(appointments));
  return { success: true, data: newAppointment };
};
