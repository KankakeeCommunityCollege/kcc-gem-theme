/*
// Custom JS | written by https://github.com/wdzajicek
// © 2020 Kankakee Community College
// =================================================== */
// Modules' default function stores our Google Sheet response in sessionStorage to be retrieved later
// Each key gets set to a column in our data
// Each key's value gets set to the corresponding cell in the row below
// ====================================================================
function cacheResponse(response) { // response from Google API's spreadsheet.values.get() method
  const VALUES = response.result.values; // This is where the table's data is in a Sheets response in Sheets API V4
  const TABLE_HEADER_ROW = VALUES[1]; // 2nd row in the sheet (first row is instructions to the user)
  const TABLE_BODY_ROW = VALUES[2]; // The only row of data in our table
  
  for (let i = 0, len = TABLE_BODY_ROW.length; i < len; i++ ) {
    const cell = TABLE_BODY_ROW[i];
    const column = TABLE_HEADER_ROW[i];

    window.sessionStorage.setItem(column.replace(' ', '-'), cell);
  }
  //window.sessionStorage.clear();
}

export default cacheResponse;