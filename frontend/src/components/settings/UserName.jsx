import { useGlobalStore } from "../../stores/globalStore.js";
import { texts } from "../../../../backend/src/data/texts.js";
import { useEffect, useState } from "react";

function UserName({}) {
  const { player, interfaceLanguage, setPlayerName, resetPlayer } =
    useGlobalStore();

  const [localName, setLocalName] = useState("");

  useEffect(() => {
    setLocalName(player.name);
  }, [player.name]);

  const text = texts[interfaceLanguage];

  function handlePlayerNameSubmit(e) {
    e.preventDefault();
    if (!localName.trim()) {
      alert(text.enterName);
      return;
    }
    setPlayerName(localName.trim());
  }

  function handleResetName() {
    setLocalName("");
    resetPlayer();
  }

  return (
    <div className="name-input">
      <p>{text.enterName}</p>
      <form onSubmit={handlePlayerNameSubmit}>
        <input
          type="text"
          value={localName}
          onChange={(e) => setLocalName(e.target.value)}
          placeholder={text.enterName}
        />
        <button type="submit">✅</button>
      </form>
      <button onClick={handleResetName}>❌</button>
    </div>
  );
}

export default UserName;
