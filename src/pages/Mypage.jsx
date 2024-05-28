import '../css/Mypage.css';

const Mypage = () => {
    const user = {
        name: "홍길동", // 이름을 설정
        email: "honggildong@example.com", // 이메일을 설정
        gender: "남성", // 성별을 설정
        location: "서울", // 지역을 설정
        age: 30 // 나이를 설정
    };

    return (
        <body className='bd_mypage'>
        <div className="mypage-container">
            <h1>My Page</h1>
            <div className="user-info">
                <table className="user-info-table">
                    <tbody>
                        <tr>
                            <td><strong>Name:</strong></td>
                            <td>{user.name}</td>
                        </tr>
                        <tr>
                            <td><strong>Email:</strong></td>
                            <td>{user.email}</td>
                        </tr>
                        <tr>
                            <td><strong>Gender:</strong></td>
                            <td>{user.gender}</td>
                        </tr>
                        <tr>
                            <td><strong>Location:</strong></td>
                            <td>{user.location}</td>
                        </tr>
                        <tr>
                            <td><strong>Age:</strong></td>
                            <td>{user.age}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        </body>
    );
}

export default Mypage;