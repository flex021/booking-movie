import { quanLyRapService } from "../../services/QuanLyRapService"
import { SET_CHI_TIET_PHIM, SET_HE_THONG_RAP_CHIEU } from "../types/QuanLyRapType"
import { DISPLAY_LOADING_ACTION, HIDE_LOADING_ACTION } from "./LoadingActions"

export const layDanhSachHeThongRapAction = () =>{
    return async dispatch =>{
        try{
            dispatch(DISPLAY_LOADING_ACTION)
            const result = await quanLyRapService.layThongTinLichChieuHeThongRap()
            console.log('result rap', result);
            if(result.status === 200){
                dispatch({
                    type: SET_HE_THONG_RAP_CHIEU,
                    heThongRapChieu: result.data.content
                })
            }
        }catch(err){
    
        }
        dispatch(HIDE_LOADING_ACTION)

    }
    
}

export const layThongTinChiTietPhim = (id) =>{
    return async dispatch =>{
        try{
            const result = await quanLyRapService.layThongTinLichChieuPhim(id)
            console.log('result rap', result);
            if(result.status === 200){
                dispatch({
                    type: SET_CHI_TIET_PHIM,
                    filmDetail: result.data.content
                })
            }
        }catch(err){

        }
    }
}