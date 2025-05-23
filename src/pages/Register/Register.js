import React from 'react'
import { NavLink } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { useFormik } from 'formik';
import { dangKyAction } from '../../redux/actions/QuanLyNguoiDungActions';
import * as Yup from 'yup';
import { GROUPID } from '../../util/settings/config';

export default function Register(props) {

  const dispatch = useDispatch()

  const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;

  const validationSchema = Yup.object().shape({
    taiKhoan: Yup.string()
      .required("Nhập tài khoản!")
      .min(6, "Tài khoản ít nhất 6 kí tự!")
      .max(40, "Tài khoản không được vượt quá 40 kí tự!"),

    matKhau: Yup.string()
      .required("Nhập vào mật khẩu!")
      .min(6, "Mật khẩu ít nhất 6 kí tự!")
      .max(40, "Mật khẩu không được vượt quá 40 kí tự!"),

    email: Yup.string().required("Nhập vào email!").email("Email không hợp lệ!"),

    soDt: Yup.string().required('Nhập vào số điện thoại!').matches(phoneRegex, 'Số điện thoại không hợp lệ!'),

    hoTen: Yup.string()
      .required("Nhập vào họ tên!")
      .max(20, "Họ tên không được vượt quá 20 kí tự!"),
  });

  const formik = useFormik({
    initialValues: {
      taiKhoan: '',
      matKhau: '',
      email: '',
      soDt: '',
      maNhom: GROUPID,
      hoTen: ''
    },
    validationSchema,
    onSubmit: values => {
      const action = dangKyAction(values);
      dispatch(action)
    },
  })

  return (
    <form className='formLogin' onSubmit={formik.handleSubmit}>
      <h3>ĐĂNG KÝ</h3>

      <input type="text" className='inputFix' placeholder="Tài khoản" name="taiKhoan" onChange={formik.handleChange} />
      <p className='text-red-600'>{formik.errors.taiKhoan && formik.touched.taiKhoan
        ? formik.errors.taiKhoan
        : null}</p>

      <input type="password" className='inputFix' placeholder="Mật khẩu" name="matKhau" onChange={formik.handleChange} />
      <p className='text-red-600'>{formik.errors.matKhau && formik.touched.matKhau
        ? formik.errors.matKhau
        : null}</p>

      <input type="email" className='inputFix' placeholder="Email" name="email" onChange={formik.handleChange} />
      <p className='text-red-600'>{formik.errors.email && formik.touched.email
        ? formik.errors.email
        : null}</p>

      <input className='inputFix' placeholder="Số điện thoại" name="soDt" onChange={formik.handleChange} />
      <p className='text-red-600'>{formik.errors.soDt && formik.touched.soDt
        ? formik.errors.soDt
        : null}</p>

      <input type="text" className='inputFix' placeholder="Họ tên" name="hoTen" onChange={formik.handleChange} />
      <p className='text-red-600'>{formik.errors.hoTen && formik.touched.hoTen
        ? formik.errors.hoTen
        : null}</p>

      <button className='login' type="submit">Đăng ký</button>
      <div className="text-center mt-4 text-sm">
        Bạn đã có tài khoản ? <NavLink to='/login' className="no-underline hover:underline text-blue-400 cursor-pointer" >
          Đăng nhập
        </NavLink>
      </div>
    </form>
  )
}
