import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProgressService } from '../../services/progress.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private progressService: ProgressService) { }
  ngOnInit(): void {
  }

  start(): void {
    // Marcar como iniciado y navegar al módulo 1
    this.progressService.setStarted(true);
    this.router.navigate(['/module1']);
  }

}
