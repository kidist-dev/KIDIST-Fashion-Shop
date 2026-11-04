
const summaryCards = [
  {
    title: "Total Products",
    value: "13",
    note: "Products in your current catalog",
  },
  {
    title: "Total Orders",
    value: "0",
    note: "Orders will appear here",
  },
  {
    title: "Customers",
    value: "0",
    note: "Registered customers",
  },
  {
    title: "Revenue",
    value: "ETB 0",
    note: "Recorded sales revenue",
  },
];

function Dashboard() {
  return (
    <div className="admin-dashboard">
      <section className="admin-welcome">
        <div>
          <p className="admin-section-label">OVERVIEW</p>
          <h1>Welcome to KIDIST</h1>
          <p>Manage your fashion store from one place.</p>
        </div>

        <span className="admin-welcome-symbol">K.</span>
      </section>

      <section className="admin-stats-grid">
        {summaryCards.map((card) => (
          <article className="admin-stat-card" key={card.title}>
            <p>{card.title}</p>
            <h2>{card.value}</h2>
            <span>{card.note}</span>
          </article>
        ))}
      </section>

      <section className="admin-panel">
        <p className="admin-section-label">STORE MANAGEMENT</p>
        <h2>Your workspace is ready</h2>
        <p>
          Use the sidebar to manage products, inventory, orders, customers,
          payments, and other store settings.
        </p>
      </section>
    </div>
  );
}

export default Dashboard;
