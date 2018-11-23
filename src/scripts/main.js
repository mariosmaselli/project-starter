
import config from './config'
// import loadWebFonts from './webfonts'
// import classes from 'dom-classes'
// import {on, off} from 'dom-events'

const myApp = {

  init: function() {

    console.log('init')

    //loadWebFonts()
    this.bindElements()
    this.addEvents()
    
  },

  bindElements: function() {

  },

  addEvents: function() {

    window.addEventListener('resize', (e)=> {
      this.resize = this.resize.bind(this)
      this.resize()
    })
  },

  resize: function() {

    config.width = window.innerWidth
    config.isXS = window.innerWidth <= 500
    config.isS = window.innerWidth >= 501 && window.innerWidth <= 719
    config.isM = window.innerWidth >= 720 && window.innerWidth <= 1023
    config.isL = window.innerWidth >= 1024 


  },

  animateIn: function() {


  }

}

myApp.init();