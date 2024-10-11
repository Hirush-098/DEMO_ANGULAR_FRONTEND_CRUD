import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../models/class/Client';
import { environment } from '../../environments/environment.development';
import { APIResponseModel } from '../models/interface/role';
import { Constant } from '../Constant/Constant';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) {

   }
   getAllClients():Observable<APIResponseModel>{
    return this.http.get<APIResponseModel>(environment.API_URL + Constant.API_METHOD.GET_ALL_CLIENT)

   }
   addUpdate(obj:Client):Observable<APIResponseModel>{
    return this.http.post<APIResponseModel>(environment.API_URL + "AddUpdateClient",obj)

   }
   deleteClientById(id:number):Observable<APIResponseModel>{
    return this.http.delete<APIResponseModel>(environment.API_URL + "DeleteClientByClientId?clientId="+id)

   }

   addClientProjectUpdate(obj:Client):Observable<APIResponseModel>{
    return this.http.post<APIResponseModel>(environment.API_URL + "AddUpdateClientProject",obj)

   }

   getAllEmployee():Observable<APIResponseModel>{
    return this.http.get<APIResponseModel>(environment.API_URL + Constant.API_METHOD.GET_ALL_EMPLOYEE)

   }
   getAllClientProject():Observable<APIResponseModel>{
    return this.http.get<APIResponseModel>(environment.API_URL + Constant.API_METHOD.GET_ALL_PROJECT)

   }
}
