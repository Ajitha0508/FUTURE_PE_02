/**
 * Advanced AI UGC Ad Script Generator Engine
 * Multi-Framework, Tone of Voice, Duration, Multi-Language & Dynamic Regeneration
 */

export const FRAMEWORKS = [
  { id: 'pas', name: 'PAS (Problem-Agitate-Solve)', desc: 'Best for highlighting pain points and presenting relief.' },
  { id: 'aida', name: 'AIDA (Attention-Interest-Desire-Action)', desc: 'Classic direct-response funnel for high conversions.' },
  { id: 'bab', name: 'BAB (Before-After-Bridge)', desc: 'Focuses on visual transformation and results.' },
  { id: 'confession', name: 'The UGC Confessional', desc: 'Raw, candid, "Don\'t buy until you know this" style.' },
  { id: 'mythbuster', name: 'Mythbuster / 3 Mistakes', desc: 'Pattern-interrupting educational hook that builds instant authority.' },
  { id: 'unboxing', name: 'ASMR / First Impression', desc: 'Tactile product demonstration with aesthetic sensory cues.' }
];

export const TONES = [
  { id: 'authentic', name: 'Authentic & Relatable', icon: '🤝' },
  { id: 'genz', name: 'Gen Z / High-Energy', icon: '⚡' },
  { id: 'controversial', name: 'Controversial / Pattern-Interrupt', icon: '🔥' },
  { id: 'high_ticket', name: 'Premium / High-Ticket', icon: '💎' },
  { id: 'humorous', name: 'Humorous & Self-Deprecating', icon: '😂' },
  { id: 'urgent', name: 'High Urgency / FOMO', icon: '⏳' }
];

export const DURATIONS = [
  { id: '15s', name: '15 Seconds (Blitz Hook)', desc: 'Ultra-fast pacing for TikTok & Reels' },
  { id: '30s', name: '30 Seconds (Standard)', desc: 'Balanced viral structure' },
  { id: '60s', name: '60 Seconds (Full Story)', desc: 'Deep emotional resonance & social proof' },
  { id: '90s', name: '90 Seconds (Deep Dive)', desc: 'Objection handling for complex products' }
];

export const LANGUAGES = [
  { id: 'en', name: 'English', flag: '🇺🇸' },
  { id: 'ta', name: 'Tanglish / Tamil', flag: '🇮🇳' },
  { id: 'es', name: 'Spanish', flag: '🇪🇸' },
  { id: 'hi', name: 'Hindi / Hinglish', flag: '🇮🇳' }
];

export const PLATFORM_DETAILS = {
  instagram: {
    name: 'Instagram Reels',
    vibe: 'aesthetic, lifestyle-focused, clean, and aspirational',
    brollStyle: 'aesthetic close-up, text-overlay, smooth transition',
    capCutHint: 'Use trending low-tempo audio and warm film grain filter.'
  },
  facebook: {
    name: 'Facebook Ads',
    vibe: 'clear, problem-solving, high-trust, and relatable',
    brollStyle: 'split-screen, user showing the product, overlay text pointing to features',
    capCutHint: 'Ensure captions are large and readable as 75% watch on mute.'
  },
  youtube: {
    name: 'YouTube Shorts',
    vibe: 'fast-paced, high energy, shocking, and quick cuts',
    brollStyle: 'rapid zooms, pointing to the screen, before/after comparisons',
    capCutHint: 'Cut every 1.2 to 1.8 seconds to maximize viewer retention.'
  },
  tiktok: {
    name: 'TikTok',
    vibe: 'native, raw, trend-centric, and highly authentic',
    brollStyle: 'ASMR unboxing, green-screen reaction, face-to-camera confessional',
    capCutHint: 'Start directly mid-motion or mid-sentence; zero title screens!'
  }
};

/**
 * Helper to select randomized item from array
 */
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

/**
 * Generate 10 engaging hooks with framework and tone intelligence
 */
