import { useMemo, useState } from "react";
import TopBar from "../components/TopBar.jsx";
import SideNav from "../components/SideNav.jsx";
import Section from "../components/Section.jsx";
import GameCard from "../components/GameCard.jsx";
import FriendPill from "../components/FriendPill.jsx";

const BASE = import.meta.env.BASE_URL;

const friends = [
  { name: "Maxy", status: "Online", image: `${BASE}/friends/maxy.webp` },
  { name: "Ice", status: "In Game", image: `${BASE}/friends/ice.webp` },
  { name: "Alden", status: "Online", image: `${BASE}/friends/alden.webp` },
  { name: "Rimaru", status: "Offline", image: `${BASE}/friends/Rimaru.webp` },
  { name: "Bacon", status: "In Game", image: `${BASE}/friends/Bacon.webp` },
  { name: "Teco", status: "Online", image: `${BASE}/friends/teco.webp` },
  { name: "Place", status: "Online", image: `${BASE}/friends/place.webp` },
];

const continuePlaying = Array.from({ length: 8 }, (_, i) => ({
  id: `c${i}`,
  title: `Experience ${i + 1}`,
  meta: "76% • 2.4K",
  likes: 2400 + i * 113,
  source: "continue",
  image: `${BASE}/games/cont${i + 1}.webp`,
}));

const recommended = Array.from({ length: 12 }, (_, i) => ({
  id: `r${i}`,
  title: `Recommended ${i + 1}`,
  meta: "89% • 12.1K",
  likes: 12100 + i * 240,
  source: "recommended",
  image: `${BASE}/games/reco${i + 1}.jfif`,
}));

const friendActivity = Array.from({ length: 10 }, (_, i) => ({
  id: `f${i}`,
  title: `Friend Activity ${i + 1}`,
  meta: "New • 1.1K",
  likes: 1100 + i * 50,
  source: "friends",
  image: `${BASE}/games/frnd${i + 1}.jfif`,
}));

const FEED_TABS = [
  { key: "all", label: "All" },
  { key: "continue", label: "Continue Playing" },
  { key: "recommended", label: "Recommended" },
  { key: "friends", label: "Friend Activity" },
];

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // ✅ inside component
  const [query, setQuery] = useState("");
  const [activeFeed, setActiveFeed] = useState("all");
  const [sortMode, setSortMode] = useState("popular");

  const allGames = useMemo(
    () => [...continuePlaying, ...recommended, ...friendActivity],
    []
  );

  const visibleGames = useMemo(() => {
    const q = query.trim().toLowerCase();

    let games =
      activeFeed === "all"
        ? allGames
        : allGames.filter((g) => g.source === activeFeed);

    if (q) games = games.filter((g) => g.title.toLowerCase().includes(q));

    if (sortMode === "az") {
      games = [...games].sort((a, b) => a.title.localeCompare(b.title));
    } else {
      games = [...games].sort((a, b) => b.likes - a.likes);
    }

    return games;
  }, [allGames, activeFeed, query, sortMode]);

  const grouped = useMemo(() => {
    const groups = { continue: [], recommended: [], friends: [] };
    for (const g of visibleGames) groups[g.source].push(g);
    return groups;
  }, [visibleGames]);

  return (
    <div className="appShell">
      <TopBar
        query={query}
        onQueryChange={setQuery}
        onToggleMenu={() => setIsMenuOpen((v) => !v)}
      />

      <div className="layout">
        {isMenuOpen && (
          <div
            className="backdrop"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />
        )}

        <SideNav isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

        <main className="main">
          <div className="pageTitleRow">
            <div>
              <h1 className="pageTitle">Home</h1>
              <div className="subtleLine">
                Showing <b>{visibleGames.length}</b> experiences
              </div>
            </div>

            <div className="pageRightMeta">
              <select
                className="selectStub"
                value={sortMode}
                onChange={(e) => setSortMode(e.target.value)}
                aria-label="Sort experiences"
              >
                <option value="popular">Sort: Popular</option>
                <option value="az">Sort: A–Z</option>
              </select>
            </div>
          </div>

          <div className="stickyControls">
            <div className="tabsRow" role="tablist" aria-label="Feed filters">
              {FEED_TABS.map((t) => (
                <button
                  key={t.key}
                  className={activeFeed === t.key ? "tabBtn active" : "tabBtn"}
                  onClick={() => setActiveFeed(t.key)}
                  role="tab"
                  aria-selected={activeFeed === t.key}
                >
                  {t.label}
                </button>
              ))}

              {query.trim() ? (
                <button className="tabBtn ghost" onClick={() => setQuery("")}>
                  Clear Search
                </button>
              ) : null}
            </div>
          </div>

          <Section title="Friends" action="See All">
            <div className="friendsRow">
              {friends.map((f) => (
                <FriendPill
                  key={f.name}
                  name={f.name}
                  status={f.status}
                  image={f.image}
                />
              ))}
            </div>
          </Section>

          {activeFeed === "all" && (
            <>
              <Section title="Continue Playing" action="See All">
                <div className="cardsRow">
                  {grouped.continue.map((g) => (
                    <GameCard key={g.id} title={g.title} meta={g.meta} image={g.image} />
                  ))}
                </div>
              </Section>

              <Section title="Recommended For You" action="See All">
                <div className="cardsRow">
                  {grouped.recommended.map((g) => (
                    <GameCard key={g.id} title={g.title} meta={g.meta} image={g.image} />
                  ))}
                </div>
              </Section>

              <Section title="Friend Activity" action="See All">
                <div className="cardsRow">
                  {grouped.friends.map((g) => (
                    <GameCard key={g.id} title={g.title} meta={g.meta} image={g.image} />
                  ))}
                </div>
              </Section>
            </>
          )}

          {activeFeed !== "all" && (
            <Section title="Results" action="See All">
              <div className="cardsRow">
                {visibleGames.map((g) => (
                  <GameCard key={g.id} title={g.title} meta={g.meta} image={g.image} />
                ))}
              </div>
            </Section>
          )}
        </main>
      </div>
    </div>
  );
}