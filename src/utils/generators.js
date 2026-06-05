/**
 * AI UGC Ad Script Generator Templates and Logic
 * Generates custom hooks, scripts, CTAs, and captions based on inputs.
 */

const PLATFORM_DETAILS = {
  'instagram': {
    name: 'Instagram Reels',
    vibe: 'aesthetic, lifestyle-focused, clean, and aspirational',
    brollStyle: 'aesthetic close-up, text-overlay, smooth transition',
    capCutHint: 'Use a popular trending audio and aesthetic filters.'
  },
  'facebook': {
    name: 'Facebook Ads',
    vibe: 'clear, problem-solving, high-trust, and relatable',
    brollStyle: 'split-screen, user showing the product, overlay text pointing to features',
    capCutHint: 'Ensure captions are large and readable as many users watch on mute.'
  },
  'youtube': {
    name: 'YouTube Shorts',
    vibe: 'fast-paced, high energy, shocking, and quick cuts',
    brollStyle: 'rapid zooms, pointing to the screen, before/after comparisons',
    capCutHint: 'Cut every 1.5 seconds to maximize viewer retention.'
  },
  'tiktok': {
    name: 'TikTok',
    vibe: 'native, raw, trend-centric, and highly authentic',
    brollStyle: 'ASMR style unboxing, green-screen reaction, face-to-camera confessional',
    capCutHint: 'Start directly in the middle of an action; no intro screens!'
  }
};

/**
 * Generate 10 engaging hooks based on user inputs
 */
export function generateHooks(businessName, product, audience, platform) {
  const plat = PLATFORM_DETAILS[platform] || PLATFORM_DETAILS['tiktok'];
  
  return [
    `Unpopular opinion: if you are in the ${audience} space and not using ${product}, you're making life 10x harder.`,
    `Stop scrolling if you identify as ${audience || 'someone looking for a better way'}... this is for you.`,
    `I was today years old when I realized ${businessName ? businessName + ' solved' : 'there was a solution for'} my biggest problem.`,
    `Okay, this is your sign to finally stop struggling with ${product ? 'finding the best ' + product : 'this everyday issue'}.`,
    `If you're a ${audience || 'busy person'}, you need to see this hack right now.`,
    `This is exactly why my friends think I have my life together (thanks to ${businessName || 'this amazing tool'}).`,
    `POV: You finally found the one thing that actually works for ${audience}.`,
    `Here is the honest truth about ${product || 'this new trend'} that nobody wants you to know.`,
    `My daily routine is completely ruined if I don't use this. Here's why.`,
    `I tried every single alternative on the market, but only ${businessName || 'this product'} actually delivered.`
  ];
}

/**
 * Generate 10 Call-To-Action (CTA) variations
 */
export function generateCTAs(businessName, product, audience, platform) {
  const plat = PLATFORM_DETAILS[platform] || PLATFORM_DETAILS['tiktok'];
  const name = businessName || 'our brand';
  
  return [
    `Click the link below to get yours today before we sell out!`,
    `Tap 'Learn More' to grab the exclusive discount for ${audience || 'our community'}.`,
    `Comment "${product ? product.split(' ')[0].toUpperCase() : 'WANT'}" below and I'll send the direct link to your DMs!`,
    `Go to ${name.toLowerCase().replace(/\s+/g, '')}.com right now to lock in 20% off.`,
    `Try it completely risk-free today. Link in bio!`,
    `Stop wasting time—click below and transform your routine today.`,
    `Don't say I didn't warn you! Tap the shop button below.`,
    `Join over 10,000+ ${audience || 'happy customers'} who switched to ${name}.`,
    `Claim your exclusive deal now by swiping up or clicking below.`,
    `Ready to upgrade? Tap 'Shop Now' and thank me later!`
  ];
}

/**
 * Generate 5 social media captions with hashtags and emojis
 */
export function generateCaptions(businessName, product, audience, platform) {
  const name = businessName || 'this';
  const prod = product || 'this gamechanger';
  
  return [
    `Honestly, my life has been divided into two eras: Before ${name} and After 🤫 If you’re a ${audience || 'action taker'}, you need this ASAP. \n\n✨ Shop via link in bio! \n\n#ugc #marketingtips #musthave #lifestylehacks #${platform} #gamechanger`,
    
    `The secret is officially out 🚨 We designed ${prod} specifically for ${audience || 'people who want results'}. No fluff, just pure value. \n\n👉 Tap the link in our bio to grab yours! \n\n#viralreels #growthmindset #businesshacks #${platform} #trendingnow`,
    
    `Tell me you're obsessed with efficiency without telling me... I'll go first: ${name} is literally glued to my routine now. 🤫 \n\nClick 'Learn More' to see why everyone is talking about this! \n\n#ugccreator #honestreview #lifestylehacks #${platform}ad #savingtime`,
    
    `POV: You finally stopped overpaying and started using ${name}. Best decision of 2026, hands down. 🏆 \n\nTag a friend who needs to see this! \n\n#smartchoices #productivitytips #budgetfriendly #${platform}trends #highlyrecommend`,
    
    `Only 5% of ${audience || 'people'} know about this shortcut. Don't sleep on this. 🤫 Tap below to get started risk-free! \n\n#insiderhacks #ugcads #tiktokmademebuyit #musthaveapp #${platform}`
  ];
}

