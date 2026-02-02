export default function FriendPill({ name, status }) {
  const isOnline = status !== "Offline";
  return (
    <div className="friendPill" title={`${name} • ${status}`}>
      <div className="friendAvatar">
        <span className={isOnline ? "presence on" : "presence off"} />
      </div>
      <div className="friendName">{name}</div>
      <div className="friendStatus">{status}</div>
    </div>
  );
}
