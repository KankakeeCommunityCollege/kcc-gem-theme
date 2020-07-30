const TABLE_SETTINGS_OBJECT = {
  dom: 'Pfrtip',
  responsive: true, // Activate responsive powers GO!
  paging: false, // Don't paginate. Schedule schould all be on one page
  'order': []//, // Initial column ordering
};

function importDataTables(tableSelector) {
  import(/* webpackChunkName: 'select' */ 'datatables.net-select-dt').then(() => {
    import(/* webpackChunkName: 'searchPanes' */ 'datatables.net-searchpanes-dt').then(() => {
      import(/* webpackChunkName: 'responsive' */ 'datatables.net-responsive-dt').then(() => {
        $(tableSelector).DataTable(TABLE_SETTINGS_OBJECT);
      });
    });
  });
}

function initDataTables(tableSelector) {
  if ( document.querySelector(tableSelector) ) {
    importDataTables(tableSelector);
  }
}

export default initDataTables;