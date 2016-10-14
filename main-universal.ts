import 'angular2-universal-polyfills';
import 'zone.js/dist/zone-node.js'
import 'reflect-metadata';

import * as fs from 'fs';

import {CompilerOptions, COMPILER_OPTIONS} from '@angular/core';
import {ResourceLoader} from '@angular/compiler';
import {platformUniversalDynamic, REQUEST_URL} from 'angular2-universal/node';
import {AppUniversalModule} from './src/app-universal';
// from './ngfactory/src/app-universal.ngfactory';

export class FileResourceLoader implements ResourceLoader {
  get(path: string): Promise<string> {
    return new Promise((resolve, reject) => {
      fs.exists(path, exists => {
        if (!exists) {
          return reject(new Error(`Compilation failed. Resource file not found: ${path}`))
        }
        fs.readFile(path, 'utf8', (err, data) => {
          if (err) {
            return reject(new Error(`Compilation failed. Read error for file: ${path}: ${err}`));
          }
          return resolve(data);
        });
      });
    });
  }
}

let document = fs.readFileSync('index.html').toString();

declare var Zone;
Zone.current.fork({
  name: 'universal',
  properties: {document}
}).run(() => {
  platformUniversalDynamic([{
    provide: COMPILER_OPTIONS,
    useValue: {
      providers: [{provide: ResourceLoader, useValue: new FileResourceLoader()}],
    } as CompilerOptions,
    multi: true,
  }])
    .serializeModule(AppUniversalModule, {
      preboot: false
    })
    .then(html => {
      try {
        fs.mkdirSync('tmp/app-shell');
      } catch (e) {}
      fs.writeFileSync('tmp/app-shell/index.html', html, {encoding: 'utf8'});
    });
});
