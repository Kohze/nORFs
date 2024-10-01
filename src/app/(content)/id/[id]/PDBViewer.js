'use client'

import React, { useEffect, useRef, useState } from 'react';
import * as $3Dmol from '3dmol';

export default function PDBViewer({ pdbUrl }) {
  const viewerRef = useRef(null);
  const [debugInfo, setDebugInfo] = useState('Loading...');

  useEffect(() => {
    if (viewerRef.current && pdbUrl) {
      const viewer = $3Dmol.createViewer(viewerRef.current, {
        backgroundColor: '#f3f4f6',
      });

      fetch(pdbUrl)
        .then(response => response.text())
        .then(data => {
          // Remove the unexpected header
          const cleanedData = data.replace(/^PARENT.*\n/, '');
          
          try {
            viewer.addModel(cleanedData, 'pdb');
            viewer.setStyle({}, { cartoon: { color: 'spectrum' } });
            viewer.zoomTo();
            viewer.render();
            setDebugInfo('PDB loaded successfully');
          } catch (error) {
            setDebugInfo(`Error processing PDB: ${error.message}`);
          }
        })
        .catch(error => {
          setDebugInfo(`Error loading PDB: ${error}`);
        });

      return () => {
        viewer.clear();
      };
    } else {
      setDebugInfo('Error: Viewer ref or PDB URL is missing');
    }
  }, [pdbUrl]);

  return (
    <div>
      <div 
        ref={viewerRef} 
        style={{ 
          width: '100%', 
          height: '230px',
          overflow: 'show',
          position: 'relative',
          marginTop: '20px',
          marginBottom: '20px',
          backgroundColor: '#f3f4f6',
        }} 
      />
      <div className="text-sm text-gray-600 mt-2">{debugInfo}</div>
    </div>
  );
}