import {
  NgModule, Component, enableProdMode, ViewChild,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxDataGridModule, DxButtonModule, DxDataGridComponent } from 'devextreme-angular';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { jsPDF } from 'jspdf';
import { Service, Employees } from './app.service';

if (!/localhost/.test(document.location.host)) {
  enableProdMode();
}

@Component({
  selector: 'demo-app',
  templateUrl: 'app/app.component.html',
  styleUrls: ['app/app.component.css'],
  providers: [Service],
})

export class AppComponent {
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;

  employees: Employees[];

  constructor(private service: Service) {
    this.employees = service.getEmployess();
  }

  exportGrid(e) {
    const doc = new jsPDF();

    exportDataGridToPdf({
      jsPDFDocument: doc,
      component: this.dataGrid.instance,
      margin: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
      },
      topLeft: { x: 0, y: 5 },
      columnWidths: [30, 30, 30, 30, 30, 30],
      onRowExporting: (arg) => {
        const isHeader = arg.rowCells[0].text === 'Picture';
        if (!isHeader) {
          arg.rowHeight = 40;
        }
      },
      customDrawCell: (arg) => {
        if (arg.gridCell.rowType === 'data' && arg.gridCell.column.dataField === 'Picture') {
          doc.addImage(arg.gridCell.value, 'PNG', arg.rect.x, arg.rect.y, arg.rect.w, arg.rect.h);
          arg.cancel = true;
        }
      },
    }).then(() => {
      doc.save('DataGrid.pdf');
    });
  }
}

@NgModule({
  imports: [
    BrowserModule,
    DxDataGridModule,
    DxButtonModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
