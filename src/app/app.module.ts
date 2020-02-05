import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FilterPipe } from './Pipes/filter.pipe';
import { TableGridComponent } from './Components/table-grid/table-grid.component';

@NgModule({
  declarations: [
    AppComponent,
    FilterPipe,
    TableGridComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    PaginationModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
