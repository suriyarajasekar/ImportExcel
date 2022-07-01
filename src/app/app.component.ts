import { Component, OnInit } from '@angular/core';
// import * as faker from 'faker';
import { faker } from '@faker-js/faker';

import { Contact } from './contact.model';
import { ExcelService } from './excel.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
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
    // class Employee {
    //   empId = '';
    //   empName = ''; 
    //   skill = '';
    // } 
    //  const emp1 = new Employee();
    // this.emp1.setValue([
    //   { empId: "111", empName: "Mohan", skill: "Java"},
    //   { empId: "112", empName: "Krishna", skill: "Angular"}	
    // ]);
    //.................................
   
    for (let index = 0; index < 10; index++) {
      const contact = new Contact();
      contact.name = faker.name.findName();
      contact.phone = faker.phone.phoneNumber();
      contact.email = faker.internet.email();
      contact.address = faker.address.streetAddress();
      this.exportContacts.push(contact);
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