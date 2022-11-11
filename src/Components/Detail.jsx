import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Layout from "../style/Layout";
import Comments from "./Comment";
// import { __getComments } from "../redux/modules/CommentsSlice";
// import { __postComments } from "../redux/modules/CommentsSlice";
import { __getDetail } from "../redux/modules/DetailSlice";

const Detail = () => {
  // const { id } = useParams();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  // const initialState = {
  //   comment: "",
  // };

  const postInitialState = {
    title: "",
    content: "",
    location: "",
    cafe: "",
    date: "",
    time: "",
    map: "",
    partyMember: "",
  };

  // const [comment, setComment] = useState(initialState);
  const [postContent, setPostContent] = useState(postInitialState);

  // // const { isLoading, error, comments } = useSelector((state) => state.comments);

  useEffect(() => {
    dispatch(__getDetail());
    console.log(dispatch);
    //setPostContent(dispatch);
  }, [dispatch]);

  // if (isLoading) {
  //   return <div> 로딩 중 ... </div>;
  // }

  // if (error) {
  //   return <div> {error.message} </div>;
  // }

  // const onCommentHandler = () => {
  //   // dispatch(__postComments(comment));
  //   // setComment(initialState);
  // };

  return (
    <>
      <Layout>
        <StContainer>
          <h1>불금 달리실분!</h1>
          <div>
            <h3>파티장: </h3>
            <h3>장소: </h3>
            <h3>날짜: </h3>
            <h3>인원: </h3>
            <h3>참여자: </h3>
          </div>
          <button>참가하기</button>
          <button>수정하기</button>
        </StContainer>
      </Layout>
      <Wrap open={open}>
        <div
          className="innerDiv"
          onClick={() => {
            setOpen((open) => !open);
          }}
        >
          {open ? "눌러서 댓글 내리기" : "눌러서 댓글 보기"}
        </div>
        <div>
          <Btnbox>
            <form
              onSubmit={(e) => {
                // e.preventDefault();
                // onCommentHandler(comment);
              }}
            >
              <input
              // value={comment.comment}
              // type="text"
              // placeholder="이름"
              // onChange={(e) => {
              //   const { value } = e.target;
              //   setComment({
              //     ...comment,
              //     comment: value,
              //   });
              // }}
              />
              <button>추가하기</button>
            </form>
          </Btnbox>
          {/* {comments.map((comment) => (
            <div key={comment.id}>
              {+id === +comment.movieId ? <Comments comment={comment} /> : null}
            </div>
          ))} */}
        </div>
      </Wrap>
    </>
  );
};

export default Detail;

const StContainer = styled.div`
  padding: 8px;
  border: 1px solid;
  border-radius: 16px;
  background-color: white;
  margin: 10px;
`;

const Wrap = styled.div`
  width: 100%;
  background-color: white;
  height: ${({ open }) => (open ? "500px" : "30px")};
  position: absolute;
  bottom: 0;
  left: 0;
  transition: height 400ms ease-in-out;
  .innerDiv {
    position: fixed;
    width: 100%;
    background-color: salmon;
    height: 30px;
    line-height: 30px;
    color: white;
    text-align: center;
  }
  overflow: scroll;
`;

const Btnbox = styled.div`
  form {
    display: flex;
    margin-top: 60px;
    justify-content: space-evenly;
  }
  input {
    border: 2px solid salmon;
    border-radius: 5px;
    height: 20px;
  }
  input:nth-child(2) {
    width: 400px;
  }
  input:focus {
    outline: none;
  }
  button {
    width: 200px;
    height: 26px;
    background-color: salmon;
    color: white;
    border: none;
    border-radius: 5px;
  }
  button:hover {
    opacity: 0.8;
    color: black;
    cursor: pointer;
  }
`;