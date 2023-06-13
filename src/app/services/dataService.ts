import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import *as XLSX from 'xlsx'
@Injectable({
  providedIn: 'root',
})
export class DataService {
    loopDuration=360
    GlobalData:any[]=[]
    currentData:any={}
    counter:number=0
  constructor(private httpClient: HttpClient) { }

  read(event:any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(target.files[0]);
    reader.onload = (e: any) => {
      /* create workbook */
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });

      /* selected the first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      const data = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}
      this.GlobalData=data
      this.startLoopData()
    };


    }
    startLoopData(){
        this.currentData=this.GlobalData[this.counter]
        this.counter++
        console.log(this.counter)
        if(this.counter>this.loopDuration){this.counter=0}
        setTimeout(() => {
            this.reLoop() 
        }, 500);
        
    }
    reLoop(){
        this.startLoopData()
    }
    getCurrentData(){
        return this.currentData
    }
}