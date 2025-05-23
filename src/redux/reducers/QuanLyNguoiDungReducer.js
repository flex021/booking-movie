import { TOKEN, USER_LOGIN } from "../../util/settings/config";
import { DANG_NHAP_ACTION, LAY_DANH_SACH_LOAI_NGUOI_DUNG, LAY_DANH_SACH_LOAI_NGUOI_DUNG_SEARCH, LAY_DANH_SACH_NGUOI_DUNG, THONG_TIN_NGUOI_DUNG } from "../types/QuanLyNguoiDungType"

let user = {}
if(localStorage.getItem(USER_LOGIN)){
    user = JSON.parse(localStorage.getItem(USER_LOGIN))
}

const stateDefault = {
    userLogin: user,
    thongTinNguoiDung: {},
    danhSachNguoiDung: [],
    danhSachNguoiDungSearch: [],
    loaiNguoiDung: []
}

export const QuanLyNguoiDungReducer = (state = stateDefault, action) =>{
    switch (action.type){

        case DANG_NHAP_ACTION: {
            const {thongTinDangNhap} = action;
            localStorage.setItem(USER_LOGIN,JSON.stringify(thongTinDangNhap));
            localStorage.setItem(TOKEN, thongTinDangNhap.accessToken)
            return {...state, userLogin: thongTinDangNhap}
        }

        case THONG_TIN_NGUOI_DUNG: {
            return {...state, thongTinNguoiDung: action.thongTinNguoiDung}
        }

        case LAY_DANH_SACH_NGUOI_DUNG: {
            return {...state, danhSachNguoiDung: action.danhSachNguoiDung}
        }

        case LAY_DANH_SACH_LOAI_NGUOI_DUNG_SEARCH: {
            return {...state, danhSachNguoiDungSearch: action.danhSachNguoiDungSearch}
        }

        case LAY_DANH_SACH_LOAI_NGUOI_DUNG: {
            return {...state, loaiNguoiDung: action.loaiNguoiDung}
        }
        default:
            return {...state}
    }
}