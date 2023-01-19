import React, { useState, useEffect } from "react";
import axios from "axios";

function AddItem({fetchItems}) {
  const [item, setItem] = useState({
    username: "",
    password: "",
    fullname: "",
    avatar: "",
  });

const handleChange = (e) => {
  setItem({ ...item, [e.target.name]: e.target.value });
};

const handleSubmit = (e) => {
  e.preventDefault();
  axios.post("http://localhost:5000/users", item)
  .then(() => {
    setItem({ username: "", password: "", fullname: "", avatar: "" });
    fetchItems()
  });
};

return (
  <form onSubmit={handleSubmit}>
    <label>
      Name: 
      <input
        type="text"
        name="username"
        value={item.username}
        onChange={handleChange}
      />
    </label>
    <br/>
    <label>
      Password: 
      <input
        type="password"
        name="password"
        value={item.password}
        onChange={handleChange}
      />
    </label>
    <br/>
    <label>
      FullName:
      <input
        type="text"
        name="fullname"
        value={item.fullname}
        onChange={handleChange}
      />
    </label>
    <br/>
    <label>
      Avatar:
      <input
        type="text"
        name="avatar"
        value={item.avatar}
        onChange={handleChange}
      />
    </label>
    <br />
    <button type="sumbit">Add Item</button>
  </form>
);
}

function ItemList({ items, updateItem, deleteItem,fetchItems }) {
  const [editItem, setEditItem] = useState({
    id: 0, username: "", password: "", fullname: "", avatar: "",
  })
  return (
    <div>
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          username: {item.username}<br/>
          password: {item.password}<br/>
          fullname: {item.fullname}<br/>
          avatar: {item.avatar}<br/>
          
          <button onClick={() => setEditItem(item)}>Edit</button>
          <button onClick={() => deleteItem(item.id)}>Delete</button>
        </li>
      ))}
    </ul>
      <EditItem editItem = {editItem} fetchItems={fetchItems}/>
    </div>
  );
}

function EditItem({editItem,fetchItems}) {
  const [item, setItem] = useState({
    id: 0,
    username: "",
    password: "",
    fullname: "",
    avatar: "",
  });

  useEffect(() =>{
    setItem(editItem)
  }, [editItem])

const handleChange = (e) => {
  setItem({ ...item, [e.target.name]: e.target.value });
};

const handleSubmit = (e) => {
  e.preventDefault();
  axios.put(`http://localhost:5000/users/${item.id}`, item)
  .then(() => {
    setItem({ id: 0, username: "", password: "", fullname: "", avatar: "" });
    fetchItems()
  });
};

return (
  <form onSubmit={handleSubmit}>
    <label>
      ID: 
      <input
        type="text"
        name="id"
        value={item.id}
        disabled
      />
    </label>
    <br/>
    <label>
      Name: 
      <input
        type="text"
        name="username"
        value={item.username}
        onChange={handleChange}
      />
    </label>
    <br/>
    <label>
      Password: 
      <input
        type="text"
        name="password"
        value={item.password}
        onChange={handleChange}
      />
    </label>
    <br/>
    <label>
      FullName:
      <input
        type="text"
        name="fullname"
        value={item.fullname}
        onChange={handleChange}
      />
    </label>
    <br/>
    <label>
      Avatar:
      <input
        type="text"
        name="avatar"
        value={item.avatar}
        onChange={handleChange}
      />
    </label>
    <br />
    <button type="sumbit">Update</button>
  </form>
);
}


function App() {
  const [items, setItems] = useState([]);

  const fetchItems = () => {
    axios.get("http://localhost:5000/users") 
    .then((res) => setItems(res.data));
  };

  useEffect(() => {
    fetchItems();
  }, []);


  const deleteItem = (id) => {
    axios.delete(`http://localhost:5000/users/${id}`)
    .then(() => {
      fetchItems()
    })
  }
  return (
    <div>
      <AddItem fetchItems={fetchItems} />
      <ItemList items={items}  
      deleteItem={deleteItem} fetchItems={fetchItems}/>

    </div>
  );
}

export default App;



