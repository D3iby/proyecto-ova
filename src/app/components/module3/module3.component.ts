import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProgressService } from '../../services/progress.service';

interface Example {
  text: string;
  correctCategory: 'ia' | 'robotics' | 'both';
}

@Component({
  selector: 'app-module3',
  templateUrl: './module3.component.html',
  styleUrls: ['./module3.component.css']
})
export class Module3Component {
  examples: Example[] = [
    { text: 'ChatGPT responde preguntas', correctCategory: 'ia' },
    { text: 'Brazo industrial que suelda piezas', correctCategory: 'robotics' },
    { text: 'Tesla que conduce solo', correctCategory: 'both' },
    { text: 'Roomba que evade obstáculos', correctCategory: 'both' },
    { text: 'Sistema de recomendación de Netflix', correctCategory: 'ia' },
    { text: 'Máquina expendedora automática', correctCategory: 'robotics' },
    { text: 'Asistente Alexa en un altavoz', correctCategory: 'ia' },
    { text: 'Robot cirujano Da Vinci', correctCategory: 'both' }
  ];

  currentExampleIndex = 0;
  iaItems: Example[] = [];
  roboticsItems: Example[] = [];
  bothItems: Example[] = [];
  showFeedback = false;
  correctAnswers = 0;

  constructor(public progressService: ProgressService, private router: Router) {}

  goNext(): void {
    if (this.progressService.isModuleCompleted(3)) {
      this.router.navigate(['/module4']);
    } else {
      alert('No has completado el módulo para avanzar. Completa las actividades primero.');
    }
  }

  get currentExample(): Example {
    return this.examples[this.currentExampleIndex];
  }

  classifyExample(category: string): void {
    const example = this.currentExample;
    
    if (category === example.correctCategory) {
      this.correctAnswers++;
    }

    // Agregar a la categoría correspondiente
    if (category === 'ia') this.iaItems.push(example);
    if (category === 'robotics') this.roboticsItems.push(example);
    if (category === 'both') this.bothItems.push(example);

    // Pasar al siguiente ejemplo
    this.currentExampleIndex++;

    // Verificar si terminó
    if (this.currentExampleIndex >= this.examples.length) {
      this.showFeedback = true;
      this.progressService.updateProgress(3, true, this.correctAnswers);
    }
  }

  resetActivity(): void {
    this.currentExampleIndex = 0;
    this.iaItems = [];
    this.roboticsItems = [];
    this.bothItems = [];
    this.showFeedback = false;
    this.correctAnswers = 0;
  }
}