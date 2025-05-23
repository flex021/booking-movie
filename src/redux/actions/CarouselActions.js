
import { quanLyPhimService } from '../../services/QuanLyPhimService';
import { SET_CAROUSEL } from '../types/CarouselType';


export const getCarouselAction = async (dispatch) =>{
    try{
        const result = await quanLyPhimService.layDanhSachBanner();
        console.log('result', result);
        dispatch({
            type: SET_CAROUSEL,
            arrImg: result.data.content
        })

    }catch(err){
        console.log('err', err);
    }
}