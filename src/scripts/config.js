import domselect from 'dom-select'

const config = {
	
	BASE: '/',
	
	body: document.body,
	header: domselect('header'),
	view: domselect('main'),
	logo: domselect('.logo a'),
  
	width: window.innerWidth,
	height: window.innerHeight,

  isXS: window.innerWidth <= 500,
  isS:  window.innerWidth >= 501 && window.innerWidth <= 719,
  isM: window.innerWidth >= 720 && window.innerWidth <= 1023,
  isL: window.innerWidth >= 1024 
}

export default config