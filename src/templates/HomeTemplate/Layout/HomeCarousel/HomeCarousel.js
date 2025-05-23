import React, { useEffect, useState } from 'react';
import { Carousel } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { PlayCircleOutlined } from '@ant-design/icons';
import { getCarouselAction } from '../../../../redux/actions/CarouselActions';
import { history } from '../../../../App';

const contentStyle = {
    height: '700px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
    backgroundPosition: 'center',
    backgroundSize: '100%',
    backgroundRepeat: 'no-repeat'
};

export default function HomeCarousel(props) {
    const { arrImg } = useSelector(state => state.CarouselReducer);
    console.log('arrImg', arrImg);
    
    const dispatch = useDispatch();

    const { arrFilm } = useSelector(state => state.QuanLyPhimReducer);
    console.log('thông tin nè', arrFilm);

    useEffect(() => {
        dispatch(getCarouselAction)
    }, [])

    const renderImg = () => {
        return arrImg.map((item, index) => {
            console.log('item', item);

            return <div key={index}>
                <div className="relative min-h-[700px]" style={{ ...contentStyle, backgroundImage: `url(${item.hinhAnh})` }}>
                    <img src={item.hinhAnh} className='w-full opacity-0' alt={item.hinhAnh} />
                    <p className='absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer flex text-9xl text-white' onClick={() => {
                        history.push(`/details/${item.maPhim}`)
                    }}><PlayCircleOutlined /></p>
                </div>
            </div>
        })
    }
    return (
        <div>
            <Carousel effect="fade" autoplay autoplaySpeed='50'>
                {renderImg()}
            </Carousel>
        </div>
    )
}
