const commonJs = require('rollup-plugin-commonjs');
const childProcess = require('child_process');
const fs = require('fs');
const gulp = require('gulp');
const nodeResolve = require('rollup-plugin-node-resolve');
const rimraf = require('rimraf');
const rollup = require('rollup');
const runSequence = require('run-sequence');
const closure = require('google-closure-compiler-js');

class RollupRx {
  resolveId(id, from){
    if(id.startsWith('rxjs/')){
      return `${__dirname}/node_modules/rxjs-es/${id.split('rxjs/').pop()}.js`;
    }
  }
}

function closureCompilerPlugin(options: any = {}){
  return {
    transformBundle(bundle){
      const compilation = Object.assign({}, options, {
        jsCode: options.jsCode ? options.jsCode.concat({ src: bundle }) : [{ src: bundle }]
      });
	  console.log('closure compiler optimizing...');
      const transformed = closure.compile(compilation);
	  console.log('closure compiler optimizing complete');
	  return { code: transformed.compiledCode, map: transformed.sourceMap };
    }
  }
}

import {gulpGenerateManifest, gulpAddStaticFiles} from '@angular/service-worker/build';

gulp.task('build', done => runSequence(
  'task:clean',
  'task:ngc',
  'task:rollup',
  'task:shell',
  [
    'task:static',
    'task:images',
  ],
  'task:service-worker',
  'task:worker-script',
  done
));

gulp.task('task:clean', done => {
  rimraf('tmp', () => rimraf('dist', () => done()));
});

gulp.task('task:ngc', () => {
  childProcess.execSync('./node_modules/.bin/ngc -p tsconfig-esm.json');
});

gulp.task('task:rollup', done => {
  rollup
    .rollup({
      entry: 'tmp/ngc/main-static.js',
      plugins: [
        new RollupRx(),
        nodeResolve({jsnext: true, main: true}),
        commonJs({
          include: 'node_modules/**',
          exclude: ['node_modules/rxjs/**'],
          namedExports: {
            'node_modules/angular2-universal/browser.js': ['UniversalModule', 'prebootComplete', 'platformUniversalDynamic'],
          }
        }),
        closureCompilerPlugin({ compilationLevel: 'SIMPLE' }),
      ],
    })
    .then(bundle => bundle.write({
      format: 'iife',
      dest: 'tmp/rollup/app.js',
    }))
    .then(() => done(), err => console.error('output error', err));
});

gulp.task('task:uglifyjs', () => {
  fs.mkdirSync('tmp/uglifyjs');
  childProcess.execSync('node_modules/.bin/uglifyjs -m --screw-ie8 tmp/rollup/app.js -o tmp/uglifyjs/app.min.js')
})

gulp.task('task:worker-script', () => gulp
  .src([
    'node_modules/@angular/service-worker/bundles/worker-basic.js',
  ])
  .pipe(gulp.dest('dist'))
);

gulp.task('task:static', () => gulp
  .src([
    'manifest.webmanifest',
    'node_modules/zone.js/dist/zone.js',
    'tmp/app-shell/index.html',
    'tmp/rollup/app.js',
  ])
  .pipe(gulp.dest('dist'))
);

gulp.task('task:images', () => gulp
  .src([
    'images/**/*.*',
  ])
  .pipe(gulp.dest('dist/images'))
);

gulp.task('task:shell', () => {
  childProcess.execSync('node ./main-universal-entry.js');
});

gulp.task('task:service-worker', () => gulp
  .src('ngsw-manifest.json')
  .pipe(gulpAddStaticFiles(gulp.src([
    'dist/**/*.*'
  ]), {manifestKey: 'static'}))
  .pipe(gulp.dest('dist'))
);
