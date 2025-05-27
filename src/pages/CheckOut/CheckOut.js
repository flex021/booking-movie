import React, { Fragment, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UserOutlined, AliwangwangOutlined, CheckOutlined, HomeOutlined } from '@ant-design/icons';
import './CheckOut.css';
import './CheckOut-Ticket.css';
import { datGheAction, datVeAction, layChiTietPhongVeAction } from '../../redux/actions/QuanLyDatVeActions';
import { ThongTinDatVe } from '../../_core/models/ThongTinDatVe';
import { Tabs } from 'antd';
import { thongTinNguoiDungAction } from '../../redux/actions/QuanLyNguoiDungActions';
import moment from 'moment';
import _ from 'lodash'
import { Tag } from 'antd';
import Swal from 'sweetalert2';
import { CHUYEN_TAB_ACTIVE, RESET_TAB_ACTIVE } from '../../redux/types/QuanLyDatVeType';
import { history } from '../../App';

function CheckOut(props) {
  const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);

  const { chiTietPhongVe, danhSachGheDangDat, danhSachGheKhachDat } = useSelector(state => state.QuanLyDatVeReducer);

  const dispatch = useDispatch();

  const { thongTinPhim, danhSachGhe } = chiTietPhongVe;

  useEffect(() => {
    const action = layChiTietPhongVeAction(props.match.params.id);
    dispatch(action)
    dispatch({
      type: RESET_TAB_ACTIVE,
    });
  }, [])


  const renderSeat = () => {
    return danhSachGhe.map((ghe, index) => {
      let classGheVip = ghe.loaiGhe === 'Vip' ? 'gheVip' : '';
      let classGheDaDat = ghe.daDat === true ? 'gheDaDat' : '';

      let classGheKhachDat = '';
      let indexGheKhachDat = danhSachGheKhachDat.findIndex(gheKD => gheKD.maGhe === ghe.maGhe);
      if (indexGheKhachDat != -1) {
        classGheKhachDat = 'gheKhachDat';
      }

      let classGheDaDuocDat = '';
      if (userLogin.taiKhoan === ghe.taiKhoanNguoiDat) {
        classGheDaDuocDat = 'gheDaDuocDat'
      }

      let classGheDangDat = ''
      let indexGheDD = danhSachGheDangDat.findIndex(gheDD => gheDD.maGhe === ghe.maGhe);
      if (indexGheDD != -1) {
        classGheDangDat = 'gheDangDat';
      }
      return <Fragment key={index}>
        <button onClick={() => {
          const action = datGheAction(ghe, props.match.params.id)
          dispatch(action)
        }} disabled={ghe.daDat || classGheKhachDat !== ''} className={`ghe ${classGheVip} ${classGheDaDat} ${classGheDangDat} ${classGheDaDuocDat} ${classGheKhachDat}`}>{ghe.daDat ? classGheDaDuocDat != '' ? <UserOutlined /> : <p className='text-lg text-black'>X</p> : classGheKhachDat !== '' ? <AliwangwangOutlined className='text-lg' /> : ghe.stt}</button>
        {(index + 1) % 16 === 0 ? <br /> : ''}
      </Fragment>
    })
  }

  return (
    <div className='container mt-5 min-h-screen'>
      <div className='grid grid-cols-12'>
        <div className='col-span-8'>
          <div className='flex flex-col items-center'>


            {/* <div className='TV' /> */}
            <div className='screen text-center pt-3'>Màn hình</div>
            <div className=''>{renderSeat()}</div>
          </div>
        </div>

        <div className='col-span-4'>
          <div className='px-5 py-2 text-center font-medium border bg-white border-b-4 border-l-4 border-black rounded-lg shadow-lg hover:shadow-sm'>
            <h3 className='text-green-400 text-center text-2xl mb-3'>{danhSachGheDangDat.reduce((tongTien, ghe, index) => {
              return tongTien += ghe.giaVe
            }, 0).toLocaleString()}đ</h3>
            <hr />
            <h3 className='text-xl'>{thongTinPhim.tenPhim}</h3>
            <p>Địa điểm: {thongTinPhim.tenCumRap} - {thongTinPhim.tenRap}</p>
            <p>Ngày chiếu: {thongTinPhim.ngayChieu}</p>
            <hr />
            <div className='flex flex-row my-5 text-lg'>
              <div className=' w-3/5 mr-10 font-semibold' >
                <span className='text-green-400 '>Ghế của bạn</span>
                <div className='grid grid-cols-4 gap-y-2'>
                  {_.sortBy(danhSachGheDangDat, ['stt']).map((gheDD, index) => {
                    return <Tag key={index} className='text-sm text-center' color="blue">{gheDD.stt}</Tag>



                  })}
                </div>
              </div>

              <div className='font-semibold'>
                <span className='text-green-400'>Giá</span>
                <div className='text-green-800 '>
                  {danhSachGheDangDat.reduce((tongTien, ghe, index) => {
                    return tongTien += ghe.giaVe
                  }, 0).toLocaleString()}đ
                </div>
              </div>
            </div>
            <hr />
            <div style={{ minHeight: '70px' }} className='my-5'>
              <i>Email</i> <br />
              {userLogin.email}
            </div>
            <hr />
            <div style={{ minHeight: '70px' }}>
              <i>Phone</i> <br />
              {userLogin.soDT}
            </div>
            <hr />
            <div className='mb-0 flex flex-col justify-end items-center' style={{ marginTop: '20px', cursor: ' pointer' }}>
              <div onClick={() => {
                const thongTinDatVe = new ThongTinDatVe();
                thongTinDatVe.maLichChieu = props.match.params.id;
                thongTinDatVe.danhSachVe = danhSachGheDangDat;
                if (thongTinDatVe.danhSachVe.length > 0) {
                  dispatch(datVeAction(thongTinDatVe))
                } else {
                  Swal.fire({
                    title: "Bạn chưa chọn ghế!",
                    icon: "warning"
                  });
                }
              }} className='bg-green-500 hover:bg-green-700 text-white w-full text-center py-3 font-bold text-2xl'>
                ĐẶT VÉ
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className='border-2 w-full my-4' />
      <div className="grid grid-cols-5 gap-2 mb-5 container">
        <div>
          <span className='font-medium text-sm text-white'>
            <span className='ghe p-2'><CheckOutlined className='text-sm' /></span>: Ghế chưa đặt
          </span>
        </div>
        <div>
          <span className='font-medium text-sm text-white'>
            <span className='gheDaDat ghe py-2 px-2.5'><span className='text-sm text-black'>X</span></span>: Ghế đã được đặt
          </span>
        </div>
        <div>
          <span className='font-medium text-sm text-white'>
            <span className='gheVip ghe p-2'><CheckOutlined className='text-sm' /></span>: Ghế VIP
          </span>
        </div>
        <div>
          <span className='font-medium text-sm text-white'>
            <span className='gheDaDuocDat ghe py-2 px-2.5'><UserOutlined className='text-sm' /></span>: Ghế của bạn
          </span>
        </div>
        <div>
          <span className='font-medium text-sm text-white'>
            <span className='gheKhachDat ghe p-2'><AliwangwangOutlined className='text-base' /></span>: Ghế khách đang đặt
          </span>
        </div>
      </div>
    </div>
  )
}





