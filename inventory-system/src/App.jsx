import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { db, auth } from "./firebase";
import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";

function App() {
  const [accounts, setAccount] = useState([
    {id: 1, name:"Milan", email:"manager@gmail.com", password: "test123", role: "manager"},
    {id: 2, name:"Enzo", email:"employee@gmail.com", password: "test123", role: "employee"},
    {id: 3, name:"Thirdy", email:"admin@gmail.com", password: "test123", role: "admin"}
  ])
  const [role, setRole] = useState(null); 
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([]);
  const [history, setHistory] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    async function fetchItems(){
      const querySnapshot = await getDocs(collection(db, "items"));
      const itemsData = querySnapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }))
      setItems(itemsData);
    }
    fetchItems();
  }, []);

  useEffect(() => {
    async function fetchHistory(){
      const querySnapshot = await getDocs(collection(db, "history"));
      const historyData = querySnapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }))
      setHistory(historyData);
    }
    fetchHistory()
  }, []);


  async function addItems(newItem){
    const docRef = await addDoc(collection(db, "items"), newItem);
    setItems([...items, {id: docRef.id, ...newItem}]);
  };

  async function handleDeleteItem(itemId) {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (confirmDelete) {
      await deleteDoc(doc(db, "items", itemId));
      setItems(items.filter((item) => item.id !== itemId));
    }
  };

  
   async function handleLogin(email, password){
    try{
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const uid = userCredential.user.uid;

      const matchedAccount = await getDoc(doc(db, "users", uid));
      const userData = matchedAccount.data();

      setRole(userData.role)
      setName(userData.name);
     
    } catch(error){
      alert("Account doesnt exist")
    }

  };
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) =>{
      if(user){
        const matchedAccount = await getDoc(doc(db, "users", user.uid));
        const userData = matchedAccount.data();
        setRole(userData.role);
        setName(userData.name);
      }else{
        setRole(null)
      }
      setLoading(false)
    });

    return unsubscribe;
  }, []);

  if(loading){
    return <p className="loading">Loading...</p>
  }
  if(!role){
    return(
      <Login onLogin={handleLogin}></Login>
    )
  };

  async function handleLogout(){
    await signOut(auth);
    setRole(null);
    console.log(auth.currentUser)
  }
  async function handleUpdateTable(itemId, updatedFields) {
    const originalItem = items.find((item) => item.id === itemId);
    const newHistory = [];

    Object.keys(updatedFields).forEach((field) => {
      const oldValue = originalItem[field];
      const newValue = updatedFields[field];

      if (oldValue !== newValue) {
        newHistory.push({
          itemId: originalItem.id,
          itemName: originalItem.name,
          field,
          previousValue: oldValue,
          newValue: newValue,
          timestamp: new Date().toISOString(),
          changedBy: role,
        });
      }
    });

    if (newHistory.length > 0) {
      const savedEntries = await Promise.all(
        newHistory.map((entry) => addDoc(collection(db, "history"), entry))
      );
      const historyWithIds = newHistory.map((entry, index) => ({
        id: savedEntries[index].id,
        ...entry,
      }));
      setHistory([...history, ...historyWithIds]);
    }

    await updateDoc(doc(db, "items", itemId), updatedFields);

    setItems(items.map((item) =>
      item.id === itemId ? { ...item, ...updatedFields } : item
    ));
  }

  function handleCreateAccounts(newAccount){
    setAccount([...accounts, {id: Date.now(), ...newAccount}]);
  }

  function handleDeleteAccounts(accountId){
    const confirmDelete = window.confirm("Are you sure you want to delete this account?");
    if (confirmDelete) {
      setAccount(accounts.filter((acc) => acc.id !== accountId));
    }
  }

  return (
    <>
      <Dashboard 
        accounts={accounts} 
        handleCreateAccounts={handleCreateAccounts}
        handleDeleteAccounts={handleDeleteAccounts}
        onLogout={handleLogout}
        items={items} 
        addItems = {addItems}
        onDeleteItem={handleDeleteItem}
        role={role} 
        onUpdateItem={handleUpdateTable} 
        history={history}
      />
    </>
  );
}

export default App;
