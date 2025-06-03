import { useState, useRef, useEffect } from 'react'
import './App.css'
//ドットのサイズ、ドット間の距離、最大数を設定
const DOT_SIZE = 20;
const DOT_MARGIN = 5;
const MAX_DOTS = 15;

function App() {
  const [dots, setDots] = useState([]);
  const [dotCount, setDotCount] = useState(0);//ドットの数を設定初期値は０
  const [stopped, setStopped] = useState(false);//ストップ状態かどうかを監視、デフォルトではfalse
  const intervalRef = useRef(null);

  // ドットの数が最大数に達したときの挙動を監視する,アラートの実施
  useEffect(() => {
    let timeoutId = null;
    if (dotCount === MAX_DOTS && !stopped) {
      // アラートを少し遅らせて、ドットの描画が完了する可能性を高めます。
      // これにより、特にプロダクションビルドでアラートが描画より先に表示される問題を軽減します。
      timeoutId = setTimeout(() => {
        alert("ざんねん！"); // "Too bad!" - when MAX_DOTS is reached automatically
      }, 100); // 遅延時間を0ミリ秒から100ミリ秒に変更
    }
    // クリーンアップ関数: コンポーネントのアンマウント時や依存配列の値が変更される前にタイムアウトをクリア
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [dotCount, stopped]); // Rerun this effect if dotCount or stopped changes
  //ここから先はスタートボタンを押した後の挙動を監視する
  // 100ミリ秒ごとに次のドットを追加
  const start = () => {
    setDots([]);
    setDotCount(0);
    setStopped(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setDots(prev => [...prev, prev.length]);//現在のドットの数を取得し、次のドットを追加
      setDotCount(prev => {
        const next = prev + 1;
        if (next === MAX_DOTS) {
          clearInterval(intervalRef.current);//ドットの数が最大数に達したら、インターバルをクリア,これ以上の追加を行わない
          // The alert is now handled by the useEffect hook
        }
        return next;
      });
    }, 100);
  };
  //ストップボタンを押したときの挙動を監視する
  //ストップボタンを押すと、インターバルをクリアし、ドットの数をリセット
  //ドットの数が10ならおめでとう、そうでなければざんねんとアラートを表示
  const stop = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setStopped(true);
    setDots([]);
    setDotCount(0);
    if (dotCount === 10) {
      alert("おめでとう！");
    } else {
      alert("ざんねん！");
    }
  };
  //ここから先はアプリの表示部分
  //スタートボタンとストップボタンを配置し、ドットのコンテナを表示
  //ドットのコンテナには、ドットの数に応じてドットを配置
  return (
    <div style={{ padding: 32 }}>
      <button onClick={start}>スタート</button>
      <button onClick={stop} style={{ marginLeft: 8 }}>ストップ</button>
      {/* ボタンの配置 */}
      <div
        id="dot-container"
        style={{
          position: "relative",
          width: 400,
          height: 50,
          border: "1px solid #ccc",
          marginTop: 20,
        }}
      >
        {/* ドットのコンテナ、位置の設定 */}
        {dots.map((n, i) => (
          <div
            key={i}
            className={i === 9 ? "special-dot" : "dot"}
            style={{
              width: DOT_SIZE,
              height: DOT_SIZE,
              borderRadius: i === 9 ? 0 : "50%",
              background: i === 9 ? "#e74c3c" : "#3498db",
              position: "absolute",
              left: i * (DOT_SIZE + DOT_MARGIN),
              top: 0,
            }}
          // 10番目のドットは特別なスタイルを適用、それ以外は通常のスタイルを適用
          />
        ))}
      </div>
    </div>
  );
}

export default App;