import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";
import { quanLyDatVeService } from "../../services/QuanLyDatVeService"
import { CHUYEN_TAB, DAT_VE, DAT_VE_HOAN_TAT, SET_CHI_TIET_PHONG_VE } from "../types/QuanLyDatVeType";
import { DISPLAY_LOADING_ACTION, HIDE_LOADING_ACTION } from "./LoadingActions";
import { thongTinNguoiDungAction } from "./QuanLyNguoiDungActions";
import Swal from 'sweetalert2';

export const layChiTietPhongVeAction = (maLichChieu) => {
    return async (dispatch) => {
        try {
            dispatch(DISPLAY_LOADING_ACTION)
            const result = await quanLyDatVeService.layChiTietPhongVe(maLichChieu);
            console.log('result111', result);
            if (result.status === 200) {
                dispatch({
                    type: SET_CHI_TIET_PHONG_VE,
                    chiTietPhongVe: result.data.content
                })
            }
        } catch (err) {
            console.log('err', err);
        }
        await dispatch(HIDE_LOADING_ACTION)

    }
}

export const datVeAction = (thongTinDatVe = new ThongTinDatVe()) => {

    return async (dispatch) => {
        try {
            dispatch(DISPLAY_LOADING_ACTION)
            const result = await quanLyDatVeService.datVe(thongTinDatVe)
                  
            await dispatch(layChiTietPhongVeAction(thongTinDatVe.maLichChieu));
            await dispatch(thongTinNguoiDungAction())
            await dispatch({type: DAT_VE_HOAN_TAT})
            await dispatch({type: CHUYEN_TAB})
            await dispatch(HIDE_LOADING_ACTION)
            // Swal.fire({
            //     title: "Đặt vé thành công!",
            //     icon: "success"
            //   });
              const data = JSON.parse(result.config.data)
              data.danhSachVe?.map((danhSach, index) => {
                return Swal.fire({
                    title: "Đặt vé thành công!",
                    text: ``,
                    icon: "success"
                  });
              })
              console.log('nè nè', data);
              
        } catch (err) {
            console.log('err đặt vé', err);
        }
    }
}


export const datGheAction = (ghe, maLichChieu) =>{
    return async (dispatch, getState) =>{
        await dispatch({
            type: DAT_VE,
            gheDuocChon: ghe
          });

          let danhSachGheDangDat = getState().QuanLyDatVeReducer.danhSachGheDangDat;          
          
          let taiKhoan = getState().QuanLyNguoiDungReducer.userLogin.taiKhoan;

          danhSachGheDangDat = JSON.stringify(danhSachGheDangDat)


        //   console.log('danh sách ghế đang đặt', danhSachGheDangDat);
        //   console.log('tài khoản', taiKhoan);
        //   console.log('mã lịch chiếu', maLichChieu);

        //   connection.invoke('datGhe', taiKhoan, danhSachGheDangDat, maLichChieu);
    }
}