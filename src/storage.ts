import {Injectable} from '@angular/core';

export abstract class Storage {
  abstract getItem(key: string): string;
  abstract setItem(key: string, value: string): void;
}

@Injectable()
export class LocalStorage implements Storage {
  getItem(key: string): string {
    return localStorage.getItem(key);
  }
  setItem(key: string, value: string): void {

    localStorage.setItem(key, value);
  }
}

@Injectable()
export class InMemoryStorage implements Storage {
  private data: {[key: string]: string} = {};

  getItem(key: string): string {
    return this.data[key] || null;
  }

  setItem(key: string, value: string): void {
    this.data[key] = value;
  }
}
