import { useGlobalStore } from "../../stores/globalStore.js";
import { texts } from "../../data/texts.js";
import { useEffect, useState } from "react";

function GuestName({}) {
  const { guestName, interfaceLanguage, setGuestName, resetGuestName } =
    useGlobalStore();

  const [localName, setLocalName] = useState("");

  useEffect(() => {
    setLocalName(guestName);
  }, [guestName]);

  const text = texts[interfaceLanguage];

  function handleGuestNameSubmit(e) {
    e.preventDefault();
    if (!guestName.trim()) {
      alert(text.enterName);
      return;
    }
    setGuestName(localName.trim());
  }

  function handleResetGuestName() {
    setLocalName("");
    resetGuestName();
  }

  return (
    <div className="guest-name-input">
      <p>{text.enterGuestName}</p>
      <form onSubmit={handleGuestNameSubmit}>
        <input
          type="text"
          value={localName}
          onChange={(e) => setLocalName(e.target.value)}
          placeholder={text.enterGuestName}
        />
        <button type="submit">✅</button>
      </form>
      <button onClick={handleResetGuestName}>❌</button>
    </div>
  );
}

export default GuestName;
