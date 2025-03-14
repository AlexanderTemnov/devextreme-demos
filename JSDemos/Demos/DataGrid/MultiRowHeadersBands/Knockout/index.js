window.onload = function () {
  const viewModel = {
    gridOptions: {
      dataSource: countries,
      columnAutoWidth: true,
      allowColumnReordering: true,
      showBorders: true,
      columns: ['Country', {
        headerCellTemplate(container) {
          container.append($('<div>Area, km<sup>2</sup></div>'));
        },
        dataField: 'Area',
      }, {
        caption: 'Population',
        columns: [{
          caption: 'Total',
          dataField: 'Population_Total',
          format: 'fixedPoint',
        }, {
          caption: 'Urban',
          dataField: 'Population_Urban',
          format: 'percent',
        }],
      }, {
        caption: 'Nominal GDP',
        columns: [{
          caption: 'Total, mln $',
          dataField: 'GDP_Total',
          format: 'fixedPoint',
          sortOrder: 'desc',
        }, {
          caption: 'By Sector',
          columns: [{
            caption: 'Agriculture',
            width: 95,
            dataField: 'GDP_Agriculture',
            format: {
              type: 'percent',
              precision: 1,
            },
          }, {
            caption: 'Industry',
            width: 80,
            dataField: 'GDP_Industry',
            format: {
              type: 'percent',
              precision: 1,
            },
          }, {
            caption: 'Services',
            width: 85,
            dataField: 'GDP_Services',
            format: {
              type: 'percent',
              precision: 1,
            },
          }],
        }],
      }],
    },
  };

  ko.applyBindings(viewModel, document.getElementById('grid'));
};
