import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  userData:any;
  userForm:FormGroup;
  editMode = false;
  constructor(private fb:FormBuilder, private us:UserService) { }

  ngOnInit() {
    this.createForm();
    this.loadData();
  }

  loadData(){
      this.us.getUers().subscribe(data=>{
          this.userData = (data.length)?data:defaultData; 
      })
  }

  saveForm(){
     this.us.addUser(this.userForm.value).subscribe(data=>{
          if(data!='ERROR'){
            this.userForm.reset();
            this.loadData();
          }else{
            console.error("SAVE USER", data);
            this.userForm.reset();
            this.loadData();
          }
     })
  }

  editForm(data){
      this.editMode = true;
      this.userForm.setValue(data);
  }

  updateForm(){
    this.us.updateUser(this.userForm.value).subscribe(data=>{
      if(data!='ERROR'){
        this.userForm.reset();
        this.editMode = false;
        this.loadData();
      }else{
        console.error("UPDATE USER", data)
        this.userForm.reset();
        this.editMode = false;
        this.loadData();
      }
    });
  }

  deleteForm(id:string){
    this.us.deleteUser(id).subscribe(data=>{
      if(data!='ERROR'){
        this.loadData();
      }else{
        console.error("SAVE USER", data)
        this.loadData();
      }
    });
  }

  createForm(){
    this.userForm = this.fb.group({
      fullname: [''],
      gender: [''],
      married: [''],
      phone: [''],
      email: [''],
      password: ['']
    });
  }

}


const defaultData = [
  {
    rec_id:1,
    fullname:' Morasa Guruprasad',
    gender:'m',
    married:'yes',
    phone:'9123456789',
    email: 'test@gmail.com',
    password:'123455'
  }
]
