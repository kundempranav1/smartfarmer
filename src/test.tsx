import React from 'react';
export default function Test() {
  return <button onClick={async () => {
    const html2pdf = (await import('html2pdf.js')).default;
    console.log(html2pdf);
  }}>Test</button>;
}
