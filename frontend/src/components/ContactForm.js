import React, { useState } from 'react';
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Mensagem é obrigatória';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Mensagem deve ter pelo menos 10 caracteres';
    }

    if (formData.phone && !/^[\d\s\-\(\)\+]+$/.test(formData.phone)) {
      newErrors.phone = 'Formato de telefone inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      await axios.post(`${API}/contact`, formData);
      setSubmitStatus({
        type: 'success',
        message: '✅ Mensagem enviada com sucesso! Entraremos em contato em breve.'
      });
      setFormData({ name: '', email: '', phone: '', message: '' });
      setErrors({});
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: '❌ Erro ao enviar mensagem. Tente novamente ou entre em contato via WhatsApp.'
      });
      console.error('Erro ao enviar formulário:', error);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 7000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const formatPhone = (phone) => {
    // Remove todos os caracteres não numéricos
    const cleaned = phone.replace(/\D/g, '');
    
    // Aplica máscara (11) 99999-9999
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhone(e.target.value);
    handleChange({ target: { name: 'phone', value: formatted } });
  };

  return (
    <section id="contato" className="py-20 bg-white relative overflow-hidden">
      {/* Background decorativo */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Solicite um 
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {' '}Orçamento
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Entre em contato e receba uma proposta personalizada para seu projeto. 
            Respondemos em até 24 horas!
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Formulário */}
          <div className="animate-on-scroll">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-100">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nome */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-4 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-4 ${
                      errors.name 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                    } transform focus:scale-105`}
                    placeholder="Seu nome completo"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-2 flex items-center">
                      <span className="mr-1">⚠️</span>
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-4 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-4 ${
                      errors.email 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                    } transform focus:scale-105`}
                    placeholder="seu@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-2 flex items-center">
                      <span className="mr-1">⚠️</span>
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Telefone */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Telefone/WhatsApp
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    className={`w-full px-4 py-4 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-4 ${
                      errors.phone 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                    } transform focus:scale-105`}
                    placeholder="(11) 99999-9999"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-2 flex items-center">
                      <span className="mr-1">⚠️</span>
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Mensagem */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Mensagem *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full px-4 py-4 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-4 resize-none ${
                      errors.message 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                    } transform focus:scale-105`}
                    placeholder="Conte-nos sobre seu projeto: tipo de site, funcionalidades desejadas, prazo, orçamento, etc."
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-2 flex items-center">
                      <span className="mr-1">⚠️</span>
                      {errors.message}
                    </p>
                  )}
                  <div className="text-right text-sm text-gray-500 mt-1">
                    {formData.message.length}/500
                  </div>
                </div>
                
                {/* Status de envio */}
                {submitStatus && (
                  <div className={`p-4 rounded-xl text-center font-medium ${
                    submitStatus.type === 'success' 
                      ? 'bg-green-50 text-green-800 border border-green-200' 
                      : 'bg-red-50 text-red-800 border border-red-200'
                  } animate-fadeInUp`}>
                    {submitStatus.message}
                  </div>
                )}
                
                {/* Botão de envio */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-8 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-3"
                >
                  {isSubmitting ? (
                    <>
                      <LoadingSpinner size="small" color="white" />
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <>
                      <span>Enviar Mensagem</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
          
          {/* Informações de Contato */}
          <div className="animate-on-scroll space-y-8">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-8 rounded-3xl shadow-2xl">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <span className="mr-3">💬</span>
                Vamos conversar!
              </h3>
              <p className="text-blue-100 leading-relaxed mb-8">
                Nossa equipe está pronta para transformar sua ideia em realidade. 
                Entre em contato e receba uma proposta personalizada em até 24 horas.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.690z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="font-bold text-lg">WhatsApp</div>
                    <div className="text-blue-200">(81) 9 8559-6965</div>
                    <div className="text-sm text-blue-200">Online das 8h às 18h</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-bold text-lg">Tempo de Resposta</div>
                    <div className="text-blue-200">Até 24 horas</div>
                    <div className="text-sm text-blue-200">Resposta garantida</div>
                  </div>
                </div>
              </div>
            </div>
            
            <a 
              href="https://wa.me/5581985596965?text=Olá!%20Gostaria%20de%20solicitar%20um%20orçamento%20para%20criação%20do%20meu%20site." 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-6 rounded-2xl font-semibold hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-center group"
            >
              <div className="flex items-center justify-center space-x-3">
                <svg className="w-6 h-6 group-hover:animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.690z"/>
                </svg>
                <span>Falar Direto no WhatsApp</span>
              </div>
              <div className="text-sm text-green-200 mt-1">
                Resposta rápida garantida!
              </div>
            </a>

            {/* Benefícios */}
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
              <h4 className="font-bold text-gray-800 mb-4 flex items-center">
                <span className="mr-2">✨</span>
                Por que escolher a ItaloDev?
              </h4>
              <ul className="space-y-3">
                {[
                  'Sites 100% responsivos e otimizados',
                  'Entrega no prazo acordado',
                  'Suporte técnico incluso',
                  'Preços competitivos',
                  'Satisfação garantida'
                ].map((benefit, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <span className="text-green-500 mr-3">✓</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;