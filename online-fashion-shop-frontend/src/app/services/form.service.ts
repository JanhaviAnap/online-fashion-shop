import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  getCardMonths(startMonth: number): Observable<any>{
    let data: number[] = [];
    // build an array for "Month" dropdown list
    // start at current month and loop until 12

    for (let theMonth=startMonth; theMonth<=12; theMonth++){
      data.push(theMonth);
    }

    return of(data);
  }
  
  getCardYears(): Observable<any>{
    let data: number[] = [];
    // build an array for "year" dropdown list
    // start at current year and loop for next 10 years
    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;
    
    for(let theYear=startYear;theYear<=endYear; theYear++){
      data.push(theYear);
    }

    return of(data);
  }
}
