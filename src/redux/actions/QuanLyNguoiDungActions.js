import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDungService"
import { DANG_NHAP_ACTION, LAY_DANH_SACH_LOAI_NGUOI_DUNG, LAY_DANH_SACH_LOAI_NGUOI_DUNG_SEARCH, LAY_DANH_SACH_NGUOI_DUNG, THONG_TIN_NGUOI_DUNG } from "../types/QuanLyNguoiDungType";
import { history } from '../../App'
import { DISPLAY_LOADING_ACTION, HIDE_LOADING_ACTION } from "./LoadingActions";
import { ERROR1, ERROR2, ERROR3, SUCCESS } from "../../util/settings/config";
import Swal from 'sweetalert2';

export const dangNhapAction = (thongTinDangNhap) => {
    return async (dispatch) => {
        try {
            dispatch(DISPLAY_LOADING_ACTION)
            const result = await quanLyNguoiDungService.dangNhap(thongTinDangNhap);
            if (result.data.statusCode === SUCCESS) {
                dispatch({
                    type: DANG_NHAP_ACTION,
                    thongTinDangNhap: result.data.content
                })
                if (localStorage.getItem('lastVisitedDetailPage')) {
                    history.push(`${localStorage.getItem('lastVisitedDetailPage')}`);
                    localStorage.removeItem('lastVisitedDetailPage');
                } else {
                    history.push('/')
                }
            }
            Swal.fire({
                title: "Đăng nhập thành công!",
                icon: "success"
            });
        } catch (err) {
            if (err.response.status === ERROR2) {
                Swal.fire({
                    title: err.response.data.content,
                    icon: "error"
                });
            }
        }
        dispatch(HIDE_LOADING_ACTION)
    }
}

export const dangKyAction = (thongTinDangKy) => {
    return async (dispatch) => {
        try {
            dispatch(DISPLAY_LOADING_ACTION)
            const result = await quanLyNguoiDungService.dangKy(thongTinDangKy);
            Swal.fire({
                title: "Đăng ký tài khoản thành công!",
                text: 'Hãy đăng nhập để vào đặt vé nhé!',
                icon: "success"
            });
            history.push('/login')

        } catch (err) {
            if (err.response.status === ERROR1) {
                Swal.fire({
                    title: err.response.data.content,
                    icon: "error"
                });
            }
        }
        dispatch(HIDE_LOADING_ACTION)
    }
}


export const thongTinNguoiDungAction = () => {
    return async (dispatch) => {
        try {
            await dispatch(DISPLAY_LOADING_ACTION)
            const result = await quanLyNguoiDungService.lichSuDatVe()
            if (result.data.statusCode === 200) {
                dispatch({
                    type: THONG_TIN_NGUOI_DUNG,
                    thongTinNguoiDung: result.data.content
                })
            }
        } catch (err) {
        }
        await dispatch(HIDE_LOADING_ACTION)

    }
}

export const danhSachNguoiDungAction = (tuKhoa = '') => {
    return async (dispatch) => {
        try {
            // await dispatch(DISPLAY_LOADING_ACTION)
            const result = await quanLyNguoiDungService.danhSachNguoiDung(tuKhoa);
            if (result.data.statusCode === 200) {
                dispatch({
                    type: LAY_DANH_SACH_NGUOI_DUNG,
                    danhSachNguoiDung: result.data.content
                })
            }
        } catch (err) {

        }
        // await dispatch(HIDE_LOADING_ACTION)

    }
}

export const danhSachNguoiDungActionSearch = (tuKhoa = '') => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.danhSachNguoiDung(tuKhoa);
            if (result.data.statusCode === 200) {
                dispatch({
                    type: LAY_DANH_SACH_LOAI_NGUOI_DUNG_SEARCH,
                    danhSachNguoiDungSearch: result.data.content
                })
            }
        } catch (err) {

        }

    }
}

export const danhSachLoaiNguoiDungAction = () => {
    return async (dispatch) => {
        try {
            await dispatch(DISPLAY_LOADING_ACTION)
            const result = await quanLyNguoiDungService.danhSachLoaiNguoiDung();
            if (result.data.statusCode === 200) {
                dispatch({
                    type: LAY_DANH_SACH_LOAI_NGUOI_DUNG,
                    loaiNguoiDung: result.data.content
                })
            }
        } catch (err) {

        }
        await dispatch(HIDE_LOADING_ACTION)

    }
}

export const capNhatThongTinNguoiDungAction = (thongTin) => {
    return async (dispatch) => {
        try {
            await dispatch(DISPLAY_LOADING_ACTION)
            const result = await quanLyNguoiDungService.capNhatThongTinNguoiDung(thongTin);
            Swal.fire({
                title: "Cập nhật thành công!",
                icon: "success"
            });
            history.goBack()

        } catch (err) {
            Swal.fire({
                title: err.response?.data.content,
                icon: "error"
            });
        }
        await dispatch(HIDE_LOADING_ACTION)
    }
}


export const xoaNguoiDungAction = (taiKhoan) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.xoaNguoiDung(taiKhoan);
            Swal.fire({
                title: "Xóa thành công!",
                icon: "success"
            });
            await dispatch(danhSachNguoiDungAction())
        } catch (err) {
            if (err.response?.status === ERROR3) {
                Swal.fire({
                    title: err.response?.data.content,
                    icon: "error"
                });
            }
        }
    }
}

export const themNguoiDungAction = (thongTin) =>{
    return async (dispatch) =>{
        try{
            const result = await quanLyNguoiDungService.themNguoiDung(thongTin);
            Swal.fire({
                title: "Thêm thành công!",
                icon: "success"
            });
            dispatch(danhSachNguoiDungAction())
            history.push('/admin/users')
        }catch(err){
            if(err.response.status === ERROR3){
                Swal.fire({
                    title: err.response?.data.content,
                    icon: "error"
                });
            }
        }
    }
}