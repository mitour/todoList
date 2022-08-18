const { useState, useEffect } = React;
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
          <a className="active" href="#">
            王小明的待辦
          </a>
        </li>
        <li>
          <a href="./index.html">登出</a>
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

function Todolist({ filterTodo, handleCheckTodo, handleRemoveTodo }) {
  return (
    <ul className="list_items">
      {filterTodo.map((item, index) => {
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
  );
}

function Empty() {
  return (
    <div class="empty">
      <h2>目前尚無待辦事項</h2>
      <img
        src="https://raw.githubusercontent.com/hexschool/webLayoutTraining1st/f70f00178a7f0baa31e9c01634303d8562cfe93a/%E5%85%AC%E7%9B%8A%E9%AB%94%E9%A9%97%E7%87%9F-Todolist/empty%201.png"
        alt="empty"
      />
    </div>
  );
}

function App() {
  const [todo, setTodo] = useState([
    {
      id: Math.random().toString(36),
      name: "把冰箱發霉的檸檬拿去丟",
      isDone: false,
    },
    {
      id: Math.random().toString(36),
      name: "打電話叫媽媽匯款給我",
      isDone: false,
    },
    { id: Math.random().toString(36), name: "整理電腦資料夾", isDone: true },
  ]);
  const [filterTodo, setFilterTodo] = useState([]);
  const tabs = ["全部", "待完成", "已完成"];
  const [currentTab, setCurrentTab] = useState("全部");

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
  function handleCleanDone() {
    setTodo(todo.filter((item) => !item.isDone));
  }
  function handleChangeTab(id) {
    setCurrentTab(id);
  }
  useEffect(() => {
    if (currentTab === "全部") setFilterTodo(todo);
    if (currentTab === "待完成")
      setFilterTodo(todo.filter((item) => !item.isDone));
    if (currentTab === "已完成")
      setFilterTodo(todo.filter((item) => item.isDone));
  }, [todo, currentTab]);

  return (
    <>
      <div className="container">
        <NavBar />
        <section className="wrap">
          <InputField todo={todo} setTodo={setTodo} />
          {todo.length ? (
            <div className="list">
              <ul className="list_header">
                {tabs.map((item, index) => {
                  return (
                    <li
                      key={index}
                      className={item === currentTab ? "active" : ""}
                      onClick={() => handleChangeTab(item)}
                    >
                      {item}
                    </li>
                  );
                })}
              </ul>
              <Todolist
                filterTodo={filterTodo}
                handleCheckTodo={handleCheckTodo}
                handleRemoveTodo={handleRemoveTodo}
              />
              <div className="list_footer">
                <span>
                  {currentTab === "已完成"
                    ? `${
                        todo.filter((item) => item.isDone).length
                      } 個已完成事項`
                    : `${
                        todo.filter((item) => !item.isDone).length
                      } 個待完成事項`}
                </span>
                <button className="cancel" onClick={handleCleanDone}>
                  清除已完成項目
                </button>
              </div>
            </div>
          ) : (
            <Empty />
          )}
        </section>
      </div>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
