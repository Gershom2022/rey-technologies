// components/SafeMessage.jsx
import React from 'react';

function SafeMessage({ text, maxLength }) {
  if (!text) return <span>—</span>;
  
  // Truncate if needed
  let displayText = text;
  if (maxLength && text.length > maxLength) {
    displayText = text.substring(0, maxLength) + '...';
  }
  
  // Escape HTML characters to prevent XSS
  const escapedText = displayText.replace(/[<>&]/g, function(m) {
    if (m === '<') return '&lt;';
    if (m === '>') return '&gt;';
    if (m === '&') return '&amp;';
    return m;
  });
  
  return <span dangerouslySetInnerHTML={{ __html: escapedText }} />;
}

export default SafeMessage;