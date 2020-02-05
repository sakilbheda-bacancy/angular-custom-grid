import { Component, OnInit } from '@angular/core';
import { ExportService } from '../../../app/Services/export.service';
import { FilterPipe } from '../../../app/Pipes/filter.pipe';

@Component({
  selector: 'table-grid',
  templateUrl: './table-grid.component.html',
  styleUrls: ['./table-grid.component.scss']
})

export class TableGridComponent implements OnInit {

  // #region "Variables"

  pageNumber = 1;
  perPageLimit = 4;
  pageWiseArray = [];
  search:string = "";
  users:any[] = [
    {
      "Name":"Romin Irani",
      "Designation":"Developer",
      "Number":"408-1234567",
      "Email":"romin.k.irani@gmail.com"
    },
    {
      "Name":"Neil Irani",
      "Designation":"Developer",
      "Number":"408-1111111",
      "Email":"neilrirani@gmail.com"
    },
    {
      "Name":"Tom Hanks",
      "Designation":"Program Directory",
      "Number":"408-2222222",
      "Email":"tomhanks@gmail.com"
    },
    {
      "Name":"Keebler Hilpert",
      "Designation":"Designer",
      "Number":"408-1234568",
      "Email":"keeblerHilpert@gmail.com"
    },
    {
      "Name":"sildenafil citrate",
      "Designation":"Tester",
      "Number":"408-4444444",
      "Email":"sildenafilcitrate@gmail.com"
    },
    {
      "Name":"Schmitt Weissnat",
      "Designation":"UX Designer",
      "Number":"408-3333333",
      "Email":"schmittweissnat@gmail.com"
    },
    {
      "Name":"Dunlap Hubbard",
      "Designation":"Designer",
      "Number":"408-4123695",
      "Email":"dunlapHubbard@gmail.com"
    },
    {
      "Name":"Kirsten Sellers",
      "Designation":"Developer",
      "Number":"408-9877637",
      "Email":"kirstenSellers@gmail.com"
    },
    {
      "Name":"Acosta Robbins",
      "Designation":"Developer",
      "Number":"408-5896324",
      "Email":"acostaRobbins@gmail.com"
    }    
  ];
  sortingColumn:string = "";
  sortType:string = "";
  actualUsers:any[] = [];

  // #endregion

  constructor(private exportService:ExportService, public filterPipe:FilterPipe){
  }

  ngOnInit(){
    this.actualUsers = JSON.parse(JSON.stringify(this.users));
    this.changePage();
  }

  // #region "Functions"

  // pageChanged() - Event is fired when page is changed.
  pageChanged(event) {
    this.pageNumber = event.page;
    this.changePage();
  }

  // changePage() - Display records according to page.
  changePage(){
    this.pageWiseArray = [];
    for(let j=((this.perPageLimit * this.pageNumber) - this.perPageLimit); 
            j<(this.perPageLimit * this.pageNumber); 
            j++){
      if(j < this.users.length)
        this.pageWiseArray.push(this.users[j]);
    }
  }

  // exportCSV() - Export to csv.
  exportCSV(){
    this.exportService.exportExcel(this.pageWiseArray, "Users");
  }

  // filterUser() - Filter user according to search value.
  filterUser(){
    if(this.search){
      this.users = this.filterPipe.transform(this.actualUsers, ['Name', 'Designation', 'Number', 'Email'], this.search);
      this.changePage();
      this.sortUser(this.sortingColumn);
    }else{
      this.users = this.actualUsers;
    }
  }

  // sortUser() - Sort users according to column.
  sortUser(columnName:string){
    if(!this.sortingColumn || this.sortingColumn != columnName){
      this.sortType = "ASC";
    }

    this.sortingColumn = columnName;
    if(!this.sortType || this.sortType === "DESC"){
      this.users.sort((a, b) => (a[columnName] > b[columnName]) ? 1 : -1);
      this.sortType = "ASC";
    }else{
      this.users.sort((a, b) => (a[columnName] > b[columnName]) ? -1 : 1);
      this.sortType = "DESC";
    }
    this.changePage();
  }

  // #endregion

}
