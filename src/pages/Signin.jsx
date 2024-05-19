import { Link } from 'react-router-dom';
import "./Signin.css"

const Signin= () => {

    return (
        <div className="Signin">
            <h1>회원가입</h1>
            <input
                placeholder={"이메일을 입력해주세요"}
            />

            <input
                placeholder={"비밀번호를 입력해주세요"}
            />
            
            <button>회원가입</button>
            <p className="signup-link">이미 회원이신가요? <a href="/Login">로그인</a></p>
        </div>
    );
};

export default Signin;