export function generateHooks(businessName, product, audience, platform = 'tiktok', options = {}) {
  const { framework = 'pas', tone = 'authentic', language = 'en', painPoint = '', offer = '' } = options;
  const name = businessName || 'this brand';
  const prod = product || 'this game-changer';
  const aud = audience || 'anyone trying to level up';
  const pain = painPoint || `wasting hours trying to deal with ${prod}`;
  const deal = offer ? ` (plus use code ${offer})` : '';

  // Tanglish / Tamil Hooks
  if (language === 'ta') {
    return [
      `Neenga ${aud} ah irundha, intha oru mistake kandippa pannathinga!`,
      `Honest review: Naan ${name} use panna start pannathula irundhu total ah scene change aayiduchu.`,
      `Intha video va scroll panradhuku munnadi 2 seconds nillunga—${prod} ungalukana absolute lifesaver!`,
      `Unpopular opinion: Neenga innum ${pain} pathi worry pandreengala? ${name} try pannave illaya?`,
      `Friends ellam en kitta eppadi nu kekuranga... Secret is just ${name}!`,
      `POV: Finally ${aud} ku work aagura ultimate solution kedaichuduchu!`,
      `Day 1 vs Day 30 after using ${prod}... Difference paatha neengale shock aavinga.`,
      `Indha hack theriyama ivalo naal time waste pannitene nu thonuthu!`,
      `Ungaluku ${pain} headache irundha, save this reel right now.`,
      `Don't say I didn't warn you—${name} stock theera poranga, link bio la check pannunga${deal}!`
    ];
  }

  // Spanish Hooks
  if (language === 'es') {
    return [
      `Si eres ${aud}, necesitas ver esto antes de que sea demasiado tarde.`,
      `Opinión impopular: Estás perdiendo demasiado tiempo con ${pain}.`,
      `No compres ${prod} hasta que veas mi experiencia después de 30 días.`,
      `Mi reacción honesta a ${name}: No esperaba que fuera TAN bueno.`,
      `POV: Finalmente encontraste lo único que de verdad funciona para ${aud}.`,
      `El hack definitivo que nadie te cuenta para dejar atrás ${pain}.`,
      `Si tu rutina no incluye ${name}, literalmente te estás complicando la vida.`,
      `Deja de hacer scroll si estás cansado de ${pain}... Esto es para ti.`,
      `Por esto es que todos en mi círculo están obsesionados con ${name}.`,
      `Corre a probarlo antes de que se agote${deal}. ¡Enlace en mi bio!`
    ];
  }

  // Hindi Hooks
  if (language === 'hi') {
    return [
      `Agar aap ek ${aud} hain, toh yeh galti bilkul mat karna!`,
      `Stop scrolling! Agar aap bhi ${pain} se pareshaan hain, toh yeh hack aapke liye hai.`,
      `Maine har cheez try ki, lekin sirf ${name} ne sach mein results diye.`,
      `POV: Jab aapko finally pata chale ki ${prod} aapka kitna time bacha sakta hai.`,
      `Honest review: Kya ${name} sach mein worth it hai ya sirf hype hai?`,
      `Yeh hack jaan kar aap kahenge: 'Kash mujhe pehle pata hota!'`,
      `Agar aap ${aud} hain, toh yeh video save karlo abhi ke abhi.`,
      `Unpopular opinion: ${pain} solve karna itna mushkil nahi hai agar aapke paas ${name} hai.`,
      `Sab log mujhse puch rahe hain mera secret... it's literally ${prod}!`,
      `Stock khatam hone se pehle check karlo${deal}, link bio mein hai!`
    ];
  }

  // English Hooks based on Tone & Framework
  let baseHooks = [];

  if (tone === 'genz') {
    baseHooks = [
      `Not me gatekeeping ${name} like my life depended on it... okay fine, here it is:`,
      `If you're a ${aud} and not using ${prod}, you are literally doing side quests.`,
      `Bestie, I was today years old when I found out ${name} completely solves ${pain}.`,
      `No cap, this is the only purchase this month that gave me 1000% dopamine.`,
      `POV: You finally stopped struggling with ${pain} and switched to ${name}.`,
      `Tell me you're obsessed with ${prod} without telling me... I'll go first.`,
      `I tested the viral ${name} so you don't have to, and honestly? Mind blown.`,
      `Pause. If you're tired of ${pain}, this TikTok is your sign to fix it right now.`,
      `Why is nobody talking about how ${prod} literally saved my entire week?`,
      `Run, don't walk... ${name} is breaking the internet and you need in${deal}.`
    ];
  } else if (tone === 'controversial') {
    baseHooks = [
      `Hot take: 99% of ${aud} are wasting their money doing ${pain} the old way.`,
      `Don't buy ${prod} until you watch this video... here is the brutal truth.`,
      `I'm probably going to make competitors furious by exposing how ${name} actually works.`,
      `Stop scrolling. If you still believe you need to suffer with ${pain}, you've been lied to.`,
      `Here is why the mainstream advice for ${aud} is completely broken in 2026.`,
      `Why is everyone hiding this shortcut? Because ${name} makes everything else obsolete.`,
      `Unpopular opinion: If you haven't tried ${prod}, you're making life 10x harder on purpose.`,
      `The industry doesn't want you to know about this ${name} hack... here's why.`,
      `I tried the 3 top alternatives for ${aud}, and frankly, 2 of them are pure garbage.`,
      `Before you waste another single dollar trying to fix ${pain}, look at this.`
    ];
  } else if (tone === 'high_ticket') {
    baseHooks = [
      `If your time is worth more than $100 an hour, struggling with ${pain} is costing you a fortune.`,
      `The high-performance framework top-tier ${aud} use with ${name} to scale effortlessly.`,
      `Why elite leaders are quietly replacing their existing workflow with ${prod}.`,
      `Precision, zero compromise, and flawless execution: our candid breakdown of ${name}.`,
      `Stop settling for mediocre results when solving ${pain}. Here is the enterprise-grade solution.`,
      `An executive overview: How ${name} delivers measurable ROI for ${aud} within 14 days.`,
      `The difference between amateurs and professionals in the ${aud} space comes down to ${prod}.`,
      `If you demand the absolute highest standard, this is why ${name} is in a league of its own.`,
      `Three non-negotiable reasons why top-tier creators and brands invest in ${name}.`,
      `Unlock disproportionate advantages: experience ${prod} engineered for ${aud}.`
    ];
  } else if (tone === 'humorous') {
    baseHooks = [
      `My toxic trait was thinking I could survive ${pain} without ${name}. Big mistake.`,
      `My bank account watched me buy ${prod} and for once, it didn't judge me.`,
      `Show me a person struggling with ${pain} and I'll show you someone who hasn't discovered ${name} yet.`,
      `I don't usually act like a walking infomercial, but ${prod} left me no choice.`,
      `My friends think I finally have my entire life together... jokes on them, it's just ${name}.`,
      `If loving ${name} is wrong, I genuinely don't want to be right.`,
      `I tried pretending I didn't need ${prod}... that lasted approximately 14 minutes.`,
      `POV: Me dramatically realizing that ${pain} was completely optional this entire time.`,
      `Please don't tell my ex that ${name} improved my life more than they ever did.`,
      `10/10 recommend. My stress levels dropped faster than my phone screen usually does.`
    ];
  } else if (tone === 'urgent') {
    baseHooks = [
      `URGENT: If you are a ${aud}, drop whatever you are doing and watch this for 30 seconds!`,
      `This is your final wake-up call to stop dealing with ${pain}.`,
      `Warning: Once you see how fast ${name} works, you will kick yourself for waiting.`,
      `This exclusive offer for ${aud} ends at midnight—here is why you need ${prod} today${deal}!`,
      `Stop wasting days on ${pain} when ${name} fixes it in under 60 seconds.`,
      `Almost 95% of our community grabbed this before it sold out last week... don't miss out.`,
      `If you've been sitting on the fence about ${prod}, this is your official sign.`,
      `Do not go to sleep tonight still dealing with ${pain}. Check out ${name} immediately.`,
      `The timer is ticking: Why thousands of ${aud} are securing ${name} right now.`,
      `Tap that link right this second before this batch is completely gone!`
    ];
  } else {
    // Standard Authentic
    baseHooks = [
      `Unpopular opinion: if you are in the ${aud} space and not using ${prod}, you're making life 10x harder.`,
      `Stop scrolling if you identify as ${aud}... this is the video you've been waiting for.`,
      `I was today years old when I realized ${name} solved my biggest headache with ${pain}.`,
      `Okay, this is your sign to finally stop struggling with ${pain}.`,
      `If you're a ${aud}, you need to see this game-changing shortcut right now.`,
      `This is exactly why my routine feels 100x smoother now (thanks to ${name}).`,
      `POV: You finally found the one thing that actually works for ${aud}.`,
      `Here is the honest truth about ${prod} that nobody wants you to know.`,
      `My day is completely thrown off if I don't have ${prod} with me. Here is why.`,
      `I tried every single alternative on the market, but only ${name} actually delivered.`
    ];
  }

  return baseHooks;
}

