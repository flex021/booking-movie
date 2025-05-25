import { Fragment } from "react";
import { Route } from "react-router";


export const UserTemplate = (props) => { //path, exact, component
    const { Component, ...restRoute } = props;

    return <Route {...restRoute} render={(propsRoute) => { // props.location, props.history, props.match
        return <Fragment>
                <div className="h-screen w-screen overflow-hidden" style={{ background: 'url("https://www.newsviewsnetwork.com/wp-content/uploads/2012-movie-collage31-scaled.jpg")', backgroundSize: 'cover', backgroundPosition: 'center center' }}>
                        <Component {...propsRoute} />
                    </div>
        </Fragment>

    }} />
}