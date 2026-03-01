export default function TopBar({ query, onQueryChange, onToggleMenu }) {
  const BASE = import.meta.env.BASE_URL;

  return (
    <header className="topBar">
      <button className="brandBtn" onClick={onToggleMenu} aria-label="Open menu">
        <img
          src={`${BASE}/icons/roblox.webp`}
          alt=""
          className="brandLogo"
          aria-hidden="true"
        />
        <div className="brandText">ROBLOX</div>
      </button>

      <div className="searchWrap">
        <div className="searchIcon" aria-hidden="true" />
        <input
          className="searchInput"
          placeholder="Search experiences"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
        />
      </div>

      <div className="topRight">
        <div className="playerInfo">
          <span className="playerName">spence_iwnl</span>
          <img
            src={`${BASE}/friends/spence.webp`}
            alt="Player Avatar"
            className="playerAvatar"
          />
        </div>

        <img src={`${BASE}/icons/noti.png`} alt="Notifications" className="topIcon" />
        <img src={`${BASE}/icons/robux.webp`} alt="Robux" className="topIcon" />
        <img src={`${BASE}/icons/settings.png`} alt="Settings" className="topIcon" />
      </div>
    </header>
  );
}