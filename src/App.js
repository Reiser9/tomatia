import React from 'react';
import {connect} from 'react-redux';
import {Switch, Route, Redirect} from 'react-router-dom';
import $ from 'jquery';

import './App.css';

import {initializedApp} from './redux/app-reducer.js';

import Header from './Components/Header/Header.jsx';
import Footer from './Components/Footer/Footer.jsx';
import Main from './Components/pages/Main/Main.jsx';
import Blog from './Components/pages/Blog/Blog.jsx';
import Catalog from './Components/pages/Catalog/Catalog.jsx';
import Cart from './Components/pages/Cart/Cart.jsx';
import Admin from './Components/pages/Admin/Admin.jsx';
import TovarCard from './Components/pages/TovarCard/TovarCard.jsx';
import ArticlePage from './Components/pages/ArticlePage/ArticlePage.jsx';
import Search from './Components/pages/Search/Search.jsx';
import How from './Components/pages/How/How.jsx';
import Payment from './Components/pages/Payment/Payment.jsx';

const App = ({initializedApp}) => {
    React.useEffect(() => {
        initializedApp();
    }, [initializedApp]);

    React.useEffect(() => {
        const close = () => {
            $("body").removeClass("scroll");
            $(".modal__menu").removeClass("active");
        }

        $(".header__menu").on('click', function(){
            $("body").addClass("scroll");
            $(".modal__menu").addClass("active");
        });

        $(".close").on('click', function(){
            close();
        });

        $(window).resize(function(){
            if($(window).width() > 1200){
                close();
            }
        });
    }, []);

    return(
        <>
            <Header />

            <Switch>
                <Route exact path="/" component={Main} />
                <Route exact path="/blog" component={Blog} />
                <Route exact path="/catalog" component={Catalog} />
                <Route exact path="/cart" component={Cart} />
                <Route exact path="/admin" component={Admin} />
                <Route path="/catalog/:id" component={TovarCard} />
                <Route path="/blog/:id" component={ArticlePage} />
                <Route path="/search" component={Search} />
                <Route path="/how" component={How} />
                <Route path="/payment" component={Payment} />
                <Route path="*" render={() => <Redirect to="/" />} />
            </Switch>

            <Footer />
        </>
    )
}

const mapStateToProps = () => {
    return{

    }
}

export default connect(mapStateToProps, {initializedApp})(App);