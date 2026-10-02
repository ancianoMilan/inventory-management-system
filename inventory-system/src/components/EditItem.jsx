import { useState } from "react";

function EditItem({ item, onClose, onSave }) {
  const [name, setName] = useState(item.name);
  const [sku, setSku] = useState(item.sku);
  const [category, setCategory] = useState(item.category);
  const [quantity, setQuantity] = useState(item.quantity);
  const [price, setPrice] = useState(item.price);
  const [lowStockThreshold, setLowStockThreshold] = useState(item.lowStockThreshold);

  function saveChanges() {
    onSave(item.id, {
      name,
      sku,
      category,
      quantity: Number(quantity),
      price: Number(price),
      lowStockThreshold: Number(lowStockThreshold),
    });
    onClose();
  }

  return (
    <div className="modal-overlay">
      <div className="edit-container">
        <div>
          <div className="item">
            <p>Item name</p>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="item">
            <p>SKU</p>
            <input type="text" value={sku} onChange={(e) => setSku(e.target.value)} />
          </div>
          <div className="item">
            <p>Category</p>
            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
          </div>
          <div className="item">
            <p>Quantity</p>
            <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
          </div>
          <div className="item">
            <p>Price</p>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>
          <div className="item">
            <p>Low Stock Threshold</p>
            <input type="number" value={lowStockThreshold} onChange={(e) => setLowStockThreshold(e.target.value)} />
          </div>
        </div>
        <div className="edit-buttons-container">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="save-btn" onClick={saveChanges}>Save changes</button>
        </div>
      </div>
    </div>
  );
}

export default EditItem;