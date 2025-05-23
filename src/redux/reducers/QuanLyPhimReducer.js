import { SET_DANH_SACH_FILM_SEARCH, SET_DANH_SACH_PHIM, SET_PHIM_DANG_CHIEU, SET_PHIM_SAP_CHIEU, SET_THONG_TIN_PHIM } from "../types/QuanLyPhimType"
import { SET_CHI_TIET_PHIM } from "../types/QuanLyRapType"

const stateDefault = {
    arrFilm: [
    ],
    dangChieu: '',
    sapChieu: '',
    arrDefaultFilm: [],
    filmDetail: {},
    thongTinPhim: {},
    arrFilmSerch: []
}

export const QuanLyPhimReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case SET_DANH_SACH_PHIM: {
            state.arrFilm = action.arrFilm
            state.arrDefaultFilm = state.arrFilm
            return { ...state }
        }
        case SET_PHIM_DANG_CHIEU: {
            state.dangChieu = true;
            state.arrFilm = state.arrDefaultFilm.filter(film => film.dangChieu === state.dangChieu)
            return { ...state }
        }
        case SET_PHIM_SAP_CHIEU: {
            state.sapChieu = true;
            state.arrFilm = state.arrDefaultFilm.filter(film => film.sapChieu === state.sapChieu)
            return { ...state }
        }
        case SET_CHI_TIET_PHIM: {
            state.filmDetail = action.filmDetail
            return {...state}
        }

        case SET_THONG_TIN_PHIM: {
            state.thongTinPhim = action.thongTinPhim;
            return {...state}
        }

        case SET_DANH_SACH_FILM_SEARCH: {
            state.arrFilmSerch = action.arrFilmSearch
            return {...state}
        }
        default: return { ...state }
    }
}