import React, { useEffect } from 'react'
import {
  Form,
  Input,
} from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { GROUPID } from '../../../../util/settings/config';
import { danhSachLoaiNguoiDungAction, themNguoiDungAction } from '../../../../redux/actions/QuanLyNguoiDungActions';

export default function EditUsers(props) {

  const [componentSize, setComponentSize] = useState('default');

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const dispatch = useDispatch()

  const {  loaiNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer)

useEffect (() =>{
    dispatch(danhSachLoaiNguoiDungAction())
},[])


  const phoneRegExp = /^[0-9]*$/
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taikhoan: '',
      matKhau: '',
      email: '',
      soDt: '',
      maLoaiNguoiDung: loaiNguoiDung[0]?.maLoaiNguoiDung,
      hoTen: '',
      maNhom: GROUPID
    },
    validationSchema: Yup.object().shape({
      matKhau: Yup.string()
        .required('Nhập mật khẩu!')
        .nullable(),
      hoTen: Yup.string()
        .required('Nhập họ tên!')
        .nullable(),
      email: Yup.string()
        .required('Nhập email!')
        .email('Email không hợp lệ!')
        .nullable(),
      soDt: Yup.string()
        .required('Nhập số điện thoại!')
        .matches(phoneRegExp, 'Số điện thoại chỉ có thể nhập số!')
        .nullable(),
    }),
    onSubmit: (values) => {
        dispatch(themNguoiDungAction(values))
    }
  })

  return (
    <div className='pt-24'>
      <h1 className='text-center my-5 text-2xl'>Thêm mới người dùng</h1>
      <Form
        onSubmitCapture={formik.handleSubmit}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
        style={{
          maxWidth: 600,
        }}
        className='block m-auto'
      >
        <Form.Item label="Họ tên">
          <Input name='hoTen' onChange={formik.handleChange} />
          <p className='text-red-600'>{formik.errors.hoTen && formik.touched.hoTen
            ? formik.errors.hoTen
            : null}</p>
        </Form.Item>
        <Form.Item label="Email">
          <Input name='email' onChange={formik.handleChange} />
          <p className='text-red-600'>{formik.errors.email && formik.touched.email
            ? formik.errors.email
            : null}</p>
        </Form.Item>
        <Form.Item label="Số ĐT">
          <Input name='soDt' onChange={formik.handleChange} />
          <p className='text-red-600'>{formik.errors.soDt && formik.touched.soDt
            ? formik.errors.soDt
            : null}</p>
        </Form.Item>
        <Form.Item label="Tài khoản">
          <Input name='taiKhoan' onChange={formik.handleChange} />
          <p className='text-red-600'>{formik.errors.taikhoan && formik.touched.taikhoan
            ? formik.errors.taikhoan
            : null}</p>
        </Form.Item>
        <Form.Item label="Mật khẩu">
          <Input.Password name='matKhau' onChange={formik.handleChange} />
          <p className='text-red-600'>{formik.errors.matKhau && formik.touched.matKhau
            ? formik.errors.matKhau
            : null}</p>
        </Form.Item>
        <Form.Item label="Người dùng">
          <select
            className='w-2/4 py-1 px-2 border rounded-md'
            name='maLoaiNguoiDung'
            onChange={formik.handleChange}
          >
            {loaiNguoiDung?.map((item, index) => {
              return <option
                key={index}
                value={item.maLoaiNguoiDung}
              >
                {item.tenLoai}
              </option>
            })}
          </select>
        </Form.Item>
        <button type='submit' className='bg-blue-500 hover:bg-blue-600 ml-56 mb-5 text-white py-2 px-5 rounded'>Thêm mới</button>
      </Form>
    </div>
  )
}
