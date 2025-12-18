'use client';

import React from 'react';
import ReactSnowfall from 'react-snowfall';

const Snowfall = () => {
  return (
    <ReactSnowfall
      snowflakeCount={180}
      style={{
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        filter: 'blur(0.5px)',
      }}
      // A pure white with lower opacity (0.6) looks more like ice/water than paint
      color="#FFFFFF99"
      // Drastic size variation creates a sense of foreground and background
      radius={[0.5, 5.0]}
      // Slower speeds look more peaceful and natural
      speed={[0.5, 2.5]}
      // Wind adds a natural 'sway' rather than just falling straight down
      wind={[-0.5, 2.0]}
    />
  );
};

export default Snowfall;
