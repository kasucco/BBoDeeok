import styled from "styled-components";
import MainCard from "./MainCard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { acyncGetPosts } from "../../redux/modules/postsSlice";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Item from "../Main/MainCard";
import axios, { Axios } from "axios";
import MainFilter from "./MainFilter";
import { useRef } from "react";

const MainSlide = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [Posts, SetPosts] = useState();
  const [targetMargin, setTargetMargin] = useState(0);

  //초기값은 스파르타코딩클럽 본사위치로
  const [Myaddress, SetMyaddress] = useState({
    latitude: 127.037921,
    longitude: 37.4980853,
  });
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  //내 위치를 불러오는 것에 성공했을 때 , 실행되는 함수
  function success(position) {
    //현재 위치를 state값으로
    SetMyaddress({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  }
  //불러오지 못했을 때 실행되는 함수.
  function error(err) {
    console.warn("ERROR(" + err.code + "): " + err.message);
  }

  const getPosts = async () => {
    try {
      const { data } = await axios.get("https://www.iceflower.shop/posts");
      SetPosts(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // dispatch(acyncGetPosts());
    // if (!Myaddress) alert("위치기반을 누르시면, 위치기반 매칭이 가능합니다.");
    // getPosts();
    //로딩화면을 보여주고, 메인페이지를 불러오자. (로고도 보여줄겸)
    setTimeout(() => setLoading(false), 1500);
    //내 위치를 좌표값으로 알려주는 카카오 MAP API
    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);

  console.log(Posts);
  console.log(Myaddress);

  //newcardData는 기존 배열에 distance값이 추가된 배열입니다.
  const newcardData = useSelector((state) => state.posts.distance);
  //복사를 해주지않으면, 첫 랜더링시에 아래 sort함수가 작동하지않습니다. (이유는 좀 더 찾아봐야함)
  const new2 = [...newcardData];

  // 이건 가장 가까운순으로 정렬한 배열 => 사용자가 버튼을 누르면 이 배열로 map이 돌아가야함.
  const neardata = new2.sort((a, b) => a.distance - b.distance);
  console.log(newcardData);
  console.log(neardata);

  const itemss = useSelector((state) => state.posts.data);
  console.log(itemss);

  const [items, setItems] = useState([]); // 추가된 부분
  console.log("items", items);
  const target = useRef();

  let page = 0;

  const getData = async () => {
    const response = await axios.get(
      `https://www.iceflower.shop/posts/?skip=${page}`
    );
    console.log(response.data.data);
    // const data = await response.json();
    setItems((prev) => prev.concat(response.data.data));
    page += 1;
  };

  console.log(targetMargin);

  useEffect(() => {
    console.log("h!");
    let observer;
    if (target.current) {
      const onIntersect = async ([entry], observer) => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          await getData();
          console.log(page);
          observer.observe(entry.target);
        }
      };
      observer = new IntersectionObserver(onIntersect, { threshold: 0.1 }); // 추가된 부분
      observer.observe(target.current);
    }

    return () => observer && observer.disconnect();
  }, [target]);
  //필터 만들 부분~!
  useEffect(() => {
    setItems(items);
  }, []);
  console.log(target.current);
  return (
    <>
      {" "}
      <MainBox
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
          gap: "10px",
        }}
      >
        {items?.map((items, idx) => {
          return <Item key={idx} item={items} Myaddress={Myaddress}></Item>;
        })}{" "}
        <Target
          style={
            {
              // marginTop: `${targetMargin}px`,
            }
          }
          ref={target}
        >
          This is Target.
        </Target>{" "}
        {/* <button
          onClick={() => {
            getData();
          }}
        >
          다음페이지
        </button> */}
      </MainBox>{" "}
      <MainFilter
        targetMargin={targetMargin}
        setTargetMargin={setTargetMargin}
        items={items}
        setItems={setItems}
        getData={getData}
      />
    </>
  );
};

export default MainSlide;

const Target = styled.div`
  /* height: 100px; */
`;

const MainBox = styled.div`
  margin-top: 60px;
  width: 100%;
  height: 100%;
`;

// const Container = styled.div`
//   background-color: #afb4ff;
//   display: grid;
//   gap: 20px 20px;
//   padding: 20px;
//   grid-template-columns: 1fr 1fr;
//   grid-template-rows: repeat(3, minmax(100px, auto));
//   width: 100%;
//   max-width: 540px;
//   height: 660px;
// `;
// const AppWrap = styled.div`
//   width: 100%;
//   height: 100%;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   text-align: center;
//   align-items: center;

//   .Target-Element {
//     width: 100vw;
//     height: 140px;
//     display: flex;
//     justify-content: center;
//     text-align: center;
//     align-items: center;
//   }
// `;
// const GlobalStyle = styled.div`
//   *,
//   *::before,
//   *::after {
//     box-sizing: border-box;
//     padding: 0px;
//     margin: 0px;
//   }

//   body {
//     background-color: #f2f5f7;
//   }
// `;
