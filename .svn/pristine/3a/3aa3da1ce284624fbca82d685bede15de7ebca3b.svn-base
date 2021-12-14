import config from '@/config/index'
import avatar from "@/assets/images/china.png";
import lang from "@/libs/lang/index";
import { ReadLocalStorage,WriteLocalStorage } from '../../libs/util';
let themeIndex = ReadLocalStorage('theme');
if(themeIndex == null){
  themeIndex = config.defaultThemeIndex;
}
export default {
  state: {
    avatar: avatar,
    title: lang[config.lang]["title"],
    theme: themeIndex != -1?config.skinTheme:[],
    themeIndex: themeIndex,
    currentTheme: themeIndex>=0?config.skinTheme[themeIndex]:null,
    lang: config.lang,
    isBreadcrumb: !!config.isBreadcrumb,
    bodyHeight: '',
    bodyWidth: '',
    innerHeight: '',
    innerWidth: '',
    hideHeaderMenu: !!config.hideHeaderMenu,
    isCollect: !!config.isCollect,
    leftMenuWidth: 0,
    headerHeight: 100,
    menuMode: config.menuMode,
    tableParams:{

    }
  },
  getters: {},
  mutations: {
    setAppState(state, {key, value}) {
      state[key] = value;
    },
    setTitleByLang(state, langC) {
      state['title'] = lang[langC]["title"];
    },
    changeThemeIndex(state,index){
      state['themeIndex'] = index;
      WriteLocalStorage('theme',index);
    }
  },
  actions: {}
}
