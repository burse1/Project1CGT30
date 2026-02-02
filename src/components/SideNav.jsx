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

export default function SideNav() {
  return (
    <nav className="sideNav" aria-label="Primary navigation">
      <div className="navSectionTitle">Menu</div>
      <ul className="navList">
        {items.map((label, idx) =>
          label === "—" ? (
            <li key={idx} className="navDivider" />
          ) : (
            <li key={label} className="navItem">
              <span className="navDot" aria-hidden="true" />
              <span>{label}</span>
            </li>
          )
        )}
      </ul>
    </nav>
  );
}