/**
 * Generate 10 Call-To-Action (CTA) variations
 */
export function generateCTAs(businessName, product, audience, platform = 'tiktok', options = {}) {
  const { tone = 'authentic', language = 'en', offer = '' } = options;
  const name = businessName || 'our brand';
  const prod = product || 'this product';
  const aud = audience || 'our community';
  const dealText = offer ? ` with discount code ${offer}` : '';

  if (language === 'ta') {
    return [
      `Keela irukura link click panni unga order-a ippove place pannunga!`,
      `Bio link la 20% discount offer irukku${dealText}, miss pannathinga!`,
      `Comment '${prod.split(' ')[0].toUpperCase()}' pannunga, naan direct link DM pandren!`,
      `Stock romba limited ah irukku, tap the shop button right now!`,
      `Risk-free trial kedaikuthu! Link in bio check pannunga.`,
      `Ungalukana special coupon code unlock panna link click pannunga.`,
      `10,000+ ${aud} kooda join aagunga—switch to ${name} today!`,
      `Ippove order panni intha weekly offer grab pannunga!`,
      `Swipe up panni ${name} official store visit pannunga!`,
      `Nalaiku price era poruthu, link tap panni thank me later!`
    ];
  }

  if (language === 'es') {
    return [
      `¡Haz clic en el enlace de abajo para conseguir el tuyo antes de que se agote!`,
      `Toca 'Más Información' para desbloquear tu descuento exclusivo${dealText}.`,
      `Comenta '${prod.split(' ')[0].toUpperCase()}' y te envío el link directo a tus DMs.`,
      `Entra a ${name.toLowerCase().replace(/\s+/g, '')}.com ahora y ahorra 20%.`,
      `Pruébalo sin riesgo hoy mismo. ¡Enlace directo en la bio!`,
      `Deja de perder el tiempo: haz clic abajo y transforma tu rutina hoy.`,
      `Únete a más de 10,000 ${aud} satisfechos que ya se cambiaron a ${name}.`,
      `Reclama tu oferta exclusiva antes de la medianoche tocando abajo.`,
      `¡Toca 'Comprar Ahora' y agradéceme después!`,
      `No digas que no te avisé... ¡los pedidos se cierran pronto!`
    ];
  }

  if (language === 'hi') {
    return [
      `Neeche diye gaye link par click karein aur apna pack abhi order karein!`,
      `Bio mein jaakar exclusive discount code claim karein${dealText}!`,
      `Comment karein '${prod.split(' ')[0].toUpperCase()}' aur main direct DM bhej dunga.`,
      `Risk-free trial ke liye abhi 'Shop Now' par tap karein.`,
      `10,000+ ${aud} already use kar rahe hain—aap kis cheez ka wait kar rahe hain?`,
      `Stock limited hai, pehle 100 orders par flat 20% off hai!`,
      `Time waste mat kijiye, link click karke apni life easy banayein.`,
      `Tap the link below to get yours today before it sells out!`,
      `Swipe up karke exclusive offer grab karein abhi!`,
      `Abhi order karein aur mujhe baad mein thank you bolna!`
    ];
  }

  return [
    `Click the link below to get yours today before we sell out${dealText}!`,
    `Tap 'Learn More' to grab the exclusive launch discount for ${aud}.`,
    `Comment "${prod.split(' ')[0].toUpperCase()}" below and I'll send the direct checkout link to your DMs!`,
    `Head to ${name.toLowerCase().replace(/\s+/g, '')}.com right now to lock in 20% off.`,
    `Try it completely risk-free for 30 days. Link in bio!`,
    `Stop wasting precious time—click below and transform your results today.`,
    `Don't say I didn't warn you! Tap the shop button below before inventory clears.`,
    `Join over 10,000+ ${aud} who made the switch to ${name}.`,
    `Claim your exclusive VIP bundle right now by clicking the link on screen.`,
    `Ready to upgrade? Tap 'Shop Now' and thank me later!`
  ];
}

