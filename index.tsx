import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

// NOTE: Replace with your actual Make.com Webhook URL
const WEBHOOK_URL = "https://hook.eu1.make.com/your-unique-webhook-id";

const App = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    reise: '',
    reise_id: '',
    name: '',
    email: '',
    telefon: '',
    whatsapp: '',
    nachricht: ''
  });

  useEffect(() => {
    // Read URL parameters
    const params = new URLSearchParams(window.location.search);
    const reiseName = params.get('reise') ? decodeURIComponent(params.get('reise')) : "Individuelle Reiseplanung";
    const reiseId = params.get('id') ? decodeURIComponent(params.get('id')) : "";
    
    setFormData(prev => ({ 
      ...prev, 
      reise: reiseName,
      reise_id: reiseId
    }));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        throw new Error('Fehler beim Senden');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Das Senden hat leider nicht geklappt. Bitte versuche es erneut oder kontaktiere uns direkt.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-artBg">
        <div className="max-w-[650px] w-full bg-white rounded-[32px] shadow-[0_15px_50px_rgba(0,0,0,0.08)] p-12 md:p-20 text-center fade-in border border-white">
          <div className="text-7xl mb-8 text-artBlue">✓</div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-artBlue mb-6 font-montserrat tracking-tight leading-tight">Vielen Dank!</h2>
          <p className="text-lg md:text-xl text-artText font-nunito leading-relaxed">
            Deine Anfrage ist bei uns eingegangen.<br />
            Wir melden uns in Kürze persönlich bei Dir.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="mt-12 text-artBlue font-bold hover:underline font-montserrat"
          >
            Neue Anfrage starten
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 md:px-8 bg-artBg">
      <div className="max-w-[750px] w-full bg-white rounded-[40px] shadow-[0_20px_60px_rgba(0,0,0,0.06)] overflow-hidden fade-in border border-white/50">
        
        <div className="p-8 md:p-16">
          {/* Heading Section */}
          <div className="text-center mb-12">
            <h1 className="text-2xl md:text-3xl font-extrabold text-artBlue font-montserrat mb-4 tracking-tight leading-snug">
              Schön, dass Du diese Reise anfragen möchtest!
            </h1>
            <div className="inline-block bg-artBg/50 px-6 py-3 rounded-2xl mb-6">
              <h2 className="text-xl md:text-2xl font-extrabold text-artText font-montserrat">
                {formData.reise}
              </h2>
            </div>
            <p className="text-gray-500 font-nunito max-w-lg mx-auto leading-relaxed">
              Bitte gib uns Deine Kontaktdaten an, damit wir Deine individuelle Route mit persönlicher Handschrift entwickeln können.
            </p>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <input type="hidden" name="reise_id" value={formData.reise_id} />
            <input type="hidden" name="reise" value={formData.reise} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block font-bold text-sm text-gray-700 font-montserrat ml-1">Dein Name *</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Vor- und Nachname" 
                  className="w-full px-5 py-4 border border-artBorder rounded-xl focus:outline-none focus:ring-2 focus:ring-artBlue/10 focus:border-artBlue transition-all font-nunito text-[16px]"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="block font-bold text-sm text-gray-700 font-montserrat ml-1">E-Mail Adresse *</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="deine@email.de" 
                  className="w-full px-5 py-4 border border-artBorder rounded-xl focus:outline-none focus:ring-2 focus:ring-artBlue/10 focus:border-artBlue transition-all font-nunito text-[16px]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="telefon" className="block font-bold text-sm text-gray-700 font-montserrat ml-1">Telefonnummer *</label>
                <input 
                  type="tel" 
                  id="telefon" 
                  name="telefon" 
                  required
                  value={formData.telefon}
                  onChange={handleChange}
                  placeholder="Für Rückfragen" 
                  className="w-full px-5 py-4 border border-artBorder rounded-xl focus:outline-none focus:ring-2 focus:ring-artBlue/10 focus:border-artBlue transition-all font-nunito text-[16px]"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="whatsapp" className="block font-bold text-sm text-gray-700 font-montserrat ml-1">WhatsApp (optional)</label>
                <input 
                  type="tel" 
                  id="whatsapp" 
                  name="whatsapp" 
                  value={formData.whatsapp}
                  onChange={handleChange}
                  placeholder="Gleiche Nummer?" 
                  className="w-full px-5 py-4 border border-artBorder rounded-xl focus:outline-none focus:ring-2 focus:ring-artBlue/10 focus:border-artBlue transition-all font-nunito text-[16px]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="nachricht" className="block font-bold text-sm text-gray-700 font-montserrat ml-1">Nachricht / Besondere Wünsche</label>
              <textarea 
                id="nachricht" 
                name="nachricht" 
                value={formData.nachricht}
                onChange={handleChange}
                rows={4}
                placeholder="Erzähl uns mehr über Deine Träume..."
                className="w-full px-5 py-4 border border-artBorder rounded-xl focus:outline-none focus:ring-2 focus:ring-artBlue/10 focus:border-artBlue transition-all font-nunito text-[16px] resize-none"
              ></textarea>
            </div>

            <div className="pt-4">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full font-montserrat font-bold text-lg p-5 rounded-2xl text-white shadow-xl shadow-artOrange/20 transition-all transform active:scale-[0.98] ${
                  isSubmitting 
                  ? 'bg-gray-300 cursor-not-allowed shadow-none' 
                  : 'bg-artOrange hover:bg-artOrangeHover hover:-translate-y-0.5'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Wird gesendet...
                  </span>
                ) : 'Anfrage jetzt senden'}
              </button>
            </div>
          </form>

          <p className="mt-12 text-center text-[10px] text-gray-400 uppercase tracking-[0.4em] font-bold opacity-60">
            Art Reisen • Individual Reiseplanung
          </p>
        </div>
      </div>
    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
}