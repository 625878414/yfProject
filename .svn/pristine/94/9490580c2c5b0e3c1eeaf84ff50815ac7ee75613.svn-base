import Vue from 'vue';
import Router from 'vue-router';
import routes from './router';
import { message } from 'ant-design-vue';
import store from '@/store';
import { getLocationHash, parseQueryString } from "@/libs/util";
Vue.use(Router);
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};
const router = new Router({
    routes,
    mode: 'hash'
});
router.beforeEach((to, from, next) => {
    if (!!to.name) {
        store.commit('setState', { key: 'currentRoute', value: to.name });
        if(!!to.meta.template && (to.meta.template.indexOf('main')>-1 || to.meta.template.indexOf('admin')>-1)){
            store.commit('setSelectMenuCache',to);
            next();
        }else{
            next();
        }
    } else {
        //直接刷新页面
        let hash = getLocationHash();
        let path = hash.split('#')[1];
        let params = parseQueryString(window.location.href);
        store.dispatch("getUserInfo", () => {
            let r = router.match(path);
            if (!!r.name) {
                let parentId = r.meta.parentIds.length>0?r.meta.parentIds[0]:"";
                if(!!parentId){
                    store.dispatch("setMenuList",{
                        id:parentId,
                        callback: () => {
                            router.push({
                                path: r.path,
                                query: params
                            });
                        }
                    });
                }else{
                    router.push({
                        path: r.path,
                        query: params
                    });
                }
                store.commit('setState', { key: 'currentRoute', value: r.name });
            } else {
                if (path == '/index') {
                    message.error('首页未设置');
                    router.push({
                        path: '/500'
                    });
                } else {
                    router.push({
                        path: '/404'
                    });
                }
            }
        });
    }
});
router.afterEach(to => {
    window.scrollTo(0, 0);
});
router.$addRoutes = (params) => {
    router.addRoutes(params)
};
export default router
