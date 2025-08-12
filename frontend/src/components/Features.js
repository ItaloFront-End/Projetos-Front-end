import React from 'react';

const Features = () => {
  const features = [
    {
      icon: "⚡",
      title: "Performance Otimizada",
      description: "Sites ultra-rápidos com tempo de carregamento inferior a 3 segundos.",
      color: "from-yellow-400 to-orange-500"
    },
    {
      icon: "📱",
      title: "100% Responsivo",
      description: "Perfeita adaptação em todos os dispositivos e tamanhos de tela.",
      color: "from-green-400 to-blue-500"
    },
    {
      icon: "🔒",
      title: "Segurança Garantida",
      description: "Certificados SSL, backup automático e proteção contra ataques.",
      color: "from-purple-400 to-pink-500"
    },
    {
      icon: "🚀",
      title: "SEO Otimizado",
      description: "Configuração completa para aparecer no Google e atrair mais clientes.",
      color: "from-blue-400 to-cyan-500"
    },
    {
      icon: "⚙️",
      title: "Painel Administrativo",
      description: "Gerencie seu conteúdo facilmente com interface intuitiva.",
      color: "from-red-400 to-pink-500"
    },
    {
      icon: "🎨",
      title: "Design Exclusivo",
      description: "Layout personalizado que reflete a identidade da sua marca.",
      color: "from-indigo-400 to-purple-500"
    },
    {
      icon: "💬",
      title: "Suporte Vitalício",
      description: "Assistência técnica sempre que precisar, sem custo adicional.",
      color: "from-teal-400 to-green-500"
    },
    {
      icon: "📈",
      title: "Analytics Integrado",
      description: "Acompanhe visitantes e resultados com relatórios detalhados.",
      color: "from-orange-400 to-red-500"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Background decorativo */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 to-purple-100/20"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute top-40 right-40 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Por que escolher a 
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {' '}ItaloDev?
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Oferecemos muito mais que um site. Criamos uma solução completa para o seu sucesso online.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative animate-on-scroll"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/50 group-hover:scale-105 h-full">
                {/* Ícone com gradiente */}
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Efeito de brilho no hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 ease-in-out"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 animate-on-scroll">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 shadow-2xl">
            <h3 className="text-3xl font-bold text-white mb-4">
              Pronto para transformar sua presença online?
            </h3>
            <p className="text-blue-100 mb-8 text-lg">
              Junte-se aos nossos clientes satisfeitos e tenha um site que realmente converte.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="#contato" 
                onClick={(e) => { 
                  e.preventDefault(); 
                  document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' }); 
                }}
                className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Solicitar Orçamento Grátis
              </a>
              <a 
                href="#portfolio" 
                onClick={(e) => { 
                  e.preventDefault(); 
                  document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' }); 
                }}
                className="border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-300"
              >
                Ver Exemplos
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;