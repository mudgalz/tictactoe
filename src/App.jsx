import { useState } from "react";
import Pref from "./components/Pref";
import TicTac3 from "./components/TicTac3";
import TicTac9 from "./components/TicTac9";
import { settingsIcon } from "./components/icons";
export default function App() {
  const [pref, setPref] = useState(false);
  const [mode, setMode] = useState(3);

  const handlePlay = (selectedMode) => {
    setMode(selectedMode);
    setPref(false);
  };
  return (
    <>
      <button
        onClick={() => setPref(true)}
        className="absolute top-5 right-5 hover:scale-105 active:scale-95 duration-150">
        {settingsIcon}
      </button>
      <a
        href="https://mudgal.framer.ai"
        className="absolute bottom-5 left-5 hover:scale-105 hover:text-sky-300 duration-150">
        made by mudgal
      </a>
      <Pref
        open={pref}
        setOpen={setPref}
        handlePlay={handlePlay}
      />
      {mode === 3 && <TicTac3 />}
      {mode === 9 && <TicTac9 />}
    </>
  );
}
