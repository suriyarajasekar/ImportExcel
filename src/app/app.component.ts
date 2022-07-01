import { Component, OnInit } from '@angular/core';
// import * as faker from 'faker';
import { faker } from '@faker-js/faker';
import {  ElementRef, ViewChild } from '@angular/core';  
//...................
import * as XLSX from 'xlsx';
//.........................
import { Contact } from './contact.model';
import { ExcelService } from './excel.service';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  //.................................................

  @ViewChild('TABLE', { static: false })
  TABLE!: ElementRef;  
  title = 'Excel';  
  ExportTOExcel() {  
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);  
    const wb: XLSX.WorkBook = XLSX.utils.book_new();  
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
    XLSX.writeFile(wb, 'ScoreSheet.xlsx');  
  }  
  team: any = [{  
    Sno: '1',  
    Team: 'India',  
    Match:' 8',  
    Win: '7',  
    Loss: 0,  
    Cancel: 1,  
    Point: 15  
  
  }, {  
    Sno: '2',  
    Team: 'NewZeland',  
    Match:'8',  
    Win: '6',  
    Loss: 1,  
    Cancel: 1,  
    Point: 13  
  
  },  
  {  
    Sno: '3',  
    Team: 'Aus',  
    Match: '8',  
    Win: '6',  
    Loss: 1,  
    Cancel: 1,  
    Point: 13  
  
  },  
  {  
    Sno: '4',  
    Team: 'England',  
    Match: '8',  
    Win: '5',  
    Loss: 2,  
    Cancel: 1,  
    Point: 11  
  },  
  {  
    Sno: '5',  
    Team: 'S.Africa',  
    Match: '8',  
    Win: '4',  
    Loss: 3,  
    Cancel: 1,  
    Point: 9  
  },  
  // {  
  //   Sno: '6',  
  //   Team: 'Pak',  
  //   Match: 8,  
  //   Win: 4,  
  //   Loss: 4,  
  //   Cancel: 1,  
  //   Point: 9  
  
  // },  
  // {  
  //   Sno: '7',  
  //   Team: 'SriLanka',  
  //   Match: 8,  
  //   Win: 3,  
  //   Loss: 3,  
  //   Cancel: 2,  
  //   Point: 8  
  
  // },  
  // {  
  //   Sno: '8',  
  //   Team: 'Bdesh',  
  //   Match: 8,  
  //   Win: 2,  
  //   Loss: 4,  
  //   Cancel: 2,  
  //   Point: 6  
  
  // }  
  ];  

  //..................................................
  [x: string]: any;

  importContacts: Contact[] = [];
  exportContacts: Contact[] = [];

  constructor(private excelSrv: ExcelService) { }

  ngOnInit(): void {
    // type Employee = Array<{ id: number; name: string }>;
    // employees: Employee= [
    //   { id: 1, name: "Ram" },
    //   { id: 2, name: "John" },
    //   { id: 3, name: "Franc" },
    //   { id: 4, name: "Andrew " }
    // ];
    // type Employee = Array<{ id: number; name: string }>;
    
    // this.employees.setValue([
    //   { empId: "111", empName: "Mohan", skill: "Java"},
    //   { empId: "112", empName: "Krishna", skill: "Angular"}	
    // ]);
    ///....................................
    class Employee {
      empId = '';
      empName = ''; 
      skill = '';
    }
    //...............................................
    let bb=new Contact();
  bb = { 
    name:"aaa",
    email:"ssss",
    phone:"3333",
    address:"5555"
  } 
  //............................................................

  let bb1 = [
    {
      name:"aaa",
      email:"ssss",
      phone:"3333",
      address:"5555"
    },
    {
      name:"aaa1",
    email:"ssss1",
    phone:"33331",
    address:"55551"
    },
    {
      name:"aaa2",
    email:"ssss2",
    phone:"33332",
    address:"55552"
    },
    {
      name:"aaa3",
    email:"ssss3",
    phone:"33333",
    address:"55553"
    },]
   //......................................................................

    for (let index = 0; index < 10; index++) {
      const contact = new Contact();
      // contact.name = faker.name.findName();
      // contact.phone = faker.phone.phoneNumber();
      // contact.email = faker.internet.email();
      // contact.address = faker.address.streetAddress();
      //......................................................

      // contact.name = bb.name
      // contact.phone = bb.phone
      // contact.email = bb.email
      // contact.address = bb.address
      //..................................................

      contact.name = bb1[index].name;
      contact.phone = bb1[index].phone;
      contact.email = bb1[index].email;
      contact.address = bb1[index].address;
      //.........................................
      // contact.name = "hjggjh";
      // contact.phone = "77777";
      // contact.email = "ggggg";
      // contact.address = "nnnnn";
      //................................................
      // contact.name =this.emp1.empId;
      // contact.phone =this.emp1.empName
      // contact.email = this.emp1.skill
      // contact.address = "nnnnn";
      //............................
      //......................................................
      // contact.name = this.team.Sno();
      // contact.phone = this.team.Match();
      // contact.email = this.team.Team(); 
      // contact.address = this.team.Win();
      //...............................................
      // contact.name =this. emp1.empName;
      
      // contact.email =emp1.empId;
     
      //...............................................
      this.exportContacts.push(contact); // contact.address = faker.address.streetAddress();
    }

  }

  onFileChange(evt: any) {
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {

      const bstr: string = e.target.result;
      const data = <any[]>this.excelSrv.importFromFile(bstr);

      const header: string[] = Object.getOwnPropertyNames(new Contact());
      const importedData = data.slice(1, -1);

      this.importContacts = importedData.map(arr => {
        //........................
        // const obj:Contact = {
        //   name: '',
        //   email: '',
        //   phone: '',
        //   address: ''
        // };
        // var al:string[];
        // var k:string;
        //....................................
      // const obj:string={};
      //....................................................
        var obj :any={};
    
        for (let i = 0; i < header.length; i++) {
          // k = header[i];
          // obj[k  as keyof typeof obj] = arr[i];
          //........................
          const k = header[i];
          obj[k] = arr[i];
         //.......................
        }
        return <Contact>obj;
      })

    };
    reader.readAsBinaryString(target.files[0]);

  }

  exportData(tableId: string) {
    this.excelSrv.exportToFile("contacts", tableId);
  }

}