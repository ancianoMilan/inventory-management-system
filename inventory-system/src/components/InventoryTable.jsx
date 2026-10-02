import { useState } from "react";
import RowActionsMenu from "./RowActionsMenu";
import AdjustQuantity from "./AdjustQuantity";
import EditItem from "./EditItem";
function InventoryTable({ items, role, onUpdateItem, onDeleteItem}) {
  const [actionStatus, setShowActionStatus] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Item name</th>
            <th>SKU</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Low Stock Threshold</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => {
            return (
              <>
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.sku}</td>
                  <td>{item.category}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                  <td>{item.lowStockThreshold}</td>
                  <td>
                    <div className="actionCell">
                      <button className="buttonMenu" onClick={() => {setShowActionStatus(actionStatus === item.id ? null : item.id)}}>
                        <svg
                          className="icon menu"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 3C10.9 3 10 3.9 10 5C10 6.1 10.9 7 12 7C13.1 7 14 6.1 14 5C14 3.9 13.1 3 12 3ZM12 17C10.9 17 10 17.9 10 19C10 20.1 10.9 21 12 21C13.1 21 14 20.1 14 19C14 17.9 13.1 17 12 17ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"></path>
                        </svg>
                      </button>
                      {
                        actionStatus === item.id && 
                        (
                          <RowActionsMenu 
                            onUpdateItem ={() => {
                            setEditingItem(item);
                            setShowActionStatus(null)
                          }}
                            onDeleteItem={() => {
                            onDeleteItem(item.id);
                            setShowActionStatus(null);
                          }}
                          role={role} 
                        />)
                      }
                    </div>
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
      {editingItem && role === "employee" && (
        <AdjustQuantity
          key={editingItem.id}
          item={editingItem}
          onClose={() => setEditingItem(null)}
          onSave={onUpdateItem}
        />
      )}
      {editingItem && (role === "manager" || role === "admin") && (
        <EditItem
          key={editingItem.id}
          item={editingItem}
          onClose={() => setEditingItem(null)}
          onSave={onUpdateItem}
        />
      )}
    </>
  );
}

export default InventoryTable;
