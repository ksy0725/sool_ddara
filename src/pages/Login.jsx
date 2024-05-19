import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login= () => {
    const nav = useNavigate();
    
    const onClickButton= () =>{
        nav("/Home");
    }

    return (
        <div className="Login">
            <h1>로그인</h1>
            <input
                placeholder={"아이디를 입력해주세요"}
            />
            <input
                placeholder={"비밀번호를 입력해주세요"}
            />
            <button onClick={onClickButton}>로그인</button>
            <p className="signup-link">아직 회원이 아니신가요? <a href="/Signin">회원가입</a></p>
        </div>
    );
};

export default Login;
