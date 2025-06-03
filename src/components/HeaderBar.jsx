import React from 'react';

export const HEADER_HEIGHT = 56;

export default function HeaderBar() {
  return (
    <header
      style={{
        width: '100%',
        height: HEADER_HEIGHT,
        background: '#000',
        display: 'flex',
        alignItems: 'center',
        padding: '0 32px',
        boxSizing: 'border-box',
        zIndex: 1200,
        position: 'fixed',
        top: 0,
        left: 0,
        boxShadow: '0 2px 8px 0 rgba(0,0,0,0.07)',
      }}
    >
      <img
        src="/Total TV_Primary logo_colour with white.png"
        alt="Total TV Primary Logo"
        style={{ height: 55, width: 'auto', display: 'block' }}
      />
    </header>
  );
} 