import { useState } from "react";
import { Moon, Sun } from "lucide-react";

function AppLayout({ children }) {
  const [clicked, setClicked] = useState(false);

  function handleThemeClick() {
    setClicked(true);

    setTimeout(() => {
      setClicked(false);
    }, 1500);
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">

      {/* Top right area */}
      <div className="fixed top-5 right-5">

        {!clicked ? (
          <button
            onClick={handleThemeClick}
            className="px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 transition text-sm"
          >
            <Moon size={18} />
          </button>

        ) : (
          <div className="px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-sm">
            nah I like it dark 😌
          </div>
        )}

      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto p-8">

        <header className="mb-10">
          <h1 className="text-4xl font-bold">
            Job Tracker
          </h1>

          <p className="text-zinc-400/40 mt-2">
            Track your applications bruv
          </p>
        </header>

        {children}

      </div>
    </main>
  );
}

export default AppLayout;