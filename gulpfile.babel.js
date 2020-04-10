const { dest, src, task, watch, series, parallel } =  require('gulp');

const sass =require( 'gulp-sass');
const autoprefixer =require( 'gulp-autoprefixer');
const sourcemaps = require( 'gulp-sourcemaps');
const pug = require('gulp-pug');
const browsersync = require('browser-sync');
const webpack = require('webpack-stream');

const named = require('vinyl-named');

const scripts = ()=>{
  return src('./src/js/*.js')
  .pipe(named())
    .pipe(webpack({
      mode: 'production',
      module:{
        rules: [
          {
            test: /\.js$/,
            use: {
              loader: 'babel-loader'
            }
          }
        ]
      },
      output:{
        // filename: 'bundle.js'
        filename: '[name].js'
      },
      externals:{
        jquery: 'jQuery'
      }
    }))
    .pipe(dest('./js'))
}

const server = browsersync.create();

const pugjs = ()=>{
  return src('./src/pug/*.{pug,html}')
    .pipe(pug({pretty: true}))
    .pipe(dest('./'))
    .pipe(server.stream());
}

const styles = () =>{
  return src('./src/scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({'outputStyle': 'expanded'}).on('error',sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(dest('./css'))
    .pipe(server.stream());
}

const serve = done =>{
  server.init({
    server: {
      baseDir : './'
    }
  })
  done();
}
const obs = ()=>{
  watch('./src/scss/**/*.scss' , styles)
  watch('./src/**/*.pug' , pugjs)
  watch('./src/**/*.js' , scripts)
}

const dev = parallel(styles,pugjs,scripts,serve,obs);

task('default',dev);