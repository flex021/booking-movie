import React, { useEffect, useState } from 'react'
import { Button, DatePicker, Form, InputNumber, Select, Space } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { quanLyRapService } from '../../../services/QuanLyRapService';
import { useFormik } from 'formik';
import { quanLyDatVeService } from '../../../services/QuanLyDatVeService';
import { history } from '../../../App';
import { ERROR1 } from '../../../util/settings/config';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';

export default function ShowTime(props) {


  const [state, setState] = useState({
    heThongRapChieu: [],
    cumRapChieu: []
  })

  const formik = useFormik({
    initialValues: {
      maPhim: props.match.params.id,
      ngayChieuGioChieu: '',
      maRap: '',
      giaVe: ''
    },
    onSubmit: async (value) => {
      try {
        let result = await quanLyDatVeService.taoLichChieu(value)
        Swal.fire({
          title: "Tạo lịch chiếu thành công!",
          icon: "success"
        });
        history.push('/admin/films')
      } catch (err) {
        if (err.response.status === ERROR1) {
          Swal.fire({
            title: "Thiếu thông tin kìa má!",
            icon: "warning"
          });
        }
      }
    }
  })


  useEffect(() => {
    const layThongTin = async () => {
      try {
        let result = await quanLyRapService.layThongTinHeThongRap();

        setState({
          ...state,
          heThongRapChieu: result.data.content
        })
      } catch (err) {

      }
    }
    layThongTin();
  }, [])


  const optionHeThongRap = () => {
    return state.heThongRapChieu?.map((htr, index) => (
      { label: htr.tenHeThongRap, value: htr.tenHeThongRap }
    )
    )
  }

  const optionCumRap = () => {
    return state.cumRapChieu?.map((cumRap, index) => (
      { label: cumRap.tenCumRap, value: cumRap.maCumRap }
    ))
  }


  const onChangeHeThongRap = async (value) => {
    try {
      let result = await quanLyRapService.layThongTinCumRap(value)
      setState({
        ...state,
        cumRapChieu: result.data.content
      })
    } catch (err) {
      console.log('err', err.response?.data);
    }
  }

  const onChangeCumRap = (value) => {
    formik.setFieldValue('maRap', value)
    console.log('value cum rap', value);
  };

  const onChangeDatePicker = (value) => {
    formik.setFieldValue('ngayChieuGioChieu', dayjs(value).format('DD/MM/YYYY HH:mm:ss'))
  };

  const onOk = (value) => {
    formik.setFieldValue('ngayChieuGioChieu', dayjs(value.$d).format('DD/MM/YYYY HH:mm:ss'))
  };

  const onChangeInputNumber = (value) => {
    formik.setFieldValue('giaVe', value)
  };


  let film = {}
  if (localStorage.getItem('filmParams')) {
    film = JSON.parse(localStorage.getItem('filmParams'))
  }


  return (
    <div className='flex justify-center'>
      <Form
        onSubmitCapture={formik.handleSubmit}
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
      >

        <h3 className='text-3xl mb-10 text-center'>Tạo lịch chiếu - {props.match.params.tenphim}</h3>
        <div className='flex justify-center mb-5'>
          <img src={film.hinhAnh} alt='...' width={100} height={200} />
        </div>

        <Form.Item label='Hệ thống rạp'>
          <Select options={optionHeThongRap()} onChange={onChangeHeThongRap} placeholder="Chọn hệ thống rạp" />
        </Form.Item>

        <Form.Item label='Cụm rạp'>
          <Select options={optionCumRap()} onChange={onChangeCumRap} placeholder="Chọn cụm rạp" />
        </Form.Item>

        <Form.Item label='Ngày - giờ chiếu'>
          <Space direction="vertical" size={12}>
            <DatePicker format="DD/MM/YYYY hh:mm:ss" placeholder="Chọn thời gian" showTime
              onChange={onChangeDatePicker}
              onOk={onOk}
            />
          </Space>
        </Form.Item>

        <Form.Item label='Giá vé'>
          <InputNumber min={75000} max={150000} defaultValue={0} onChange={onChangeInputNumber} />
        </Form.Item>

        <Form.Item label={<ArrowRightOutlined />}>
          <Button htmlType='submit'>Tạo lịch chiếu</Button>
        </Form.Item>

      </Form >
    </div>
  )
}

