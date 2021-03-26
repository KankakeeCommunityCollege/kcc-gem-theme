/*
// Custom JS | written by https://github.com/wdzajicek
// © 2020 Kankakee Community College
// =================================================== */
import start from './campusAlertsSheetsAPI.js';
import getCachedResponse from './getCachedResponse.js';
import checkForPrefersReducedMotion from './checkForPrefersReducedMotion.js';

document.addEventListener('DOMContentLoaded', () => {
  checkForPrefersReducedMotion();

  ! window.sessionStorage.getItem('Alert-Content') ? // Checks if our cached alert is already in sessionStorage
    gapi.load('client', start) // If not, build the alert from a new Google API response
  : getCachedResponse(); // Otherwise, build the alert from our cached response
});
