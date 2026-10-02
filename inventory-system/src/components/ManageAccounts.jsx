import { useState } from "react";
import "./css/dashboard.css";
import AccountsTable from "./AccountsTable";
import AddAccount from "./AddAccount";

function ManageAccounts({onClose, accounts, handleCreateAccounts, handleDeleteAccounts}) {
  const [accountAdded, setAccountAdded] = useState([])
  const [showAddAccountsTable, setShowAddAccountsTable] = useState(false)


  function closeAddAccount(){
    setShowAddAccountsTable(false);
  }
  return (
    <div className="modal-overlay">
      <div className="manage-accounts-container">

        <div className="search-accounts-container">
          <div className="accounts-filter">
            <input type="text" placeholder="Search accounts" />
            <select>
              <option value="manager">Manager</option>
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="add-account-container">
            <button className="main-btn" onClick={() => {setShowAddAccountsTable(true)}} >+ Add account</button>
          </div>
        </div>

        {showAddAccountsTable && (
          <AddAccount onDone={closeAddAccount} onAdd={handleCreateAccounts}/>
        )}
        <AccountsTable accounts={accounts} handleDeleteAccounts={handleDeleteAccounts}/>

        <div className="close-container">
            <button className="close-button main-btn" onClick={onClose}>Close</button>
          </div>
      </div>
    </div>
  );
}

export default ManageAccounts;