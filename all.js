const { useState } = React;
function NavBar() {
  return (
    <nav>
      <h1>
        <a href="#">
          <img
            src="https://github.com/hexschool/webLayoutTraining1st/blob/master/%E5%85%AC%E7%9B%8A%E9%AB%94%E9%A9%97%E7%87%9F-Todolist/logo.png?raw=true"
            alt="online todo list"
          />
        </a>
      </h1>
      <ul>
        <li>
          <a className="bold" href="#">
            王小明的待辦
          </a>
        </li>
        <li>
          <a className="logout" href="./index.html">
            登出
          </a>
        </li>
      </ul>
    </nav>
  );
}

function InputField({ todo, setTodo }) {
  const [inputValue, setInputValue] = useState("");

  function handleInput(e) {
    setInputValue(e.target.value);
  }

  function handleAddTodo(e) {
    e.preventDefault();
    if (!inputValue) return;
    setTodo([
      ...todo,
      { id: Math.random().toString(36), name: inputValue, isDone: false },
    ]);
    setInputValue("");
  }

  return (
    <form className="embed_submit_field">
      <input
        type="text"
        value={inputValue}
        placeholder="新增待辦事項"
        onChange={handleInput}
      />
      <button className="btn_img" type="submit" onClick={handleAddTodo}>
        <img
          src="https://github.com/hexschool/webLayoutTraining1st/blob/master/%E5%85%AC%E7%9B%8A%E9%AB%94%E9%A9%97%E7%87%9F-Todolist/plus%201.png?raw=true"
          alt="Submit"
        />
      </button>
    </form>
  );
}

function App() {
  const [todo, setTodo] = useState([
    {
      id: Math.random().toString(36),
      name: "把冰箱發霉的檸檬拿去丟",
      isDone: false,
    },
  ]);
  function handleRemoveTodo(id) {
    setTodo(todo.filter((item) => item.id != id));
  }
  function handleCheckTodo(id) {
    let newArr = [...todo];
    newArr.map((item) => {
      if (item.id === id) item.isDone = !item.isDone;
    });
    setTodo(newArr);
  }
  return (
    <>
      <div className="container">
        <NavBar />
        <section className="wrap">
          <InputField todo={todo} setTodo={setTodo} />
          <div className="list">
            <ul className="list_header">
              <li className="actived">全部</li>
              <li>待完成</li>
              <li>已完成</li>
            </ul>
            <ul className="list_items">
              {todo.map((item, index) => {
                return (
                  <li key={item.id} className="list_item">
                    <input
                      type="checkbox"
                      name="todolist"
                      id={index}
                      defaultChecked={item.isDone}
                      onClick={() => handleCheckTodo(item.id)}
                    />
                    <label htmlFor={index}>{item.name}</label>
                    <span>{item.id}</span>
                    <button
                      className="delete"
                      onClick={() => handleRemoveTodo(item.id)}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="list_footer">
              <span>
                {todo.filter((item) => item.isDone).length} 個已完成事項
              </span>
              <button className="cancel">清除已完成項目</button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
