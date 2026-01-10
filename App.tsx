
import React, { useState, useEffect } from 'react';
import { TravelInquiryForm } from './components/TravelInquiryForm';

const App: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  // Standard-Platzhalter, falls gar nichts übergeben wird
  const [reiseTitel, setReiseTitel] = useState("Individualreise Planung");

  useEffect(() => {
    // Diese Funktion liest den Namen der Reise aus der Browser-Zeile
    // Akzeptiert ?reiseTitel=... oder ?title=... oder ?reiseName=...
    const params = new URLSearchParams(window.location.search);
    const titleFromUrl = params.get('reiseTitel') || params.get('title') || params.get('reiseName');
    
    // Fallback für Lovable-Integration via globale Variable
    const globalTitle = (window as any).REISE_TITEL || (window as any).reiseTitel;

    if (titleFromUrl) {
      setReiseTitel(decodeURIComponent(titleFromUrl));
    } else if (globalTitle) {
      setReiseTitel(globalTitle);
    }
  }, []);

  const handleInquirySubmit = async (formData: any) => {
    setLoading(true);
    const payload = {
      reiseName: reiseTitel,
      ...formData,
      timestamp: new Date().toISOString()
    };

    console.log("Sende Daten an Webhook:", payload);

    try {
      // Hier würde dein Webhook-Aufruf stehen (z.B. Make.com)
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitted(true);
    } catch (error) {
      console.error(error);
      alert("Ein Fehler ist aufgetreten.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 flex flex-col items-center justify-center bg-[#f8fafc]">
      {!submitted ? (
        <div className="w-full max-w-4xl fade-in">
          {/* Header Bereich mit deinem Wunsch-Text */}
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-4xl sm:text-6xl font-extrabold text-[#0ea5e9] mb-8 tracking-tight leading-tight">
              Eine Reise so individuell wie du.
            </h1>
            <p className="max-w-4xl mx-auto text-lg sm:text-xl text-gray-500 leading-relaxed font-medium">
              Schön, dass du dich für diese Route entschieden hast. Bei Art Reisen planen wir keine Reisen von der Stange, sondern Erlebnisse mit deiner ganz persönlichen Handschrift. Damit wir dein Abenteuer perfekt auf deine Wünsche abstimmen können, brauchen wir noch ein paar Details von dir. Im Anschluss melde ich mich persönlich bei dir, um gemeinsam deine Traumreise zu gestalten.
            </p>
          </div>

          <TravelInquiryForm 
            travelName={reiseTitel}
            onSubmit={handleInquirySubmit}
            isLoading={loading}
          />
        </div>
      ) : (
        <div className="bg-white p-12 rounded-[2.5rem] shadow-step border border-gray-100 text-center fade-in max-w-xl w-full">
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Anfrage gesendet!</h2>
          <p className="text-gray-600 text-lg mb-8">
            Vielen Dank! Deine Planungsanfrage für <span className="font-bold text-[#0ea5e9]">{reiseTitel}</span> wurde erfolgreich übermittelt. 
            Wir melden uns in Kürze persönlich bei dir.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="font-bold text-[#0ea5e9] border-b-2 border-[#0ea5e9] hover:text-[#0369a1] transition-all pb-1"
          >
            Neue Anfrage starten
          </button>
        </div>
      )}
      
      <footer className="mt-16 text-gray-400 text-[10px] uppercase tracking-[0.3em] font-bold">
        art Reisen • Individual Reiseplanung
      </footer>
    </div>
  );
};

export default App;
