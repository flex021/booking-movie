import React, { useEffect } from 'react'
import HomeMenu from './HomeMenu/HomeMenu'
import { useDispatch, useSelector } from 'react-redux'
import MultipleRows from '../../components/ReactSlick/MultipleRowSlick';
import { layDanhSachPhimAction } from '../../redux/actions/QuanLyPhimActions';
import { layDanhSachHeThongRapAction } from '../../redux/actions/QuanLyRapActions';
import HomeCarousel from '../../templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel';

export default function Home(props) {

  const { arrFilm } = useSelector(state => state.QuanLyPhimReducer);
  const { heThongRapChieu } = useSelector(state => state.QuanLyRapReduer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(layDanhSachPhimAction())
    dispatch(layDanhSachHeThongRapAction())
  }, [])

  return (

    <div className='bg-[#FDFCF0]'>
        <HomeCarousel />
        <div className='container'>
          <h2 id="chon-phim" className="flex flex-row flex-nowrap items-center mt-20 max-w-3xl mx-auto">
            <span className="flex-grow block border-t border-gray-400"></span>
            <span className="flex-none block mx-4 px-4 py-2.5 text-xl rounded leading-none font-medium bg-black text-white">
              CHỌN PHIM
            </span>
            <span className="flex-grow block border-t border-gray-400"></span>
          </h2>

          <section className="text-gray-600 body-font ">
            <div className="pb-24 pt-10">
              <MultipleRows arrFilm={arrFilm} />
            </div>
          </section>

          <h2 id="cum-rap" className="flex flex-row flex-nowrap items-center mb-5 max-w-3xl mx-auto">
            <span className="flex-grow  border-t border-gray-400"></span>
            <span className="flex-none block mx-4 px-4 py-2.5 text-xl rounded leading-none font-medium bg-black text-white">
              CỤM RẠP
            </span>
            <span className="flex-grow block border-t border-gray-400"></span>
          </h2>
          <div className='pb-40 flex justify-center'>
            {/* <div className='border-2'> */}
            <HomeMenu heThongRapChieu={heThongRapChieu} />

          </div>
        </div>
    </div>
  )
}
