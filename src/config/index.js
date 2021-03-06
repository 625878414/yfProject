const debug = process.env.NODE_ENV == "development";
export default {
  hideHeaderMenu: true,
  lang: "zh",
  isCollect: false,
  isBreadcrumb: false,
  loginVerifyType: false,
  menuMode: 1,//1.代表全集 2代表同级
  debug: debug,
  defaultThemeIndex: 1, //-1表示无主题切换
  skinTheme: [
    {
      color: "rgb(0 198 255)",
      label: "白天",
      href: "static/css/white-theme.css"
    },{
      color: "rgb(50 247 24)",
      label: "黑夜",
      href: "static/css/dark-theme.css",
    }, 
  ],
  testAccount: {
    userName: "kstc",
    password: "111111"
  },
}
