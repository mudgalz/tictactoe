import { useState } from "react";
import { Xicon } from "./icons";

export default function Pref({ open, setOpen, handlePlay }) {
  const [mode, setMode] = useState(3);

  const handleClick = () => {
    handlePlay(mode);
    setOpen(false);
  };
  return (
    <div className={`bg-white/10 absolute inset-0 h-screen w-full duration-200 text-white ${open ? "visible opacity-100" : "invisible opacity-0"}`}>
      <div className={`md:max-w-lg duration-200 w-full z-50 font-pops max-w-sm p-5 rounded shadow-md bg-slate-900 relative top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 ${open ? "visible opacity-100 scale-100" : "invisible opacity-0 scale-90"}`}>
        <div className="flex mb-5 justify-between items-center">
          <p className="text-xl">Preferences</p>
          <button
            onClick={() => setOpen(false)}
            className="bg-slate-700 p-2 rounded">
            {<Xicon className="w-5 h-5" />}
          </button>
        </div>
        <fieldset className="space-y-4 mb-4">
          <div>
            <input
              onChange={() => setMode(3)}
              type="radio"
              name="gameMode"
              value={3}
              id="3"
              className="peer hidden"
              checked={mode === 3}
            />

            <label
              htmlFor="3"
              className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-600 bg-slate-800 p-4 text-sm font-medium shadow-sm hover:border-gray-500 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500">
              <p className="text-gray-300">Normal</p>

              <p className="text-gray-400">3 x 3</p>
            </label>
          </div>

          <div>
            <input
              onChange={() => setMode(9)}
              type="radio"
              name="gameMode"
              value={9}
              id="9"
              className="peer hidden"
              checked={mode === 9}
            />

            <label
              htmlFor="9"
              className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-600 bg-slate-800 p-4 text-sm font-medium shadow-sm hover:border-gray-500 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500">
              <p className="text-gray-300">Hard</p>
              <p className="text-gray-400">9 x 9</p>
            </label>
          </div>
        </fieldset>

        <div className="w-full flex items-center justify-end">
          <button
            onClick={handleClick}
            className="ml-auto bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-700">
            Play
          </button>
        </div>
      </div>
    </div>
  );
}
