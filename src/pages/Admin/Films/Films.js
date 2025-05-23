import React, { Fragment, useEffect, useState } from 'react'
import { Input, Table, Tag, Popconfirm, Tooltip, AutoComplete, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachPhimAction, layDanhSachPhimActionSearch, xoaPhimAction } from '../../../redux/actions/QuanLyPhimActions';
import { NavLink } from 'react-router-dom';
import { DeleteOutlined, EditOutlined, CalendarOutlined } from '@ant-design/icons';
import { history } from '../../../App';
import { useRef } from 'react';
export default function Films() {

  const { arrDefaultFilm, arrFilmSerch } = useSelector(state => state.QuanLyPhimReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(layDanhSachPhimAction())
  }, [])

  const searchRef = useRef(null);

  const { Search } = Input;

  const handleChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
  };

  const [sortedInfo, setSortedInfo] = useState({});

  const [value, setValue] = useState('');


  const searchInput = (value) => {
    dispatch(layDanhSachPhimAction(value))
  }

  const onSearch = (value) => {
    if (searchRef.current) {
      clearTimeout(searchRef.current)
    }
    searchRef.current = setTimeout(() => {
      dispatch(layDanhSachPhimActionSearch(value))

    }, 300)
  };

  const onSelect = (valueSelect, option) => {
    setValue(option.label)
    dispatch(layDanhSachPhimAction(valueSelect))
  };

  const options = arrFilmSerch.slice(0,8).map((phim, index) => {
    return { label: phim.tenPhim, value: phim.tenPhim }
  })


  const data = arrDefaultFilm;
  let dataWithSTT = data.map((film, index) => {
    return {
      ...film,
      stt: index + 1
    }
  })


  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      width: 100,
      sorter: (a, b) => {
        return b.stt - a.stt
      },
      sortOrder: sortedInfo.columnKey === 'stt' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'age',
      key: 'age',
      width: 150,
      render: (text, films, index) => {
        return <Fragment key={6}>
          <img key={index} src={films.hinhAnh} alt={films.tenPhim} style={{ width: '55px', height: '80px' }} onError={(e) => { e.target.onError = null; e.target.src = `https://picsum.photos/id/${index}/50/50` }} />
        </Fragment>
      },
      ellipsis: true,
    },
    {
      title: 'Tên phim',
      dataIndex: 'tenPhim',
      key: 'tenPhim',
      render: (text, film, index) =>{
        return <NavLink target="_blank" to={`/details/${film.maPhim}`}>{film.tenPhim}</NavLink>
      },
      sorter: (a, b) => {
        let teinPhimA = a.tenPhim.toLowerCase().trim();
        let teinPhimB = b.tenPhim.toLowerCase().trim();
        if (teinPhimA > teinPhimB) {
          return 1;
        }
        return -1
      },
      sortOrder: sortedInfo.columnKey === 'tenPhim' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Mã phim',
      dataIndex: 'maPhim',
      key: 'maPhim',
      render: (text, films, index) => {
        return <Tag color="blue">{films.maPhim}</Tag>
      },
      sorter: (a, b) => a.maPhim - b.maPhim,
      sortOrder: sortedInfo.columnKey === 'maPhim' ? sortedInfo.order : null,
      ellipsis: true,
      width: 150,
    },
    {
      title: 'Mô tả',
      dataIndex: 'moTa',
      key: 'moTa',
      render: (text, films) => {

        return <Fragment key={1}>
          <div key={8} className='cursor-pointer'>
            <Tooltip
              title={films.moTa}
              trigger="hover"
            >
              {films.moTa.length > 50 ? films.moTa.substr(0, 50) + ' ...' : films.moTa}
            </Tooltip>
          </div>
        </Fragment>
      }
    },
    {
      title: 'Hành động',
      width: 200,
      render: (text, films) => {
        return <Fragment key={5}>
          <NavLink key={1} to={`/admin/films/edit/${films.maPhim}`} className='text-2xl mx-4 text-blue-400'><EditOutlined /></NavLink>
          <Popconfirm
            title={`Bạn có chắc muốn xóa phim ${films.tenPhim}?`}
            onConfirm={() => {
              dispatch(xoaPhimAction(films.maPhim))
            }}
            okText="Yes"
            cancelText="No"
          >
            <span key={2} to='/' className='text-2xl text-red-600 cursor-pointer'><DeleteOutlined /></span>
          </Popconfirm>
          <NavLink key={10} to={`/admin/showtime/${films.maPhim}/${films.tenPhim}`} className='text-2xl mx-4 text-blue-400' onClick={() => {
            localStorage.setItem('filmParams', JSON.stringify(films))
          }}><CalendarOutlined /> </NavLink>
        </Fragment>
      }
    },
  ];



  return (
    <div>
      <div className='text-2xl mb-5 flex justify-center'>Quản lý phim</div>
      <div className='flex justify-center'>
        <AutoComplete
          options={options}
          style={{
            width: 1000
          }}
          value={value}
          onSelect={onSelect}
          onSearch={onSearch}
          onChange={(data) => {
            setValue(data)
          }}
        >
          <Search
            placeholder="Tìm kiếm tên phim"
            allowClear
            onSearch={searchInput}
            size="large"
          />
        </AutoComplete>
      </div>

      <div className='flex justify-center m-2 my-5'>
        <Button className='mr-2' onClick={() => {
          history.push('/admin/films/adnew')
        }}> Thêm phim</Button>
        <Button className='' onClick={() => {
          dispatch(layDanhSachPhimAction())
          setValue("")
        }}>Tất cả phim</Button>
      </div>

      <div className='mb-2'>
      </div>
      <Table columns={columns} dataSource={dataWithSTT} onChange={handleChange} rowKey={"maPhim"} />
    </div>
  )
}