/**
 * Generate 5 social captions with hashtags & emojis
 */
export function generateCaptions(businessName, product, audience, platform = 'tiktok', options = {}) {
  const { language = 'en', offer = '' } = options;
  const name = businessName || 'this';
  const prod = product || 'this gamechanger';
  const aud = audience || 'action takers';
  const couponText = offer ? ` Use code: ${offer} for extra discount!` : '';

  if (language === 'ta') {
    return [
      `Honest review: En life before ${name} vs after ${name} romba different! Neenga ${aud} ah irundha intha item ungaluku must-have 🤫${couponText}\n\n✨ Shop via link in bio!\n\n#ugc #marketingtamil #lifestylehacks #${platform} #viralreels`,
      `Secret is officially out 🚨 ${prod} kandippa unga daily routine-ah revolutionize pannum. No fake promises, just real results!\n\n👉 Bio link click panni try pannunga!\n\n#ugccreator #smartbuy #${platform}trends #honestreview`,
      `Efficiency matters! ${name} illama ennala ippo manage pannave mudiyadhu. Tap below to check out! 🤫\n\n#producthacks #musthave #${platform}ad #tamiltips`,
      `POV: Overspending stop panni ${name} switch panniyaachu. Best decision of this year! 🏆 Tag someone who needs this!\n\n#smartchoices #productivitytips #${platform}tamil #deals`,
      `Only 5% of ${aud} ku intha secret theriyum. Don't sleep on this! 🤫 Risk-free trial link bio-la irukku!\n\n#insiderhacks #ugcads #${platform}mademebuyit`
    ];
  }

  if (language === 'hi') {
    return [
      `Honest review: ${name} use karne ke baad meri life completely badal gayi! Agar aap ek ${aud} hain, toh yeh aapke liye must-have hai 🤫${couponText}\n\n✨ Link in bio par tap karein!\n\n#ugc #indiacreator #lifehacks #${platform} #viralreels`,
      `Secret officially out 🚨 ${prod} aapki daily routine ko revolutionize kar dega. Koi fake promise nahi — sirf real results!\n\n👉 Bio link click karke try karein!\n\n#ugccreator #smartbuy #honestreview #${platform}india`,
      `Efficiency sabse important hai! ${name} ke bina ab mujhse manage nahi hota. Tap below aur check karein! 🤫\n\n#producthacks #musthave #${platform}ad #hindiblogger`,
      `POV: Overspending band karke ${name} switch kar liya. Is saal ka best decision! 🏆 Tag karo jise yeh chahiye!\n\n#smartchoices #productivitytips #${platform}india #deals`,
      `Sirf 5% ${aud} ko yeh secret pata hai. Miss mat karo! 🤫 Risk-free trial link bio mein hai!\n\n#insiderhacks #ugcads #${platform}mademebuyit #indiablogger`
    ];
  }

  if (language === 'es') {
    return [
      `Honest review: Mi vida antes y después de ${name} es completamente diferente. Si eres un ${aud}, esto es imprescindible para ti 🤫${couponText}\n\n✨ ¡Enlace en bio!\n\n#ugc #creadorlatino #lifehacks #${platform} #viralreels`,
      `El secreto ya está afuera 🚨 ${prod} va a revolucionar tu rutina diaria. Sin promesas falsas — solo resultados reales.\n\n👉 ¡Haz clic en el enlace de la bio!\n\n#ugccreator #smartbuy #honestreview #${platform}`,
      `La eficiencia lo es todo. Sin ${name} ya no puedo funcionar. ¡Tap below y compruébalo! 🤫\n\n#producthacks #musthave #${platform}ad #espanol`,
      `POV: Dejé de gastar de más y me cambié a ${name}. Mejor decisión del año 🏆 ¡Etiqueta a quien lo necesite!\n\n#smartchoices #productividad #${platform} #deals`,
      `Solo el 5% de los ${aud} conocen este secreto. ¡No te lo pierdas! 🤫 Prueba sin riesgo en el link de la bio.\n\n#insiderhacks #ugcads #${platform}mademebuyit`
    ];
  }

  return [
    `Honestly, my life has been divided into two eras: Before ${name} and After 🤫 If you’re a ${aud}, you need this ASAP.${couponText}\n\n✨ Shop via link in bio!\n\n#ugc #marketingtips #musthave #lifestylehacks #${platform} #gamechanger`,
    `The secret is officially out 🚨 We designed ${prod} specifically for ${aud}. No fluff, just pure undeniable value.\n\n👉 Tap the link in our bio to grab yours today!\n\n#viralreels #growthmindset #businesshacks #${platform} #trendingnow`,
    `Tell me you're obsessed with efficiency without telling me... I'll go first: ${name} is literally glued to my routine now. 🤫\n\nClick 'Learn More' to see why everyone is talking about this!\n\n#ugccreator #honestreview #lifestylehacks #${platform}ad #savingtime`,
    `POV: You finally stopped overpaying and started using ${name}. Best decision of 2026, hands down. 🏆\n\nTag a friend who needs to see this!\n\n#smartchoices #productivitytips #budgetfriendly #${platform}trends #highlyrecommend`,
    `Only 5% of ${aud} know about this shortcut. Don't sleep on this. 🤫 Tap below to get started risk-free!\n\n#insiderhacks #ugcads #tiktokmademebuyit #musthaveapp #${platform}`
  ];
}

