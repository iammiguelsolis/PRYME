import { useState } from 'react';
import { FAQSection } from '../components/organisms/FAQSection';
import { TutorialsList } from '../components/organisms/TutorialsList';
import { QuickStartGuide } from '../components/organisms/QuickStartGuide';
import { ContactCard } from '../components/molecules/ContactCard';
import {
  HiOutlineQuestionMarkCircle,
  HiOutlineBookOpen,
  HiOutlineRocketLaunch,
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineEnvelope,
  HiOutlinePhone
} from 'react-icons/hi2';

const AyudaPage = () => {
  const [activeTab, setActiveTab] = useState('inicio');

  const tabs = [
    { id: 'inicio', label: 'Inicio Rápido', icon: HiOutlineRocketLaunch },
    { id: 'tutoriales', label: 'Tutoriales', icon: HiOutlineBookOpen },
    { id: 'faq', label: 'Preguntas Frecuentes', icon: HiOutlineQuestionMarkCircle }
  ];

  const handleContactEmail = () => {
    window.location.href = 'mailto:soporte@pryme.com?subject=Solicitud de Soporte - PRYME';
  };

  const handleContactPhone = () => {
    window.open('tel:+51999999999', '_blank');
  };

  const handleContactChat = () => {
    
  };

  return (
    <main className="min-h-screen bg-neutral-03 p-6">
      <div className="mx-auto space-y-6">
        {/* Header */}
        <div className="bg-neutral-01 rounded-3xl shadow-md px-6 py-4">
          <h1 className="text-2xl font-bold text-text-01">Centro de Ayuda</h1>
          <p className="text-text-02 mt-1">
            Encuentra respuestas, aprende a usar el sistema y obtén soporte
          </p>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-neutral-01 rounded-2xl shadow-md p-2">
          <div className="flex gap-2">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                    activeTab === tab.id
                      ? 'bg-primary-01 text-white shadow-md'
                      : 'text-text-02 hover:bg-neutral-03'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="space-y-6">
          {/* Inicio Rápido Tab */}
          {activeTab === 'inicio' && (
            <>
              <QuickStartGuide />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ContactCard
                  icon={HiOutlineChatBubbleBottomCenterText}
                  title="Chat en Vivo"
                  description="Chatea con nuestro equipo de soporte en tiempo real"
                  buttonText="Iniciar Chat"
                  buttonAction={handleContactChat}
                  color="bg-primary-01"
                />
                
                <ContactCard
                  icon={HiOutlineEnvelope}
                  title="Soporte por Email"
                  description="Envíanos un correo y te responderemos en 24 horas"
                  buttonText="Enviar Email"
                  buttonAction={handleContactEmail}
                  color="bg-secondary-01"
                />
                
                <ContactCard
                  icon={HiOutlinePhone}
                  title="Soporte Telefónico"
                  description="Llámanos de Lun-Vie 9am-6pm"
                  buttonText="Llamar Ahora"
                  buttonAction={handleContactPhone}
                  color="bg-complementary-01"
                />
              </div>

              {/* Quick Tips */}
              <div className="bg-neutral-01 rounded-2xl shadow-md p-6">
                <h2 className="text-xl font-bold text-text-01 mb-4">Consejos Rápidos</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-xl p-4">
                    <h3 className="font-semibold text-primary-01 mb-2">💡 Usa los Filtros</h3>
                    <p className="text-sm text-text-02">
                      Todos los módulos tienen filtros avanzados. Úsalos para encontrar información rápidamente.
                    </p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4">
                    <h3 className="font-semibold text-state-01 mb-2">⚡ Atajos de Teclado</h3>
                    <p className="text-sm text-text-02">
                      Haz clic en los encabezados de las tablas para ordenar la información ascendente o descendente.
                    </p>
                  </div>
                  <div className="bg-orange-50 rounded-xl p-4">
                    <h3 className="font-semibold text-complementary-01 mb-2">📊 Exporta Datos</h3>
                    <p className="text-sm text-text-02">
                      Puedes exportar reportes en formato PDF o Excel desde la sección de Reportes.
                    </p>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-4">
                    <h3 className="font-semibold text-purple-600 mb-2">🔍 Búsqueda Rápida</h3>
                    <p className="text-sm text-text-02">
                      Los chips de filtros activos te permiten ver y eliminar filtros fácilmente.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Tutoriales Tab */}
          {activeTab === 'tutoriales' && (
            <>
              <TutorialsList />
              
              {/* Additional Resources */}
              <div className="bg-neutral-01 rounded-2xl shadow-md p-6">
                <h2 className="text-xl font-bold text-text-01 mb-4">Recursos Adicionales</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <a
                    href="#"
                    className="flex items-start gap-4 p-4 border border-neutral-02 rounded-xl hover:shadow-md transition-all group"
                  >
                    <div className="w-12 h-12 bg-primary-01/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <HiOutlineBookOpen className="w-6 h-6 text-primary-01" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-01 group-hover:text-primary-01 transition-colors">
                        Manual de Usuario Completo
                      </h3>
                      <p className="text-sm text-text-02 mt-1">
                        Descarga el manual completo en PDF con todas las funcionalidades del sistema
                      </p>
                    </div>
                  </a>
                  
                  <a
                    href="#"
                    className="flex items-start gap-4 p-4 border border-neutral-02 rounded-xl hover:shadow-md transition-all group"
                  >
                    <div className="w-12 h-12 bg-secondary-01/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-secondary-01" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-01 group-hover:text-secondary-01 transition-colors">
                        Videos Tutoriales
                      </h3>
                      <p className="text-sm text-text-02 mt-1">
                        Accede a nuestra biblioteca de videos con guías visuales paso a paso
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </>
          )}

          {/* FAQ Tab */}
          {activeTab === 'faq' && (
            <>
              <FAQSection />
              
              {/* Still Need Help? */}
              <div className="bg-gradient-to-r from-primary-01 to-primary-02 rounded-2xl shadow-lg p-8 text-white text-center">
                <h2 className="text-2xl font-bold mb-2">¿Aún necesitas ayuda?</h2>
                <p className="text-blue-100 mb-6">
                  Nuestro equipo de soporte está listo para asistirte
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <button
                    onClick={handleContactChat}
                    className="px-6 py-3 bg-white text-primary-01 rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    Chatear con Soporte
                  </button>
                  <button
                    onClick={handleContactEmail}
                    className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white border-2 border-white rounded-xl font-semibold hover:bg-white/30 transition-all"
                  >
                    Enviar Email
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Info */}
        <div className="bg-neutral-01 rounded-2xl shadow-md p-6 border-l-4 border-primary-01">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-primary-01/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-primary-01" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-text-01 mb-1">Información Importante</h3>
              <p className="text-sm text-text-02">
                Este sistema está diseñado para facilitar la gestión de tu negocio. Si encuentras algún problema o tienes sugerencias, 
                no dudes en contactarnos. Tu feedback nos ayuda a mejorar continuamente.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AyudaPage;