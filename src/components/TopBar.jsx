export default function TopBar() {
  return (
    <header className="topBar">
      <div className="brand">
        <div className="brandMark" aria-hidden="true" />
        <div className="brandText">ROBLOX</div>
      </div>

      <div className="searchWrap">
        <div className="searchIcon" aria-hidden="true" />
        <input
          className="searchInput"
          placeholder="Search"
          aria-label="Search"
        />
      </div>

      <div className="topActions">
        <div className="iconBtn" title="Messages" />
        <div className="iconBtn" title="Friends" />
        <div className="iconBtn" title="Settings" />
      </div>
    </header>
  );
}
