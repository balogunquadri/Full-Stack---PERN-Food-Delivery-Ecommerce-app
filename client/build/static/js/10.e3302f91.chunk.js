(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{101:function(e,a,t){"use strict";var n=t(0),r=t.n(n),o=t(98),i=t.n(o);a.a=function(e){var a=null,t=[i.a.Form_field];switch(e.invalid&&e.shouldValidate&&e.touched&&t.push(i.a.Invalid),e.elementType){case"input":a=r.a.createElement("input",Object.assign({className:t.join(" ")},e.elementConfig,{value:e.value,onChange:e.changed}));break;case"textarea":a=r.a.createElement("textarea",Object.assign({className:t.join(" ")},e.elementConfig,{value:e.value,onChange:e.changed}));break;case"select":a=r.a.createElement("select",{className:t.join(" "),onChange:e.changed},e.elementConfig.options.map(function(e){return r.a.createElement("option",{key:e.value,value:e.value},e.displayValue)}));break;default:a=r.a.createElement("input",Object.assign({className:t.join(" ")},e.elementConfig,{value:e.value,onChange:e.changed}))}return r.a.createElement("div",{className:i.a.Form_group},a)}},104:function(e,a,t){"use strict";var n=t(0),r=t.n(n),o=t(98),i=t.n(o);a.a=function(e){return r.a.createElement("main",{className:i.a.Form_wrapper},r.a.createElement("section",{className:i.a.Form_page},e.children))}},105:function(e,a,t){"use strict";var n=t(0),r=t.n(n),o=t(109);a.a=r.a.memo(function(e){return r.a.createElement("h3",null,r.a.createElement("span",{className:"Red"},"F"),"oodie ",r.a.createElement("span",{className:"Red"}),r.a.createElement("span",{className:"Red"}),e.user.charAt(0).toUpperCase()+e.user.slice(1)," ",r.a.createElement("span",{className:"Red"},e.type.charAt(0).toUpperCase()+e.type.slice(1)))},function(e,a){return Object(o.isEqual)(e,a)})},126:function(e,a,t){"use strict";t.r(a);var n=t(42),r=t(17),o=t(18),i=t(20),l=t(19),c=t(21),s=t(0),u=t.n(s),m=t(15),d=t(12),p=t(13),g=t(98),h=t.n(g),v=t(104),f=t(105),_=t(26),y=t(101),b=t(2),C=t(32),E=function(e){function a(){var e,t;Object(r.a)(this,a);for(var o=arguments.length,c=new Array(o),s=0;s<o;s++)c[s]=arguments[s];return(t=Object(i.a)(this,(e=Object(l.a)(a)).call.apply(e,[this].concat(c)))).state={controls:{name:{elementType:"input",elementConfig:{type:"text",name:"name",placeholder:"Your Name"},value:"",validation:{required:!0},valid:!1,touched:!1},email:{elementType:"input",elementConfig:{type:"email",name:"email",placeholder:"Your Email"},value:"",validation:{required:!0,isEmail:!0},valid:!1,touched:!1},phone:{elementType:"input",elementConfig:{type:"tel",name:"phone",placeholder:"Your Phone Number"},value:"",validation:{required:!0,isNumeric:!0},valid:!1,touched:!1},catering_service:{elementType:"input",elementConfig:{type:"text",name:"catering_service",placeholder:"Catering Service Name"},value:"",validation:{required:!0},valid:!1,touched:!1},password:{elementType:"input",elementConfig:{type:"password",name:"password",placeholder:"Password"},value:"",validation:{required:!0,minLength:7},valid:!1,touched:!1},confirm_password:{elementType:"input",elementConfig:{type:"password",name:"confirm_password",placeholder:"Confirm Password"},value:"",validation:{required:!0,minLength:7},valid:!1,touched:!1}},formIsValid:!1},t.handleCatererRegister=function(e){e.preventDefault();var a={};for(var n in t.state.controls)a[n]=t.state.controls[n].value;t.props.onCatererSignup(a)},t.inputChangeHandler=function(e,a){var r=Object(b.b)(t.state.controls[a],{value:e.target.value,valid:Object(b.a)(e.target.value,t.state.controls[a].validation),touched:!0}),o=Object(b.b)(t.state.controls,Object(n.a)({},a,r)),i=!0;for(var l in o)i=o[l].valid&&i;t.setState({controls:o,formIsValid:i})},t}return Object(c.a)(a,e),Object(o.a)(a,[{key:"componentDidMount",value:function(){this.props.loading||this.props.onSetAuthRedirect("/admin/")}},{key:"render",value:function(){var e=this,a=Object.keys(this.state.controls).map(function(a){return{id:a,config:e.state.controls[a]}}),t=null;this.props.catererAuthenticated&&(t=u.a.createElement(m.a,{to:this.props.authRedirectPath}));var n=u.a.createElement(v.a,null,u.a.createElement("form",{action:"#",method:"post",className:h.a.Page_form,id:"catererRegisterForm",onSubmit:this.handleCatererRegister},u.a.createElement(f.a,{user:"caterer",type:"register"}),a.map(function(a){return u.a.createElement(y.a,{key:a.id,elementType:a.config.elementType,elementConfig:a.config.elementConfig,value:a.config.value,invalid:!a.config.valid,touched:a.config.touched,shouldValidate:a.config.validation,changed:function(t){return e.inputChangeHandler(t,a.id)}})}),u.a.createElement("button",{type:"submit"},"Register"),u.a.createElement("p",{className:h.a.Page_link},"Already Have an Account? ",u.a.createElement(d.b,{to:"/admin/login"},"Login")),u.a.createElement("p",{className:h.a.Page_link},"Back to Home? ",u.a.createElement(d.b,{to:"/"},"Click Here"))));return this.props.loading&&(n=u.a.createElement(_.a,null)),u.a.createElement(u.a.Fragment,null,t,n)}}]),a}(s.Component);a.default=Object(p.b)(function(e){return{loading:e.auth.loading,catererAuthenticated:e.auth.catererAuthenticated}},function(e){return{onCatererSignup:function(a){return e(C.c(a))},onSetAuthRedirect:function(a){return e(C.v(a))}}})(E)},98:function(e,a,t){e.exports={Form_wrapper:"Form_Form_wrapper__akasy",Form_page:"Form_Form_page__1yxdr",Page_form:"Form_Page_form__NLBLl",Form_group:"Form_Form_group__3Bm52",Form_field:"Form_Form_field__2kD3T",Invalid:"Form_Invalid__1eWLp",Page_link:"Form_Page_link__oMrTD"}}}]);
//# sourceMappingURL=10.e3302f91.chunk.js.map