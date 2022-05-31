import { useState, useEffect } from "react";
import ListItem from "./ListItem";
import Alert from "./Alert";

function App() {
  const [value, setValue] = useState("");
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing && value) {
      setList(list.map(item => {
        if (item.id === editID) {
          return { ...item, info: value }
        }
        return item;
      }))

      setIsEditing(false);
      showAlert({ show: true, message: "Value Changed", type: "success" });

    } else if (value) {
      let newItem = { id: new Date().getTime(), info: value };
      setList([...list, newItem]);
      setValue("");
      showAlert({ show: true, message: "Item Added To The List", type: "success" });

    } else {
      showAlert({ show: true, message: "Please Enter Value", type: "danger" });
    }

  }

  const showAlert = (show = false, message = "", type = "") => {
    setAlert(show, message, type)
  };

  const editItem = (id) => {
    const findItem = list.find(item => item.id === id);
    setIsEditing(true);
    setValue(findItem.info);
    setEditID(id);
  }

  const deleteItem = (id) => {
    const filterItem = list.filter(item => item.id !== id);
    setList(filterItem);
  }

  const onClearItems = () => {
    setList([]);
    showAlert({ show: true, message: "Empty List", type: "danger" })
  }

  return (
    <main className="container">
      <article className="grocery-bud">
        <section className="form-container">
          {alert.show && <Alert {...alert} showAlert={showAlert} list={list} />}
          <h2>Grocery Bud</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="e.g. eggs" value={value} onChange={(e) => setValue(e.target.value)} />
            <button type="submit">
              {isEditing ? "Edit" : "Submit"}
            </button>
          </form>
        </section>

        <section className="list">
          < ListItem list={list} editItem={editItem} deleteItem={deleteItem} />
        </section>

        {
          list.length > 0 &&
          <section className="delete-btn">
            <button type="button" onClick={onClearItems}>Clear Items</button>
          </section>
        }
      </article>
    </main>
  )
};

export default App;