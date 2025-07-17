import { cryptoAssets, cryptoData } from './data.js';

const delay = 1;

export function fakeFetchCrypto() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(cryptoData);
    }, delay);
  });
}

export function fetchAssets() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(cryptoAssets);
    }, delay);
  });
}
