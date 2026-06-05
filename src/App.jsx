import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import InputForm from './components/InputForm';
import OutputCard from './components/OutputCard';
import {
  generateHooks,
  generateCTAs,
  generateCaptions,
  generateUGCScript,
  generateCompleteAdPack
} from './utils/generators';
import './App.css';

export default function App() {
  const [generatedData, setGeneratedData] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // Core handler that simulates an AI generation request and updates state
  const handleGenerate = (type, formData) => {
    setIsGenerating(true);
    setCopySuccess(false);

    // Map the trigger action to the corresponding active display tab
    let targetTab = 'all';
    if (type === 'hooks') targetTab = 'hooks';
    if (type === 'script') targetTab = 'script';
    if (type === 'cta') targetTab = 'cta';
    if (type === 'captions') targetTab = 'captions';

    // Simulate AI loading delay to enhance the UX
    setTimeout(() => {
      const { businessName, product, audience, platform } = formData;

      const hooks = generateHooks(businessName, product, audience, platform);
      const ctas = generateCTAs(businessName, product, audience, platform);
      const captions = generateCaptions(businessName, product, audience, platform);
      const script = generateUGCScript(businessName, product, audience, platform);
      const all = generateCompleteAdPack(businessName, product, audience, platform);

      setGeneratedData({
        businessName,
        product,
        audience,
        platform,
        hooks,
        ctas,
        captions,
        script,
        all
      });

      setActiveTab(targetTab);
      setIsGenerating(false);

      // Smooth scroll to the output card for mobile devices
      setTimeout(() => {
        const outputEl = document.querySelector('.output-card');
        if (outputEl) {
          outputEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 100);
    }, 1200);
  };

  // Copy-to-clipboard handler based on current active tab
  const handleCopyActive = () => {
    if (!generatedData) return;

    let textToCopy = '';
    if (activeTab === 'hooks') {
      textToCopy = generatedData.hooks.map((h, i) => `${i + 1}. "${h}"`).join('\n');
    } else if (activeTab === 'script') {
      textToCopy = Object.values(generatedData.script)
        .map(sec => `${sec.title}\n🎥 Visual/B-Roll: ${sec.visual}\n🎙️ Voiceover: "${sec.audio}"`)
        .join('\n\n');
    } else if (activeTab === 'cta') {
      textToCopy = generatedData.ctas.map((c, i) => `${i + 1}. "${c}"`).join('\n');
    } else if (activeTab === 'captions') {
      textToCopy = generatedData.captions.map((cap, i) => `[Caption Option ${i + 1}]\n${cap}`).join('\n\n');
    } else {
      textToCopy = generatedData.all;
    }

    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  };

  return (
    <div className="app-wrapper">
      <Navbar />
      <main className="main-content">
        <Hero />
        
        <div className="dashboard-grid">
          <div className="grid-column input-column">
            <InputForm onGenerate={handleGenerate} isGenerating={isGenerating} />
          </div>
          
          <div className="grid-column output-column">
            <OutputCard
              generatedData={generatedData}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              isGenerating={isGenerating}
              onCopy={handleCopyActive}
              copySuccess={copySuccess}
            />
          </div>
        </div>
      </main>
      
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} AI UGC Ad Script Generator. All rights reserved.</p>
        <p className="footer-subtext">Engineered for copywriters, brands, and content creators.</p>
      </footer>
    </div>
  );
}
