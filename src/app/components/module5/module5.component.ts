import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProgressService } from '../../services/progress.service';

interface Question {
  text: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

@Component({
  selector: 'app-module5',
  templateUrl: './module5.component.html',
  styleUrls: ['./module5.component.css']
})
export class Module5Component {
  questions: Question[] = [
    {
      text: '¿Qué debería hacer el robot si el sensor frontal detecta un obstáculo?',
      options: [
        'Acelerar y chocar',
        'Detenerse y girar',
        'Ignorar y continuar',
        'Emitir un sonido y continuar'
      ],
      correctAnswer: 'Detenerse y girar',
      explanation: 'La respuesta segura es detenerse y cambiar dirección para evitar el obstáculo.'
    },
    {
      text: 'Un robot sigue una línea negra. ¿Qué tipo de sensor está usando?',
      options: [
        'Sensor de ultrasonido',
        'Sensor infrarrojo',
        'Sensor táctil',
        'Sensor de cámara'
      ],
      correctAnswer: 'Sensor infrarrojo',
      explanation: 'Los sensores infrarrojos detectan contrastes de color como líneas negras.'
    },
    {
      text: '¿Cuál es la estructura correcta de un condicional en programación?',
      options: [
        'SI → ENTONCES → FIN',
        'PARA → HACER → FIN',
        'MIENTRAS → REPETIR → FIN',
        'FUNCION → RETORNAR → FIN'
      ],
      correctAnswer: 'SI → ENTONCES → FIN',
      explanation: 'Los condicionales usan la estructura SI (condición) ENTONCES (acción) FIN.'
    }
  ];

  currentQuestionIndex = 0;
  selectedOption: string = '';
  showFeedback = false;
  showResults = false;
  score = 0;

  // Simulador
  grid: string[] = [];
  robotPosition = 0;
  goalPosition = 8;
  obstacles: number[] = [3, 6];
  moveCount = 0;
  reachedGoal = false;

  constructor(public progressService: ProgressService, private router: Router) {
    this.initializeSimulator();
  }

  goNext(): void {
    if (this.progressService.isModuleCompleted(5)) {
      this.router.navigate(['/module6']);
    } else {
      alert('No has completado el módulo para avanzar. Completa las actividades primero.');
    }
  }

  get currentQuestion(): Question {
    return this.questions[this.currentQuestionIndex];
  }

  selectOption(option: string): void {
    if (!this.showFeedback) {
      this.selectedOption = option;
      this.showFeedback = true;

      if (option === this.currentQuestion.correctAnswer) {
        this.score++;
      }
    }
  }

  nextQuestion(): void {
    this.selectedOption = '';
    this.showFeedback = false;
    this.currentQuestionIndex++;

    if (this.currentQuestionIndex >= this.questions.length) {
      this.showResults = true;
      this.progressService.updateProgress(5, true, this.score);
    }
  }

  resetQuiz(): void {
    this.currentQuestionIndex = 0;
    this.selectedOption = '';
    this.showFeedback = false;
    this.showResults = false;
    this.score = 0;
  }

  // Simulador
  initializeSimulator(): void {
    this.grid = Array(9).fill('');
    this.grid[this.robotPosition] = 'R';
    this.grid[this.goalPosition] = 'G';
    this.obstacles.forEach(pos => this.grid[pos] = 'X');
    this.moveCount = 0;
    this.reachedGoal = false;
  }

  moveRobot(direction: string): void {
    if (this.reachedGoal) return;

    let newPosition = this.robotPosition;

    switch (direction) {
      case 'up': newPosition -= 3; break;
      case 'down': newPosition += 3; break;
      case 'left': newPosition -= 1; break;
      case 'right': newPosition += 1; break;
    }

    // Verificar límites y obstáculos
    if (newPosition >= 0 && newPosition < 9 &&
        !this.obstacles.includes(newPosition) &&
        Math.floor(newPosition / 3) === Math.floor(this.robotPosition / 3) ||
        Math.abs(newPosition - this.robotPosition) === 3) {

      this.grid[this.robotPosition] = '';
      this.robotPosition = newPosition;
      this.grid[this.robotPosition] = 'R';
      this.moveCount++;

      if (this.robotPosition === this.goalPosition) {
        this.reachedGoal = true;
      }
    }
  }

  canMove(direction: string): boolean {
    if (this.reachedGoal) return false;

    let newPosition = this.robotPosition;

    switch (direction) {
      case 'up': newPosition -= 3; break;
      case 'down': newPosition += 3; break;
      case 'left': newPosition -= 1; break;
      case 'right': newPosition += 1; break;
    }

    return newPosition >= 0 && newPosition < 9 &&
           !this.obstacles.includes(newPosition) &&
           (Math.floor(newPosition / 3) === Math.floor(this.robotPosition / 3) ||
            Math.abs(newPosition - this.robotPosition) === 3);
  }

  getSensorReading(sensor: string): string {
    let checkPosition = this.robotPosition;

    switch (sensor) {
      case 'front': checkPosition += 3; break;
      case 'left': checkPosition -= 1; break;
      case 'right': checkPosition += 1; break;
    }

    if (checkPosition < 0 || checkPosition >= 9) return 'Fuera de límites';
    if (this.obstacles.includes(checkPosition)) return 'Obstáculo detectado';
    if (checkPosition === this.goalPosition) return 'Meta detectada';

    return 'Camino libre';
  }

  resetSimulator(): void {
    this.initializeSimulator();
  }

  // Botón para marcar el módulo como completado manualmente
  marcarCompletado(): void {
    this.progressService.updateProgress(5, true, 1);
    alert('¡Módulo 5 marcado como completado! Ahora puedes avanzar al módulo 6.');
  }
}
