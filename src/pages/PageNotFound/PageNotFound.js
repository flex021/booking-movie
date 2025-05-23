import React from 'react'
import { history } from '../../App';

export default function PageNotFound(props) {
    console.log(props.match);
  return (
    <div>
        <h1 className='text-center mb-5'>Không tìm thấy trang {props.match.url}</h1>
        <div className='flex justify-center'>
        <button onClick={() =>{
            history.push('/home')
        }} className='bg-gray-500 hover:bg-gray-700 p-2 rounded-md text-white '>Quay lại trang chủ!</button>
        </div>
        
        <img style={{display: 'flex',margin: 'auto'}} src='https://www.emg.com.vn/wp-content/uploads/2022/01/loi-404-not-found-2.jpg' alt='1'/>
    </div>
  )
}
