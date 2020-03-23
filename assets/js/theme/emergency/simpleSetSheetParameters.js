function setId(params, i) {
  return params.spreadsheetId = i;
}

function setRange(params, r) {
  return params.range = r;
}

function setSheetParameters(key, tab) {
  let sheetParams = {};

  setId(sheetParams, key);
  setRange(sheetParams, tab);
  return sheetParams;
}
//
//  USAGE:
//    const SHEET_KEY = '1spDfZUVLeEE5n0OFvbXl2FSJD_RmS0dSPc7CSGr1TjI'; // Long string from the URL of the Google Sheet
//    const  TAB_NAME = 'Scholarships Count' // Name as it appears on the "tab" of the desired sheet. Usually "Sheet1", "Sheet2", etc. if not renamed.
//
//    const sheetParams = setSheetParameters(SHEET_KEY, TAB_NAME);
//
export default setSheetParameters;
