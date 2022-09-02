import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import Swal from "sweetalert2";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { state } = useLocation();

  const onSubmit = async (data) => {
    const API = "https://todoo.5xcamp.us/users/sign_in";
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: data }),
    };
    const response = await fetch(API, options);
    const responseJson = await response.json();

    const { error, nickname } = responseJson;

    if (response.status === 401) {
      Swal.fire({
        toast: true,
        position: "bottom-end",
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        title: error,
      });
    }
    if (response.status === 200) {
      Swal.fire({
        toast: true,
        position: "bottom-end",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        title: `${nickname} 歡迎回來`,
      });
      navigate("/todolist");
      const authorization = response.headers.get("authorization");
      localStorage.setItem("user", JSON.stringify({ nickname, authorization }));
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user")) navigate("/todolist");
    // eslint-disable-next-line
  }, []);

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2>最實用的線上代辦事項服務</h2>
            <ul className="list">
              <li className="list_item">
                <h3>Email</h3>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="請輸入信箱"
                  value={state?.email}
                  {...register("email", {
                    required: { value: true, message: "此欄位必填" },
                    pattern: {
                      value: new RegExp(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g),
                      message: "信箱格式不符",
                    },
                  })}
                />
                <h3 className="alert">{errors.email?.message}</h3>
              </li>
              <li className="list_item">
                <h3>密碼</h3>
                <input
                  id="pwd"
                  type="password"
                  name="password"
                  placeholder="請輸入密碼"
                  {...register("password", {
                    required: { value: true, message: "此欄位必填" },
                    minLength: {
                      value: 6,
                      message: "密碼長度至少應該設定 6 碼以上",
                    },
                  })}
                />
                <h3 className="alert">{errors.password?.message}</h3>
              </li>
            </ul>
            <input className="btn" type="submit" value="登入" />
          </form>
          <Link to="register" className="btn btn_sub">
            註冊帳號
          </Link>
        </section>
      </div>
    </div>
  );
}

export default Login;
