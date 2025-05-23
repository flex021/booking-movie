import React from 'react'
import { NavLink } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import './Login.css'
import { useFormik } from 'formik';
import { dangNhapAction } from '../../redux/actions/QuanLyNguoiDungActions';

export default function Login(props) {

  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      taiKhoan: '',
      matKhau: '',
    },
    onSubmit: values => {
      const action = dangNhapAction(values)
      dispatch(action)
    },
  })

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className='formLogin' >
      <h3>ĐĂNG NHẬP</h3>
      <label className='labelLogin' htmlFor="username">Tài khoản</label>
      <input className='inputFix' type="text" placeholder="Tài khoản" name="taiKhoan" onChange={formik.handleChange}/>
      

      <label className='labelLogin' htmlFor="password">Mật khẩu</label>
      <input className='inputFix' type="password" placeholder="Mật khẩu" name="matKhau" onChange={formik.handleChange}/>


      <button className='login' type="submit">Đăng nhập</button>
      <div className="text-center mt-4 text-sm">
        Bạn chưa có tài khoản ? <NavLink to='/register' className="no-underline hover:underline text-blue-400 cursor-pointer" >
          Đăng ký
        </NavLink>
      </div>
    </form>
    </div>
  )
}
