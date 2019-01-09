Project Starter
=========================

> An ES6 boilerplate with common frontend tasks using Gulp 4 as build system.

This is a work in progress. Feel free to contribute. 

## Install
### Requirements

Node (use brew or install it from [here](https://nodejs.org/en/))

```bash
brew install node
```

Gulp ([Getting started](https://github.com/gulpjs/gulp/tree/master/docs/getting-started))

```bash
install --global gulp-cli
```

### Clone this repository

*OSX*

```bash
git clone https://github.com/mariosmaselli/project-starter.git
```

### Start a new project

This step sets up the boilerplate to fit your needs (App Name,  URL, Markup). It should only be ran once. 

```bash
npm run init
```

### Install an existing project

Then each time you clone the repo, use:

```bash
npm install
```

## Usage

### Configuration

|**src**: the source folder path, that's where you write code.
|**dist**: the destination folder path, that's where your code is compiled.


### Tasks

#### Launch it

This is the default task.

```bash
npm run dev
```
All the magic begins here:

* process `.ejs` files
* process `.scss` files
* process `.js` files
* create a server with BrowserSync and serve `dist` folder
* watch changes in source folder
* reload on changes in source folder


#### Make changes

 * Write your markup in `src` folder and in `src/templates` && `src/views`. 
 * Add some `scss` styles.
 * Add some `scripts`: `.js`.
 * Add images in the `images` folder.
 
#### Build

When you are happy with your changes, run:

```bash
npm run prod
```

* Replace build tags with `.min` files, generates these minified files in `dist` folder (with optimization tasks)



#### Clean it

Clean dist dir (except static folder) and clear all caches (sass cache, gulp cache)

```bash
gulp clean
```


## Licence

MIT
