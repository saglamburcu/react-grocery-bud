import { FiEdit } from "react-icons/fi";
import { ImBin } from "react-icons/im";

function ListItem({ list, editItem, deleteItem }) {

  return (
    <ul className="items">
      {
        list.map(item => {
          const { id, info } = item;
          return (
            <li className="item" key={id}>{info}
              <span>
                <button type="button" className="edit-btn" onClick={() => editItem(id)}><FiEdit /></button>
                <button type="button" className="bin-btn" onClick={() => deleteItem(id)}><ImBin /></button>
              </span>
            </li>
          )
        })
      }
    </ul>
  );
};

export default ListItem;