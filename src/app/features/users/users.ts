import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { UserService } from '../../services/user';
import { UserModel } from '../../models/user/user.model';

@Component({
  selector: 'app-users',
  standalone: true, // Eğer standalone kullanıyorsan bu şart
  imports: [CommonModule, MatTableModule],
  templateUrl: './users.html'
})
export class Users implements OnInit {
  users: UserModel[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getAll().subscribe(data => this.users = data);
  }
}
