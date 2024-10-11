import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { APIResponseModel, IRole } from '../../models/interface/role';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css',
})
export class RolesComponent implements OnInit {
  // firstName: string = "Demo";
  // version = "V18";
  // versionNum :number = 18;
  // isActive : boolean = false;
  // currentDate : Date = new Date();
  roleList: IRole[] = [];
  http = inject(HttpClient);
  ngOnInit(): void {
    this.getAllRoles();
  }
  getAllRoles() {
    this.http
      .get<APIResponseModel>('https://freeapi.miniprojectideas.com/api/ClientStrive/GetAllRoles')
      .subscribe((res: APIResponseModel) => {
        this.roleList = res.data;
      });
  }
}
