import styles from "./css/SignUp.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createMember } from "../services/MemberService";
import axios from "axios";

function SignUp() {
  const navigate = useNavigate();

  // json형태로 변수 선언 후에 값 입력받기 (아이디, 비밀번호, 생년월일, 성별)
  const [formData, setFormData] = useState({
    userId: "",
    userPw: "",
    name: "",
    phone: "",
    email: "",
    birth: "",
  });

  // 비밀번호 확인 변수
  const handleConfirmPwChange = (e) => {
    setConfirmPw(e.target.value);
  };

  // 중복 되는지 확인하는 변수
  const [isIdUnique, setIsIdUnique] = useState(false);
  const [confirmPw, setConfirmPw] = useState(""); // 비밀번호 확인 상태 추가

  // 생년월일 입력 필드를 별도로 관리
  const handleYearChange = (e) => {
    setYear(e.target.value);
    setFormData((prevState) => ({
      ...prevState,
      birth: `${e.target.value}-${String(month).padStart(2, "0")}-${String(
        day
      ).padStart(2, "0")}`,
    }));
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
    setFormData((prevState) => ({
      ...prevState,
      birth: `${year}-${String(e.target.value).padStart(2, "0")}-${String(
        day
      ).padStart(2, "0")}`,
    }));
  };

  const handleDayChange = (e) => {
    setDay(e.target.value);
    setFormData((prevState) => ({
      ...prevState,
      birth: `${year}-${String(month).padStart(2, "0")}-${String(
        e.target.value
      ).padStart(2, "0")}`,
    }));
  };

  // input으로 입력받는 값들 저장
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // 빈칸있는지 확인
  const validateForm = () => {
    console.log(Object.values(formData).every((value) => value.trim() !== ""));
    return (
      Object.values(formData).every((value) => value.trim() !== "") &&
      confirmPw === formData.userPw &&
      formData.phone.length === 11
    );
  };

  // 회원가입
  const onSubmit = async (e) => {
    e.preventDefault();

    // 빈칸 확인
    if (!validateForm()) {
      alert("모든 필드를 채워주세요.");
      return;
    }
    if (!isIdUnique) {
      alert("중복확인 해주세요");
      return;
    }

    // 회원가입 서버에 요청
    try {
      const data = { ...formData, cash: 0 };
      console.log(data);
      await createMember(data);
      alert("회원가입이 완료되었습니다.");
    } catch (error) {
      alert("회원가입에 실패하였습니다.");
      console.error(error);
    }
  };

  //아이디 중복확인
  const checkDuplicate = async () => {
    if (formData.userId.length === 0) {
      alert("아이디를 입력해주세요.");
      return;
    }
    try {
      const res = await axios.get(
        `http://localhost:8080/api/members/check/${formData.userId}`
      );
      if (res.data) {
        alert("중복된 아이디입니다. 다른 아이디를 사용해주세요.");
        setIsIdUnique(false);
      } else {
        alert("사용 가능한 아이디입니다.");
        setIsIdUnique(true);
      }
    } catch (error) {
      console.error("아이디 중복 확인에 실패했습니다.", error);
      alert("서버에 문제가 발생했습니다. 나중에 다시 시도해주세요.");
    }
  };

  //이메일 입력받기
  const [emailPrefix, setEmailPrefix] = useState("");
  const [domain, setDomain] = useState("gmail.com");
  const [isCustomDomain, setIsCustomDomain] = useState(false); // 직접입력 여부 관리

  const handlePrefixChange = (e) => {
    setEmailPrefix(e.target.value);
  };

  const handleDomainChange = (e) => {
    const selectedDomain = e.target.value;
    if (selectedDomain === "none") {
      setIsCustomDomain(true); // 직접입력을 활성화
      setDomain(""); // 빈 값으로 설정
    } else {
      setIsCustomDomain(false); // 직접입력 비활성화
      setDomain(selectedDomain); // 선택한 도메인을 설정
    }
  };

  const handleEmailChange = () => {
    setFormData((prevState) => ({
      ...prevState,
      email: `${emailPrefix}@${domain}`,
    }));
  };

  // 입력받은 생년월일
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");

  // 연도, 월, 일 목록 생성
  const years = Array.from({ length: 100 }, (_, i) => 2024 - i); // 1924년부터 2024년까지
  const months = Array.from({ length: 12 }, (_, i) => i + 1); // 1월부터 12월까지
  const days = Array.from({ length: 31 }, (_, i) => i + 1); // 1일부터 31일까지

  return (
    <>
      <div className={styles.signUpContainer}>
        <form className={styles.signUpForm} onSubmit={onSubmit}>
          <h2
            className="title"
            style={{ marginTop: "20px", textAlign: "center" }}
          >
            회원가입
          </h2>

          {/* 아이디 입력 및 중복확인 태그 */}
          <label
            htmlFor="userId"
            className="form-label"
            style={{ marginBottom: "0" }}
          >
            아이디
          </label>
          <div className="mb-3 position-relative">
            <input
              type="text"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              className="form-control"
              placeholder="아이디"
              style={{ height: "50px", paddingRight: "120px" }}
            />
            <button
              type="button"
              className="btn btn-primary position-absolute"
              style={{
                width: "120px",
                height: "50px",
                padding: "0",
                fontSize: "0.875rem",
                right: "0",
                top: "50%",
                transform: "translateY(-50%)",
                borderRadius: "0",
              }}
              onClick={checkDuplicate}
            >
              중복 확인
            </button>
          </div>

          {/* 비밀번호 */}
          <label
            htmlFor="pw"
            className="form-label"
            style={{ marginBottom: "0" }}
          >
            비밀번호
          </label>
          <div className="mb-3">
            <input
              type="password"
              name="userPw"
              onChange={handleChange}
              className="form-control"
              placeholder="비밀번호 입력(문자, 숫자, 특수문자 포함 8~20자)"
              style={{ height: "50px" }}
            />
          </div>

          {/* 비밀번호 확인 */}
          <label
            htmlFor="confirmPw"
            className="form-label"
            style={{ marginBottom: "0" }}
          >
            비밀번호 확인
          </label>
          <div className="mb-3">
            <input
              type="password"
              name="confirmPw"
              onChange={handleConfirmPwChange}
              className="form-control"
              placeholder="비밀번호 재입력"
              style={{ height: "50px" }}
            />
          </div>

          {/* 이름 */}
          <label
            htmlFor="name"
            className="form-label"
            style={{ marginBottom: "0" }}
          >
            이름
          </label>
          <div className="mb-3">
            <input
              type="text"
              name="name"
              onChange={handleChange}
              className="form-control"
              placeholder="이름을 입력해주세요."
              style={{ height: "50px" }}
            />
          </div>

          {/* 전화번호 */}
          <label
            htmlFor="phone"
            className="form-label"
            style={{ marginBottom: "0" }}
          >
            전화번호
          </label>
          <div className="mb-3">
            <input
              type="text"
              name="phone"
              onChange={handleChange}
              className="form-control"
              placeholder="휴대폰 번호 입력('-'제외 11자리 입력)"
              style={{ height: "50px" }}
            />
          </div>

          {/* 이메일 */}
          <label
            htmlFor="email"
            className="form-label"
            style={{ marginBottom: "0" }}
          >
            이메일
          </label>
          <div className={styles.inputContainer} name="email">
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type="text"
                value={emailPrefix}
                onChange={(e) => {
                  handlePrefixChange(e);
                  handleEmailChange();
                }}
                placeholder="이메일 입력"
                className={`form-control ${styles.emailPrefix}`}
                style={{ height: "50px" }}
              />
              <span className={styles.atSign}>@</span>
              <input
                type="text"
                value={domain}
                onChange={(e) => {
                  setDomain(e.target.value);
                  handleEmailChange();
                }}
                placeholder="도메인 선택 또는 직접 입력"
                className={`form-control ${styles.emailDomain}`}
                style={{ height: "50px" }}
                disabled={!isCustomDomain}
              />
            </div>
            <div className={styles.selectContainer}>
              <select
                onChange={(e) => {
                  handleDomainChange(e);
                  handleEmailChange();
                }}
                className={`form-control ${styles.domainSelect}`}
              >
                <option value="gmail.com">gmail.com</option>
                <option value="yahoo.com">yahoo.com</option>
                <option value="outlook.com">outlook.com</option>
                <option value="none">직접입력</option>
              </select>
            </div>
          </div>

          <label htmlFor="year" className="form-label">
            생년월일
          </label>
          <div className={styles.dateSelector}>
            <select
              id="year"
              value={year}
              onChange={handleYearChange}
              className={styles.formSelect}
            >
              <option value="">년도</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>

            <select
              id="month"
              value={month}
              onChange={handleMonthChange}
              className={styles.formSelect}
            >
              <option value="">월</option>
              {months.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>

            <select
              id="day"
              value={day}
              onChange={handleDayChange}
              className={styles.formSelect}
            >
              <option value="">일</option>
              {days.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-primary">
            회원가입
          </button>
        </form>
      </div>
    </>
  );
}

export default SignUp;
