/*
// Custom JS | written by https://github.com/wdzajicek
// © 2020 Kankakee Community College
// =================================================== */
import createAlertsHtml from './createAlertsHtml';

const apiKey = 'AIzaSyCEBsbXfFcdbkASlg-PodD1rT_Fe3Nw62A';
const sheetParams = {
  spreadsheetId: '1pqYRAhZvOHB52KqttV_d5P8qWvh9j8pPR15MCoGjMK0',
  range: 'Alerts'
};

const pageHasAccordionOrTabs = (document.querySelector('#accordion') || document.querySelector('.navTabs'));

function importHashLinkModule(Collapse) {
  import('./contentHashLink')
    .then(({ default: contentHashLink }) => contentHashLink(Collapse));
}

async function fetchSheetData(spreadsheetId, range, apiKey) {
  // Use encodeURIComponent to handle spaces and '!' in the range string
  const encodedRange = encodeURIComponent(range);
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodedRange}?key=${apiKey}`;

  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Google Sheets API Error: ${error.error.message}`);
    }

    const data = await response.json();
    
    // Google returns an empty object if the range is empty; 
    // we default to an empty array for consistency.
    return data.values || [];
  } catch (err) {
    console.error("Failed to fetch sheet data:", err);
    throw err;
  }
}

export default function alerts(Collapse) {
  if (!document.getElementById('emergencyAlerts') && pageHasAccordionOrTabs) {
    // Handle page with no emergency alerts
    importHashLinkModule(Collapse);
  } else {
    // Handle pages with alerts
    // const response = await fetchSheetData(sheetParams.spreadsheetId, sheetParams.range, apiKey);
    fetchSheetData(sheetParams.spreadsheetId, sheetParams.range, apiKey)
      .then(response => {
        createAlertsHtml(response);
        if (pageHasAccordionOrTabs) {
          importHashLinkModule(Collapse);
        }
      })
      .catch(error => {
        console.error("Error received:", error.message);
        if (pageHasAccordionOrTabs) {
          importHashLinkModule(Collapse);
        }
      })
  }
}
