import React from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { API } from "../config";

const SignIn = () => {
    const navigate = useNavigate();
    //formik과 yup으로 form의 state 관리 및 유효성 검증
    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .min(2, "아이디는 최소 2글자 이상입니다.")
            .max(10, "아이디는 최대 10글자입니다.")
            .matches(
                /^[가-힣a-zA-Z][^!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]*$/,
                "아이디에 특수문자가 포함되면 안되고 숫자로 시작하면 안됩니다."
            ),
        password: Yup.string()
            .min(8, "비밀번호는 최소 8자리 이상입니다.")
            .max(16, "비밀번호는 최대 16자리입니다.")
            .matches(
                /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[^\s]*$/,
                "알파벳, 숫자, 공백을 제외한 특수문자를 모두 포함해야 합니다."
            )
    });

    const submit = async (values) => {
        const { username, password } = values;
        try {
            await axios.post(`${API.LOGIN}`, {
                username,
                password,
            });
            toast.success(<h3>로그인이 완료되었습니다.</h3>, {
                position: "top-center",
                autoClose: 2000
            });
            setTimeout(() => {
                navigate("/Users");
            }, 2000);

        } catch (e) {
            toast.error(<h3>로그인이 실패되었습니다.</h3>, {
                position: "top-center",
            });
        }
    };

    return (
        <Formik
            initialValues={{
                username: "",
                password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={submit}
            validateOnMount={true}
        >
            {({ values, handleSubmit, handleChange, errors }) => (
                <div className="login_area">
                    <div className="login_box">
                        <ToastContainer />
                        <form onSubmit={handleSubmit} autoComplete="off">
                            <div className="input-form-area">
                                <div className="input-form-item">
                                    <input
                                        value={values.username}
                                        name="username"
                                        onChange={handleChange}
                                        className="input-form"
                                        placeholder="아이디"
                                        required
                                    />
                                    {errors.username && <div className="error-message">{errors.username}</div>}
                                </div>

                                <div className="input-form-item">
                                    <input
                                        value={values.password}
                                        name="password"
                                        type="password"
                                        onChange={handleChange}
                                        className="input-form"
                                        placeholder="비밀번호"
                                        required
                                    />
                                    {errors.password && <div className="error-message">{errors.password}</div>}
                                </div>
                            </div>
                            <button type="submit" className="btns type1">로그인</button>
                            <a href="/SignUp" className="btns type2">회원가입</a>
                        </form>
                    </div>
                </div>
            )}
        </Formik>
    );
};

export default SignIn