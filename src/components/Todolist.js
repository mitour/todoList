import { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

function logout() {
  localStorage.clear();
}
function NavBar() {
  const nickname = JSON.parse(localStorage.getItem("user")).nickname;
  return (
    <nav>
      <h1>
        <NavLink to="#">
          <img
            src="https://github.com/hexschool/webLayoutTraining1st/blob/master/%E5%85%AC%E7%9B%8A%E9%AB%94%E9%A9%97%E7%87%9F-Todolist/logo.png?raw=true"
            alt="online todo list"
          />
        </NavLink>
      </h1>
      <ul>
        <li>
          <NavLink to="#">{nickname} 的待辦</NavLink>
        </li>
        <li>
          <NavLink to="/" onClick={logout}>
            登出
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

function InputField({ fetchTodo }) {
  const [inputValue, setInputValue] = useState("");

  function handleInput(e) {
    setInputValue(e.target.value);
  }

  async function fetchAddTodo(inputValue) {
    const API = "https://todoo.5xcamp.us/todos";
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: JSON.parse(localStorage.getItem("user")).authorization,
      },
      body: JSON.stringify({ todo: { content: inputValue } }),
    };
    const response = await fetch(API, options);
    const responseJson = await response.json();

    if (response.status === 401) {
      alert(responseJson.message);
    }
    if (response.status === 201) {
      alert("新增成功");
      fetchTodo();
    }
  }

  function handleAddTodo(e) {
    e.preventDefault();
    if (!inputValue) return;
    fetchAddTodo(inputValue);
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

function Todolist({ filterTodo, fetchToggleTodo, fetchDelTodo }) {
  return (
    <ul className="list_items">
      {filterTodo.map((item, index) => {
        return (
          <li key={item.id} className="list_item">
            <input
              type="checkbox"
              name="todolist"
              id={index}
              defaultChecked={item.completed_at}
              onClick={() => fetchToggleTodo(item.id)}
            />
            <label htmlFor={index}>{item.content}</label>
            <button className="delete" onClick={() => fetchDelTodo(item.id)}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function Empty() {
  return (
    <div className="empty">
      <h2>目前尚無待辦事項</h2>
      <img
        src="https://raw.githubusercontent.com/hexschool/webLayoutTraining1st/f70f00178a7f0baa31e9c01634303d8562cfe93a/%E5%85%AC%E7%9B%8A%E9%AB%94%E9%A9%97%E7%87%9F-Todolist/empty%201.png"
        alt="empty"
      />
    </div>
  );
}

function App() {
  const [todo, setTodo] = useState([]);
  const [filterTodo, setFilterTodo] = useState([]);
  const tabs = ["全部", "待完成", "已完成"];
  const [currentTab, setCurrentTab] = useState("全部");

  const fetchTodo = useCallback(async () => {
    const API = "https://todoo.5xcamp.us/todos";
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: JSON.parse(localStorage.getItem("user")).authorization,
      },
    };
    const response = await fetch(API, options);
    const responseJson = await response.json();

    const { error, todos } = responseJson;

    if (response.status === 401) {
      alert(error);
    }
    if (response.status === 200) {
      setTodo(todos);
    }
  }, []);

  useEffect(() => {
    fetchTodo();
  }, [fetchTodo]);

  const fetchToggleTodo = async (id) => {
    const API = `https://todoo.5xcamp.us/todos/${id}/toggle`;
    const options = {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: JSON.parse(localStorage.getItem("user")).authorization,
      },
    };
    const response = await fetch(API, options);
    const responseJson = await response.json();

    if (response.status === 401) {
      alert(responseJson.message);
    }
    if (response.status === 200) {
      alert("切換狀態");
      fetchTodo();
    }
  };

  const fetchDelTodo = async (id) => {
    const API = `https://todoo.5xcamp.us/todos/${id}`;
    const options = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: JSON.parse(localStorage.getItem("user")).authorization,
      },
    };
    const response = await fetch(API, options);
    const responseJson = await response.json();
    if (response.status === 401) {
      alert(responseJson.message);
    }
    if (response.status === 200) {
      fetchTodo();
      alert(responseJson.message);
    }
  };

  const handleCleanDone = () => {
    const isDoneList = todo.filter((item) => item.completed_at);
    if (!isDoneList.length) alert("nothing to delete");
    for (const item of isDoneList) {
      fetchDelTodo(item.id);
    }
  };

  function handleChangeTab(id) {
    setCurrentTab(id);
  }

  useEffect(() => {
    if (currentTab === "全部") setFilterTodo(todo);
    if (currentTab === "待完成")
      setFilterTodo(todo.filter((item) => !item.completed_at));
    if (currentTab === "已完成")
      setFilterTodo(todo.filter((item) => item.completed_at));
  }, [todo, currentTab]);

  return (
    <div className="todolist">
      <div className="container">
        <NavBar />
        <section className="wrap">
          <InputField fetchTodo={fetchTodo} />
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
                fetchToggleTodo={fetchToggleTodo}
                fetchDelTodo={fetchDelTodo}
              />
              <div className="list_footer">
                <span>
                  {currentTab === "已完成"
                    ? `${
                        todo.filter((item) => item.completed_at).length
                      } 個已完成事項`
                    : `${
                        todo.filter((item) => !item.completed_at).length
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
    </div>
  );
}

export default App;