/**
 * Generate a complete UGC Script structure tailored by Framework, Duration, and Language
 */
export function generateUGCScript(businessName, product, audience, platform = 'tiktok', options = {}) {
  const { framework = 'pas', duration = '60s', language = 'en', painPoint = '', offer = '' } = options;
  const plat = PLATFORM_DETAILS[platform] || PLATFORM_DETAILS['tiktok'];
  const name = businessName || 'this brand';
  const prod = product || 'their solution';
  const aud = audience || 'busy professionals';
  const pain = painPoint || `struggling with inefficient workflows`;
  const dealStr = offer ? ` plus get 20% off with code ${offer}` : ' with 20% off today';

  // Tanglish / Tamil Script Generation
  if (language === 'ta') {
    return {
      hook: {
        title: "1. HOOK (0:00 - 0:03)",
        visual: `[Visual: Face to camera. Hold phone or product mid-frame with energetic eye contact. Text overlay: "Why nobody talks about this ${prod}..."]`,
        audio: `"Neenga ${aud} ah irundhu innum ${pain} pathi worry pandreengala? Intha 30 seconds skip pannama paarunga."`
      },
      problem: {
        title: "2. PROBLEM (0:03 - 0:15)",
        visual: `[Visual: B-Roll showing frustration, rubbing forehead, messy desk or unorganized apps. Fast cuts matching ${plat.vibe}.]`,
        audio: `"Naanum ivalo naal romba struggle pannen. Market la irukura ellathayum try panni kadaseela tired aayitten."`
      },
      solution: {
        title: "3. SOLUTION & DEMO (0:15 - 0:35)",
        visual: `[Visual: Clean close-up unboxing or screen demo of ${prod}. Smooth finger glide, showing how simple it is. Bright natural light.]`,
        audio: `"Aprom dhaan ${name} pathi therinjidhu. It is specially built for ${aud}. Just 2 minutes setup, aprom adhe work ah smooth ah mudikkuthu!"`
      },
      result: {
        title: "4. THE RESULT (0:35 - 0:48)",
        visual: `[Visual: Relaxed, smiling creator enjoying the output. Split-screen before vs after or metrics graphic.]`,
        audio: `"En time evvalavu save aachu nu enakke nambave mudiyala. Literally my best investment this year!"`
      },
      cta: {
        title: "5. CALL TO ACTION (0:48 - 0:60)",
        visual: `[Visual: Pointing to bottom of screen where discount banner appears. Tech Note: ${plat.capCutHint}]`,
        audio: `"Kandippa miss pannathinga! Keela irukura link click panni unga order ah ippove place pannunga${dealStr}!"`
      }
    };
  }

  // Framework-specific generation
  if (framework === 'confession') {
    return {
      hook: {
        title: "1. CONFESSIONAL HOOK (0:00 - 0:05)",
        visual: `[Visual: Intimate whisper/candid face-to-camera angle. Leaning in close to the lens. Text overlay: "DO NOT buy ${name} until you hear this..."]`,
        audio: `"I'm probably going to get in trouble for posting this, but if you're a ${aud}, you need to hear this before buying ${prod}."`
      },
      problem: {
        title: "2. THE DIRTY TRUTH (0:05 - 0:20)",
        visual: `[Visual: B-roll showing receipts, open tabs, or previous failed alternatives that cost tons of money. Aesthetic color grading.]`,
        audio: `"Most solutions for ${pain} are just overpriced junk wrapped in clever marketing. I spent hundreds of dollars testing them so you don't have to."`
      },
      solution: {
        title: "3. THE BREAKTHROUGH (0:20 - 0:40)",
        visual: `[Visual: Pulling out ${prod} from bag or opening app dashboard. Showing the actual tactile feature in real-time use.]`,
        audio: `"Then I gave ${name} an honest chance. And here's why it actually broke my skepticism: it cuts out all the useless friction and directly solves ${pain} in minutes."`
      },
      result: {
        title: "4. SOCIAL PROOF & CAVEAT (0:40 - 0:50)",
        visual: `[Visual: Scrolling through 5-star customer reviews or showing tangible proof on screen.]`,
        audio: `"The only catch? They constantly sell out of inventory because creators keep leaking this hack on TikTok."`
      },
      cta: {
        title: "5. ACTION TRIGGER (0:50 - 0:60)",
        visual: `[Visual: Tapping screen, showing the direct checkout page. On-screen text: "Link in bio before sold out".]`,
        audio: `"Check the link on this video right now to see if your bundle is still available${dealStr}. Don't wait on this!"`
      }
    };
  }

  if (framework === 'aida') {
    // Attention - Interest - Desire - Action
    return {
      hook: {
        title: "1. ATTENTION (0:00 - 0:04)",
        visual: `[Visual: Abrupt, loud pattern-interrupt. Jump cut straight to holding ${prod} close to lens. No intro, no music bed. Text overlay: "This changes everything for ${aud}."]`,
        audio: `"Wait — before you keep scrolling, this is the one thing that every ${aud} I know wishes they had found sooner."`
      },
      problem: {
        title: "2. INTEREST (0:04 - 0:20)",
        visual: `[Visual: Transition to talking-head close-up. Calm, conversational pacing. Show the ${prod} casually in hand like it's second nature. Vibe: ${plat.vibe}.]`,
        audio: `"I get it — you have probably tried a dozen options to solve ${pain}. Most of them over-promised and under-delivered. But ${name} genuinely does things differently, and the data backs it up."`
      },
      solution: {
        title: "3. DESIRE (0:20 - 0:42)",
        visual: `[Visual: Rapid product beauty shots. Close-ups of key features. Before/after split-screen. B-roll style: ${plat.brollStyle}. On-screen text highlighting top 3 benefits.]`,
        audio: `"Imagine waking up and having ${pain} completely handled — automatically. With ${name} you get precisely that: seamless results for ${aud} without the friction. Over 10,000 customers are already living this reality."`
      },
      result: {
        title: "4. CONVICTION (0:42 - 0:50)",
        visual: `[Visual: Scrolling 5-star review screenshots or UGC creator clips. Quick montage — 1.5 seconds each cut.]`,
        audio: `"This is not hype. Real people, real results. ${name} is now a non-negotiable part of how top ${aud} operate."`
      },
      cta: {
        title: "5. ACTION (0:50 - 0:60)",
        visual: `[Visual: Creator points to link / shop button with animated arrow. Clean end card. Tech Note: ${plat.capCutHint}]`,
        audio: `"Ready to stop struggling? Tap the link right now and get yours${dealStr}. Do not wait — you have seen what it does."`
      }
    };
  }

  if (framework === 'unboxing') {
    // ASMR / First Impression / Tactile Unboxing
    return {
      hook: {
        title: "1. SENSORY HOOK (0:00 - 0:05)",
        visual: `[Visual: ASMR close-up — manicured hands unboxing ${prod} on a clean marble or linen surface. Satisfying crinkle/peel sound. Warm cinematic colour grading. No text overlay for first 2 seconds.]`,
        audio: `"*Satisfying unboxing sounds* Oh wow — okay, I was NOT prepared for how premium this actually feels in real life."`
      },
      problem: {
        title: "2. FIRST IMPRESSION (0:05 - 0:18)",
        visual: `[Visual: Slow panning macro shots of packaging details, texture, logo embossing. Turn product over. Aesthetic B-roll. Vibe: ${plat.vibe}.]`,
        audio: `"Honestly, as a ${aud}, I have been burned before by products that look incredible online and arrive looking cheap. So I went in skeptical. The unboxing experience alone? Already a 10 out of 10."`
      },
      solution: {
        title: "3. THE DEMO (0:18 - 0:38)",
        visual: `[Visual: First live use of ${prod}. Tactile close-ups — fingers interacting with product, showing texture, result, or screen interface. Gentle ASMR ambient sounds. Style: ${plat.brollStyle}.]`,
        audio: `"And here is the moment of truth — first actual use. *soft reaction sound* Okay… that is genuinely impressive. It just works, no fuss, exactly as advertised. The difference is immediately obvious for ${pain}."`
      },
      result: {
        title: "4. HONEST VERDICT (0:38 - 0:50)",
        visual: `[Visual: Creator sits back, relaxed. Hold product comfortably. Authentic unscripted feel. Text: \"Honest ${name} Review\"]`,
        audio: `"My honest take after actually using it? This is easily going into my top 5 purchases this year. If you are a ${aud} and ${pain} is something you deal with, ${name} is the one."`
      },
      cta: {
        title: "5. CALL TO ACTION (0:50 - 0:60)",
        visual: `[Visual: Final close-up product shot with hand frame. Clean fade out. Tech Note: ${plat.capCutHint}]`,
        audio: `"Link is right below — grab yours${dealStr} before they sell out again. I will not gatekeep this one."`
      }
    };
  }

  if (framework === 'mythbuster') {
    return {
      hook: {
        title: "1. PATTERN INTERRUPT (0:00 - 0:04)",
        visual: `[Visual: Hand holding a red X buzzer sound or dramatic hand gesture. Text on screen: "3 MISTAKES ${aud.toUpperCase()} MAKE WITH ${prod.toUpperCase()}"]`,
        audio: `"Stop doing this! Here are the 3 huge mistakes 90% of ${aud} are making when trying to fix ${pain}."`
      },
      problem: {
        title: "2. MISTAKES #1 & #2 (0:04 - 0:22)",
        visual: `[Visual: Quick rapid cuts. Showing bad habits, overcomplicating tools, and wasted effort. Sound effects on each number.]`,
        audio: `"Mistake one: Spending hours on manual tasks that should take seconds. Mistake two: Paying for expensive tools that don't talk to each other."`
      },
      solution: {
        title: "3. THE FIX: MISTAKE #3 & ${name} (0:22 - 0:42)",
        visual: `[Visual: Revealing ${name}. Hands-on demonstration showing the exact feature solving the dilemma.]`,
        audio: `"And the biggest mistake? Not using ${name}. It combines everything ${aud} need into one frictionless experience. Look how fast this runs."`
      },
      result: {
        title: "4. THE OUTCOME (0:42 - 0:50)",
        visual: `[Visual: Aesthetic high-retention transition showing clean finished result.]`,
        audio: `"Once you fix these three things, your workflow will never feel the same again."`
      },
      cta: {
        title: "5. CTA (0:50 - 0:60)",
        visual: `[Visual: Pointing to profile link with animated arrow sticker. Sound effect: Ding!]`,
        audio: `"Save this video for later, and tap the link in bio right now to claim your exclusive trial${dealStr}!"`
      }
    };
  }

  if (framework === 'bab') {
    // Before - After - Bridge
    return {
      hook: {
        title: "1. THE BEFORE HOOK (0:00 - 0:05)",
        visual: `[Visual: Melodramatic clip showing the frustrating 'Before' reality. Messy, slow, stress-inducing. Text: "My life before vs after ${name}..."]`,
        audio: `"This was me just three weeks ago: completely overwhelmed by ${pain} and feeling like nothing worked."`
      },
      problem: {
        title: "2. THE TURNING POINT (0:05 - 0:18)",
        visual: `[Visual: Transition whoosh. Sitting down with ${prod}. Clean unboxing or slick login screen.]`,
        audio: `"I was about to accept that this is just how hard life had to be. Until a colleague forced me to try ${name}."`
      },
      solution: {
        title: "3. THE 'AFTER' REALITY (0:18 - 0:38)",
        visual: `[Visual: Bright vibrant lighting, calm smile, product working effortlessly in background. Showing key benefits with on-screen popups.]`,
        audio: `"Fast forward to today: look at this. Everything is automated, organized, and running without me breaking a sweat. It literally bridged the entire gap for me."`
      },
      result: {
        title: "4. WHY IT WORKS (0:38 - 0:50)",
        visual: `[Visual: Quick macro shot of the product build quality / UX details. Vibe: ${plat.vibe}.]`,
        audio: `"It is engineered specifically for ${aud}, without any of the unnecessary bloat."`
      },
      cta: {
        title: "5. BRIDGE TO ACTION (0:50 - 0:60)",
        visual: `[Visual: Creator holding up thumb, pointing to link. Tech Note: ${plat.capCutHint}]`,
        audio: `"Want the same results? Tap the button below to get your hands on ${name} with our special launch offer${dealStr}!"`
      }
    };
  }

  // Default PAS (Problem - Agitate - Solve)
  return {
    hook: {
      title: "1. HOOK (0:00 - 0:03)",
      visual: `[Visual: Face to camera. Start mid-motion, holding up your phone or showing ${prod} close to the lens. Text on screen: "Why nobody talks about this ${prod} hack..."]`,
      audio: `"I'm going to be 100% real with you. If you're a ${aud}, you're probably wasting hours doing this the hard way."`
    },
    problem: {
      title: "2. PROBLEM & AGITATION (0:03 - 0:18)",
      visual: `[Visual: B-Roll showing frustration. Rubbing temples, looking overwhelmed at the desk, or trying to manage ${pain} unsuccessfully. Vibe: ${plat.vibe}.]`,
      audio: `"Before I found ${name}, I was constantly struggling to get results with ${pain}. I tried everything, but nothing seemed to fit my workflow, and frankly, I was ready to just give up."`
    },
    solution: {
      title: "3. THE SOLUTION (0:18 - 0:35)",
      visual: `[Visual: Close up of ${prod} in action. Smooth panning shots, demonstrating ease of use, tapping screen, or applying the solution. Text overlay highlighting key benefits.]`,
      audio: `"Then I started using ${name}. It's literally designed for ${aud} to make ${prod} seamless. You just set it up in 2 minutes, and it immediately starts doing the heavy lifting for you."`
    },
    result: {
      title: "4. THE RESULT (0:35 - 0:48)",
      visual: `[Visual: Happy, relieved reaction. Smiley face, typing quickly or using the product with a satisfied expression. Show an before/after chart or aesthetic success clip.]`,
      audio: `"The difference is night and day. I've saved so much time, and the quality has skyrocketed. It's easily the best investment I've made this year."`
    },
    cta: {
      title: "5. CALL TO ACTION (0:48 - 0:60)",
      visual: `[Visual: Pointing to the screen where a discount code or button is shown. End with a clean screen showing the brand logo. Tech Note: ${plat.capCutHint}]`,
      audio: `"Stop wasting your time struggling with ${pain}. Click the link on this video right now to grab yours${dealStr}!"`
    }
  };
}

