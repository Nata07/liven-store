/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: {
    "^.+\\.(css|less|scss)$": "babel-jest"
  },
  testEnvironment: 'jsdom',
};