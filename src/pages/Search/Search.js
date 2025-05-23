import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactPlayer from 'react-player';
import { PlayCircleOutlined } from '@ant-design/icons';
import { NavLink, useLocation } from 'react-router-dom';
import { Modal } from 'antd';
import { layDanhSachPhimActionSearch } from '../../redux/actions/QuanLyPhimActions';

export default function Search() {
  const { arrFilmSerch } = useSelector((state) => state.QuanLyPhimReducer);
  const { isLoading } = useSelector((state) => state.LoadingReducer);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('query');
    if (query) {
      setSearchQuery(query);
      dispatch(layDanhSachPhimActionSearch(query));
    }
  }, [location.search, dispatch]);

  const showModal = (film) => {
    setSelectedFilm(film);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedFilm(null);
  };

  const renderSearchFilms = () => {
    const searchKey = new URLSearchParams(location.search).get('query')?.toLowerCase().trim() || '';

    if (isLoading) {
      return (
        <div className="flex justify-center items-center w-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-red-600"></div>
          <span className="ml-3 text-base text-yellow-400">Đang tải...</span>
        </div>
      );
    }

    if (!arrFilmSerch || !Array.isArray(arrFilmSerch)) {
      return <div className="text-yellow-400 text-base text-center">Không có dữ liệu phim</div>;
    }

    const filteredFilms = arrFilmSerch.filter((item) => {
      if (!item || typeof item.tenPhim !== 'string') return false;
      return item.tenPhim.toLowerCase().trim().includes(searchKey);
    });

    if (filteredFilms.length === 0) {
      return <div className="text-yellow-400 text-base text-center">Không tìm thấy phim phù hợp!</div>;
    }

    return filteredFilms.map((item, index) => (
      <div key={index} className="ui-card w-[250px] rounded-lg shadow-2xl p-2">
        <div
          className="img-film"
          style={{
            backgroundImage: `url(${item.hinhAnh})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            height: '400px',
          }}
        >
          <img
            src={item.hinhAnh}
            alt={item.tenPhim || 'Phim'}
            className="opacity-0 w-full"
            style={{ height: '400px' }}
          />
        </div>
        <div className="description">
          <p
            className="cursor-pointer mb-4 text-6xl text-white inline-block"
            onClick={() => showModal(item)}
          >
            <PlayCircleOutlined />
          </p>
          <h2>{item.tenPhim}</h2>
          <NavLink to={`/details/${item.maPhim}`}>ĐẶT VÉ</NavLink>
        </div>
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-[#555358]">
      <div className="container mx-auto p-28">
        {/* Tiêu đề */}
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-[#DACB46] drop-shadow-md">
          Kết quả tìm kiếm cho: <span className="italic">{searchQuery || ''}</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
          {renderSearchFilms()}
          {selectedFilm && (
            <Modal
              width={720}
              title={
                <span className="text-lg font-bold text-[#DACB46]">
                  {selectedFilm.tenPhim || 'Trailer'}
                </span>
              }
              footer={null}
              open={isModalOpen}
              onCancel={handleCancel}
              className= "rounded-lg"
            >
              <ReactPlayer url={selectedFilm.trailer} controls={true} width="100%" />
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
}