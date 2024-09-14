import { useState } from "react";
import defaultImage from "../../images/default.jpg";

// 프로필 사진 컴포넌트
function MyPageSection1({ user, setUser }) {
  // 유저 이미지 관리 변수 및 함수
  const [image, setImage] = useState(user.userImage || defaultImage);

  // 이미지 바뀌면 sessionStorage에서 userImage값이 바뀌게 했는데 데이터베이스까지 연동시키려면
  // 서버에 이미지 저장하고 데이터베이스에는 url만 저장하는게 효과적이라는데 흠...
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        const updatedUser = { ...user, userImage: reader.result };
        setUser(updatedUser);
        sessionStorage.setItem("user", JSON.stringify(updatedUser));
      };
      reader.readAsDataURL(file); // 이미지 파일을 base64 URL로 변환
    }
  };

  return (
    <>
      <div className="myPageSection1">
        {/* 이미지 부분 */}
        <div style={{ padding: "15px" }}>
          <button className="btn image-btn" style={{ border: "none" }}>
            <img
              src={image}
              alt="Description"
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
              }}
            />
          </button>
        </div>

        {/* 이름 부분 */}
        <div>
          <span
            style={{
              fontWeight: "bold",
              fontSize: "26px",
              display: "inline-block",
              marginBottom: "10px",
            }}
          >
            {user.name} 님
          </span>
          <br />
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            id="imageUpload"
            onChange={handleImageChange}
          />
          <label
            htmlFor="imageUpload"
            className="btn"
            style={{ fontSize: "12px", cursor: "pointer" }}
          >
            이미지 변경
          </label>
          <button
            className="btn delete-btn"
            style={{
              fontSize: "12px",
              marginLeft: "15px",
              marginBottom: "10px",
            }}
            onClick={() => {
              console.log(image);
            }}
          >
            삭제
          </button>
        </div>
      </div>

      {/* CSS 스타일 추가 */}
      <style jsx>{`
        .btn {
          transition: all 0.3s ease;
        }

        .image-btn:hover {
          transform: scale(1.05);
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
        }

        .delete-btn:hover {
          background-color: #ff4d4d;
          color: white;
        }

        label.btn:hover {
          background-color: #4caf50;
          color: white;
        }
      `}</style>
    </>
  );
}

export default MyPageSection1;
