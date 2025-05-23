import { history } from "../../App";
import { quanLyPhimService } from "../../services/QuanLyPhimService";
import { SET_DANH_SACH_FILM_SEARCH, SET_DANH_SACH_PHIM, SET_THONG_TIN_PHIM } from "../types/QuanLyPhimType";
import { DISPLAY_LOADING_ACTION, HIDE_LOADING_ACTION } from "./LoadingActions";
import Swal from 'sweetalert2';


export const layDanhSachPhimAction = (tenPhim='') => {
    return async (dispatch) => {
        try {
            dispatch(DISPLAY_LOADING_ACTION)
            const result = await quanLyPhimService.layDanhSachPhim(tenPhim);
            dispatch({
                type: SET_DANH_SACH_PHIM,
                arrFilm: result.data.content
            })
        } catch (err) {
            console.log('err', err);
        }
        dispatch(HIDE_LOADING_ACTION)

    }
}

export const layDanhSachPhimActionSearch = (tenPhim='') => {
    return async (dispatch) => {
        try {
            dispatch(DISPLAY_LOADING_ACTION)
            const result = await quanLyPhimService.layDanhSachPhim(tenPhim);
            dispatch({
                type: SET_DANH_SACH_FILM_SEARCH,
                arrFilmSearch: result.data.content
            })
        } catch (err) {
            console.log('err', err);
        }
        dispatch(HIDE_LOADING_ACTION)
    }
}

export const themPhimUploadHinhAction = (formData) => {
    return async (dispatch) => {
        try {
            let result = await quanLyPhimService.themPhimUploadHinh(formData)
            await Swal.fire({
                title: "Thêm phim thành công!",
                icon: "success"
            });
            await dispatch(layDanhSachPhimAction())
            history.push('/admin/films')
        } catch (err) {
            console.log('err', err.response?.data);
        }
    }
}

export const layThongTinPhimAction = (maPhim) => {
    return async (dispatch) => {
        try {
            let result = await quanLyPhimService.layThongTinPhim(maPhim);
            dispatch({
                type: SET_THONG_TIN_PHIM,
                thongTinPhim: result.data.content
            })
        } catch (err) {
            console.log('err', err.response?.data);
        }
    }
}

export const capNhatPhimUploadAction = (formData) => {
    return async (dispatch) => {
        try {
            let result = await quanLyPhimService.capNhatPhimUpload(formData);
            await Swal.fire({
                title: "Cập nhật phim thành công!",
                icon: "success"
            });
            await dispatch(layDanhSachPhimAction())
            history.push('/admin/films')


        } catch (err) {
            console.log('err', err.response?.data);
        }
    }
}

export const xoaPhimAction = (maPhim) => {
    return async (dispatch) => {
        try {
            let result = await quanLyPhimService.xoaPhim(maPhim);
            Swal.fire({
                title: "Xóa phim thành công!",
                icon: "success"
            });
            dispatch(layDanhSachPhimAction())
        } catch (err) {
            console.log('err', err.response?.data);
        }
    }
}