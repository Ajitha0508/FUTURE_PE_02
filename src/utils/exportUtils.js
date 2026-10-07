/**
 * Export and Download utilities for UGC Scripts & Packs
 */

export function downloadFile(filename, content, mimeType = 'text/plain;charset=utf-8;') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Format and download ad pack as TXT
 */
export function exportAsText(data) {
  const safeTitle = (data.businessName || 'ad_pack').toLowerCase().replace(/\s+/g, '_');
  const filename = `${safeTitle}_ugc_script.txt`;
  downloadFile(filename, data.all || '');
}

/**
 * Format and download ad pack as Markdown (.md)
 */
export function exportAsMarkdown(data) {
  const safeTitle = (data.businessName || 'ad_pack').toLowerCase().replace(/\s+/g, '_');
  const filename = `${safeTitle}_ugc_script.md`;

  let md = `# 📢 UGC Campaign Pack: ${data.businessName || 'Brand'}\n\n`;
  md += `**Platform:** ${data.platform?.toUpperCase() || 'TikTok/Reels'} | **Audience:** ${data.audience || 'Target'} | **Duration:** ${data.duration || '60s'}\n`;
  if (data.framework) md += `**Framework:** ${data.framework.toUpperCase()} | **Tone:** ${data.tone || 'Authentic'}\n\n`;
  md += `---\n\n`;

  md += `## 🔥 Scroll-Stopping Hooks (First 3 Seconds)\n\n`;
  (data.hooks || []).forEach((h, i) => {
    md += `${i + 1}. > "${h}"\n\n`;
  });

  md += `## 🎬 UGC Video Script (${data.duration || '60 Seconds'})\n\n`;
  if (data.script) {
    Object.values(data.script).forEach(sec => {
      md += `### ${sec.title}\n`;
      md += `- **🎥 Visual / B-Roll:** ${sec.visual}\n`;
      md += `- **🎙️ Voiceover:** "${sec.audio}"\n\n`;
    });
  }

  md += `## ⚡ Call-To-Action (CTA) Variations\n\n`;
  (data.ctas || []).forEach((c, i) => {
    md += `- **CTA #${i + 1}:** "${c}"\n`;
  });
  md += `\n`;

  md += `## ✍️ Social Captions & Hashtags\n\n`;
  (data.captions || []).forEach((cap, i) => {
    md += `### Option ${i + 1}\n\`\`\`\n${cap}\n\`\`\`\n\n`;
  });

  downloadFile(filename, md, 'text/markdown;charset=utf-8;');
}

/**
 * Format and download as CSV for CapCut / Premiere Pro / Notion Production Cue Sheet
 */
export function exportAsCSV(data) {
  const safeTitle = (data.businessName || 'ad_pack').toLowerCase().replace(/\s+/g, '_');
  const filename = `${safeTitle}_capcut_cuesheet.csv`;

  let csvContent = `"Scene / Step","Time Window","Visual B-Roll / Actions","Spoken Voiceover / Audio","On-Screen Text"\n`;

  if (data.script) {
    Object.values(data.script).forEach((sec) => {
      // Extract time window if present in title
      const timeMatch = sec.title.match(/\((.*?)\)/);
      const timeWindow = timeMatch ? timeMatch[1] : '';
      const sceneName = sec.title.replace(/\(.*?\)/, '').trim();

      // Clean visual and audio strings for CSV
      const visualClean = (sec.visual || '').replace(/"/g, '""');
      const audioClean = (sec.audio || '').replace(/"/g, '""');
      const onScreenText = `"${visualClean.split('.')[0] || ''}"`;

      csvContent += `"${sceneName}","${timeWindow}","${visualClean}","${audioClean}",${onScreenText}\n`;
    });
  }

  downloadFile(filename, csvContent, 'text/csv;charset=utf-8;');
}

/**
 * Trigger clean browser print preview of the script
 */
export function printScript(data) {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    window.print();
    return;
  }

  const scriptHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${data.businessName || 'UGC'} Script Sheet</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 40px; color: #111; line-height: 1.6; }
          h1 { color: #5b21b6; border-bottom: 2px solid #ddd; padding-bottom: 8px; margin-bottom: 12px; }
          .meta { font-size: 14px; color: #666; margin-bottom: 24px; }
          .section { margin-bottom: 24px; page-break-inside: avoid; }
          h2 { color: #1f2937; font-size: 18px; margin-bottom: 8px; border-left: 4px solid #7c3aed; padding-left: 10px; }
          .scene-card { border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px; margin-bottom: 12px; background: #fafafa; }
          .scene-title { font-weight: bold; color: #4338ca; }
          .cue { margin: 6px 0; }
          .voiceover { font-style: italic; background: #eef2ff; padding: 8px; border-radius: 6px; }
          @media print {
            body { padding: 20px; }
            button { display: none; }
          }
        </style>
      </head>
      <body>
        <h1>🎬 UGC Production Script: ${data.businessName || 'Brand'}</h1>
        <div class="meta">
          <strong>Platform:</strong> ${data.platform?.toUpperCase()} | 
          <strong>Audience:</strong> ${data.audience} | 
          <strong>Product:</strong> ${data.product}
        </div>

        <div class="section">
          <h2>🔥 Selected Hooks (0:00 - 0:03)</h2>
          <ol>
            ${(data.hooks || []).slice(0, 5).map(h => `<li>"${h}"</li>`).join('')}
          </ol>
        </div>

        <div class="section">
          <h2>🎥 Storyboard & Scene Breakdown</h2>
          ${data.script ? Object.values(data.script).map(sec => `
            <div class="scene-card">
              <div class="scene-title">${sec.title}</div>
              <div class="cue"><strong>Visual / B-Roll:</strong> ${sec.visual}</div>
              <div class="voiceover"><strong>Voiceover:</strong> "${sec.audio}"</div>
            </div>
          `).join('') : ''}
        </div>

        <div class="section">
          <h2>⚡ High-Conversion CTAs</h2>
          <ul>
            ${(data.ctas || []).slice(0, 4).map(c => `<li>"${c}"</li>`).join('')}
          </ul>
        </div>

        <script>
          window.onload = function() { window.print(); };
        </script>
      </body>
    </html>
  `;

  printWindow.document.write(scriptHtml);
  printWindow.document.close();
}
