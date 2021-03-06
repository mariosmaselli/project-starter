import browserSync from 'browser-sync';

import config from '../config';

export const server = browserSync.create();

export function reload(done) {
  server.reload();
  done();
}

export function serve(done) {
  
  if(config.port === null) {
    
    server.init({
      proxy: config.prodURL,
    }, done);

  }else {

    server.init({
      server: {
        baseDir: config.dist,
        directory: false, 
        serveStaticOptions: {
          extensions: 'html'
        }
      },
      port: config.port,
    }, done);

  }

  
}

serve.description = 'Serve dist directory using browserSync.';
