//デバイスの選択
// pages/selectDevice.js
import { useRouter } from 'next/router';

export default function SelectDevice() {
  const router = useRouter();

  const handleDeviceSelection = (device) => {
    if (device === 'A') {
      router.push('/chat/awaiting');  // スマホA選択時
    } else if (device === 'B') {
      router.push('/chat/selectUser');  // スマホB選択時
    } else {
      router.push('/sound');  // スマホC選択時
    }
  };

  return (
    <div>
      <h1>スマホを選択</h1>
      <button onClick={() => handleDeviceSelection('A')}>スマホA</button>
      <button onClick={() => handleDeviceSelection('B')}>スマホB</button>
      <button onClick={() => handleDeviceSelection('C')}>スマホC</button>
    </div>
  );
}
