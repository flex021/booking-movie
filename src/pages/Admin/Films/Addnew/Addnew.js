import React, { useState } from 'react';
import { HomeOutlined } from '@ant-design/icons';
import {
    DatePicker,
    Form,
    Input,
    InputNumber,
    Switch,
} from 'antd';
import { history } from '../../../../App';
import { useFormik } from 'formik';
import dayjs from 'dayjs';
import { GROUPID } from '../../../../util/settings/config';
import { useDispatch } from 'react-redux';
import { themPhimUploadHinhAction } from '../../../../redux/actions/QuanLyPhimActions';

export default function Addnew(props) {
    const [componentSize, setComponentSize] = useState('default');
    const [ImgSrc, setImgSrc] = useState('');

    const dispatch = useDispatch();

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };

    const formik = useFormik({
        initialValues: {
            tenPhim: '',
            trailer: '',
            moTa: '',
            ngayKhoiChieu: '',
            dangChieu: false,
            sapChieu: false,
            hot: false,
            danhGia: 0,
            hinhAnh: {}
        },
        onSubmit: (values) => {
            
            values.maNhom = GROUPID

            let formData = new FormData();
            for (let key in values) {
                if (key !== 'hinhAnh') {
                    formData.append(key, values[key])
                } else {
                    formData.append('File', values.hinhAnh, values.hinhAnh.name)
                }
            }

            dispatch(themPhimUploadHinhAction(formData))
        }
    })

    const handleChangeDatePicker = (value) => {
        const ngayKhoiChieu = dayjs(value).format('DD/MM/YYYY')
        formik.setFieldValue('ngayKhoiChieu', ngayKhoiChieu)
    }

    const handleChangeSwitch = (name) => {
        return (value) => {
            formik.setFieldValue(name, value)
        }
    }

    const handleChangeFile = (e) => {
        let file = e.target.files[0];
        if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/gif') {

            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                setImgSrc(e.target.result)
            }
            formik.setFieldValue('hinhAnh', file)
        }

    }

    return (
        <div>
            <div>
                <h3 className='text-3xl mb-5'>Thêm phim mới</h3>
                <div className='flex justify-center'>
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
                            width: 600,
                        }}
                    >
                        <Form.Item label="Tên phim">
                            <Input name='tenPhim' onChange={formik.handleChange} />
                        </Form.Item>
                        <Form.Item label="Trailer">
                            <Input name='trailer' onChange={formik.handleChange} />
                        </Form.Item>
                        <Form.Item label="Mô tả">
                            <Input name='moTa' onChange={formik.handleChange} />
                        </Form.Item>
                        <Form.Item label="Ngày khởi chiếu">
                            <DatePicker format={"DD/MM/YYYY"}
                                onChange={handleChangeDatePicker}
                            />
                        </Form.Item>
                        <Form.Item label="Đang chiếu" >
                            <Switch onChange={handleChangeSwitch('dangChieu')} />
                        </Form.Item>
                        <Form.Item label="Sắp chiếu" >
                            <Switch onChange={handleChangeSwitch('sapChieu')} />
                        </Form.Item>
                        <Form.Item label="HOT">
                            <Switch onChange={handleChangeSwitch('hot')} />
                        </Form.Item>
                        <Form.Item label="Số sao">
                            <InputNumber min={1} max={10} onChange={handleChangeSwitch('danhGia')} />
                        </Form.Item>
                        <Form.Item label="Hình ảnh">
                            <Input type='file' onChange={handleChangeFile} />
                            <br />
                            <img src={ImgSrc} alt='...' style={{ width: 150, height: 150 }} accept='image/png, image/jpeg, image/gif, image/jpg' />
                        </Form.Item>
                        <div className='flex justify-center'>
                            <button type='submit' className='bg-blue-500 rounded-lg hover:bg-blue-600 text-white p-2 px-4'>Thêm phim</button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}
