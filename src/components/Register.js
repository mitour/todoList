import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const API = "https://todoo.5xcamp.us/users";
    const { email, nickname, password } = data;
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: { email, nickname, password } }),
    };
    const response = await fetch(API, options);
    const responseJson = await response.json();

    const { error, message } = responseJson;

    if (response.status === 422) {
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
    if (response.status === 201) {
      Swal.fire({
        toast: true,
        position: "bottom-end",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        title: message,
      });
      navigate("/", { state: { email: email } });
    }
  };
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
            <h2>註冊帳號</h2>
            <ul className="list">
              <li className="list_item">
                <h3>Email</h3>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="請輸入 Email"
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
                <h3>您的暱稱</h3>
                <input
                  id="nickname"
                  type="text"
                  name="nickname"
                  placeholder="請輸入您的暱稱"
                  {...register("nickname", {
                    required: { value: true, message: "此欄位必填" },
                  })}
                />
                <h3 className="alert">{errors.nickname?.message}</h3>
              </li>
              <li className="list_item">
                <h3>密碼</h3>
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="請輸入密碼"
                  {...register("password", {
                    required: { value: true, message: "此欄位必填" },
                    minLength: {
                      value: 8,
                      message: "密碼長度至少應該設定 8 碼以上",
                    },
                    pattern: {
                      value: new RegExp(
                        "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9_]{8,}"
                      ),
                      message:
                        "密碼格式不符：至少包含一位大寫英文字母、一位小寫英文字母及一位數字",
                    },
                  })}
                />
                <h3 className="alert">{errors.password?.message}</h3>
              </li>
              <li className="list_item">
                <h3>再次輸入密碼</h3>
                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  placeholder="請再次輸入密碼"
                  {...register("confirmPassword", {
                    required: { value: true, message: "此欄位必填" },
                    validate: (value) =>
                      value === watch("password") || "兩次密碼不相符",
                  })}
                />
                <h3 className="alert">{errors.confirmPassword?.message}</h3>
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
