import { useState } from "react";
import defaultImage from "../../images/default.jpg";

function MyPageSection1({ user, setUser }) {
  const [image, setImage] = useState(user.userImage || defaultImage);

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
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="myPageSection1">
        <div className="profile-info">
          <button className="btn image-btn">
            <img src={image} alt="Profile" className="profile-img" />
          </button>
          <div className="text-info">
            <span className="user-name">{user.name} 님</span>
            <input
              type="file"
              accept="image/*"
              id="imageUpload"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <label htmlFor="imageUpload" className="btn upload-btn">
              이미지 변경
            </label>
            <button
              className="btn delete-btn"
              onClick={() => setImage(defaultImage)}
            >
              삭제
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .myPageSection1 {
          display: flex;
          align-items: center;
          padding: 15px;
          margin-left: 0;
        }

        .profile-info {
          display: flex;
          align-items: center;
        }

        .profile-img {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .profile-img:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }

        .text-info {
          margin-left: 20px;
        }

        .user-name {
          font-weight: bold;
          font-size: 26px;
          display: block;
          margin-bottom: 10px;
          color: #333;
        }

        .btn {
          font-size: 14px;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s ease, color 0.3s ease;
        }

        .upload-btn {
          background-color: #4caf50;
          color: white;
          margin-right: 10px;
          margin-bottom: -8px;
        }

        .upload-btn:hover {
          background-color: #45a049;
        }

        .delete-btn {
          background-color: #ff4d4d;
          color: white;
        }

        .delete-btn:hover {
          background-color: #e60000;
        }
      `}</style>
    </>
  );
}

export default MyPageSection1;
