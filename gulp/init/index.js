import { exec } from 'child_process';
import fs from 'fs';
import chalk from 'chalk'
import inquirer from 'inquirer'
import { Spinner } from 'cli-spinner'
import del from 'del'

import choices from './choices.js'
import pkg from '../../package.json'


const questions = [{
  type: 'input',
  name: 'app_name',
  message: 'App name',
  default: 'App'
},{
  type: 'list',
  name: 'markup',
  message: 'Ejs (static) or Php:',
  choices: choices(`${__dirname}/markup/`)
},{
  type: 'input',
  name: 'app_url',
  message: 'Add url',
  default: 'localhost:8000'
}]


function updatePackageFile(appName, url, extensions) {
  //pkg.title = appName;
  //pkg.extensions = extensions;

  if(url !== 'localhost:8000') {
    pkg.port = null
    pkg.prodURL = url
  }

  console.log(chalk.green(`Your App will be served: ${url}`));

  fs.writeFile(`${process.cwd()}/package.json`, JSON.stringify(pkg, undefined, 2), (error) => {} );
}

function updateSourceFiles(extensions, cb) {

  const q = [{
    type: 'confirm',
    name: 'delete_sourcefiles',
    message: `Remove files in source folder that don't have the following extensions (recommended): \ ${extensions.markup} `,
    default: true
  }]

  if( extensions.markup === 'php') {
    q[1] = {
      type: 'confirm',
      name: 'wp_starter',
      message: `Add WP Starter theme`,
      default: false
    }
  }

  inquirer.prompt(q).then((data) => {
    if (data.delete_sourcefiles) {
      let ext = ''
      if( extensions.markup === 'ejs') ext = 'php'
      if( extensions.markup === 'php') ext = 'ejs'
      del([
        //`${pkg.directories.src}/**/*.(${ext})`,
      ], cb());
    } else {
      cb();
    }

    if(data.wp_starter) {

      const spinner = new Spinner('Just a sec.');
      let clone = `git clone git://github.com/mariosmaselli/wp-theme-starter.git`;
      let move = `cd wp-theme-starter && mv * ../ && cd .. && rm -rf wp-theme-starter`
      
      spinner.setSpinnerString('|/-\\');
      spinner.start();

      function moveFiles() {

        console.log(chalk.green('Moving wp-theme to root'))
        setTimeout( ()=> {
          exec( move, (err, mss)=> {
          console.log(mss)
          if (err !== null) {
             console.log(err);
           }
         })
        },500) 
      }

      console.log(chalk.green(
        'Cloning WP Starter theme...',
      ));

      exec(clone, (error, stdout)=> {
        spinner.stop();
        console.log(stdout);
        moveFiles()
        if (error !== null) {
          console.log(error);
        }
      });
      cb();
    }else {
      cb();
    }
  });
}

function updateDependencies(dependencies, devDependencies) {

  let command = '';
  
  if (dependencies.join('') !== '') {
    command += `npm install --save ${dependencies.join(' ')} && `;
  }
  if (devDependencies.join('') !== '') {
    command += `npm install --save-dev ${devDependencies.join(' ')} && `;
  }
  command += 'npm install';
  if (dependencies || devDependencies) {
    const spinner = new Spinner('This may take a while.');
    spinner.setSpinnerString('|/-\\');
    spinner.start();

    console.log(chalk.green(
      'Installing dependencies and adding them to package.json...',
      dependencies.join(' '),
      devDependencies.join(' ')
    ));

    exec(command, (error, stdout) => {
      spinner.stop();
      console.log(stdout);
      if (error !== null) {
        console.log(error);
      }
    });
  }
  
}


inquirer.prompt(questions).then((data) => {

  const extensions = {
    markup: data.markup.extension || 'ejs'
  };

  updatePackageFile(data.app_name, data.app_url , extensions);

  updateSourceFiles(extensions, () => {
    const dependencies = [
      ...(data.markup.dependencies || []),
    ];
    const devDependencies = [
      ...(data.markup.devDependencies || []),
    ];
    updateDependencies(dependencies, devDependencies);
  
  })
 
})