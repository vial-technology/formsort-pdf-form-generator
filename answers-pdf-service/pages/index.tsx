import React, { useState, useRef } from 'react';

const HomePage = () => {
  const [variantUuid, setVariantUuid] = useState('');

  const downloadLinkRef = useRef<HTMLAnchorElement | null>(null);

  const downloadFormsortPdf = async () => {
    const response = await fetch(`/api/generate-pdf?variantRevisionUuid=${variantUuid}`);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    if (downloadLinkRef.current) {
      downloadLinkRef.current.href = url;
      downloadLinkRef.current.download = 'file.pdf';
      downloadLinkRef.current.click();
    }
  };

  return (
    <main>
      <h1>Answer PDF generator</h1>
      <label itemID='variant-id'>Formsort form variant uuid</label>
      <br/>
      <input
        id='variant-id'
        value={variantUuid}
        style={{
          marginRight: 5
        }}
        onChange={(e) => {
          setVariantUuid(e.target.value);
        }}
      />
      <button disabled={variantUuid.length <= 0} onClick={downloadFormsortPdf}>
        Download
      </button>
      {/* This link will be invisible and used for triggering download */}
      <a ref={downloadLinkRef} style={{ display: 'none' }}></a>
    </main>
  );
};

export default HomePage;