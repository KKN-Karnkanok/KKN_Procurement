import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  url = 'https://localhost:44318/'
  constructor(private http: HttpClient,
  ) { }

  /**
 * GET
 */
  public getSupplierList() {
    console.log('--get Supplier List---')
    return this.http.get(this.url + 'api/Supplier/GetDataSupplierList').pipe(
      catchError(err => this.catchErrLogout(err)),
      tap((result: any) => {
        console.log("----result getSupplierList", result);
      }));
  };
  public getSupplierGroupList() {
    console.log('--getSupplierGroup--');
    return this.http.get(this.url + 'api/Supplier/GetDataSupplierGroupList').pipe(
      catchError(err => this.catchErrLogout(err)),
      tap((result: any) => {
        console.log('---result getSupplierGroup', result);
      })
    )
  };


  /**
* GET
*/



  /**
* POST
*/
  public saveSupplier(dataSupplier: any) {
    console.log('--save supllier--')
    console.log('--save params--', dataSupplier)

    return this.http.post(this.url + 'api/Supplier/SaveSupplierList',
      dataSupplier)
      .pipe(
        catchError(err => this.catchErrLogout(err)),
        tap((result: any) => {
          console.log('saveSupplier api---', result)
          console.log('saveSupplier api result---', result.response.Response.IsSuccess)
        })
      )
  };
  /**
* POST
*/

  private catchErrLogout(err: any) {
    console.log('----catchErrLogout---');
    return of([]);
  }

}

