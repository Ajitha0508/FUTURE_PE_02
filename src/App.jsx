import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PresetsBar from './components/PresetsBar';
import InputForm from './components/InputForm';
import OutputCard from './components/OutputCard';
import TeleprompterModal from './components/TeleprompterModal';
import HistoryModal from './components/HistoryModal';
import SettingsModal from './components/SettingsModal';
import {
  generateHooks,
  generateCTAs,
  generateCaptions,
  generateUGCScript,
  generateCompleteAdPack,
  regenerateSingleItem
} from './utils/generators';
import { AI_PROVIDERS, callGeminiAPI, callOpenAIAPI } from './utils/aiService';
import './App.css';

const DEFAULT_SETTINGS = {
  provider: AI_PROVIDERS.OFFLINE,
  geminiKey: '',
  geminiModel: 'gemini-2.5-flash',
  openaiKey: '',
  openaiModel: 'gpt-4o-mini'
};

export default function App() {
  const [generatedData, setGeneratedData] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [activePreset, setActivePreset] = useState(null);

  // Modals state
  const [isTeleprompterOpen, setIsTeleprompterOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Current formData for single-item regeneration
  const [lastFormData, setLastFormData] = useState(null);

  // Saved history in localStorage
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('ugc_history_v2');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // AI API settings in localStorage
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('ugc_ai_settings_v2');
      return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  // Sync history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ugc_history_v2', JSON.stringify(history));
    } catch (err) {
      console.warn('Failed to save history to localStorage', err);
    }
  }, [history]);

  // Sync settings to localStorage
  const handleSaveSettings = (newSettings) => {
    setSettings(newSettings);
    try {
      localStorage.setItem('ugc_ai_settings_v2', JSON.stringify(newSettings));
    } catch (err) {
      console.warn('Failed to save settings to localStorage', err);
    }
  };

  // Preset selection handler
  const handleSelectPreset = (preset) => {
    setActivePreset(preset);
  };

  // Add campaign to history vault
  const saveToHistory = (data) => {
    if (!data) return;
    const historyItem = {
      ...data,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    };
    setHistory(prev => [historyItem, ...prev.slice(0, 49)]); // keep up to 50
  };

  // Delete single history item
  const handleDeleteHistory = (id) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  // Clear all history
  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all saved history?')) {
      setHistory([]);
    }
  };

  // Load an item from history
  const handleLoadHistory = (item) => {
    setGeneratedData(item);
    setActiveTab('all');
    setLastFormData({
      businessName: item.businessName,
      product: item.product,
      audience: item.audience,
      platform: item.platform,
      framework: item.framework || 'pas',
      tone: item.tone || 'authentic',
      duration: item.duration || '60s',
      language: item.language || 'en',
      painPoint: item.painPoint || '',
      offer: item.offer || ''
    });
  };

  // Individual item regeneration handler
  const handleRegenerateItem = (type, indexOrKey) => {
    if (!generatedData || !lastFormData) return;

    const updated = regenerateSingleItem(type, indexOrKey, generatedData, lastFormData, {
      framework: lastFormData.framework,
      tone: lastFormData.tone,
      duration: lastFormData.duration,
      language: lastFormData.language,
      painPoint: lastFormData.painPoint,
      offer: lastFormData.offer
    });

    // Refresh complete pack text
    const refreshedPack = generateCompleteAdPack(
      lastFormData.businessName,
      lastFormData.product,
      lastFormData.audience,
      lastFormData.platform,
      {
        ...lastFormData,
        hooks: updated.hooks,
        script: updated.script,
        ctas: updated.ctas,
        captions: updated.captions
      }
    );

    updated.all = refreshedPack;
    setGeneratedData(updated);
  };

  // Core generation handler
  const handleGenerate = async (type, formData) => {
    setIsGenerating(true);
    setCopySuccess(false);
    setLastFormData(formData);

    // Map trigger action to tab
    let targetTab = 'all';
    if (type === 'hooks') targetTab = 'hooks';
    if (type === 'script') targetTab = 'script';
    if (type === 'cta') targetTab = 'cta';
    if (type === 'captions') targetTab = 'captions';

    const { businessName, product, audience, platform, framework, tone, duration, language, painPoint, offer } = formData;
    const options = { framework, tone, duration, language, painPoint, offer };

    // Check if Online AI is configured
    const useGemini = settings.provider === AI_PROVIDERS.GEMINI && settings.geminiKey?.trim();
    const useOpenAI = settings.provider === AI_PROVIDERS.OPENAI && settings.openaiKey?.trim();

    if (useGemini || useOpenAI) {
      try {
        const systemPrompt = `You are an elite short-form UGC ad director and direct-response copywriter.
Return ONLY valid JSON matching this exact structure:
{
  "hooks": ["hook 1", "hook 2", "hook 3", "hook 4", "hook 5", "hook 6", "hook 7", "hook 8", "hook 9", "hook 10"],
  "script": {
    "hook": { "title": "1. HOOK (0:00 - 0:03)", "visual": "...", "audio": "..." },
    "problem": { "title": "2. PROBLEM (0:03 - 0:15)", "visual": "...", "audio": "..." },
    "solution": { "title": "3. SOLUTION (0:15 - 0:35)", "visual": "...", "audio": "..." },
    "result": { "title": "4. RESULT (0:35 - 0:48)", "visual": "...", "audio": "..." },
    "cta": { "title": "5. CTA (0:48 - 0:60)", "visual": "...", "audio": "..." }
  },
  "ctas": ["cta 1", "cta 2", "cta 3", "cta 4", "cta 5", "cta 6", "cta 7", "cta 8", "cta 9", "cta 10"],
  "captions": ["caption 1 with emojis and hashtags", "caption 2", "caption 3", "caption 4", "caption 5"]
}`;

        const userPrompt = `Brand: ${businessName}
Product: ${product}
Target Audience: ${audience}
Platform: ${platform}
Framework: ${framework}
Tone of Voice: ${tone}
Duration: ${duration}
Language: ${language === 'ta' ? 'Tanglish (Tamil words written in English alphabet, e.g. "Ungaluku intha problem irukka?")' : language}
Key Pain Point: ${painPoint || 'None specified'}
Special Offer: ${offer || 'None'}`;

        let aiResult;
        if (useGemini) {
          aiResult = await callGeminiAPI(settings.geminiKey.trim(), settings.geminiModel, systemPrompt, userPrompt);
        } else {
          aiResult = await callOpenAIAPI(settings.openaiKey.trim(), settings.openaiModel, systemPrompt, userPrompt);
        }

        const hooks = aiResult.hooks || generateHooks(businessName, product, audience, platform, options);
        const script = aiResult.script || generateUGCScript(businessName, product, audience, platform, options);
        const ctas = aiResult.ctas || generateCTAs(businessName, product, audience, platform, options);
        const captions = aiResult.captions || generateCaptions(businessName, product, audience, platform, options);
        const all = generateCompleteAdPack(businessName, product, audience, platform, options);

        const newGenerated = {
          businessName,
          product,
          audience,
          platform,
          framework,
          tone,
          duration,
          language,
          painPoint,
          offer,
          hooks,
          ctas,
          captions,
          script,
          all
        };

        setGeneratedData(newGenerated);
        saveToHistory(newGenerated);
        setActiveTab(targetTab);
        setIsGenerating(false);

        scrollToOutput();
        return;
      } catch (err) {
        console.error('Online AI request failed, falling back to local engine:', err);
        // Seamlessly falls through to offline engine below
      }
    }

    // High-Speed Local Offline Engine
    setTimeout(() => {
      const hooks = generateHooks(businessName, product, audience, platform, options);
      const ctas = generateCTAs(businessName, product, audience, platform, options);
      const captions = generateCaptions(businessName, product, audience, platform, options);
      const script = generateUGCScript(businessName, product, audience, platform, options);
      const all = generateCompleteAdPack(businessName, product, audience, platform, options);

      const newGenerated = {
        businessName,
        product,
        audience,
        platform,
        framework,
        tone,
        duration,
        language,
        painPoint,
        offer,
        hooks,
        ctas,
        captions,
        script,
        all
      };

      setGeneratedData(newGenerated);
      saveToHistory(newGenerated);
      setActiveTab(targetTab);
      setIsGenerating(false);

      scrollToOutput();
    }, 750);
  };

  const scrollToOutput = () => {
    setTimeout(() => {
      const outputEl = document.querySelector('.output-card');
      if (outputEl) {
        outputEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 100);
  };

  // Copy handler
  const handleCopyActive = () => {
    if (!generatedData) return;

    let textToCopy = '';
    if (activeTab === 'hooks') {
      textToCopy = (generatedData.hooks || []).map((h, i) => `${i + 1}. "${h}"`).join('\n');
    } else if (activeTab === 'script') {
      textToCopy = Object.values(generatedData.script || {})
        .map(sec => `${sec.title}\n🎥 Visual/B-Roll: ${sec.visual}\n🎙️ Voiceover: "${sec.audio}"`)
        .join('\n\n');
    } else if (activeTab === 'cta') {
      textToCopy = (generatedData.ctas || []).map((c, i) => `${i + 1}. "${c}"`).join('\n');
    } else if (activeTab === 'captions') {
      textToCopy = (generatedData.captions || []).map((cap, i) => `[Caption Option ${i + 1}]\n${cap}`).join('\n\n');
    } else {
      textToCopy = generatedData.all || '';
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
      <Navbar
        onOpenHistory={() => setIsHistoryOpen(true)}
        historyCount={history.length}
        onOpenSettings={() => setIsSettingsOpen(true)}
        aiProvider={settings.provider}
      />

      <main className="main-content">
        <Hero />

        <PresetsBar onSelectPreset={handleSelectPreset} />

        <div className="dashboard-grid">
          <div className="grid-column input-column">
            <InputForm
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
              activePreset={activePreset}
              onOpenSettings={() => setIsSettingsOpen(true)}
              aiProvider={settings.provider}
            />
          </div>

          <div className="grid-column output-column">
            <OutputCard
              generatedData={generatedData}
              setGeneratedData={setGeneratedData}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              isGenerating={isGenerating}
              onCopy={handleCopyActive}
              copySuccess={copySuccess}
              onOpenTeleprompter={() => setIsTeleprompterOpen(true)}
              onSaveToVault={saveToHistory}
              onRegenerateItem={handleRegenerateItem}
            />
          </div>
        </div>
      </main>

      {/* Teleprompter Modal */}
      <TeleprompterModal
        isOpen={isTeleprompterOpen}
        onClose={() => setIsTeleprompterOpen(false)}
        script={generatedData?.script}
        businessName={generatedData?.businessName}
      />

      {/* Saved History Vault Modal */}
      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onLoadItem={handleLoadHistory}
        onDeleteItem={handleDeleteHistory}
        onClearAll={handleClearHistory}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSaveSettings={handleSaveSettings}
      />

      <footer className="footer">
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} AI UGC Ad Studio Pro. Engineered for high-converting social campaigns.</p>
          <div className="footer-links">
            <span>⚡ React 19 + Vite</span>
            <span>🎥 Integrated Creator Studio</span>
            <span>🔒 Local & Private</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
