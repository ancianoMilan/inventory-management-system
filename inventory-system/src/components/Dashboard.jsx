import "./css/dashboard.css";
import InventoryTable from "./InventoryTable";
import TableHistory from "./TableHistory";
import ManageAccounts from "./ManageAccounts";
import AddItems from "./AddItems";
import { useState } from "react";

function Dashboard({
    accounts, 
    items, 
    role, 
    onUpdateItem, 
    history, 
    handleCreateAccounts,
    onDeleteItem,
    handleDeleteAccounts,
    addItems,
    onLogout
}) {
    const [searchText, setSearchText] = useState("");
    const [filteredCategory, setFilteredCategory] = useState("");
    const uniqueCategories = [...new Set(items.map((item) => item.category))];

    const filteredItems = items.filter((item) => {
        const matchesSearch = item.name
            .toLowerCase()
            .includes(searchText.toLowerCase());
        const matchesCategory =
            filteredCategory === "" || item.category === filteredCategory;
        return matchesSearch && matchesCategory;
    });

    const [showHistory, setShowHistory] = useState(false);
    const [showManageAccounts, setShowManageAccounts] = useState(false);
    const [showAddItems, setShowAddItems] = useState(false);

    function logout(){
       const confirmLogout = window.confirm("Are you sure you want to logout?")
       if(confirmLogout){
        onLogout();
       }
    }
    const roleLabel = role.charAt(0).toUpperCase() + role.slice(1);
    return (
        <>
            {role === "employee" && (
                <div className="employee-dashboard-container">
                    <div className="header-container">
                        <div className="greetings-container">
                            <h1>Welcome, {roleLabel}!</h1>
                            <div className="logout-button-container">
                                <button className="logout-button btn" onClick={logout}>Logout</button>
                            </div>
                        </div>
                    </div>

                    <div className="filter-container">
                        <div className="employee-filter">
                            <input
                                type="text"
                                placeholder="Search item name"
                                className="filterInput"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                            <select
                                id="categoryFilter"
                                onChange={(e) => {
                                    setFilteredCategory(e.target.value);
                                }}
                            >
                                <option value="">All Categories</option>
                                {uniqueCategories.map((category) => (
                                    <option value={category} key={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="table-container">
                        <InventoryTable items={filteredItems} role={role} onUpdateItem={onUpdateItem} />
                    </div>
                </div>
            )}

            {role === "manager" && (
                <div className="manager-dashboard-container">
                    <div className="header-container">
                        <div className='greetings-container'>
                            <h1>Welcome, {roleLabel}!</h1>
                            <div className="logout-button-container">
                                <button className="logout-button btn" onClick={logout}>
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="filter-container">
                        <div className="filter-container-inputs">
                            <input
                                type="text"
                                placeholder="Search item name"
                                className="filterInput"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                            <select
                                id="categoryFilter"
                                onChange={(e) => {
                                    setFilteredCategory(e.target.value);
                                }}
                                >
                                <option value="">All Categories</option>
                                {uniqueCategories.map((category) => (
                                    <option value={category} key={category}>
                                    {category}
                                    </option>
                                ))}
                            </select>
                            <button className="view-history-button" onClick={() => setShowHistory(true)}>
                                View History 
                                <span>
                                    <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12H4C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C9.53614 4 7.33243 5.11383 5.86492 6.86543L8 9H2V3L4.44656 5.44648C6.28002 3.33509 8.9841 2 12 2ZM13 7L12.9998 11.585L16.2426 14.8284L14.8284 16.2426L10.9998 12.413L11 7H13Z"></path></svg>
                                </span>
                            </button>
                        </div>

                        <div>
                            <button className="add-item-button" onClick={() => {setShowAddItems(true)}}>
                               + Add item
                            </button>
                        </div>
                    </div>
                    <div className="table-container">
                        <InventoryTable 
                            items={filteredItems} 
                            role={role} 
                            onUpdateItem={onUpdateItem}
                            onDeleteItem ={onDeleteItem}
                        />
                    </div>
                    
                </div>
            )}

            {role === "admin" && (
                <div className="admin-dashboard-container">
                    <div className="header-container">
                        <div className='greetings-container'>
                            <h1>Welcome, {roleLabel}!</h1>
                            <div className="logout-button-container">
                                <button className="logout-button btn" onClick={logout}>
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="filter-container-admin">
                        <div>
                            <input 
                                type="text" 
                                placeholder='Search item name' 
                                className='filterInput' 
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                            <select id="categoryFilter" onChange={(e) => {setFilteredCategory(e.target.value)}}>
                                <option value="">All Categories</option>
                                {uniqueCategories.map((category) => (
                                    <option value={category} key={category}>{category}</option>
                                ))}
                            </select>
                            <button className="view-history-button" onClick={() => setShowHistory(true)}>
                                View History 
                                <span>
                                    <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12H4C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C9.53614 4 7.33243 5.11383 5.86492 6.86543L8 9H2V3L4.44656 5.44648C6.28002 3.33509 8.9841 2 12 2ZM13 7L12.9998 11.585L16.2426 14.8284L14.8284 16.2426L10.9998 12.413L11 7H13Z"></path></svg>
                                </span>
                            </button>
                        </div>
                        <div>
                            <button className="add-item-button" onClick={() => setShowAddItems(true)}>
                               + Add item
                            </button>
                            <button className="manage-accounts-button" onClick={() => setShowManageAccounts(true)}>
                                Manage Accounts
                            </button>
                        </div>
                    </div>
                    <div className="table-container">
                        <InventoryTable 
                            items={filteredItems} 
                            role={role} 
                            onUpdateItem={onUpdateItem}
                            onDeleteItem ={onDeleteItem}
                        />
                    </div>
                    
                </div>
            )}


            {showHistory && (
                <TableHistory history={history} onClose={() => setShowHistory(false)} role={role} />
            )}
            {showManageAccounts && (
                <ManageAccounts 
                onClose={() => setShowManageAccounts(false)} 
                accounts={accounts} 
                handleCreateAccounts={handleCreateAccounts}
                handleDeleteAccounts = {handleDeleteAccounts} 
            />
            )}
            {showAddItems && (
                <AddItems onClose={() => setShowAddItems(false)} onAdd={addItems}/>
            )}
        </>
    )
}

export default Dashboard