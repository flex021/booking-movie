import React, { useState } from 'react'
import { PlayCircleOutlined } from '@ant-design/icons';
import './FilmEffectHover.css';
import { NavLink } from 'react-router-dom';
import { Modal } from 'antd';
import ReactPlayer from 'react-player'

export default function Film(props) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const { phim } = props;
  
  return (
    <div>
      <div className="ui-card mb-4 rounded-lg shadow-2xl">
        <div className='img-film' style={{ backgroundImage: `url(${phim.hinhAnh})`, backgroundPosition: 'center', backgroundSize: '100%, 100%' }}>
          <img src={phim.hinhAnh} alt={phim.hinhAnh} className='opacity-0 w-full' style={{ height: '400px' }} />
        </div>
        <div className="description">

          <p className='cursor-pointer mb-10 text-6xl text-white' onClick={showModal}><PlayCircleOutlined /></p>

          {isModalOpen ? <Modal width={690} title={phim.tenPhim} footer={null} open={isModalOpen} onCancel={handleCancel}>
            <ReactPlayer
              url={phim.trailer}
              controls={true}
            />
          </Modal> : false}

          <h2>{phim.tenPhim}</h2>
          <NavLink to={`/details/${phim.maPhim}`}>ĐẶT VÉ</NavLink>
        </div>
      </div>
    </div>
  )
}