/**
 * Regenerate an individual item on demand (hook, CTA, caption, or script step)
 */
export function regenerateSingleItem(type, index, currentData, formData, options = {}) {
  if (type === 'hooks') {
    const freshHooks = generateHooks(formData.businessName, formData.product, formData.audience, formData.platform, options);
    // Find one that is different from current
    const currentHook = currentData.hooks[index];
    const candidate = freshHooks.find(h => h !== currentHook) || freshHooks[0];
    const updated = [...currentData.hooks];
    updated[index] = candidate;
    return { ...currentData, hooks: updated };
  }

  if (type === 'cta') {
    const freshCtas = generateCTAs(formData.businessName, formData.product, formData.audience, formData.platform, options);
    const currentCta = currentData.ctas[index];
    const candidate = freshCtas.find(c => c !== currentCta) || freshCtas[0];
    const updated = [...currentData.ctas];
    updated[index] = candidate;
    return { ...currentData, ctas: updated };
  }

  if (type === 'captions') {
    const freshCaptions = generateCaptions(formData.businessName, formData.product, formData.audience, formData.platform, options);
    const updated = [...currentData.captions];
    updated[index] = freshCaptions[index % freshCaptions.length];
    return { ...currentData, captions: updated };
  }

  if (type === 'scriptStep') {
    const freshScript = generateUGCScript(formData.businessName, formData.product, formData.audience, formData.platform, options);
    const keys = Object.keys(currentData.script);
    const targetKey = keys[index] || index;
    const updated = { ...currentData.script, [targetKey]: freshScript[targetKey] };
    return { ...currentData, script: updated };
  }

  return currentData;
}

