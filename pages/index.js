import cls from 'classnames';
import { useState } from "react";

function Home() {
  const [items, setItem] = useState([]);
  const [label, setLabel] = useState('');

  const onSubmit = e => {
    e.preventDefault();

    if (label.length > 0) {
      setItem([...items, { label, closed: false }]);
      setLabel('');
    }
  }
  
  const removeItem = index => {
    const newItems = items.filter((i, k) => k !== index);

    setItem(newItems);
  }

  const closeItem = index => {
    const item = items[index];
    item.closed = !item.closed;

    setItem([
      ...items,
    ]);
  }

  return (
    <div className="container">
      <ul>
        {items.length < 1 ? <li className="not-found">No items found.</li> : items.map((item, index) => (
          <li key={index} className={cls('item', item.closed && 'closed')}>
            {item.label}
            <div className="actions">
              <button className="close" onClick={() => closeItem(index)}>√</button>
              <button className="remove" onClick={() => removeItem(index)}>x</button>
            </div>
          </li>
        ))}
      </ul>

      <form onSubmit={e => onSubmit(e)}>
        <input
          type="text"
          placeholder="What do you want to finish today?"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
        <button type="submit" disabled={label.length < 1}>Add!</button>
      </form>
    </div>
  );
}

export default Home;
