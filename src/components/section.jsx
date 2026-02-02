export default function Section({ title, action, children }) {
  return (
    <section className="section">
      <div className="sectionHeader">
        <h2 className="sectionTitle">{title}</h2>
        {action ? <button className="linkBtn">{action}</button> : null}
      </div>
      {children}
    </section>
  );
}
