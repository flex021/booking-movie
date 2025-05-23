import React from "react";
import Slider from "react-slick";
import styleSlick from './MultipleRowSlick.module.css';
import Film from "../Film/Film";
import { Tabs } from 'antd';
import { useDispatch } from "react-redux";
import { SET_PHIM_DANG_CHIEU, SET_PHIM_SAP_CHIEU } from "../../redux/types/QuanLyPhimType";
import { layDanhSachPhimAction } from "../../redux/actions/QuanLyPhimActions";
import Iframe from 'react-iframe'

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick['slick-next']}`}
      style={{ ...style, display: 'block' }}
      onClick={onClick}
    >
    </div>
  )
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick['slick-prev']}`}

      style={{ ...style, display: "block", left: '-50px' }}
      onClick={onClick}
    >
    </div>
  );
}

export default function MultipleRows(props) {

  const dispatch = useDispatch();

  const renderFilms = () => {

    return props.arrFilm.slice(0, 30).map((item, index) => {
      return <div className={`${styleSlick['width-item']}`} key={index}  >
        <Film phim={item}/>
      </div>
    })

  }

  const settings = {
    className: "center variable-width",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    swipeToSlide: true,
    speed: 500,
    rows: 1,
    slidesPerRow: 1,
    variableWidth: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  const onChange = (key) => {
  };

  const items = [
    {
      key: '1',
      label: <div className=" font-semibold text-lg" onClick={()=>{
        const action = layDanhSachPhimAction();
         dispatch(action)
      }}>TẤT CẢ PHIM</div>,
      children: ``,
    },
    {
      key: '2',
      label: <div className=" font-semibold text-lg" onClick={() => {
        const action = { type: SET_PHIM_DANG_CHIEU }
         dispatch(action)
      }}>PHIM ĐANG CHIẾU</div>,
      children: ``,
    },
    {
      key: '3',
      label: <div className=" font-semibold text-lg" onClick={() => {
        const action = { type: SET_PHIM_SAP_CHIEU }
         dispatch(action)
      }}>PHIM SẮP CHIẾU</div>,
      children: ``,
    },
    
  ];

  return (
    <div>
      <Tabs defaultActiveKey="1" type="card" items={items} onChange={onChange}/>
      <Slider {...settings}>
        {renderFilms()}
      </Slider>
    </div>
  );
}
