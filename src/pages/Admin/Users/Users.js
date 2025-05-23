import React, { Fragment, useEffect, useState } from 'react'
import { Input, Table, Tag, Popconfirm, AutoComplete, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { history } from '../../../App';
import { useRef } from 'react';
import { danhSachNguoiDungAction, danhSachNguoiDungActionSearch, xoaNguoiDungAction } from '../../../redux/actions/QuanLyNguoiDungActions';
export default function Users() {

  const { danhSachNguoiDung, danhSachNguoiDungSearch } = useSelector(state => state.QuanLyNguoiDungReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(danhSachNguoiDungAction())
  }, [])

  const searchRef = useRef(null);

  const { Search } = Input;

  const handleChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
  };

  const [sortedInfo, setSortedInfo] = useState({});

  const [value, setValue] = useState('');


  const searchInput = (value) => {
    dispatch(danhSachNguoiDungAction(value))
  }

  const onSearch = (value) => {
    if (searchRef.current) {
      clearTimeout(searchRef.current)
    }
    searchRef.current = setTimeout(() => {
      dispatch(danhSachNguoiDungActionSearch(value))

    }, 300)
  };

  const onSelect = (valueSelect, option) => {
    setValue(option.label)
    dispatch(danhSachNguoiDungAction(valueSelect))
  };

  const options = danhSachNguoiDungSearch?.slice(0, 15).map((users, index) => {
    return { label: users.hoTen, value: users.hoTen }
  })


  const data = danhSachNguoiDung;
  let dataWithSTT = data.map((users, index) => {
    return {
      ...users,
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
      title: 'Tài khoản',
      dataIndex: 'taiKhoan',
      key: 'taiKhoan',
      width: 200,
      sorter: (a, b) => {
        let taiKhoanA = a.taiKhoan?.toLowerCase().trim();
        let taiKhoanB = b.taiKhoan?.toLowerCase().trim();
        if (taiKhoanA > taiKhoanB) {
          return 1;
        }
        return -1
      },
      sortOrder: sortedInfo.columnKey === 'taiKhoan' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Họ tên',
      dataIndex: 'hoTen',
      key: 'hoTen',
      width: 200,
      sorter: (a, b) => {
        let hoTenA = a.hoTen.toLowerCase().trim();
        let hoTenB = b.hoTen.toLowerCase().trim();
        if (hoTenA > hoTenB) {
          return 1;
        }
        return -1
      },
      sortOrder: sortedInfo.columnKey === 'hoTen' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 200,
      sorter: (a, b) => {
        let emailA = a.email.toLowerCase().trim();
        let emailB = b.email.toLowerCase().trim();
        if (emailA > emailB) {
          return 1;
        }
        return -1
      },
      sortOrder: sortedInfo.columnKey === 'email' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'soDt',
      key: 'soDt',
      width: 180,
      ellipsis: true,
    },
    {
      title: 'Mã loại người dùng',
      dataIndex: 'maLoaiNguoiDung',
      key: 'maLoaiNguoiDung',
      width: 160,
      render: (text, users) => {
        return <Fragment key={2}>
          {users.maLoaiNguoiDung == 'QuanTri' ? <Tag color="red">{users.maLoaiNguoiDung}</Tag> : <Tag color="green">{users.maLoaiNguoiDung}</Tag>}
        </Fragment>

      }
    },
    {
      title: 'Hành động',
      width: 170,
      render: (text, users) => {
        return <Fragment key={5}>
          <NavLink key={1} to={`/admin/editusers/${users.taiKhoan}`} className='text-2xl mx-4 text-blue-400'><EditOutlined /></NavLink>
          <Popconfirm
            title={`Bạn có chắc muốn xóa người dùng ${users.taiKhoan}?`}
            onConfirm={() => {
              dispatch(xoaNguoiDungAction(users.taiKhoan))
            }}
            okText="Yes"
            cancelText="No"
          >
            <span key={2} to='/' className='text-2xl text-red-600 cursor-pointer'><DeleteOutlined /></span>
          </Popconfirm>
        </Fragment>
      }
    },
  ];



  return (
    <div>
      <div className='text-2xl mb-5 flex justify-center'>Quản lý người dùng</div>
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
            placeholder="Tìm kiếm tên"
            allowClear
            onSearch={searchInput}
            size="large"
          />
        </AutoComplete>
      </div>

      <div className='flex justify-center m-2 my-5'>
        <Button className='mr-2' onClick={() => {
          history.push('/admin/users/addnew')
        }}> Thêm người dùng</Button>
        <Button className='' onClick={() => {
          dispatch(danhSachNguoiDungAction())
          setValue("")
        }}>Tất cả người dùng</Button>
      </div>

      <div className='mb-2'>
      </div>
      <Table scroll={{ y: 600 }} columns={columns} dataSource={dataWithSTT} onChange={handleChange} rowKey={"email"} />
    </div>
  )
}
