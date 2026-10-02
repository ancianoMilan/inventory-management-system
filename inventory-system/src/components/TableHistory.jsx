import "./css/dashboard.css";
function TableHistory({ history, onClose, role }) {
  return (
    <div className="modal-overlay">
      <div className="history-container">
        <h3>Transaction History</h3>
        {history.length === 0 ? (
            <p>No changes recorded yet.</p>
        ) : (
            <table>
                <thead>
                    <tr>
                    <th>Item</th>
                    <th>Field</th>
                    <th>From</th>
                    <th>To</th>
                    <th>When</th>
                    <th>Edited by</th>
                    </tr>
                </thead>
                <tbody>
                    {[...history].reverse().map((entry) => (
                    <tr key={entry.id}>
                        <td>{entry.itemName}</td>
                        <td>{entry.field}</td>
                        <td>{entry.previousValue}</td>
                        <td>{entry.newValue}</td>
                        <td>{new Date(entry.timestamp).toLocaleString()}</td>
                        <td>{role}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        )}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default TableHistory;