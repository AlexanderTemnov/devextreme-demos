// This code is used for backwards compatibility with the older jsPDF variable name
// Read more: https://github.com/MrRio/jsPDF/releases/tag/v2.0.0
window.jsPDF = window.jspdf.jsPDF;

$(() => {
  const lastPoint = { x: 0, y: 0 };
  const dataGrid = $('#gridContainer').dxDataGrid({
    dataSource: countries,
    keyExpr: 'ID',
    showBorders: true,
    toolbar: {
      items: [
        'groupPanel',
        {
          widget: 'dxButton',
          location: 'after',
          options: {
            icon: 'exportpdf',
            text: 'Export to PDF',
            onClick() {
              // eslint-disable-next-line new-cap
              const doc = new jsPDF();
              DevExpress.pdfExporter.exportDataGrid({
                jsPDFDocument: doc,
                component: dataGrid,
                topLeft: { x: 1, y: 15 },
                columnWidths: [30, 20, 30, 15, 22, 22, 20, 20],
                customDrawCell({ rect }) {
                  if (lastPoint.x < rect.x + rect.w) {
                    lastPoint.x = rect.x + rect.w;
                  }
                  if (lastPoint.y < rect.y + rect.h) {
                    lastPoint.y = rect.y + rect.h;
                  }
                },
              }).then(() => {
                const header = 'Country Area, Population, and GDP Structure';
                const pageWidth = doc.internal.pageSize.getWidth();
                doc.setFontSize(15);
                const headerWidth = doc.getTextDimensions(header).w;
                doc.text(header, (pageWidth - headerWidth) / 2, 20);

                const footer = 'www.wikipedia.org';
                doc.setFontSize(9);
                doc.setTextColor('#cccccc');
                const footerWidth = doc.getTextDimensions(footer).w;
                doc.text(footer, (lastPoint.x - footerWidth), lastPoint.y + 5);

                doc.save('Companies.pdf');
              });
            },
          },
        },
        'searchPanel',
      ],
    },
    columns: [
      'Country',
      'Area',
      {
        caption: 'Population',
        columns: [{
          caption: 'Total',
          dataField: 'Population_Total',
          format: 'fixedPoint',
        }, {
          caption: 'Urban',
          dataField: 'Population_Urban',
          dataType: 'number',
          format: { type: 'percent' },
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
            dataField: 'GDP_Agriculture',
            width: 95,
            format: {
              type: 'percent',
              precision: 1,
            },
          }, {
            caption: 'Industry',
            dataField: 'GDP_Industry',
            width: 80,
            format: {
              type: 'percent',
              precision: 1,
            },
          }, {
            caption: 'Services',
            dataField: 'GDP_Services',
            width: 85,
            format: {
              type: 'percent',
              precision: 1,
            },
          }],
        }],
      },
    ],
  }).dxDataGrid('instance');
});
