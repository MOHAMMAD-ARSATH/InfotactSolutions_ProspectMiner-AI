export default function Stats({ leads }) {
  const high = leads.filter((l) => l.leadScore === "High").length;
  const medium = leads.filter((l) => l.leadScore === "Medium").length;
  const low = leads.filter((l) => l.leadScore === "Low").length;

  return (
    <div className="card p-3 mb-3">
      <div className="row text-center">
        <div className="col">
          <b>Total Leads:</b> {leads.length}
        </div>

        <div className="col text-danger">
          <b>High Score:</b> {high}
        </div>

        <div className="col text-success">
          <b>Medium Score:</b> {medium}
        </div>

        <div className="col text-warning">
          <b>Low Score:</b> {low}
        </div>
      </div>
    </div>
  );
}