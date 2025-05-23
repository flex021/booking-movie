import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'

export default function Loading() {

    const {isLoading} = useSelector(state => state.LoadingReducer)

  return (
    <Fragment>
            {isLoading ? <div style={{
                position: 'fixed', width: '100%', height: '100%', zIndex
                    : 99, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center',
            }
            }> 
            <img src='https://i.pinimg.com/originals/fe/24/ae/fe24ae50007b9d45aefeb5594c020efb.gif' alt='load' width={100}/>
            </div > : ''}
            
        </Fragment>
  )
}
