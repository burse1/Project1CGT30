const items = [
  "Home",
  "Discover",
  "Avatar Shop",
  "Create",
  "Robux",
  "—",
  "Friends",
  "Groups",
  "Messages",
  "Settings",
];

export default function SideNav({ isOpen, onClose }) {
  return (
    <nav
      className={isOpen ? "sideNav drawer open" : "sideNav drawer"}
      aria-label="Primary navigation"
    >
      <div className="drawerTop">
        <div className="navSectionTitle">Menu</div>
        <button className="drawerClose" onClick={onClose} aria-label="Close menu">
          ✕
        </button>
      </div>

      <ul className="navList">
        {items.map((label, idx) =>
          label === "—" ? (
            <li key={idx} className="navDivider" />
          ) : (
            <li key={label} className="navItem" onClick={onClose}>
              <span className="navDot" aria-hidden="true" />
              <span>{label}</span>
            </li>
          )
        )}
      </ul>
    </nav>
  );
}