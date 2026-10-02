import { useState } from "react"

function AddAccount({onDone, onAdd}){
    const [userEmail, setNewUserEmail] = useState("");
    const [userPassword, setNewUserPassword] = useState("");
    const [username, setNewUsername] = useState("");
    const [userRole, setNewUserRole] = useState("employee");

    function submitNewAccount(){
        if(userEmail && userPassword && username && userRole){
            onAdd({name: username, email: userEmail, password: userPassword, role: userRole})
            onDone()
        }else{
            alert("Please complete the fields.")
        }
    }
    return(
        <>
            <div className="add-account-inputs-container">
                <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setNewUsername(e.target.value)}
                />
                <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder="User email"
                    value={userEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                />
                <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    placeholder="Password" 
                    value={userPassword}
                    onChange={(e) => setNewUserPassword(e.target.value)}
                />
                <select 
                    name="role" 
                    id="role" 
                    className="dropdown"
                    value={userRole} 
                    onChange={(e) => setNewUserRole(e.target.value)}
                >
                    <option value="employee">Employee</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                </select>

                <button onClick={submitNewAccount}>+ Add</button>
                <button onClick={onDone}>Done</button>
            </div>
        </>
    )
}

export default AddAccount