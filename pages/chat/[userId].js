// pages/chat/[userId].js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Chat({ userId }) {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [buttonCount, setButtonCount] = useState(0);

  const router = useRouter();

  const startRecording = () => {
    // 録音開始処理（仮）
    setIsRecording(true);
  };

  const stopRecording = () => {
    // 録音停止処理（仮）
    setIsRecording(false);
  };

  // ChatGPT OpenAPIを使って嫌なワードを推定
  const getUnpleasantWord = async (message) => {
    try {
      const response = await fetch('/api/chatgpt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
      const data = await response.json();
      return data.unpleasantWord;
    } catch (error) {
      console.error('Error calling ChatGPT API', error);
    }
  };

  const handleButtonClick = async () => {
    // ボタン押下処理
    setButtonCount(buttonCount + 1);

    const unpleasantWord = await getUnpleasantWord(message);

    // Firebaseに保存
    saveMessageToFirebase(message, unpleasantWord);
  };

  const saveMessageToFirebase = async (message, unpleasantWord) => {
    // Firebaseにメッセージを保存
    const response = await fetch('/api/saveMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, unpleasantWord }),
    });
    if (response.ok) {
      console.log('Message saved');
    } else {
      console.error('Error saving message');
    }
  };

  const endConversation = () => {
    // 会話終了処理
    alert(`ありがとうございました！\nボタンを押した回数: ${buttonCount}`);
  };

  return (
    <div>
      <h1>{userId}との会話</h1>
      <button onClick={startRecording} disabled={isRecording}>録音開始</button>
      <button onClick={stopRecording} disabled={!isRecording}>録音停止</button>
      <button onClick={handleButtonClick}>不快なワード</button>
      <div>
        <button onClick={endConversation}>会話終了</button>
      </div>
    </div>
  );
}
