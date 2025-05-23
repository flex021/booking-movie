import { Fragment, useEffect } from "react";
import { Route } from "react-router"
import Header from "./Layout/Header/Header";
import Footer from "./Layout/Footer/Footer";


export const HomeTemplate = (props) => { //path, exact, component
    const { Component, ...restRoute } = props;

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    })

    return <Route {...restRoute} render={(propsRoute) => { // props.location, props.history, props.match
        return <Fragment>
            <Header {...propsRoute} />
            <Component {...propsRoute} />
            <Footer />
        </Fragment>

    }} />
}