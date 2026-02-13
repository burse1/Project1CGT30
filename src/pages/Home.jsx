import { useMemo, useState } from "react";
import TopBar from "../components/TopBar.jsx";
import SideNav from "../components/SideNav.jsx";
import Section from "../components/Section.jsx";
import GameCard from "../components/GameCard.jsx";
import FriendPill from "../components/FriendPill.jsx";

const friends = [
  { name: "Maxy", status: "Online" },
  { name: "Ice", status: "In Game" },
  { name: "Alden", status: "Online" },
  { name: "Rimaru", status: "Offline" },
  { name: "Bacon", status: "In Game" },
  { name: "Teco", status: "Online" },
  { name: "Place", status: "Online" },
];

const continuePlaying = Array.from({ length: 8 }, (_, i) => ({
  id: `c${i}`,
  title: `Experience ${i + 1}`,
  meta: "76% • 2.4K",
  likes: 2400 + i * 113,
  source: "continue",
}));

const recommended = Array.from({ length: 12 }, (_, i) => ({
  id: `r${i}`,
  title: `Recommended ${i + 1}`,
  meta: "89% • 12.1K",
  likes: 12100 + i * 240,
  source: "recommended",
}));

const friendActivity = Array.from({ length: 10 }, (_, i) => ({
  id: `f${i}`,
  title: `Friend Activity ${i + 1}`,
  meta: "New • 1.1K",
  likes: 1100 + i * 50,
  source: "friends",
}));

const FEED_TABS = [
  { key: "all", label: "All" },
  { key: "continue", label: "Continue Playing" },
  { key: "recommended", label: "Recommended" },
  { key: "friends", label: "Friend Activity" },
];

export default function Home() {
  //  State (checkpoint requirement)
  const [query, setQuery] = useState("");
  const [activeFeed, setActiveFeed] = useState("all");
  const [sortMode, setSortMode] = useState("popular"); // "popular" | "az"

  const allGames = useMemo(
    () => [...continuePlaying, ...recommended, ...friendActivity],
    []
  );

  //  Derived UI data from state -> re-renders automatically
  const visibleGames = useMemo(() => {
    const q = query.trim().toLowerCase();

    let games =
      activeFeed === "all"
        ? allGames
        : allGames.filter((g) => g.source === activeFeed);

    if (q.length > 0) {
      games = games.filter((g) => g.title.toLowerCase().includes(q));
    }

    if (sortMode === "az") {
      games = [...games].sort((a, b) => a.title.localeCompare(b.title));
    } else {
      // "popular"
      games = [...games].sort((a, b) => b.likes - a.likes);
    }

    return games;
  }, [allGames, activeFeed, query, sortMode]);

  //  Small helper: group back into sections (optional but nice)
  const grouped = useMemo(() => {
    const groups = { continue: [], recommended: [], friends: [] };
    for (const g of visibleGames) groups[g.source].push(g);
    return groups;
  }, [visibleGames]);

  const resultsCount = visibleGames.length;

  return (
    <div className="appShell">
      <TopBar query={query} onQueryChange={setQuery} />

      <div className="layout">
        <SideNav />

        <main className="main">
          <div className="pageTitleRow">
            <div>
              <h1 className="pageTitle">Home</h1>
              <div className="subtleLine">
                Showing <b>{resultsCount}</b> experiences
                {query.trim() ? (
                  <>
                    {" "}
                    for <b>“{query.trim()}”</b>
                  </>
                ) : null}
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

              <div className="pill">Robux</div>
              <div className="pill">Notifications</div>
              <div className="avatarStub" aria-label="User avatar placeholder" />
            </div>
          </div>

          {/*  Meaningful interaction: toggle feed sections */}
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

          <Section title="Friends" action="See All">
            <div className="friendsRow">
              {friends.map((f) => (
                <FriendPill key={f.name} name={f.name} status={f.status} />
              ))}
            </div>
          </Section>

          {/* When All: show the 3 sections like before */}
          {activeFeed === "all" && (
            <>
              <Section title="Continue Playing" action="See All">
                <div className="cardsRow">
                  {grouped.continue.map((g) => (
                    <GameCard key={g.id} title={g.title} meta={g.meta} />
                  ))}
                </div>
              </Section>

              <Section title="Recommended For You" action="See All">
                <div className="cardsRow">
                  {grouped.recommended.map((g) => (
                    <GameCard key={g.id} title={g.title} meta={g.meta} />
                  ))}
                </div>
              </Section>

              <Section title="Friend Activity" action="See All">
                <div className="cardsRow">
                  {grouped.friends.map((g) => (
                    <GameCard key={g.id} title={g.title} meta={g.meta} />
                  ))}
                </div>
              </Section>
            </>
          )}

          {/* When a specific tab: show a single “Results” row */}
          {activeFeed !== "all" && (
            <Section title="Results" action="See All">
              <div className="cardsRow">
                {visibleGames.map((g) => (
                  <GameCard key={g.id} title={g.title} meta={g.meta} />
                ))}
                {visibleGames.length === 0 ? (
                  <div className="emptyState">
                    No matches. Try a different search or tab.
                  </div>
                ) : null}
              </div>
            </Section>
          )}

          <footer className="footer">
            <div className="footerBlock" />
            <div className="footerBlock" />
            <div className="footerBlock" />
          </footer>
        </main>

        <aside className="rightRail">
          <div className="railCard">
            <div className="railTitle">Sponsored</div>
            <div className="railBox" />
            <div className="railBox" />
          </div>

          <div className="railCard">
            <div className="railTitle">Up Next</div>
            <div className="railLine" />
            <div className="railLine" />
            <div className="railLine" />
          </div>
        </aside>
      </div>
    </div>
  );
}
