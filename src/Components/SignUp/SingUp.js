import React, { useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import ReactDaumPost from "react-daumpost-hook";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { signUpApi } from "../../instance.js";
import { useState } from "react";
import axios from "axios";
import useInput from "../../hooks/UseInput.js";

const SignUp = () => {
  const navigate = useNavigate();

  //yup을 이용한 유효섬겅증방식
  const formSchema = yup.object({
    userId: yup
      .string()
      .required("아이디를 입력해주세요")
      .min(4, "최소 4자 이상 가능합니다")
      .max(15, "최대 15자 까지만 가능합니다"),
    nickName: yup
      .string()
      .required("닉네임을 입력해주세요")
      .min(2, "최소 2자 이상 가능합니다")
      .max(8, "최대 8자 까지만 가능합니다"),
  });

  //useForm 설정
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: { gender: "female" },
    resolver: yupResolver(formSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
    navigate("/signup1");
  };

  return (
    <>
      <SignUpWrap>
        <SignUpCtn>
          {" "}
          <SignUpHeader>
            <Arrow onClick={() => navigate("/")} />
            <div>회원가입</div>
          </SignUpHeader>
          <h3>
            아이디와 닉네임을 <br /> 입력해주세요
          </h3>{" "}
          <SignUpInput placeholder="아이디" {...register("userId")} />{" "}
          {errors.userId && (
            <AlertError role="alert">{errors.userId.message}</AlertError>
          )}
          <SignUpInput placeholder="닉네임" {...register("nickName")} />
          {errors.nickName && (
            <AlertError role="alert">{errors.nickName.message}</AlertError>
          )}
          <NextBtn onClick={handleSubmit(onSubmit)}>다음</NextBtn>
        </SignUpCtn>
      </SignUpWrap>{" "}
    </>
  );
};
const SignUpWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  width: 100%;
  height: 100vh;
  color: white;
`;

const SignUpCtn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 20px;
`;

const SignUpHeader = styled.div`
  position: relative;
  top: 0;
  font-size: 1.5rem;
  font-weight: 400;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px 20px;
  padding-right: 40%;
`;

const RowBox = styled.div`
  width: 90%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  &.column {
    align-items: flex-start;
    flex-direction: column;
  }
`;

const VerfiyBtn = styled.div`
  font-size: 15px;
  color: var(--white);
  width: 35%;
  background-color: var(--primary);
  display: flex;
  justify-content: center;
  border-radius: 15px;
  padding: 5px 10px;
`;

const InputBirth = styled.input`
  border-radius: 5px;
  width: 10%;
  padding: 10px;
  border: 2px solid #9747ff;
`;

const SignUpInput = styled.input`
  color: white;
  display: block;
  width: 90%;
  padding: 0 20px;
  margin-bottom: 5px;
  height: 40px;
  border: none;
  border-bottom: 1px solid #ffffff;
  background-color: transparent;
  cursor: pointer;
  &:focus {
    border: none;
    border-bottom: 2px solid white;
  }
`;

const DaumPostBox = styled.div`
  position: relative;
  box-shadow: 0px 3px 3px 0px gray;
  width: 400px;
`;

const NextBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  position: fixed;
  bottom: 50px;
  font-weight: 600;
  width: 80%;
  max-width: 500px;
  height: 3em;
  border: none;
  border-radius: 20px;
  box-shadow: 0px 3px 3px 0px gray;
  cursor: pointer;
  background-color: var(--primary);
  :hover {
    background-color: gray;
  }
`;

const WholeBox = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  gap: 20px;
`;

const TagBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  min-height: 40px;
  margin: 10px;
  padding: 0 10px;
  border: none;
  border-bottom: 1px solid white;
  &:focus-within {
    border-bottom: 2px solid white;
  }
`;

const TagItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px;
  padding: 5px;
  background-color: var(--primary);
  border-radius: 5px;
  color: white;
  font-size: 13px;
`;

const Text = styled.span``;

const TagButton = styled.button`
  background-color: transparent;
  text-shadow: 0px 1px 1px 0px var(--black);
  border: none;
  color: var(--red);
`;

const TagInput = styled.input`
  color: white;
  display: inline-flex;
  min-width: 250px;
  background: transparent;
  border: none;
  outline: none;
  cursor: text;
`;

const Arrow = styled.div`
  border: 7px solid transparent;
  border-top-color: white;
  transform: rotate(90deg);
`;

const AlertError = styled.div`
  font-size: 14px;
  color: red;
`;

export default SignUp;
