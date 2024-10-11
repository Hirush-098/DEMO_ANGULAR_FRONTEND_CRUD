import { Component,inject,OnInit } from '@angular/core';
import { Client } from '../../models/class/Client';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { APIResponseModel } from '../../models/interface/role';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { AlertComponent } from '../../reusableComponents/alert/alert.component';
import { MyButtonComponent } from "../../reusableComponents/my-button/my-button.component";

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [FormsModule, UpperCasePipe, DatePipe, AlertComponent, MyButtonComponent],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent implements OnInit {

  currentDate:Date = new Date();
  clientObj: Client = new Client();
  clientList: Client[] = [];

  clientService = inject(ClientService);

  ngOnInit():void{
    this.loadClient();

  }
  loadClient(){
    this.clientService.getAllClients().subscribe((res:APIResponseModel) => {
      this.clientList = res.data;
    })
  }
  onSaveClient(){
    debugger;
    this.clientService.addUpdate(this.clientObj).subscribe((res:APIResponseModel)=>{
      if(res.result){
        alert("Client Created Sucess");
        this.loadClient();
        this.clientObj = new Client();
      }else{
        alert(res.message);
      }

    })

    

  }
  onEdit(data: Client){
    this.clientObj = data;

  }
  onDelete(id: number){

    const isDelete = confirm("Are You sure want to delete")
    if(isDelete){
      this.clientService.deleteClientById(id).subscribe((res:APIResponseModel)=>{
        if(res.result){
          alert("Client Deleted Sucess");
          this.loadClient();
          
        }else{
          alert(res.message);
        }
  
      })
    }


    
  }
}
