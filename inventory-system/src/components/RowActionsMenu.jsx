

function RowActionsMenu({ role, onUpdateItem, onDeleteItem }) {
  return (
    <>
      <ul className="rowActionsMenu">
        {role === "employee" && (
          <li className="action">
            <button onClick={onUpdateItem}>
              Adjust Quantity
            </button>
          </li>
        )}
        {
        (role === "manager" || role === "admin") && (
            <>
              <li className="action">
                <button onClick={onUpdateItem}>Edit Item</button>
              </li>
              <li className="action">
                <button onClick={onDeleteItem}>Delete Item</button>
              </li>
            </>
          )
        }
      </ul>
    </>
  );
}

export default RowActionsMenu;
