import React, { Fragment, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { history } from '../../../../App';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { TOKEN, USER_LOGIN } from '../../../../util/settings/config';
import { LogoutOutlined } from '@ant-design/icons';


export default function Header(props) {

    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);

    const { arrFilmSerch } = useSelector(state => state.QuanLyPhimReducer);
    console.log('arrFilmSerch', arrFilmSerch);


    const [value, setValue] = useState('');

    const handleSearchSubmit = () => {
        if (value) {
            history.push(`/search?query=${encodeURIComponent(value)}`);
        } else {
            history.push('/search');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearchSubmit();
        }
    };

    const onChange = (e) => {
        setValue(e.target.value); // Cập nhật giá trị khi nhập
    };

    const RenderLogin = () => {
        if (_.isEmpty(userLogin)) {
            return <Fragment>
                <button className="self-center px-8 py-3 rounded" activeclassname="border-b-2 border-white" onClick={() => {
                    history.push('/login')
                }}>Đăng Nhập</button>
                <button className="self-center px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900" activeclassname="border-b-2 border-white" onClick={() => {
                    history.push('/register')
                }}>Đăng Ký</button>
            </Fragment>
        }
        return <Fragment>
            <div className="w-[250px] max-w-sm min-w-[200px]">
                <div className="relative">
                    <input
                        className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        placeholder="Tìm tên phim"
                        value={value}
                        onChange={onChange}
                        onKeyDown={handleKeyPress}
                    />
                    <button
                        className="absolute top-1 right-1 flex items-center rounded bg-slate-800 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                        onClick={handleSearchSubmit}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-2">
                            <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                        </svg>

                        Search
                    </button>
                </div>
            </div>

            <button className="self-center px-8 py-3 rounded" activeclassname="border-b-2 border-white" onClick={() => {
                history.push('/profile')
            }}>{userLogin.hoTen}</button>
            <button className="self-center px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900" activeclassname="border-b-2 border-white" onClick={() => {
                localStorage.removeItem(USER_LOGIN);
                localStorage.removeItem(TOKEN);
                history.push('/home')
                window.location.reload();
            }}>Đăng Xuất <LogoutOutlined /></button>
        </Fragment>
    }


const scrollToSection = (sectionId, event) => {
    event.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

    return (
        <header className="p-2 dark:bg-gray-800 dark:text-gray-100 bg-black text-white bg-opacity-50 fixed z-10 w-full">
            <div className="container flex justify-between h-16 mx-auto">
                <NavLink rel="noopener noreferrer" to="/" aria-label="Back to homepage" className="flex items-center p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 32 32" className="w-8 h-8 dark:text-violet-400">
                        <path d="M27.912 7.289l-10.324-5.961c-0.455-0.268-1.002-0.425-1.588-0.425s-1.133 0.158-1.604 0.433l0.015-0.008-10.324 5.961c-0.955 0.561-1.586 1.582-1.588 2.75v11.922c0.002 1.168 0.635 2.189 1.574 2.742l0.016 0.008 10.322 5.961c0.455 0.267 1.004 0.425 1.59 0.425 0.584 0 1.131-0.158 1.602-0.433l-0.014 0.008 10.322-5.961c0.955-0.561 1.586-1.582 1.588-2.75v-11.922c-0.002-1.168-0.633-2.189-1.573-2.742zM27.383 21.961c0 0.389-0.211 0.73-0.526 0.914l-0.004 0.002-10.324 5.961c-0.152 0.088-0.334 0.142-0.53 0.142s-0.377-0.053-0.535-0.145l0.005 0.002-10.324-5.961c-0.319-0.186-0.529-0.527-0.529-0.916v-11.922c0-0.389 0.211-0.73 0.526-0.914l0.004-0.002 10.324-5.961c0.152-0.090 0.334-0.143 0.53-0.143s0.377 0.053 0.535 0.144l-0.006-0.002 10.324 5.961c0.319 0.185 0.529 0.527 0.529 0.916z" />
                        <path d="M22.094 19.451h-0.758c-0.188 0-0.363 0.049-0.515 0.135l0.006-0.004-4.574 2.512-5.282-3.049v-6.082l5.282-3.051 4.576 2.504c0.146 0.082 0.323 0.131 0.508 0.131h0.758c0.293 0 0.529-0.239 0.529-0.531v-0.716c0-0.2-0.11-0.373-0.271-0.463l-0.004-0.002-5.078-2.777c-0.293-0.164-0.645-0.26-1.015-0.26-0.39 0-0.756 0.106-1.070 0.289l0.010-0.006-5.281 3.049c-0.636 0.375-1.056 1.055-1.059 1.834v6.082c0 0.779 0.422 1.461 1.049 1.828l0.009 0.006 5.281 3.049c0.305 0.178 0.67 0.284 1.061 0.284 0.373 0 0.723-0.098 1.027-0.265l-0.012 0.006 5.080-2.787c0.166-0.091 0.276-0.265 0.276-0.465v-0.716c0-0.293-0.238-0.529-0.529-0.529z" />
                    </svg>
                </NavLink>
                <ul className="items-stretch hidden space-x-3 lg:flex">
                    <li className="flex">
                        <NavLink rel="noopener noreferrer" to="/home" className="flex items-center px-4 -mb-1 dark:border-transparent dark:text-violet-400 dark:border-violet-400" activeclassname="border-b-2 border-white">Trang Chủ</NavLink>
                    </li>
                    <li className="flex">
                        <NavLink rel="noopener noreferrer" to="" className="flex items-center px-4 -mb-1 dark:border-transparent" activeclassname="border-b-2 border-white" onClick={(e) => scrollToSection('chon-phim', e)}>Chọn Phim</NavLink>
                    </li>
                    <li className="flex">
                        <NavLink rel="noopener noreferrer" to="" className="flex items-center px-4 -mb-1 dark:border-transparent" activeclassname="border-b-2 border-white" onClick={(e) => scrollToSection('cum-rap', e)}>Cụm Rạp</NavLink>
                    </li>
                    <li className="flex">
                        <NavLink rel="noopener noreferrer" to="/admin/films" className="flex items-center px-4 -mb-1 dark:border-transparent" activeclassname="border-b-2 border-white">Admin</NavLink>
                    </li>
                </ul>
                <div className="items-center flex-shrink-0 hidden lg:flex">
                    {RenderLogin()}
                </div>
                <button className="p-4 lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 dark:text-gray-100">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </header>

    )
}
