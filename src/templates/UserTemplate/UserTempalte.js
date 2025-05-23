import { Fragment } from "react";
import { Route } from "react-router"
import { CustomCard } from '@tsamantanis/react-glassmorphism'
import '@tsamantanis/react-glassmorphism/dist/index.css'


export const UserTemplate = (props) => { //path, exact, component
    const { Component, ...restRoute } = props;

    return <Route {...restRoute} render={(propsRoute) => { // props.location, props.history, props.match
        return <Fragment>
            <div className="h-screen w-screen overflow-hidden" style={{ background: 'url("https://www.newsviewsnetwork.com/wp-content/uploads/2012-movie-collage31-scaled.jpg")', backgroundSize: 'cover', backgroundPosition: 'center center' }}>
                <CustomCard
                    style={{ paddingTop: '100px', minHeight: '100vh' }}
                    effectColor="#000000"
                    color="#000000"
                    blur={2}
                    borderRadius={0}
                >
                    <Component {...propsRoute} />
                </CustomCard>
            </div>
        </Fragment>

    }} />
}