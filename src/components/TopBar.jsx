export default function TopBar({ query, onQueryChange }) {
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
          placeholder="Search experiences"
          aria-label="Search experiences"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
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
