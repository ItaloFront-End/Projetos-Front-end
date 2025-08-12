import React, { useState } from 'react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Quanto tempo leva para criar um site?",
      answer: "O prazo varia de acordo com a complexidade do projeto. Sites institucionais simples ficam prontos entre 5-10 dias úteis, enquanto e-commerce e projetos mais complexos podem levar de 15-30 dias."
    },
    {
      question: "O site será responsivo e mobile-friendly?",
      answer: "Sim! Todos os nossos sites são desenvolvidos com design responsivo, garantindo perfeita visualização em smartphones, tablets e desktops. A experiência mobile é nossa prioridade."
    },
    {
      question: "Vocês fazem manutenção e atualizações?",
      answer: "Oferecemos pacotes de manutenção que incluem atualizações de segurança, backup automático, monitoramento e pequenas alterações de conteúdo. Entre em contato para conhecer nossos planos."
    },
    {
      question: "O site terá otimização para SEO?",
      answer: "Todos os nossos sites são desenvolvidos seguindo as melhores práticas de SEO: URLs amigáveis, meta tags otimizadas, estrutura semântica e velocidade de carregamento otimizada."
    },
    {
      question: "Posso fazer alterações no site depois de pronto?",
      answer: "Sim! Desenvolvemos sites com painéis administrativos intuitivos para que você possa fazer alterações básicas de conteúdo. Para mudanças mais complexas, nossa equipe está sempre disponível."
    },
    {
      question: "Qual é a forma de pagamento?",
      answer: "Trabalhamos com parcelamento facilitado: 50% no início do projeto e 50% na entrega. Aceitamos PIX, boleto bancário e cartões de crédito."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Perguntas Frequentes
          </h2>
          <p className="text-xl text-gray-600">
            Tire suas principais dúvidas sobre nossos serviços
          </p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden animate-on-scroll"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left p-6 hover:bg-gray-50 transition-colors duration-300 flex justify-between items-center"
              >
                <h3 className="text-lg font-semibold text-gray-800 pr-8">
                  {faq.question}
                </h3>
                <div className={`w-6 h-6 flex items-center justify-center transition-transform duration-300 ${
                  openIndex === index ? 'transform rotate-180' : ''
                }`}>
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Não encontrou sua resposta? Entre em contato conosco!
          </p>
          <a 
            href="#contato" 
            onClick={(e) => { 
              e.preventDefault(); 
              document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' }); 
            }}
            className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-full font-semibold hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Falar Conosco
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;