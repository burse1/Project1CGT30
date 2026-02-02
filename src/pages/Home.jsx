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
  title: `Experience ${i + 1}`,
  meta: "76% • 2.4K",
}));

const recommended = Array.from({ length: 12 }, (_, i) => ({
  title: `Recommended ${i + 1}`,
  meta: "89% • 12.1K",
}));

const friendActivity = Array.from({ length: 10 }, (_, i) => ({
  title: `Friend Activity ${i + 1}`,
  meta: "New • 1.1K",
}));

export default function Home() {
  return (
    <div className="appShell">
      <TopBar />
      <div className="layout">
        <SideNav />

        <main className="main">
          <div className="pageTitleRow">
            <h1 className="pageTitle">Home</h1>
            <div className="pageRightMeta">
              <div className="pill">Robux</div>
              <div className="pill">Notifications</div>
              <div className="avatarStub" aria-label="User avatar placeholder" />
            </div>
          </div>

          <Section title="Friends" action="See All">
            <div className="friendsRow">
              {friends.map((f) => (
                <FriendPill key={f.name} name={f.name} status={f.status} />
              ))}
            </div>
          </Section>

          <Section title="Continue Playing" action="See All">
            <div className="cardsRow">
              {continuePlaying.map((g) => (
                <GameCard key={g.title} title={g.title} meta={g.meta} />
              ))}
            </div>
          </Section>

          <Section title="Recommended For You" action="See All">
            <div className="cardsRow">
              {recommended.map((g) => (
                <GameCard key={g.title} title={g.title} meta={g.meta} />
              ))}
            </div>
          </Section>

          <Section title="Friend Activity" action="See All">
            <div className="cardsRow">
              {friendActivity.map((g) => (
                <GameCard key={g.title} title={g.title} meta={g.meta} />
              ))}
            </div>
          </Section>

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
