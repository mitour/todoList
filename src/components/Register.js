import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="form">
      <div className="container">
        <section className="wrap">
          <h1>
            <img
              className="logo"
              src="https://github.com/hexschool/webLayoutTraining1st/blob/master/%E5%85%AC%E7%9B%8A%E9%AB%94%E9%A9%97%E7%87%9F-Todolist/logo_lg.png?raw=true"
              alt="online todo list"
            />
          </h1>
          <img
            className="aside_img"
            src="https://github.com/hexschool/webLayoutTraining1st/blob/master/%E5%85%AC%E7%9B%8A%E9%AB%94%E9%A9%97%E7%87%9F-Todolist/img.png?raw=true"
            alt="a man in front of a checklist"
          />
        </section>
        <section className="wrap">
          <form action="#">
            <h2>註冊帳號</h2>
            <ul className="list">
              <li className="list_item">
                <h3>Email</h3>
                <input id="email" type="email" placeholder="請輸入 Email" />
              </li>
              <li className="list_item">
                <h3>您的暱稱</h3>
                <input id="username" type="text" placeholder="請輸入您的暱稱" />
              </li>
              <li className="list_item">
                <h3>密碼</h3>
                <input id="pwd" type="password" placeholder="請輸入密碼" />
              </li>
              <li className="list_item">
                <h3>再次輸入密碼</h3>
                <input
                  id="pwd_again"
                  type="password"
                  placeholder="再次輸入密碼"
                />
              </li>
            </ul>
            <input className="btn" type="submit" value="註冊帳號" />
          </form>
          <Link to="/" className="btn btn_sub">
            登入
          </Link>
        </section>
      </div>
    </div>
  );
}

export default Register;
