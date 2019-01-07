import Highway from '@dogstudio/highway'

class Default extends Highway.Renderer {
  
  onEnter() {  

  }
  onLeave() { 

  }
  onEnterCompleted() { 
    console.log('enter completed')

  }
  onLeaveCompleted() { 
    console.log('leave completed')

  }
}

export default Default