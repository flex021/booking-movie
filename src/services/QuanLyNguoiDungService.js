import { baseService } from "./baseService";

export class QuanLyNguoiDungService extends baseService{
    constructor(){
        super();
    }
    dangNhap = (thongTinDangNhap) =>{
        return this.post(`/api/QuanLyNguoiDung/DangNhap`, thongTinDangNhap)
    }

    dangKy = (thongTinDangKy) =>{
        return this.post(`/api/QuanLyNguoiDung/DangKy`, thongTinDangKy)
    }

    lichSuDatVe = () =>{
        return this.post(`/api/QuanLyNguoiDung/ThongTinTaiKhoan`)
    }

    danhSachNguoiDung = (tuKhoa='') =>{
        if (tuKhoa.trim() != '') {
            return this.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP00&tuKhoa=${tuKhoa}`)
        }
        return this.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP00`)
    }

    danhSachLoaiNguoiDung = () =>{
        return this.get(`/api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung`)
    }

    capNhatThongTinNguoiDung = (thongTin) =>{
        return this.post(`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, thongTin)
    }

    xoaNguoiDung = (taiKhoan) =>{
        return this.delete(`/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`)
    }

    themNguoiDung = (thongTin) =>{
        return this.post(`/api/QuanLyNguoiDung/ThemNguoiDung`, thongTin)
    }
}

export const quanLyNguoiDungService = new QuanLyNguoiDungService();