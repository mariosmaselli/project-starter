import Highway from '@dogstudio/highway'
import TweenMax from 'gsap'

export default class Fade extends Highway.Transition {
  in(from, to, done) {

    window.scrollTo(0, 0)

    const tl = new TimelineMax({ 
        paused: true, 
        onComplete: ()=> done()
    })
    
    from.remove();

    tl.fromTo(to, 0.5,
      { opacity: 0 },
      { opacity: 1})

    tl.play()

  }

  out(view, done) {
    const tl = new TimelineMax({ 
      paused: true, 
      onComplete: () => done() 
    })

    tl.fromTo(view, 0.5,
      { opacity: 1 },
      { opacity: 0})
     
    tl.play()
  }
}