/**
 * Generate Complete Ad Pack (combines all sections into unified document)
 */
export function generateCompleteAdPack(businessName, product, audience, platform = 'tiktok', options = {}) {
  const hooks = generateHooks(businessName, product, audience, platform, options);
  const script = generateUGCScript(businessName, product, audience, platform, options);
  const ctas = generateCTAs(businessName, product, audience, platform, options);
  const captions = generateCaptions(businessName, product, audience, platform, options);

  const platName = (PLATFORM_DETAILS[platform] || {}).name || platform;
  const langName = (LANGUAGES.find(l => l.id === options.language) || {}).name || 'English';

  let output = `==================================================
📢 AI UGC AD PACK: ${businessName ? businessName.toUpperCase() : 'YOUR BRAND'}
🎯 Platform: ${platName}
🎯 Target Audience: ${audience || 'General'}
⚡ Framework: ${(options.framework || 'PAS').toUpperCase()} | Tone: ${options.tone || 'Authentic'} | Language: ${langName}
==================================================\n\n`;

  output += `🔥 SECTION 1: SCROLL-STOPPING HOOKS (Choose 1)\n`;
  output += `--------------------------------------------------\n`;
  hooks.forEach((hook, i) => {
    output += `${i + 1}. "${hook}"\n`;
  });
  output += `\n`;

  output += `🎬 SECTION 2: DYNAMIC UGC SCRIPT (${options.duration || '60 Seconds'})\n`;
  output += `--------------------------------------------------\n`;
  Object.values(script).forEach(sec => {
    output += `📌 ${sec.title}\n`;
    output += `🎥 Video/B-Roll: ${sec.visual}\n`;
    output += `🎙️ Voiceover: ${sec.audio}\n\n`;
  });

  output += `⚡ SECTION 3: HIGH-CONVERSION CTA VARIATIONS\n`;
  output += `--------------------------------------------------\n`;
  ctas.forEach((cta, i) => {
    output += `${i + 1}. "${cta}"\n`;
  });
  output += `\n`;

  output += `✍️ SECTION 4: ENGAGING SOCIAL MEDIA CAPTIONS\n`;
  output += `--------------------------------------------------\n`;
  captions.forEach((cap, i) => {
    output += `[Caption Option ${i + 1}]\n`;
    output += `${cap}\n`;
    output += `--------------------------------------------------\n`;
  });

  return output.trim();
}
