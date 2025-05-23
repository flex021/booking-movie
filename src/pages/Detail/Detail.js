import React, { useEffect, useState } from 'react'
import { CustomCard } from '@tsamantanis/react-glassmorphism'
import '@tsamantanis/react-glassmorphism/dist/index.css'
import '../../assets/styles/circle.css'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { NavLink } from 'react-router-dom'
import { Tabs, Collapse, Tag } from 'antd';
import { layThongTinChiTietPhim } from '../../redux/actions/QuanLyRapActions'
import _ from 'lodash'
import { history } from '../../App'
import { USER_LOGIN } from '../../util/settings/config'
import { Modal } from 'antd';
import ReactPlayer from 'react-player'

export default function Detail(props) {

  const { filmDetail } = useSelector(state => state.QuanLyPhimReducer)
  console.log('detail film', filmDetail);
  

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const dispatch = useDispatch();

  const [tabPosition, setTabPosition] = useState('left');

  const { Panel } = Collapse;

  const items = [
    {
      key: '1',
      label: `Lịch chiếu`,
      children: <Tabs
        tabPosition={tabPosition}
        items={filmDetail.heThongRapChieu?.map((rap, index) => {
          const id = String(index + 1);
          return {
            label: <div key={index}>
              <img style={{ width: '50px', height: '50px' }} src={rap.logo} alt={rap.logo} />
            </div>,
            key: id,
            children: <div>
              {rap.cumRapChieu?.map((cumRap, index) => {
                console.log('cụm rạp', cumRap);
                
                return <div key={index} className='mb-4'>
                  <Collapse>
                    <Panel
                      header={cumRap.tenCumRap}>
                      <div className='flex'>
                        <img style={{ width: '50px', height: '50px', marginRight: '20px' }} src={cumRap.hinhAnh} alt={cumRap.tenCumRap} />
                        <div className='grid grid-cols-5 gap-4'>
                          {_.sortBy(cumRap.lichChieuPhim, ['ngayChieuGioChieu'])?.map((lich, index) => {
                            if (localStorage.getItem(USER_LOGIN)) {
                              return <NavLink to={`/checkout/${lich.maLichChieu}`} key={index} className='date-time border-2 border-solid border-blue-400 text-blue-400 hover:text-blue-600 py-2 px-3.5 rounded-md text-lg'>
                                {moment(lich.ngayChieuGioChieu).format('hh:mm A')}
                              </NavLink>
                            } else {
                              return <NavLink to={`/checkout/${lich.maLichChieu}`} key={index} className='date-time border-2 border-solid border-blue-400 text-blue-400 hover:text-blue-600 py-2 px-3.5 rounded-md text-lg' onClick={() => {
                                localStorage.setItem('lastVisitedDetailPage', history.location.pathname);
                                history.push('/login')
                              }}>
                                {moment(lich.ngayChieuGioChieu).format('hh:mm A')}
                              </NavLink>
                            }

                          })}
                        </div>
                      </div>

                    </Panel>
                  </Collapse>
                </div>
              })}
            </div>,
          };
        })}
      />
    },
    {
      key: '2',
      label: `Thông tin`,
      children: `Chưa có thông tin!`,
    },
    {
      key: '3',
      label: `Đánh giá`,
      children: `Chưa có đánh giá!`,
    },
  ]


  useEffect(() => {
    let { id } = props.match.params;
    dispatch(layThongTinChiTietPhim(id))
  }, [])

  return (
    <div style={{ backgroundImage: `url(${filmDetail.hinhAnh})`, backgroundSize: '100%', backgroundPosition: 'center', minHeight: '100vh' }}>
      <CustomCard
        style={{ paddingTop: '150px', minHeight: '150vh' }}
        effectColor="#fff" // required
        color="#fff" // default color is white
        blur={10} // default blur value is 10px
        borderRadius={0} // default border radius value is 10px
      >
        <div className='container'>
          <div className='grid grid-cols-12 p-6 rounded-xl' style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className='col-span-2 col-start-2'>
              <div className='mr-5'>
                <img src={filmDetail.hinhAnh} alt='123' />
              </div>
            </div>
            <div className='col-span-4'>
              <p className='text-3xl mb-4 font-semibold'>{filmDetail.tenPhim}</p>
              <p className='text-lg'>Nội dung phim</p>
              <hr className='my-2 font-semibold border-gray-400' style={{ width: '15%' }} />
              <p className='text-gray-400 mb-3'>{filmDetail.moTa}</p>
              <div className='flex justify-between'>
                <div>Ngày chiếu: {moment(filmDetail.ngayKhoiChieu).format('DD.MM.YYYY')}</div>
                <button className='text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900' onClick={showModal}>Trailer</button>

                {isModalOpen ? <Modal width={690} title={filmDetail.tenPhim} footer={null} open={isModalOpen} onCancel={handleCancel}>
                  <ReactPlayer
                    url={filmDetail.trailer}
                    controls={true}
                  />
                </Modal> : false}

              </div>


            </div>
            <div className='col-start-9 col-span-2'>
              <div className={`c100 p${filmDetail.danhGia * 10} big`}>

                <span>{filmDetail.danhGia * 10}%</span>
                <div className="slice">
                  <div className="bar"></div>
                  <div className="fill"></div>
                </div>
              </div>
              <div className=''>
                <span>Đánh giá: </span>
                <span><Tag color="#f50" className='text-xl'>{filmDetail.danhGia}/10</Tag></span>
              </div>
            </div>
          </div>
          <div>
          </div>
          <div className='mt-20 '>
            <Tabs
              className='font-medium rounded-xl'
              defaultActiveKey="1"
              items={items}
              style={{ backgroundColor: 'white', padding: '10px', minHeight: '400px' }}
            />

          </div>
        </div>
      </CustomCard>
    </div>
  )
}
