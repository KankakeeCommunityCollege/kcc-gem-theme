/*
// Custom JS | written by https://github.com/wdzajicek
// © 2020 Kankakee Community College
// =================================================== */
// Module to retrieve our cached Google Sheet response from sessionStorage
// 1. Create an object that replicates an API response where `response.result.values`
//    is an array containing an array representing each row in the sheet.
// 2. Then we pass our mock-sheet response object to the `createAlertsHtml` module to
//    build and inject the alert into the DOM.
import createAlertsHtml from './createAlertsHtml.js';

const cache = window.sessionStorage;

function createCachedResponseObject(resolve) {
  let cachedResponse = {  // Reconstructing our own Google Sheet-like response from the sessionStorage items
    result: {
      values: [
        0, // First two rows aren't used by the `createAlertsHtml()` function
        0,
        [
          cache.Visible,
          cache.getItem('All-Pages'),
          cache.getItem('Alert-Content'),
          cache.getItem('Alert-Expiration'),
          cache.Start,
          cache.End,
          cache.getItem('Alert-type/Color-scheme')
        ]
      ]
    }
  }
  createAlertsHtml(cachedResponse, resolve);
}

function getCachedResponse(resolve) {
  try {
    createCachedResponseObject(resolve);
  } catch (error) {
    console.error(`Error retrieving cached response in sessionStorage:\nName: ${error.name}\nMessage: ${error.message}\n${error}`);
  }
}

export default getCachedResponse;