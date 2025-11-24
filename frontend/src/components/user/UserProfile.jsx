import { useNavigate } from "react-router-dom";
import { usePlayerStore } from "../../stores/playerStore.js";
import PlayerName from "./PlayerName.jsx";
import { useGlobalStore } from "../../stores/globalStore.js";
import { texts } from "../../data/texts.js";

function UserProfile() {
  const navigate = useNavigate();
  const { logOut, deletePlayerAccount } = usePlayerStore();

  const { interfaceLanguage } = useGlobalStore();

  const text = texts[interfaceLanguage];

  const confirmDeleteAccount = text.message.confirmDeleteAccount;
  const successDelete = text.message.successDelete;
  const failDelete = text.message.failDelete;

  const handleLogOut = () => {
    logOut();
    navigate("/");
  };

  const handleDeleteClick = async () => {
    console.log(confirmDeleteAccount);
    const confirmDelete = window.confirm(confirmDeleteAccount);

    if (!confirmDelete) return;

    try {
      await deletePlayerAccount();
      alert(successDelete);
      navigate("/");
    } catch (err) {
      console.error(err.message);
      alert(failDelete);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-lg text-white space-y-6">
      <h2 className="text-2xl font-bold text-white text-center mb-2">
        {text.profile}
      </h2>
      <PlayerName />
      <div className="flex flex-col gap-4 pt-4">
        <button
          className="w-full py-2 bg-blue-500/80 hover:bg-blue-500 
                     text-white rounded-xl transition font-medium"
          onClick={handleLogOut}
        >
          {text.logOut}
        </button>
        <button
          className="w-full py-2 bg-red-600/80 hover:bg-red-600
                     text-white rounded-xl transition font-medium"
          onClick={handleDeleteClick}
        >
          {text.deleteAccount}
        </button>
      </div>
    </div>
  );
}

export default UserProfile;