// eslint-disable-next-line import/no-anonymous-default-export
export default function (props) {

  const { tabActive } = useSelector(state => state.QuanLyDatVeReducer)

  const dispatch = useDispatch()

  const items = [
    {
      key: '1',
      label: '01 CHỌN GHẾ & THANH TOÁN',
      children: <CheckOut {...props} />,
    },
    {
      key: '2',
      label: '02 KẾT QUẢ ĐẶT VÉ',
      children: <KetQuaDatVe {...props} />,
    },
  ];

  const OperationsSlot = {
    right: <button className="inline-flex items-center px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium rounded-md" onClick={() => {
      dispatch({
        type: RESET_TAB_ACTIVE, // Reset tabActive về "1"
      });
      history.push('/')
    }}><HomeOutlined className='mr-2' /> Home</button>

  };

  const [position, setPosition] = useState(['left', 'right']);
  const slot = useMemo(() => {
    if (position.length === 0) return null;
    return position.reduce(
      (acc, direction) => ({
        ...acc,
        [direction]: OperationsSlot[direction],
      }),
      {},
    );
  }, [position]);

  //comment
  return <div className="h-screen w-screen overflow-x-hidden" style={{ background: 'url("https://static.vecteezy.com/system/resources/thumbnails/001/227/422/small_2x/cinema-movie-theater-with-blank-screen-and-red-seat.jpg")', backgroundSize: 'cover', backgroundPosition: 'center center' }}>
    <div className='blur-checkout'>
      <Tabs defaultActiveKey="1"
      tabBarStyle={{background: '#FCFCFC', padding: '8px 15px 8px 15px', fontWeight: 500}}
      tabBarExtraContent={slot}
      activeKey={tabActive}
      items={items}
      onChange={(key) => {
        console.log(key);
        dispatch({
          type: CHUYEN_TAB_ACTIVE,
          number: key.toString()
        })

      }} />
    </div>
  </div>
}




function KetQuaDatVe(props) {
  const dispatch = useDispatch();

  const { thongTinNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer);
  console.log('thông tin người dùng', thongTinNguoiDung);


  const renderTicket = () => {
    return _.reverse(thongTinNguoiDung.thongTinDatVe)?.map((ticket, index) => {
      const dayTime = moment(ticket.ngayDat);
      const seats = _.first(ticket.danhSachGhe);

      return <div key={index} className="p-2 lg:w-1/3 md:w-1/2 w-full">
        <div className="h-full flex items-center bg-white border-gray-200 border p-4 rounded-lg">
          <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={ticket.hinhAnh} />
          <div className="flex-grow">
            <p className="text-gray-900 mb-2 text-xl title-font">{ticket.tenPhim}</p>
            <p className="text-gray-700">Giờ chiếu: <span className='font-bold'>{dayTime.format('hh:mm A')}</span> - Ngày chiếu: <span className='font-bold'>{dayTime.format('DD-MM-YYYY')}</span></p>
            <p>Địa điểm: {seats.tenHeThongRap}</p>
            <p><span className='font-bold'>{seats.tenRap}</span> - Ghế: {_.sortBy(ticket.danhSachGhe, ['tenGhe'])?.map((ghe, index) => {
              return <Tag key={index} className='text-sm mb-2' color="blue">{ghe.tenGhe}</Tag>

            })}</p>
          </div>
        </div>
      </div>
    })
  }

  useEffect(() => {
    const action = thongTinNguoiDungAction()
    dispatch(action)
  }, [])

  return <div>
    <section className="text-gray-600 body-font">
      <div className="container px-5 pb-20 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Lịch sử đặt vé của bạn</h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Hãy xem thông tin, địa điểm và thời gian để xem phim vui vẻ bạn nhé!</p>
        </div>
        <div className="flex flex-wrap -m-2">
          {renderTicket()}
        </div>
      </div>
    </section>

  </div>
}