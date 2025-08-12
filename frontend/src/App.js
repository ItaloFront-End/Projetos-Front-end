import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import FAQ from './components/FAQ';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppFloat from './components/WhatsAppFloat';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Scroll suave para navegação
const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  element?.scrollIntoView({ behavior: 'smooth' });
};

// Hook para animações on scroll
const useScrollAnimation = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeInUp');
          }
        });
      },
      { threshold: 0.1 }
    );

    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
};

// Componente Header
const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-105 transition-transform duration-300">
              ID
            </div>
            <span className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
              ItaloDev
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="#servicos" 
              onClick={(e) => { e.preventDefault(); scrollToSection('servicos'); }}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300 hover:scale-105 transform"
            >
              Serviços
            </a>
            <a 
              href="#sobre" 
              onClick={(e) => { e.preventDefault(); scrollToSection('sobre'); }}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300 hover:scale-105 transform"
            >
              Sobre
            </a>
            <a 
              href="#portfolio" 
              onClick={(e) => { e.preventDefault(); scrollToSection('portfolio'); }}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300 hover:scale-105 transform"
            >
              Portfólio
            </a>
            <a 
              href="#depoimentos" 
              onClick={(e) => { e.preventDefault(); scrollToSection('depoimentos'); }}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300 hover:scale-105 transform"
            >
              Depoimentos
            </a>
            <a 
              href="#contato" 
              onClick={(e) => { e.preventDefault(); scrollToSection('contato'); }}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Orçamento
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors duration-300"
          >
            <div className="w-6 h-6 relative">
              <span className={`block absolute h-0.5 w-6 bg-current transform transition duration-300 ${isMobileMenuOpen ? 'rotate-45 top-3' : 'top-1'}`}></span>
              <span className={`block absolute h-0.5 w-6 bg-current transform transition duration-300 top-3 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block absolute h-0.5 w-6 bg-current transform transition duration-300 ${isMobileMenuOpen ? '-rotate-45 top-3' : 'top-5'}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 animate-fadeInDown">
            <div className="flex flex-col space-y-3">
              <a 
                href="#servicos" 
                onClick={(e) => { e.preventDefault(); scrollToSection('servicos'); setIsMobileMenuOpen(false); }}
                className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors duration-300"
              >
                Serviços
              </a>
              <a 
                href="#sobre" 
                onClick={(e) => { e.preventDefault(); scrollToSection('sobre'); setIsMobileMenuOpen(false); }}
                className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors duration-300"
              >
                Sobre
              </a>
              <a 
                href="#portfolio" 
                onClick={(e) => { e.preventDefault(); scrollToSection('portfolio'); setIsMobileMenuOpen(false); }}
                className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors duration-300"
              >
                Portfólio
              </a>
              <a 
                href="#depoimentos" 
                onClick={(e) => { e.preventDefault(); scrollToSection('depoimentos'); setIsMobileMenuOpen(false); }}
                className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors duration-300"
              >
                Depoimentos
              </a>
              <a 
                href="#contato" 
                onClick={(e) => { e.preventDefault(); scrollToSection('contato'); setIsMobileMenuOpen(false); }}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-full font-semibold text-center hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg"
              >
                Orçamento
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

// Componente Hero
const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center pt-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-on-scroll">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
                Crie seu site 
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {' '}profissional
                </span>
                <br />
                com a ItaloDev
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Sites rápidos, modernos e responsivos para empresas e profissionais 
                que querem se destacar no mundo digital.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#contato" 
                onClick={(e) => { e.preventDefault(); scrollToSection('contato'); }}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-full font-semibold hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-center"
              >
                Solicitar orçamento
              </a>
              <a 
                href="#portfolio" 
                onClick={(e) => { e.preventDefault(); scrollToSection('portfolio'); }}
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full font-semibold hover:border-blue-600 hover:text-blue-600 transform hover:scale-105 transition-all duration-300 text-center"
              >
                Ver portfólio
              </a>
            </div>
          </div>
          <div className="relative animate-on-scroll">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl blur-lg opacity-20 animate-pulse"></div>
            <img 
              src="https://images.unsplash.com/photo-1457305237443-44c3d5a30b89?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudHxlbnwwfHx8fDE3NTUwMjU2ODB8MA&ixlib=rb-4.1.0&q=85"
              alt="Desenvolvimento Web Profissional"
              className="relative z-10 rounded-3xl shadow-2xl w-full hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// Componente Services
const Services = () => {
  const services = [
    {
      title: "Criação de Sites",
      description: "Sites institucionais completos, com design moderno e responsivo para empresas de todos os portes.",
      icon: "🌐",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXNpZ258ZW58MHx8fHwxNzU1MDI1NzI1fDA&ixlib=rb-4.1.0&q=85"
    },
    {
      title: "Loja Virtual",
      description: "E-commerce completo com integração de pagamentos, catálogo de produtos e painel administrativo.",
      icon: "🛍️",
      image: "https://images.unsplash.com/photo-1688561808434-886a6dd97b8c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2V8ZW58MHx8fHwxNzU1MDI1NzE5fDA&ixlib=rb-4.1.0&q=85"
    },
    {
      title: "Design Personalizado",
      description: "Layout exclusivo que transmite a identidade da sua marca e conecta com seu público-alvo.",
      icon: "🎨",
      image: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwzfHxncmFwaGljJTIwZGVzaWdufGVufDB8fHx8MTc1NTAyNTczN3ww&ixlib=rb-4.1.0&q=85"
    }
  ];

  return (
    <section id="servicos" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Nossos Serviços
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Oferecemos soluções completas para sua presença digital, desde sites institucionais até e-commerce avançado.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden animate-on-scroll border border-gray-100 hover:border-blue-200"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={service.image}
                  alt={service.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/40 transition-all duration-300"></div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center text-2xl shadow-lg">
                  {service.icon}
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Componente About
const About = () => {
  return (
    <section id="sobre" className="py-20 bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-on-scroll">
            <img 
              src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwzfHx0ZWNobm9sb2d5fGVufDB8fHx8MTc1NTAyNTY4NXww&ixlib=rb-4.1.0&q=85"
              alt="Sobre a ItaloDev"
              className="rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>
          <div className="space-y-6 animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
              Sobre a 
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {' '}ItaloDev
              </span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Somos especialistas em criar sites de alto desempenho para micro, pequenas e médias empresas, 
              focando em performance, SEO e conversão.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Com anos de experiência no mercado digital, desenvolvemos soluções personalizadas que 
              realmente fazem a diferença para nossos clientes, combinando design moderno com 
              tecnologia de ponta.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">50+</div>
                <div className="text-gray-600">Projetos Concluídos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">100%</div>
                <div className="text-gray-600">Clientes Satisfeitos</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Componente Portfolio
const Portfolio = () => {
  const portfolioItems = [
    {
      title: "Site de Referência",
      description: "Confira um exemplo de site que desenvolvi com design moderno e funcionalidades avançadas!",
      link: "https://itallodev.criarsite.online/",
      image: "https://images.pexels.com/photos/39284/macbook-apple-imac-computer-39284.jpeg"
    }
  ];

  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Portfólio
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Conheça alguns dos projetos que desenvolvemos para nossos clientes.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => (
            <div 
              key={index}
              className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden animate-on-scroll border border-gray-100"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4">
                    <a 
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-gray-800 px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300"
                    >
                      Ver Site
                    </a>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {item.description}
                </p>
                <a 
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-300 inline-flex items-center"
                >
                  Visitar Site →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Componente Testimonials
const Testimonials = () => {
  const testimonials = [
    {
      text: "Meu novo site ficou incrível! Atendimento rápido, profissional e resultado além das expectativas.",
      author: "Maria Souza",
      role: "Empresária",
      rating: 5
    },
    {
      text: "ItaloDev superou minhas expectativas. Site moderno, responsivo e com ótima performance. Recomendo sem pensar duas vezes!",
      author: "João Pereira",
      role: "Consultor",
      rating: 5
    },
    {
      text: "Excelente trabalho! Site entregue no prazo e com qualidade excepcional. Já indiquei para outros colegas.",
      author: "Ana Silva",
      role: "Dentista",
      rating: 5
    }
  ];

  return (
    <section id="depoimentos" className="py-20 bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Depoimentos
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Veja o que nossos clientes dizem sobre nosso trabalho.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 animate-on-scroll"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">⭐</span>
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic leading-relaxed">
                "{testimonial.text}"
              </p>
              <div>
                <div className="font-bold text-gray-800">{testimonial.author}</div>
                <div className="text-blue-600 text-sm">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Componente Contact Form
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Aqui você pode integrar com o backend
      const response = await axios.post(`${API}/contact`, formData);
      setSubmitMessage('Mensagem enviada com sucesso! Entraremos em contato em breve.');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      setSubmitMessage('Erro ao enviar mensagem. Tente novamente.');
    }
    
    setIsSubmitting(false);
    setTimeout(() => setSubmitMessage(''), 5000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contato" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Solicite um Orçamento
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Entre em contato e receba uma proposta personalizada para seu projeto.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Formulário */}
          <div className="animate-on-scroll">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Nome *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                  placeholder="Seu nome completo"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                  placeholder="seu@email.com"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Telefone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                  placeholder="(11) 99999-9999"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Mensagem *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                  placeholder="Descreva seu projeto ou dúvida..."
                ></textarea>
              </div>
              
              {submitMessage && (
                <div className={`p-4 rounded-lg ${submitMessage.includes('sucesso') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {submitMessage}
                </div>
              )}
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
              </button>
            </form>
          </div>
          
          {/* Informações de Contato */}
          <div className="animate-on-scroll space-y-8">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-3xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Entre em contato</h3>
              <div className="space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  Responderemos em até 24 horas com uma proposta personalizada para seu projeto.
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">📱</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">WhatsApp</div>
                    <div className="text-gray-600">(81) 9 8559-6965</div>
                  </div>
                </div>
              </div>
            </div>
            
            <a 
              href="https://wa.me/5581985596965" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-center"
            >
              💬 Falar no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// Componente Footer
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="flex justify-center items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white font-bold text-lg">
            ID
          </div>
          <span className="text-2xl font-bold">ItaloDev</span>
        </div>
        <p className="text-gray-400 mb-6">
          Criando experiências digitais incríveis desde 2020.
        </p>
        <div className="border-t border-gray-700 pt-6">
          <p className="text-gray-400">
            © {new Date().getFullYear()} ItaloDev - Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

// Componente Principal
function App() {
  useScrollAnimation();

  // Test API connection
  useEffect(() => {
    const testConnection = async () => {
      try {
        const response = await axios.get(`${API}/`);
        console.log('Backend connected:', response.data.message);
      } catch (error) {
        console.error('Backend connection failed:', error);
      }
    };
    testConnection();
  }, []);

  return (
    <div className="App">
      <Header />
      <Hero />
      <Services />
      <About />
      <Portfolio />
      <Testimonials />
      <FAQ />
      <ContactForm />
      <Footer />
      <ScrollToTop />
      <WhatsAppFloat />
    </div>
  );
}

export default App;