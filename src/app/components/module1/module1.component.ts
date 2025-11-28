import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProgressService } from '../../services/progress.service';

interface ActivityItem {
  name: string;
  icon: string;
  hasAI: boolean;
  selected: boolean;
}

@Component({
  selector: 'app-module1',
  templateUrl: './module1.component.html',
  styleUrls: ['./module1.component.css']
})
export class Module1Component {
  activityItems: ActivityItem[] = [
    { name: 'Asistente Virtual', icon: '🤖', hasAI: true, selected: false },
    { name: 'Calculadora', icon: '🧮', hasAI: false, selected: false },
    { name: 'Recomendaciones Netflix', icon: '🎬', hasAI: true, selected: false },
    { name: 'Cámara Fotográfica', icon: '📷', hasAI: false, selected: false },
    { name: 'Traductor Automático', icon: '🌐', hasAI: true, selected: false },
    { name: 'Reloj Despertador', icon: '⏰', hasAI: false, selected: false },
    { name: 'Coche Autónomo', icon: '🚗', hasAI: true, selected: false },
    { name: 'Lámpara', icon: '💡', hasAI: false, selected: false }
  ];

  showFeedback = false;
  score = 0;

  constructor(public progressService: ProgressService, private router: Router) {}

  goNext(): void {
    if (this.progressService.isModuleCompleted(1)) {
      this.router.navigate(['/module2']);
    } else {
      alert('No has completado el módulo para avanzar. Completa las actividades primero.');
    }
  }

  selectItem(item: ActivityItem): void {
    if (!this.showFeedback) {
      item.selected = true;
      
      const allSelected = this.activityItems.every(i => i.selected);
      if (allSelected) {
        this.calculateScore();
        this.showFeedback = true;
        this.progressService.updateProgress(1, true, this.score);
      }
    }
  }

  calculateScore(): void {
    this.score = this.activityItems.filter(item => 
      item.selected && item.hasAI
    ).length;
  }

  resetActivity(): void {
    this.activityItems.forEach(item => item.selected = false);
    this.showFeedback = false;
    this.score = 0;
  }
}