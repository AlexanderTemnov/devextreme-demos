$(() => {
  DevExpress.setTemplateEngine('underscore');

  window.formatCurrency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format;

  $('#gallery').dxGallery({
    dataSource: gallery,
    height: 440,
    width: '100%',
    loop: true,
    showIndicator: false,
    itemTemplate: $('#item-template'),
  });
});
