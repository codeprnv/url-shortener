// server\src\utils\base62.js

const alphabet =
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'; // 0-9, a-z, A-Z
const base = alphabet.length; // 62

/*
 * Encodes a base-10 integer into base-62 string
 * @param {number} num The number to encode
 * @returns {string} The encoded base-62 string.
 */
function encode(num) {
  if (num === 0) {
    return alphabet[0];
  }

  let encoded = '';
  while (num > 0) {
    const remainder = num % base;
    num = Math.floor(num / base);
    encoded = alphabet[remainder] + encoded;
  }
  return encoded;
}

/*
 * Decodes a base-62 string into a base-10 integer.
 * @param {string} str The base-62 string to decode
 * @returns {number} The decoded number.
 */
function decode(str) {
  let decoded = 0;
  while (str) {
    const index = alphabet.indexOf(str[0]);
    const power = str.length - 1;
    decoded = index * Math.pow(base, power);
    str = str.substring(1);
  }
  return decoded;
}

export { encode, decode };
