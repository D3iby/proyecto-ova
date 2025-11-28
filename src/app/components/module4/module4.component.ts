import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProgressService } from '../../services/progress.service';

@Component({
  selector: 'app-module4',
  templateUrl: './module4.component.html',
  styleUrls: ['./module4.component.css']
})
export class Module4Component {
  // Matriz del crucigrama: usar `null` para casillas vacías (sin celda),
  // `''` para casillas rellenables y cadenas para casillas prellenadas.
  crossword: (string | null)[][] = [
    [ null, null, null, null, null, null, null, null, null, null, null, null, null ],
    [ null, null, null, null, null, '', null, null, null, null, null, null, null ],
    [ null, '',   '',   '',   '',   '', '',   '',   '',   '',   '',   null, null ],
    [ null, null, null, null, null, '', null, null, null, null, null, null, null ],
    [ null, '',   '',   '',   '',   '', '',   '',   '',   '',   '',   '', null ],
    [ null, null, null, '',   null, '', null, null, null, null, '',   null, null ],
    [ null, null, null, '',   null, '', null, null, null, null, '',   null, null ],
    [ null, null, null, '',   null, null, null, null, null, null, '',   null, null ],
    [ null, null, null, '',   null, null, null, null, null, null, '',   null, null ],
    [ null, null, null, '',   null, null, null, null, null, null, null, null, null ],
    [ null, null, null, null, null, null, null, null, null, null, null, null, null ]
  ];

  userAnswers: (string | null)[][] = [];
  correctWords = 0;
  showFeedback = false;

  constructor(public progressService: ProgressService, private router: Router) {
    this.initializeUserAnswers();
  }

  goNext(): void {
    if (this.progressService.isModuleCompleted(4)) {
      this.router.navigate(['/module5']);
    } else {
      alert('No has completado el módulo para avanzar. Completa las actividades primero.');
    }
  }

  initializeUserAnswers(): void {
    // Inicializar todas las celdas existentes (no-null) con cadena vacía para inputs.
    this.userAnswers = this.crossword.map(row => 
      row.map(cell => cell === null ? null : '')
    );
  }

  getCellNumber(row: number, col: number): number | undefined {
    const numbers: {[key: string]: number} = {
      '4,0': 1,  // ULTRASONIDO (horizontal)
      '0,5': 2,  // CAMARA (vertical)
      '3,10': 3, // DATOS (vertical)
      '3,3': 4,  // TACTIL (vertical)
      '2,0': 5   // INFRARROJO (horizontal)
    };
    return numbers[`${row},${col}`];
  }

  isCorrect(row: number, col: number): boolean {
    const cell = this.crossword[row][col];
    if (cell === null || cell === '') return false;
    return this.userAnswers[row][col]?.toUpperCase() === cell.toUpperCase();
  }

  checkAnswer(): void {
    let correct = 0;
    
    // Verificar ULTRASONIDO (horizontal, fila 4, cols 1..11)
    const ultrasonido = 'ULTRASONIDO';
    const userUltrasonido = (this.userAnswers[4] || []).slice(1, 12).map(c => c || '').join('').toUpperCase();
    if (userUltrasonido === ultrasonido) correct++;

    // Verificar DATOS (vertical, columna 10, filas 4..8)
    const datos = 'DATOS';
    const userDatos = [4,5,6,7,8].map(r => (this.userAnswers[r] && this.userAnswers[r][10]) || '').join('').toUpperCase();
    if (userDatos === datos) correct++;

    // Verificar INFRARROJO (horizontal, fila 2, cols 1..10)
    const infrarrojo = 'INFRARROJO';
    const userInfrarrojo = (this.userAnswers[2] || []).slice(1, 11).map(c => c || '').join('').toUpperCase();
    if (userInfrarrojo === infrarrojo) correct++;

    // Verificar CAMARA (vertical, columna 5, filas 1..6)
    const camara = 'CAMARA';
    const userCamara = [1,2,3,4,5,6].map(r => (this.userAnswers[r] && this.userAnswers[r][5]) || '').join('').toUpperCase();
    if (userCamara === camara) correct++;

    // Verificar TACTIL (vertical, columna 3, filas 4..9)
    const tactil = 'TACTIL';
    const userTactil = [4,5,6,7,8,9].map(r => (this.userAnswers[r] && this.userAnswers[r][3]) || '').join('').toUpperCase();
    if (userTactil === tactil) correct++;

    this.correctWords = correct;

    if (correct === 5) {
      this.showFeedback = true;
      this.progressService.updateProgress(4, true, correct);
    }
  }

  resetActivity(): void {
    this.initializeUserAnswers();
    this.correctWords = 0;
    this.showFeedback = false;
  }
}