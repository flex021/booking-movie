import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import '../Profile/Profile.css'
import { USER_LOGIN } from '../../util/settings/config'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import Swal from 'sweetalert2';
import { Tag, Drawer } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { thongTinNguoiDungAction } from '../../redux/actions/QuanLyNguoiDungActions';
import moment from 'moment';
import _ from 'lodash';
import { history } from '../../App';


export default function Profile(props) {

    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState('bottom');
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
 

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(thongTinNguoiDungAction())
    }, [])

    const { thongTinNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer)
    console.log('thông tin', thongTinNguoiDung);

    if (!localStorage.getItem(USER_LOGIN)) {
        Swal.fire({
            title: "Đăng nhập để vào trang này!",
            icon: "warning"
        });
        return <Redirect to='/' />
    }

    const renderTicket = () => {
        return _.reverse(thongTinNguoiDung.thongTinDatVe)?.map((ticket, index) => {
            const dayTime = moment(ticket.ngayDat);
            const seats = _.first(ticket.danhSachGhe);

            return <div key={index} className="p-2">
                <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
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

    return (
        <div className='bg-[#FDFCF0]'>
            <div className="container pt-20">
                <div className='profile-card my-5'>
                    <div className="profile-details">
                        <div className="intro mb-5">
                            <h2 className='text-2xl'>{thongTinNguoiDung.hoTen}</h2>
                            <h4>{thongTinNguoiDung.loaiNguoiDung == 'Quản trị' ? <Tag className='text-sm' color="red">{thongTinNguoiDung.loaiNguoiDung}</Tag> : <Tag className='text-sm' color="green">{thongTinNguoiDung.loaiNguoiDung}</Tag>}</h4>
                        </div>
                        <div className="contact-info">
                            <div className="row">
                                <div className="icon">
                                    <UserOutlined />
                                </div>
                                <div className="content">
                                    <span>Tài khoản</span>
                                    <h5>{thongTinNguoiDung.taiKhoan}</h5>
                                </div>
                            </div>
                            <div className="row">
                                <div className="icon">
                                    <MailOutlined />
                                </div>
                                <div className="content">
                                    <span>Email</span>
                                    <h5>{thongTinNguoiDung.email}</h5>
                                </div>
                            </div>
                            <div className="row">
                                <div className="icon">
                                    <PhoneOutlined />
                                </div>
                                <div className="content">
                                    <span>Số điện thoại</span>
                                    <h5>{thongTinNguoiDung.soDT}</h5>
                                </div>
                            </div>
                        </div>
                        <div>
                            <button className="download-btn mr-2" onClick={() => {
                                history.push(`/profile/editprofile/${thongTinNguoiDung.taiKhoan}`)
                            }}> Chỉnh sửa</button>

                            <button className="download-btn" onClick={showDrawer}>Vé của bạn</button>
                        </div>
                    </div>
                </div>
                <div>
                    <Drawer
                        placement={placement}
                        closable={false}
                        onClose={onClose}
                        open={open}
                        key={placement}
                        height={500}
                    >
                        <div className='grid grid-cols-3'>{renderTicket()}</div>
                    </Drawer>
                </div>
            </div>
        </div>
    )
}

