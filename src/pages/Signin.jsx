import { useState } from "react";
import { firebaseAuth, createUserWithEmailAndPassword } from "../firebase";
import { useNavigate , Link } from "react-router-dom";

import "./Signin.css";

const Signin = () => {
    const [errorMsg, setErrorMsg] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const nav = useNavigate();

    const onChangeEmail = (e) => {
        setRegisterEmail(e.target.value);
    };

    const onChangePassword = (e) => {
        setRegisterPassword(e.target.value);
    };

    const register = async () => {
        try {
            setErrorMsg("");
            const createdUser = await createUserWithEmailAndPassword(firebaseAuth, registerEmail, registerPassword);
            console.log(createdUser);
            setRegisterEmail("");
            setRegisterPassword("");
            nav("/login");
        } catch (err) {
            switch (err.code) {
                case 'auth/weak-password':
                    setErrorMsg('비밀번호는 6자리 이상이어야 합니다');
                    break;
                case 'auth/invalid-email':
                    setErrorMsg('잘못된 이메일 주소입니다');
                    break;
                case 'auth/email-already-in-use':
                    setErrorMsg('이미 가입되어 있는 계정입니다');
                    break;
                case 'auth/internal-error':
                    setErrorMsg('잘못된 요청입니다');
                    break;
                case 'auth/network-request-failed':
                    setErrorMsg('네트워크 요청을 실패했습니다');
                    break;
                default:
                    setErrorMsg('알 수 없는 오류가 발생했습니다');
            }
        }
    };

    const onSubmit = async (e) => {
        await register();
    };

    return (
        <div className="Signin">
            <h1>회원가입</h1>
            <input
                value={registerEmail}
                onChange={onChangeEmail}
                placeholder={"이메일을 입력해주세요"}
            />
            <input
                type="password"
                value={registerPassword}
                onChange={onChangePassword}
                placeholder={"비밀번호를 입력해주세요"}
            />
            {errorMsg && <p className="error-msg">{errorMsg}</p>}
            <button onClick={onSubmit}>회원가입</button>
            <p className="signup-link">이미 회원이신가요? <Link to="/Login">로그인</Link></p>
        </div>
    );
};

export default Signin;
