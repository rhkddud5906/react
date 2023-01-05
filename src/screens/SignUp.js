import React from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { API } from "../config";

const SignUp = () => {
    const navigate = useNavigate();
    console.log(API.USER)

    //formik과 yup으로 form의 state 관리 및 유효성 검증
    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .min(2, "아이디는 최소 2글자 이상입니다.")
            .max(10, "아이디는 최대 10글자입니다.")
            .matches(
                /^[가-힣a-zA-Z][^!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]*$/,
                "아이디에 특수문자가 포함되면 안되고 숫자로 시작하면 안됩니다."
            ),
        email: Yup.string()
            .email("올바른 이메일 형식이 아닙니다."),
        password: Yup.string()
            .min(8, "비밀번호는 최소 8자리 이상입니다.")
            .max(16, "비밀번호는 최대 16자리입니다.")
            .matches(
                /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[^\s]*$/,
                "알파벳, 숫자, 공백을 제외한 특수문자를 모두 포함해야 합니다."
            ),
        password2: Yup.string()
            .oneOf([Yup.ref("password"), null], "비밀번호가 일치하지 않습니다.")
    });

    const submit = async (values) => {
        const { username, first, last, age, email, password } = values;
        try {
            await axios.post(`${API.USER}`, {
                username,
                name: {
                    first, last
                },
                age,
                email,
                password,
            });
            toast.success(<h3>회원가입이 완료되었습니다.<br />로그인 하세요.</h3>, {
                position: "top-center",
                autoClose: 2000
            });
            setTimeout(() => {
                navigate("/SignIn");
            }, 2000);

        } catch (e) {
            toast.error(<h3>회원가입이 실패되었습니다.</h3>, {
                position: "top-center",
            });
        }
    };

    return (
        <Formik
            initialValues={{
                username: "",
                first: "",
                last: "",
                age: "",
                email: "",
                password: "",
                password2: "",
            }}
            validationSchema={validationSchema}
            onSubmit={submit}
            validateOnMount={true}
        >
            {({ values, handleSubmit, handleChange, errors }) => (
                <div className="inner">
                    <ToastContainer />
                    <form onSubmit={handleSubmit} autoComplete="off">
                        <div className="input-form-area">
                            <div className="input-form-item">
                                <div className="input-label required">아이디</div>
                                <input
                                    value={values.username}
                                    name="username"
                                    onChange={handleChange}
                                    className="input-form"
                                    required
                                />
                                {errors.username && <div className="error-message">{errors.username}</div>}
                            </div>

                            <div className="input-form-item">
                                <div className="input-label required">비밀번호</div>
                                <input
                                    value={values.password}
                                    name="password"
                                    type="password"
                                    onChange={handleChange}
                                    className="input-form"
                                    required
                                />
                                {errors.password && <div className="error-message">{errors.password}</div>}
                            </div>

                            <div className="input-form-item">
                                <div className="input-label required">비밀번호 확인</div>
                                <input
                                    value={values.password2}
                                    name="password2"
                                    type="password"
                                    onChange={handleChange}
                                    className="input-form"
                                    required
                                />
                                {errors.password2 && <div className="error-message">{errors.password2}</div>}
                            </div>

                            <div className="input-form-item">
                                <div className="input-label required">이메일</div>
                                <input
                                    value={values.email}
                                    name="email"
                                    onChange={handleChange}
                                    className="input-form"
                                    required
                                />
                                {errors.email && <div className="error-message">{errors.email}</div>}
                            </div>

                            <div className="input-form-item">
                                <div className="input-label required">성</div>
                                <input
                                    value={values.first}
                                    name="first"
                                    onChange={handleChange}
                                    className="input-form"
                                    required
                                />
                            </div>

                            <div className="input-form-item">
                                <div className="input-label required">이름</div>
                                <input
                                    value={values.last}
                                    name="last"
                                    onChange={handleChange}
                                    className="input-form"
                                    required
                                />
                            </div>

                            <div className="input-form-item">
                                <div className="input-label required">나이</div>
                                <input
                                    value={values.age}
                                    name="age"
                                    onChange={handleChange}
                                    className="input-form"
                                    required
                                />
                            </div>
                        </div>
                        <button type="submit" className="btns type1">로그인</button>
                        <a href="/SignIn" className="btns type2">취소</a>
                    </form>
                </div>
            )}
        </Formik>
    );
};

export default SignUp