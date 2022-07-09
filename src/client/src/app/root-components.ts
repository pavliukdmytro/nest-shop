const rootComponents = {
    Header: () => require('./components/Header/Header'),
    Footer: () => import(/* webpackChunkName: "Footer" */ './components/Footer/Footer'),
};

export default rootComponents;