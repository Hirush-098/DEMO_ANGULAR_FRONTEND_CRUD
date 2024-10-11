import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { APIResponseModel, ClientProject, IEmployee } from '../../models/interface/role';
import { Client } from '../../models/class/Client';
import { DatePipe } from '@angular/common';
import { AlertComponent } from "../../reusableComponents/alert/alert.component";

@Component({
  selector: 'app-client-project',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe, AlertComponent],
  templateUrl: './client-project.component.html',
  styleUrl: './client-project.component.css'
})
export class ClientProjectComponent implements OnInit {

  projectForm : FormGroup = new FormGroup({
    clientProjectId: new FormControl(0),
    projectName: new FormControl("",[Validators.required, Validators.minLength(4)]),
    startDate: new FormControl(""),
    expectedEndDate: new FormControl(""),
    leadByEmpId: new FormControl(""),
    completedDate: new FormControl(""),
    contactPerson: new FormControl(""),
    contactPersonContactNo: new FormControl(""),
    totalEmpWorking: new FormControl(""),
    projectCost: new FormControl(""),
    projectDetails: new FormControl(""),
    contactPersonEmailId: new FormControl(""),
    clientId: new FormControl("")
  })
  clientservice = inject(ClientService)
  employeeList: IEmployee[]=[];
  clientList: Client[] = [];

  firstName = signal("Hirush");
  projectList = signal<ClientProject[]>([])

  ngOnInit(): void {
      this.getAllClient();
      this.getAllEmployee();
      this.getAllClientProject();//using signals
  }

  getAllEmployee(){
    this.clientservice.getAllEmployee().subscribe((res: APIResponseModel)=>{
      this.employeeList=res.data;

    })
  }
  getAllClientProject(){
    this.clientservice.getAllClientProject().subscribe((res: APIResponseModel)=>{
      this.projectList.set(res.data)

    })
  }
  getAllClient(){
    this.clientservice.getAllClients().subscribe((res: APIResponseModel)=>{
      this.clientList=res.data;

    })
  }
  onSaveProject(){
    const formValue = this.projectForm.value;
    debugger;
    this.clientservice.addClientProjectUpdate(formValue).subscribe((res:APIResponseModel)=>{
      if(res.result){
        alert('project created')
      }else{
        alert(res.message)
      }
    })
  }
}
