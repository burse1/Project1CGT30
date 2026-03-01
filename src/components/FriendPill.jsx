export default function FriendPill({ name, status, image }) {
    const isOnline = status !== "Offline";
  return (
    <div className="friendPill" title={`${name} • ${status}`}>
     <div className="friendAvatar">
      <img src={image} alt={name} className="friendImg" />
      <span className={isOnline ? "presence on" : "presence off"} />
    </div>
      <div className="friendName">{name}</div>
      <div className="friendStatus">{status}</div>
    </div>
  );
}