/**
 * Generate a complete UGC Script structure containing:
 * Hook, Problem, Solution, Result, CTA
 */
export function generateUGCScript(businessName, product, audience, platform) {
  const plat = PLATFORM_DETAILS[platform] || PLATFORM_DETAILS['tiktok'];
  const name = businessName || 'this brand';
  const prod = product || 'their product';
  const aud = audience || 'busy professionals';

  return {
    hook: {
      title: "1. HOOK (0:00 - 0:03)",
      visual: `[Visual: Face to camera. Start mid-motion, holding up your phone or showing the product close to the camera. Text on screen: "Why nobody talks about this ${prod} hack..."]`,
      audio: `"I'm going to be 100% real with you. If you're a ${aud}, you're probably wasting hours doing this the hard way."`
    },
    problem: {
      title: "2. PROBLEM (0:03 - 0:15)",
      visual: `[Visual: B-Roll showing frustration. Rubbing temples, looking overwhelmed at the desk, or trying to manage tasks unsuccessfully. Fast-paced cuts. Vibe: ${plat.vibe}.]`,
      audio: `"Before I found ${name}, I was constantly struggling to get results. I tried everything, but nothing seemed to fit my workflow, and frankly, I was ready to just give up."`
    },
    solution: {
      title: "3. SOLUTION (0:15 - 0:30)",
      visual: `[Visual: Close up of ${prod} in action. Smooth panning shots, demonstrating ease of use, tapping screen, or applying the solution. Text overlay highlighting key benefits.]`,
      audio: `"Then I started using ${name}. It's literally designed for ${aud} to make ${prod} seamless. You just set it up in 2 minutes, and it immediately starts doing the heavy lifting for you."`
    },
    result: {
      title: "4. RESULT (0:30 - 0:45)",
      visual: `[Visual: Happy, relieved reaction. Smiley face, typing quickly or using the product with a satisfied expression. Show an before/after chart or aesthetic success clip.]`,
      audio: `"The difference is night and day. I've saved so much time, and the quality has skyrocketed. It's easily the best investment I've made this year."`
    },
    cta: {
      title: "5. CALL TO ACTION (0:45 - 0:60)",
      visual: `[Visual: Pointing to the screen where a discount code or button is shown. End with a clean screen showing the brand logo. Tech Note: ${plat.capCutHint}]`,
      audio: `"Stop wasting your time struggling. Click the link on this video right now to grab yours with 20% off today!"`
    }
  };
}

/**
 * Generate Complete Ad Pack (combines all of the above)
 */
export function generateCompleteAdPack(businessName, product, audience, platform) {
  const hooks = generateHooks(businessName, product, audience, platform);
  const script = generateUGCScript(businessName, product, audience, platform);
  const ctas = generateCTAs(businessName, product, audience, platform);
  const captions = generateCaptions(businessName, product, audience, platform);

  let output = `==================================================
📢 AI UGC AD PACK: ${businessName ? businessName.toUpperCase() : 'YOUR BRAND'}
🎯 Platform: ${(PLATFORM_DETAILS[platform] || {}).name || platform}
🎯 Target Audience: ${audience || 'General'}
==================================================\n\n`;

  output += `🔥 SECTION 1: SCROLL-STOPPING HOOKS (Choose 1)\n`;
  hooks.forEach((hook, i) => {
    output += `${i + 1}. "${hook}"\n`;
  });
  output += `\n`;

  output += `🎬 SECTION 2: DYNAMIC UGC SCRIPT (60 Seconds)\n`;
  output += `--------------------------------------------------\n`;
  [script.hook, script.problem, script.solution, script.result, script.cta].forEach(sec => {
    output += `📌 ${sec.title}\n`;
    output += `🎥 Video/B-Roll: ${sec.visual}\n`;
    output += `🎙️ Voiceover: ${sec.audio}\n\n`;
  });

  output += `⚡ SECTION 3: HIGH-CONVERSION CTA VARIATIONS\n`;
  ctas.forEach((cta, i) => {
    output += `${i + 1}. "${cta}"\n`;
  });
  output += `\n`;

  output += `✍️ SECTION 4: ENGAGING SOCIAL MEDIA CAPTIONS\n`;
  captions.forEach((cap, i) => {
    output += `[Caption Option ${i + 1}]\n`;
    output += `${cap}\n`;
    output += `--------------------------------------------------\n`;
  });

  return output.trim();
}
