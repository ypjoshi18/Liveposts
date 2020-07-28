import { Component, OnInit } from '@angular/core';
import { DataStorageService }  from '../data-storage.service';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;

  constructor(private dataStorageService: DataStorageService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user.subscribe((user)=>{
      this.isLoggedIn = !!user;
    })
    this.dataStorageService.fetchData();
  }

  onSaveData(){
    this.dataStorageService.saveData();
  }

  onFetchData(){
    this.dataStorageService.fetchData();
  }

  onLogOut(){
    this.authService.logout();
  }

}
