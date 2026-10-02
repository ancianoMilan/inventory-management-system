import { useState } from "react"
function AddItems({onClose, onAdd}){

    const [itemName, setItemName] = useState("")
    const [sku, setSku] = useState("")
    const [category, setCategory] = useState("")
    const [quantity, setQuantity] = useState("")
    const [price, setPrice] = useState("")
    const [lowStockThreshold, setLowStockThreshold] = useState("")

    function addNewItem(){
        if(itemName && sku && category && quantity && price && lowStockThreshold){
            onAdd({
                name: itemName,
                sku: sku,
                category: category,
                quantity: Number(quantity),
                price: Number(price),
                lowStockThreshold: Number(lowStockThreshold),
            })
            onClose()
        }else{
            alert("Please complete the fields.")
        }
    }
    return(
        <>
            <div className="modal-overlay">
                <div className="add-items-container">
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        placeholder="Item name"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                    />
                    <input 
                        type="text" 
                        id="sku" 
                        name="sku" 
                        placeholder="SKU"
                        value={sku}
                        onChange={(e) => setSku(e.target.value)}
                    />
                    <input 
                        type="text" 
                        id="category" 
                        name="category" 
                        placeholder="Category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                    <input 
                        type="number" 
                        id="quantity" 
                        name="quantity" 
                        placeholder="Quantity"
                        value={quantity}
                        onChange={(e) => {setQuantity(e.target.value)}}
                    />
                    <input 
                        type="number" 
                        id="price" 
                        name="price" 
                        placeholder="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <input 
                        type="number" 
                        id="lowStockThreshold" 
                        name="lowStockThreshold"
                        placeholder="Low Stock Threshold"
                        value={lowStockThreshold}
                        onChange={(e) => setLowStockThreshold(e.target.value)}
                    />
                    <div className="add-items-btn-container">
                        <button onClick={addNewItem}>Add</button>
                        <button onClick={onClose }>Close</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddItems