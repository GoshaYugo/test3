// pages/sound.js
import { useState, useEffect } from 'react';
import socket from '../socket';

export default function Sound() {
  const [soundPlayed, setSoundPlayed] = useState(false);

  useEffect(() => {
    socket.on('playSound', (data) => {
      const audio = new Audio(data.soundUrl);
      audio.play();
      setSoundPlayed(true);
    });

    return () => {
      socket.off('playSound');
    };
  }, []);

  return (
    <div>
      <h1>音再生ページ</h1>
      {!soundPlayed && <p>スマホAからの指示を待っています...</p>}
    </div>
  );
}
