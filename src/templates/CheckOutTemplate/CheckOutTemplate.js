import { Fragment, useEffect } from "react";
import { Route } from "react-router"
import { USER_LOGIN } from "../../util/settings/config";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";



export const CheckOutTemplate = (props) => { //path, exact, component

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    })

    const { Component, ...restRoute } = props;

    if (!localStorage.getItem(USER_LOGIN)) {
        return <Redirect to='/login' />
    }

    return <Route {...restRoute} render={(propsRoute) => { // props.location, props.history, props.match
        return <Fragment>
            <Component {...propsRoute} />
        </Fragment>

    }} />
}