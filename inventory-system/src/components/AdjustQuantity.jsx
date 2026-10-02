import { useState } from "react"


function AdjustQuantity({item, onClose, onSave}){
    const [quantity, setQuantity] = useState(item.quantity)

    function saveChanges(){
        onSave(item.id, {quantity});
        onClose()
    }
    return(
        <>
            <div className="adjust-quantity-container">
                <div>
                    <p>
                    {item.name}
                    </p>
                    
                </div>
                <div className="button-input-container">
                    <input 
                        type="number" 
                        className="adjust-quantity-input" 
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                    <button onClick={saveChanges}>Change</button>
                </div>
            </div>
        </>
    )
}

export default AdjustQuantity