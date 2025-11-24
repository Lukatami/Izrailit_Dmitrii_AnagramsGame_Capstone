import { useNavigate, useLocation } from "react-router-dom";
import { useGlobalStore } from "../../stores/globalStore.js";
import { usePlayerStore } from "../../stores/playerStore.js";
import { texts } from "../../data/texts.js";

function AppHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const { interfaceLanguage } = useGlobalStore();
  const { playerName, isGuest, isLoggedIn } = usePlayerStore();

  const text = texts[interfaceLanguage];
  const BASE_API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleLoginClick = () => {
    const redirectUrl = encodeURIComponent(
      `${window.location.origin}/login-success`
    );
    const googleAuthUrl = `${BASE_API_URL}/api/auth/google?redirect=${redirectUrl}`;
    window.location.href = googleAuthUrl;
  };

  const handleSettingsClick = () => {
    navigate("/settings");
  };

  const handleLeaderboardClick = () => {
    navigate("/leaderboard");
  };

  const isHomePage = location.pathname === "/";

  return (
    <header className="w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-700 p-4 flex items-center justify-between shadow-lg">
      <h1 className="text-3xl font-bold text-red-500 select-none">
        {text.title}
      </h1>
      <nav className="flex items-center gap-3">
        <button
          className="px-3 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 transition active:scale-95"
          onClick={handleHomeClick}
        >
          🏠
        </button>
        <button
          className="px-3 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 transition active:scale-95"
          onClick={handleLeaderboardClick}
        >
          🏆
        </button>
        <button
          className="px-3 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 transition active:scale-95"
          onClick={handleSettingsClick}
        >
          ⚙️
        </button>
        {isLoggedIn && !isGuest ? (
          <button
            className="px-3 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 transition active:scale-95"
            onClick={handleProfileClick}
          >
            👤{playerName}
          </button>
        ) : (
          <button
            className="px-3 py-2 rounded-xl bg-blue-700 hover:bg-blue-600 transition active:scale-95"
            onClick={handleLoginClick}
          >
            🔐{text.logIn}
          </button>
        )}
      </nav>
    </header>
  );
}

export default AppHeader;
