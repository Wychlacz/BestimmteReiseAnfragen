
import React, { useState } from 'react';

interface TravelInquiryFormProps {
  travelName: string;
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

export const TravelInquiryForm: React.FC<TravelInquiryFormProps> = ({ travelName, onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    privacy: false
  });

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = formData.name.trim() !== '' && 
                      formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) && 
                      formData.privacy;

  return (
    <div className="bg-white rounded-[2.5rem] shadow-step overflow-hidden w-full max-w-2xl mx-auto border border-gray-50">
      <div className="p-10 md:p-16 flex flex-col justify-center bg-white">
        <div className="fade-in space-y-10">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-[#0ea5e9] mb-4 leading-tight">Fast fertig!</h2>
            <div className="space-y-1">
              <span className="text-gray-400 text-sm font-bold uppercase tracking-widest">Deine Anfrage für:</span>
              <p className="text-[#0ea5e9] font-extrabold text-2xl md:text-3xl leading-tight">
                {travelName}
              </p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="group">
              <label className="block text-sm font-bold text-[#334155] mb-2.5 ml-1 transition-colors group-focus-within:text-[#0ea5e9]">
                Vollständiger Name
              </label>
              <input 
                type="text" 
                placeholder="z.B. Erika Mustermann" 
                disabled={isLoading}
                className="w-full px-7 py-5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:border-[#0ea5e9] focus:ring-4 focus:ring-sky-50 transition-all text-lg font-medium shadow-sm"
                value={formData.name} 
                onChange={e => updateField('name', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="group">
                <label className="block text-sm font-bold text-[#334155] mb-2.5 ml-1 transition-colors group-focus-within:text-[#0ea5e9]">
                  E-Mail Adresse
                </label>
                <input 
                  type="email" 
                  placeholder="name@beispiel.de" 
                  disabled={isLoading}
                  className="w-full px-7 py-5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:border-[#0ea5e9] focus:ring-4 focus:ring-sky-50 transition-all text-lg font-medium shadow-sm"
                  value={formData.email} 
                  onChange={e => updateField('email', e.target.value)}
                />
              </div>
              <div className="group">
                <label className="block text-sm font-bold text-[#334155] mb-2.5 ml-1 transition-colors group-focus-within:text-[#0ea5e9]">
                  Telefonnummer
                </label>
                <input 
                  type="tel" 
                  placeholder="+49 123 45678" 
                  disabled={isLoading}
                  className="w-full px-7 py-5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:border-[#0ea5e9] focus:ring-4 focus:ring-sky-50 transition-all text-lg font-medium shadow-sm"
                  value={formData.phone} 
                  onChange={e => updateField('phone', e.target.value)}
                />
              </div>
            </div>
            
            <div className="pt-4">
              <label className="flex items-start gap-4 cursor-pointer group">
                <div className="relative flex items-center mt-1">
                  <input 
                    type="checkbox" 
                    disabled={isLoading}
                    className="w-6 h-6 rounded-lg border-gray-300 text-[#0ea5e9] focus:ring-[#0ea5e9] transition-all cursor-pointer shadow-sm"
                    checked={formData.privacy} 
                    onChange={e => updateField('privacy', e.target.checked)}
                  />
                </div>
                <span className="text-sm text-gray-500 leading-relaxed font-medium select-none">
                  Ich stimme zu, dass meine Daten zur Bearbeitung der Anfrage gespeichert werden. Details findest Du in unserer <a href="#" className="text-[#0ea5e9] font-bold hover:underline">Datenschutzerklärung</a>.
                </span>
              </label>
            </div>
          </div>

          <div className="pt-6">
            <button 
              onClick={() => onSubmit(formData)}
              disabled={isLoading || !isFormValid}
              className={`w-full py-5 rounded-full font-extrabold text-xl shadow-lg transition-all flex items-center justify-center transform active:scale-[0.98] ${
                isLoading || !isFormValid 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none' 
                  : 'bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-emerald-200'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg className="animate-spin h-6 w-6 text-white mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Wird gesendet...
                </div>
              ) : 'Jetzt verbindlich anfragen'}
            </button>
            <div className="flex flex-col items-center mt-8">
              <p className="text-center text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold">
                Kostenlos & Unverbindlich • 256-Bit SSL Schutz
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
