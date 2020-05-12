import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import CatererMenus from '../../components/CatererMenus/CatererMenus';
import Modal from '../../components/UI/Modal/Modal';
import Loading from '../../components/UI/Loading/Loading';
import * as actions from '../../store/action/index';
import client from '../../shared/axios-client';
import withHttpHandler from '../../hoc/withHttpHandler/withHttpHandler';
import Empty from '../../components/UI/Empty/Empty';

class Menu extends Component {
  state = {
    redirectPath: null,
    redirect: false
  };

  componentDidMount() {
    this.props.onFetchMenus();
  }

  addMealToOrders = orderData => {
    this.props.onAddToOrders(orderData);
    console.log(this.props.orderResCode);
    if (this.props.resCode === 'success') {
      this.props.onResetResCode();
      this.setState({ redirect: true, redirectPath: '/orders' });
    }
  };

  render() {
    let mealList = (
      <CatererMenus catererData={this.props.menus} handleQuantity={this.props.onHandleQuantity} />
    );
    if (this.props.loading) {
      mealList = <Loading />;
    }
    if (!this.props.loading && this.props.menus.length === 0) {
      mealList = <Empty text="Menu" />;
    }
    return (
      <React.Fragment>
        {this.state.redirect ? <Redirect to={this.state.redirectPath} /> : null}
        <Header
          bannerText="Today's Menus"
          authenticated={this.props.userAuthenticated}
          overlay={this.props.beingOrdered}
        />
        <main>{mealList}</main>
        <Modal
          meal={this.props.beingOrdered}
          type="quantity"
          show={this.props.beingOrdered !== null}
          close={this.props.onHideQuantityModal}
          orderMeal={this.addMealToOrders}
        />
        <Footer />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  const menus = [];
  state.menu.menus.forEach(menu => {
    menus.push({
      id: menu.id,
      catererId: menu.catererId,
      catering_service: menu.caterer.catering_service,
      meals: JSON.parse(menu.meals)
    });
  });
  return {
    userAuthenticated: state.auth.userAuthenticated,
    beingOrdered: state.menu.beingOrdered,
    token: state.auth.token,
    loading: state.menu.loading,
    menus,
    resCode: state.global.lastReq
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onHandleQuantity: mealId => dispatch(actions.handleQuantity(mealId)),
    onHideQuantityModal: () => dispatch(actions.hideQuantityModal()),
    onFetchMenus: () => dispatch(actions.menuFetchMenus()),
    onAddToOrders: order => dispatch(actions.orderAddToOrders(order)),
    onResetResCode: () => dispatch(actions.resetResCode())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withHttpHandler(Menu, client));
