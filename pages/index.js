//これがページのトップページになる
// pages/index.js
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  const navigateToDeviceSelection = () => {
    router.push('/selectDevice');
  };

  return (
    <div>
      <h1>ロゴ</h1>
      <button onClick={navigateToDeviceSelection}>画面をタップして進む</button>
    </div>
  );
}

