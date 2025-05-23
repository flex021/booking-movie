import React from 'react';
import { Tabs, Tooltip } from 'antd';
import moment from 'moment'
import { NavLink } from 'react-router-dom'
import '../../../util/HomeMenuCSS/HomeMenu.css'

export default class Demo extends React.PureComponent {
    state = {
        tabPosition: 'left'
    }

    renderHeThongRap = () => {
        const { tabPosition } = this.state
        return <Tabs
            className='p-5'
            tabPosition={tabPosition}
            items={this.props.heThongRapChieu?.map((heThongRap, index) => {
                const id = String(index + 1);

                return {
                    label:
                        <div key={index}>
                            <img src={heThongRap.logo} className='rounded-full' width='50' alt='123' />
                        </div>
                    ,
                    key: id,
                    children: <Tabs
                        tabPosition={tabPosition}
                        items={heThongRap.lstCumRap?.map((cumRap, index) => {
                            const id = String(index + 1);
                            return {
                                label: <div key={index} className='flex'>
                                    <img src={cumRap.hinhAnh} alt={cumRap.hinhAnh} width={50} className='mr-2' />
                                    <div className='text-left'>
                                        <p className='font-bold text-black'>{cumRap.tenCumRap}</p>
                                        <Tooltip
                                            title={cumRap.diaChi}
                                            trigger="hover"
                                            placement="bottom"
                                        >
                                            <p className='text-gray-500'>{cumRap.diaChi.length > 30 ? cumRap.diaChi.slice(0, 40) + ' ...' : cumRap.diaChi}</p>
                                        </Tooltip>
                                        
                                        <p className='text-red-500'>Chi tiết</p>
                                    </div>
                                </div>,
                                key: id,
                                children: <div>
                                    {cumRap.danhSachPhim?.slice(0, 5).map((phim, index) => {                            
                                        return <div className='flex mb-8' key={index}>
                                            <div style={{ background: `url(${phim.hinhAnh})`, width: '100px', backgroundPosition: 'center', backgroundSize: '100%, 100%' }} className=' rounded-md'>
                                                <img className='opacity-0 w-full' style={{ height: '150px' }} src={phim.hinhAnh} alt={phim.tenPhim} onError={(e) => { e.target.onerror = null; e.target.src = "https://picsum.photos/150/100" }} />
                                            </div>
                                            <div className='ml-4'>
                                                <div className='text-lg font-semibold mb-3'>{phim.tenPhim}</div>
                                                <div className='grid grid-cols-4 gap-4'>
                                                    {phim.lstLichChieuTheoPhim?.slice(0, 8).map((lichChieu, index) => {
                                                        return <NavLink to={`/checkout/${lichChieu.maLichChieu}`} key={index} className='bg-gray-300 text-gray-500 hover:text-gray-700 p-2 font-medium rounded-md text-base'>
                                                            {moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}
                                                        </NavLink>
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    })}
                                </div>,
                            };
                        })}
                    />,
                };
            })}
        />
    }


    render() {
        console.log("props", this.props);
        return (
            <div>
                {this.renderHeThongRap()}
            </div>
        )
    }
}

