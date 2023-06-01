import React, { useState, useRef } from 'react';

const HomePage = () => {
  const [variantUuid, setVariantUuid] = useState('');
  const [formName, setFormName] = useState('')

  const downloadLinkRef = useRef<HTMLAnchorElement | null>(null);

  const downloadFormsortPdf = async () => {
    const response = await fetch(`/api/generate-pdf?variantRevisionUuid=${variantUuid}&formName=${formName}`);
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
      <h1>Formsort eCrf PDF generator</h1>
  
      <div className="form-field">
        <label htmlFor="form-id">Form name</label>
        <input
          id="form-id"
          value={formName}
          onChange={(e) => {
            setFormName(e.target.value);
          }}
        />
      </div>
  
      <div className="form-field">
        <label htmlFor="variant-id">Formsort form variant uuid</label>
        <input
          id="variant-id"
          value={variantUuid}
          onChange={(e) => {
            setVariantUuid(e.target.value);
          }}
        />
      </div>
  
      <button disabled={variantUuid.length <= 0 || formName.length <= 0} onClick={downloadFormsortPdf}>
        Download
      </button>
      {/* This link will be invisible and used for triggering download */}
      <a ref={downloadLinkRef} style={{ display: "none" }}></a>
    </main>
  );
};

export default HomePage;