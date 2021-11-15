import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmComponent } from '../confirm/confirm.component';

@Component({
  selector: 'shiba-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  image1= 'assets/img/user.jpg';
  constructor(private router: Router,) {
    console.log();
  }

  ngOnInit(): void {
    console.log();
  }

  form() {
    this.router.navigate([`list`]);
  }
}
