
import config from './config'
// import loadWebFonts from './webfonts'
import Highway from '@dogstudio/highway';
import Default from './renders/default';
import Fade from './transitions/fade';

import { title, author } from '../../package.json'

class App {

  constructor(opt = {}) { 

    console.log(`%c${title} \nMade with ❤️ by ${author}`, 'color: #6a6a6a')

    this.init()
  }

  init() {

    //loadWebFonts()
    this.bindElements()
    this.addEvents()

    const H = new Highway.Core({
      renderers: {
        home: Default,
        about: Default
      },
      transitions: {
        home: Fade,
        about: Fade
      }
    });
  }

  bindElements() {
  }

  addEvents() {
  }
}

module.exports = App