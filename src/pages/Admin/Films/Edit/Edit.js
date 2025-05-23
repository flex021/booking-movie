import React, { useEffect, useState } from 'react';
import {

    Form,
    Input,
    InputNumber,
    Switch,
} from 'antd';
import { useFormik } from 'formik';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from 'dayjs'
import { GROUPID } from '../../../../util/settings/config';
import { useDispatch, useSelector } from 'react-redux';
import { capNhatPhimUploadAction, layThongTinPhimAction } from '../../../../redux/actions/QuanLyPhimActions';

export default function Edit(props) {
    const [componentSize, setComponentSize] = useState('default');
    const [ImgSrc, setImgSrc] = useState('');

    const [startDate, setStartDate] = useState(new Date());

    const dispatch = useDispatch();

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };



    const { thongTinPhim } = useSelector(state => state.QuanLyPhimReducer);
    

    useEffect(() => {
        let { id } = props.match.params;
        dispatch(layThongTinPhimAction(id))
    }, [])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            maPhim: thongTinPhim.maPhim,
            tenPhim: thongTinPhim.tenPhim,
            trailer: thongTinPhim.trailer,
            moTa: thongTinPhim.moTa,
            ngayKhoiChieu: dayjs(thongTinPhim.ngayKhoiChieu).format('DD/MM/YYYY'),
            dangChieu: thongTinPhim.dangChieu,
            sapChieu: thongTinPhim.sapChieu,
            hot: thongTinPhim.hot,
            danhGia: thongTinPhim.danhGia,
            maNhom: GROUPID,
            hinhAnh: null //để hình ảnh = null là khi mình ko thay đổi nó thì khi gửi về backend thì nó sẽ ko cập nhật và vẫn giữ hình cũ
        },
        onSubmit: (values) => {
            console.log('values đây', values);
            values.maNhom = GROUPID

            let formData = new FormData();
            for (let key in values) {
                if (key !== 'hinhAnh') {
                    formData.append(key, values[key])
                } else {
                    if (values.hinhAnh !== null) {
                        formData.append('File', values.hinhAnh, values.hinhAnh.name)

                    }
                }
            }
            dispatch(capNhatPhimUploadAction(formData))
        }
    })

    const handleChangeDatePicker = (value) => {
        const ngayKhoiChieu = dayjs(value).format('DD/MM/YYYY')
        formik.setFieldValue('ngayKhoiChieu', ngayKhoiChieu)
        console.log('value nè', ngayKhoiChieu);
    }

    const handleChangeSwitch = (name) => {
        return (value) => {
            formik.setFieldValue(name, value)
        }
    }

    const handleChangeFile = async (e) => {
        let file = e.target.files[0];
        if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/gif') {
            await formik.setFieldValue('hinhAnh', file)
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                setImgSrc(e.target.result)
            }
        }

    }

    return (
        <div>
            <div>
                <h3 className='text-3xl mb-5 text-center'>Cập nhật phim</h3>
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
                            <Input name='tenPhim' onChange={formik.handleChange} value={formik.values.tenPhim} />
                        </Form.Item>
                        <Form.Item label="Trailer">
                            <Input name='trailer' onChange={formik.handleChange} value={formik.values.trailer} />
                        </Form.Item>
                        <Form.Item label="Mô tả">
                            <Input name='moTa' onChange={formik.handleChange} value={formik.values.moTa} />
                        </Form.Item>
                        <Form.Item label="Ngày khởi chiếu">
                            <DatePicker
                                showIcon
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                value={formik.values?.ngayKhoiChieu}
                                onSelect={handleChangeDatePicker}
                            />

                        </Form.Item>
                        <Form.Item label="Đang chiếu" >
                            <Switch onChange={handleChangeSwitch('dangChieu')} checked={formik.values.dangChieu} />
                        </Form.Item>
                        <Form.Item label="Sắp chiếu" >
                            <Switch onChange={handleChangeSwitch('sapChieu')} checked={formik.values.sapChieu} />
                        </Form.Item>
                        <Form.Item label="HOT">
                            <Switch onChange={handleChangeSwitch('hot')} checked={formik.values.hot} />
                        </Form.Item>
                        <Form.Item label="Số sao">
                            <InputNumber min={1} max={10} onChange={handleChangeSwitch('danhGia')} value={formik.values.danhGia} />
                        </Form.Item>
                        <Form.Item label="Hình ảnh">
                            <Input type='file' onChange={handleChangeFile} />
                            <br />
                            <img src={ImgSrc === '' ? thongTinPhim.hinhAnh : ImgSrc} alt='...' style={{ width: 150, height: 150 }} accept='image/png, image/jpeg, image/gif, image/jpg' />
                        </Form.Item>
                        <div className='flex justify-center'>
                            <button type='submit' className='bg-blue-500 rounded-lg hover:bg-blue-600 text-white p-2 px-4'>Cập nhật</button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}
