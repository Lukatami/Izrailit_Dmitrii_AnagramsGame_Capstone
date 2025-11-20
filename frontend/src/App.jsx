import { useEffect } from "react";
import { useGlobalStore } from "./stores/globalStore";
import MainBoard from "./components/app/MainBoard";

function App() {
  const { autoLogin } = useGlobalStore();

  useEffect(() => {
    autoLogin();
  }, [autoLogin]);

  return (
    <div className="App">
      <>
        <MainBoard />
      </>
    </div>
  );
}

export default App;
