(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{100:function(e,t,a){"use strict";var n=a(0),r=a.n(n),l=a(102),i=a.n(l),c=a(103),o=a.n(c);t.a=function(e){var t="Empty "+e.text,a=r.a.createElement("span",{className:"Red"},e.text);return r.a.createElement("div",{className:i.a.Empty},r.a.createElement("img",{src:o.a,alt:t}),r.a.createElement("p",{className:i.a.EmptyText},"Empty ",a))}},102:function(e,t,a){e.exports={Empty:"Empty_Empty__BVZGj",EmptyText:"Empty_EmptyText__R_uhU"}},103:function(e,t,a){e.exports=a.p+"static/media/empty.093f05ea.svg"},106:function(e,t,a){e.exports={Menu:"Menu_Menu__1iVZJ",Menu__label:"Menu_Menu__label__3lGfd",Menu__food:"Menu_Menu__food__1it3e",Right__Btn__lg:"Menu_Right__Btn__lg__1hTyV"}},107:function(e,t,a){"use strict";var n=a(0),r=a.n(n),l=a(110),i=a.n(l);t.a=function(e){var t="meal",a="mealdetails",n="mealname",l="mealprice",c="mealquantity",o={menu:r.a.createElement("div",{className:i.a.Menu__food__item__details,role:a},r.a.createElement("div",{className:i.a.Meal__info},r.a.createElement("p",{role:n},e.meal.name),r.a.createElement("p",{role:l},"$",e.meal.price.toFixed(2))),r.a.createElement("div",null,r.a.createElement("button",{className:i.a.Card__btn,onClick:function(){return e.order(e.meal.id)}},"Order"))),orders:r.a.createElement("div",{className:i.a.Menu__food__item__details,role:a},r.a.createElement("div",{className:i.a.Meal__info},r.a.createElement("p",{role:n},e.meal.name),r.a.createElement("p",{role:l},"$",e.meal.price.toFixed(2)),r.a.createElement("p",null,r.a.createElement("button",{className:i.a.Tiny__btn,onClick:function(){return e.decreaseQuantity(e.meal.orderId)}},"-")," ",e.meal.quantity," ",r.a.createElement("button",{className:i.a.Tiny__btn,onClick:function(){return e.increaseQuantity(e.meal.orderId)}},"+"))),r.a.createElement("div",{className:i.a.Meal__btn},r.a.createElement("button",{className:i.a.Card__btn,onClick:function(){return e.deleteOrder(e.meal.orderId)}},"Delete"))),menuMeals:r.a.createElement("div",{className:i.a.Menu__food__item__details,role:a},r.a.createElement("div",{className:i.a.Meal__info},r.a.createElement("p",{role:n},e.meal.name),r.a.createElement("p",{role:l},"$",e.meal.price.toFixed(2)),r.a.createElement("p",{role:c},"Quantity: ",e.meal.quantity))),mealOptions:r.a.createElement("div",{className:i.a.Menu__food__item__details,role:a},r.a.createElement("div",{className:i.a.Meal__info},r.a.createElement("p",{role:n},e.meal.name),r.a.createElement("p",{role:l},"$",e.meal.price.toFixed(2))),r.a.createElement("div",{className:i.a.Meal__btn},r.a.createElement("button",{className:i.a.Card__btn,onClick:function(){return e.showEditMealModal(e.meal)}},"Edit")),r.a.createElement("div",{className:i.a.Meal__btn},r.a.createElement("button",{className:i.a.Card__btn,onClick:function(){return e.removeMeal(e.meal.id)}},"Delete"))),manageMenu:r.a.createElement("div",{className:i.a.Menu__food__item__details,role:a},r.a.createElement("div",{className:i.a.Meal__info},r.a.createElement("p",{role:n},e.meal.name),r.a.createElement("p",{role:l},"$",e.meal.price.toFixed(2)),r.a.createElement("p",null,r.a.createElement("button",{className:i.a.Tiny__btn,onClick:function(){return e.decrease(e.meal.id)}},"-")," ",e.meal.quantity||0," ",r.a.createElement("button",{className:i.a.Tiny__btn,onClick:function(){return e.increase(e.meal.id)}},"+"))))},s=Object({NODE_ENV:"production",PUBLIC_URL:""}).REACT_APP_ROOT,_="".concat(s).concat(e.meal.imageUrl);return r.a.createElement("article",{className:i.a.Menu__food__item,role:t},e.meal.quantity>0&&"manageMenu"===e.type?r.a.createElement("div",{className:"ribbon ribbon-top-left"},r.a.createElement("span",null,"Selected")):null,r.a.createElement("div",{className:i.a.Menu__food__item__img},r.a.createElement("img",{src:_,alt:"Meal"})),o[e.type])}},108:function(e,t,a){"use strict";var n=a(0),r=a.n(n),l=a(12),i=a(106),c=a.n(i),o=a(107);t.a=function(e){var t=e.meals.map(function(t){return r.a.createElement(o.a,Object.assign({key:t.id,meal:t},e))}),a=["page-section"],n=null,i=null;switch(e.type){case"orders":a.push(c.a.Cart__container),i=r.a.createElement("button",{className:c.a.Right__Btn__lg,onClick:e.checkout},"Make Order");break;case"manageMenu":i=r.a.createElement("button",{className:["Btn",c.a.Right__Btn__lg].join(" "),onClick:e.saveMenu},"Save");break;case"menuMeals":n=r.a.createElement(l.b,{to:"/admin/menu",className:["Btn",c.a.Right__Btn__lg].join(" ")},"Manage Menu");break;case"mealOptions":n=r.a.createElement("button",{className:["Btn",c.a.Right__Btn__lg].join(" "),onClick:e.toggleMealModal},"Add Meal Option")}return r.a.createElement("section",{className:a.join(" "),role:"meallist"},n,r.a.createElement("div",{className:c.a.Menu__food},t),i)}},110:function(e,t,a){e.exports={Menu__food__item:"Meal_Menu__food__item__3qHDD",Menu__food__item__img:"Meal_Menu__food__item__img__xgpTL",Menu__food__item__details:"Meal_Menu__food__item__details__sYjpJ",Meal__info:"Meal_Meal__info__3BSJW",Card__btn:"Meal_Card__btn__3AcLb",Tiny__btn:"Meal_Tiny__btn__26XSi",Cart__container:"Meal_Cart__container__3ebcm",Meal__btn:"Meal_Meal__btn__I0moT"}},113:function(e,t,a){"use strict";function n(e){return function(e){if(Array.isArray(e)){for(var t=0,a=new Array(e.length);t<e.length;t++)a[t]=e[t];return a}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}a.d(t,"a",function(){return n})},131:function(e,t,a){"use strict";a.r(t);var n=a(113),r=a(17),l=a(18),i=a(20),c=a(19),o=a(21),s=a(0),_=a.n(s),m=a(13),u=a(15),d=a(41),p=a(40),f=a(108),E=a(26),M=a(100),b=a(5),h=a(32),y=a(99),v=function(e){function t(){var e,a;Object(r.a)(this,t);for(var l=arguments.length,o=new Array(l),s=0;s<l;s++)o[s]=arguments[s];return(a=Object(i.a)(this,(e=Object(c.a)(t)).call.apply(e,[this].concat(o)))).state={meals:[],redirect:!1,redirectPath:null},a.increaseQuantity=function(e){var t=Object(n.a)(a.state.meals),r=t.findIndex(function(t){return t.id===e});t[r].quantity+=1,a.setState({meals:t})},a.decreaseQuantity=function(e){var t=Object(n.a)(a.state.meals),r=t.findIndex(function(t){return t.id===e});t[r].quantity-=1,a.setState({meals:t})},a.saveMenu=function(){var e=[];a.state.meals.forEach(function(t){t.quantity>0&&e.push({mealId:t.id,quantity:t.quantity})}),a.props.onAddMealToMenu(e),a.setState({redirect:!0,redirectPath:"/admin/"})},a}return Object(o.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){this.props.onFetchCatererMeals()}},{key:"componentWillReceiveProps",value:function(e){this.setState({meals:e.meals})}},{key:"render",value:function(){var e=_.a.createElement(f.a,{type:"manageMenu",meals:this.state.meals,increase:this.increaseQuantity,decrease:this.decreaseQuantity,saveMenu:this.saveMenu});return(this.props.loading||this.state.addingMeals)&&(e=_.a.createElement(E.a,null)),this.props.loading||0!==this.props.meals.length||(e=_.a.createElement(M.a,{text:"Meal Options"})),_.a.createElement(_.a.Fragment,null,this.state.redirect?_.a.createElement(u.a,{to:this.state.redirectPath}):null,_.a.createElement(d.a,{bannerText:"Increase Food Options Quantity to add them to menu",authenticated:this.props.catererAuthenticated,caterer:!0}),_.a.createElement("main",null,e),_.a.createElement(p.a,null))}}]),t}(s.Component);t.default=Object(m.b)(function(e){return{loading:e.meal.loading,catererAuthenticated:e.auth.catererAuthenticated,meals:e.meal.meals}},function(e){return{onFetchCatererMeals:function(){return e(h.j())},onAddMealToMenu:function(t){return e(h.l(t))}}})(Object(y.a)(v,b.a))},99:function(e,t,a){"use strict";var n=a(17),r=a(18),l=a(20),i=a(19),c=a(21),o=a(0),s=a.n(o);t.a=function(e,t){var a=Object({NODE_ENV:"production",PUBLIC_URL:""}).REACT_APP_API_URL;return function(o){function _(){var e,t;Object(n.a)(this,_);for(var a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return(t=Object(l.a)(this,(e=Object(i.a)(_)).call.apply(e,[this].concat(r)))).state={error:null},t.errorConfirmedHandler=function(){t.setState({error:null})},t}return Object(c.a)(_,o),Object(r.a)(_,[{key:"componentWillMount",value:function(){var e=this;this.reqInterceptor=t.interceptors.request.use(function(t){if(e.setState({error:null}),t.baseURL===a&&!t.headers.Authorization){var n=t.headers["X-Req"]?localStorage.getItem("c_token"):localStorage.getItem("token");n&&(t.headers.Authorization=n)}return t}),this.resInterceptor=t.interceptors.response.use(function(e){return e},function(t){e.setState({error:t})})}},{key:"componentWillUnmount",value:function(){t.interceptors.request.eject(this.reqInterceptor),t.interceptors.response.eject(this.resInterceptor)}},{key:"render",value:function(){return s.a.createElement(e,this.props)}}]),_}(o.Component)}}}]);
//# sourceMappingURL=5.7d04460c.chunk.js.map