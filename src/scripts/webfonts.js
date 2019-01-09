import WebFont from 'webfontloader'


export default function init() {
  
  WebFont.load({
    custom: {
      families: [],
        //urls: [ `${APP.THEME_URL}/dist/assets/fonts/fonts.css` ]
    }
  })
}
