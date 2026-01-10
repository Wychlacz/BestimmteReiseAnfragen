import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

const App = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    reise: '',
    name: '',
    email: '',
    telefon: '',
    nachricht: ''
  });

  useEffect(() => {
    // Read URL parameters for the travel name
    const params = new URLSearchParams(window.location.search);
    const reiseParam = params.get('reise') || params.get('title') || params.get('reiseName') || 'Individuelle Reiseplanung';
    setFormData(prev => ({ ...prev, reise: reiseParam }));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.currentTarget;
    const body = new FormData(form);
    
    // Netlify requires the form-name field for AJAX submissions
    body.append('form-name', 'reiseanfrage');

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(body as any).toString(),
      });

      if (response.ok) {
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert("Es gab ein Problem beim Senden Ihrer Anfrage. Bitte versuchen Sie es später erneut.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 fade-in">
        <div className="bg-white p-10 md:p-16 rounded-[2.5rem] shadow-2xl max-w-lg w-full text-center border border-gray-50">
          <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-artBlue mb-4">Vielen Dank!</h2>
          <p className="text-gray-500 font-medium mb-10 text-lg leading-relaxed">
            Ihre Anfrage für <span className="text-artBlue font-bold">{formData.reise}</span> wurde erfolgreich übermittelt. 
            Wir melden uns in Kürze persönlich bei Ihnen.
          </p>
          <button 
            onClick={() => setSubmitted(false)} 
            className="bg-artBlue text-white px-10 py-4 rounded-full font-bold shadow-lg hover:bg-[#0077b8] transition-all transform hover:scale-105 active:scale-95"
          >
            Neue Anfrage starten
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 px-4 fade-in">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-artBlue mb-6 leading-tight">
            Eine Reise so individuell wie du.
          </h1>
          <p className="text-gray-600 max-w-lg mx-auto font-medium text-lg leading-relaxed">
            Teilen Sie uns Ihre Wünsche mit, und wir gestalten gemeinsam Ihr nächstes Abenteuer.
          </p>
        </div>

        <form 
          name="reiseanfrage" 
          method="POST" 
          data-netlify="true" 
          onSubmit={handleSubmit}
          className="bg-white p-8 md:p-14 rounded-[3rem] form-shadow border border-white/50 space-y-8"
        >
          {/* Important for Netlify: Must match the name attribute of the form */}
          <input type="hidden" name="form-name" value="reiseanfrage" />
          
          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] font-extrabold text-gray-400 mb-2.5 ml-1">Gewählte Reise</label>
            <input 
              type="text" 
              name="reise" 
              value={formData.reise} 
              readOnly 
              className="w-full px-7 py-5 bg-gray-50 border border-gray-100 rounded-2xl text-artBlue font-bold focus:outline-none cursor-default shadow-inner"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] font-extrabold text-gray-400 mb-2.5 ml-1 transition-colors group-focus-within:text-artBlue">Name *</label>
              <input 
                type="text" 
                name="name" 
                required 
                value={formData.name}
                onChange={handleChange}
                placeholder="Ihr vollständiger Name"
                className="w-full px-7 py-5 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-artBlue/5 focus:border-artBlue transition-all outline-none font-medium shadow-sm"
              />
            </div>
            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] font-extrabold text-gray-400 mb-2.5 ml-1 transition-colors group-focus-within:text-artBlue">E-Mail *</label>
              <input 
                type="email" 
                name="email" 
                required 
                value={formData.email}
                onChange={handleChange}
                placeholder="beispiel@mail.de"
                className="w-full px-7 py-5 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-artBlue/5 focus:border-artBlue transition-all outline-none font-medium shadow-sm"
              />
            </div>
          </div>

          <div className="group">
            <label className="block text-[10px] uppercase tracking-[0.2em] font-extrabold text-gray-400 mb-2.5 ml-1 transition-colors group-focus-within:text-artBlue">Telefon (optional)</label>
            <input 
              type="tel" 
              name="telefon" 
              value={formData.telefon}
              onChange={handleChange}
              placeholder="+49 123 456789"
              className="w-full px-7 py-5 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-artBlue/5 focus:border-artBlue transition-all outline-none font-medium shadow-sm"
            />
          </div>

          <div className="group">
            <label className="block text-[10px] uppercase tracking-[0.2em] font-extrabold text-gray-400 mb-2.5 ml-1 transition-colors group-focus-within:text-artBlue">Anmerkungen (optional)</label>
            <textarea 
              name="nachricht" 
              rows={4} 
              value={formData.nachricht}
              onChange={handleChange}
              placeholder="Erzählen Sie uns von Ihren Reiseplänen..."
              className="w-full px-7 py-5 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-artBlue/5 focus:border-artBlue transition-all outline-none resize-none font-medium shadow-sm"
            ></textarea>
          </div>

          <div className="pt-6">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`w-full font-extrabold py-6 rounded-full shadow-xl transition-all transform text-xl flex items-center justify-center ${
                isSubmitting 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-artBlue text-white hover:bg-[#0077b8] hover:scale-[1.01] active:scale-95 shadow-artBlue/20'
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Wird gesendet...
                </>
              ) : 'Anfrage senden'}
            </button>
            <div className="flex justify-center items-center mt-8 space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-artOrange rounded-full"></div>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Kostenlos</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-artOrange rounded-full"></div>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Unverbindlich</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-artOrange rounded-full"></div>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Persönlich</span>
              </div>
            </div>
          </div>
        </form>

        <footer className="mt-16 text-center">
          <p className="text-[10px] text-gray-400 uppercase tracking-[0.4em] font-bold opacity-60">
            Art Reisen • Individual Reiseplanung
          </p>
        </footer>
      </div>
    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
}