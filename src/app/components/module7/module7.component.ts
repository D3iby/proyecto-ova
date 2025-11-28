import { Component, OnInit } from '@angular/core';
import { ProgressService } from '../../services/progress.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface Question {
  id: number;
  type: 'multiple-choice' | 'true-false' | 'sequence' | 'matching';
  text: string;
  options?: string[];
  correctAnswer: any;
  module: number;
  explanation?: string;
  sequence?: {text: string, correctOrder: number}[];
  concepts?: string[];
  definitions?: {text: string, correctConcept: string}[];
}

@Component({
  selector: 'app-module7',
  templateUrl: './module7.component.html',
  styleUrls: ['./module7.component.css']
})
export class Module7Component implements OnInit {
  examStarted = false;
  showResults = false;
  currentQuestionIndex = 0;
  selectedAnswer: any = null;
  selectedSequence: any[] = [];
  selectedConcept: string = '';
  matches: {[key: number]: string} = {};
  elapsedTime = 0;
  timer: any;

  questions: Question[] = [
    // Selección Múltiple
    {
      id: 1,
      type: 'multiple-choice',
      text: '¿Cuál de estos es un ejemplo de IA débil?',
      options: [
        'Un robot que puede aprender cualquier tarea como humano',
        'Un asistente virtual que solo responde preguntas',
        'Un sistema que tiene conciencia propia',
        'Una máquina que puede sentir emociones'
      ],
      correctAnswer: 'Un asistente virtual que solo responde preguntas',
      module: 1,
      explanation: 'La IA débil está especializada en tareas específicas, como los asistentes virtuales.'
    },
    {
      id: 2,
      type: 'multiple-choice',
      text: '¿Qué componente del robot procesa la información de los sensores?',
      options: [
        'Actuadores',
        'Sensores',
        'Controlador',
        'Chasis'
      ],
      correctAnswer: 'Controlador',
      module: 2,
      explanation: 'El controlador es el "cerebro" del robot que procesa información.'
    },
    {
      id: 3,
      type: 'multiple-choice',
      text: '¿Qué tipo de sensor usaría un robot para medir distancias?',
      options: [
        'Sensor táctil',
        'Sensor de ultrasonido',
        'Sensor de cámara',
        'Sensor infrarrojo para calor'
      ],
      correctAnswer: 'Sensor de ultrasonido',
      module: 4,
      explanation: 'Los sensores de ultrasonido miden distancias usando ondas sonoras.'
    },
    {
      id: 4,
      type: 'multiple-choice',
      text: 'En programación de robots, ¿qué estructura se usa para tomar decisiones?',
      options: [
        'Bucles FOR',
        'Condicionales IF',
        'Funciones',
        'Variables'
      ],
      correctAnswer: 'Condicionales IF',
      module: 5,
      explanation: 'Los condicionales IF permiten al robot tomar decisiones basadas en condiciones.'
    },
    {
      id: 5,
      type: 'multiple-choice',
      text: '¿Cuál es una aplicación real de IA en el sector salud?',
      options: [
        'Robots de ensamblaje',
        'Drones de entrega',
        'Diagnóstico por imágenes',
        'Asistentes virtuales del hogar'
      ],
      correctAnswer: 'Diagnóstico por imágenes',
      module: 6,
      explanation: 'La IA se usa ampliamente en diagnóstico médico por imágenes.'
    },

    // Verdadero/Falso
    {
      id: 6,
      type: 'true-false',
      text: 'La IA fuerte ya existe y es común en la actualidad.',
      correctAnswer: 'Falso',
      module: 1,
      explanation: 'La IA fuerte (con capacidades humanas completas) aún está en desarrollo.'
    },
    {
      id: 7,
      type: 'true-false',
      text: 'Todos los robots incorporan inteligencia artificial.',
      correctAnswer: 'Falso',
      module: 3,
      explanation: 'Muchos robots son programados para tareas específicas sin usar IA.'
    },
    {
      id: 8,
      type: 'true-false',
      text: 'Los datos que recopilan los sensores son procesados por el controlador del robot.',
      correctAnswer: 'Verdadero',
      module: 4,
      explanation: 'El controlador procesa los datos de los sensores para tomar decisiones.'
    },

    // Ordenar Secuencia
    {
      id: 9,
      type: 'sequence',
      text: 'Ordena los pasos del flujo de información en un robot:',
      sequence: [
        {text: 'Sensor detecta información', correctOrder: 0},
        {text: 'Controlador procesa datos', correctOrder: 2},
        {text: 'Robot ejecuta acción', correctOrder: 3},
        {text: 'Datos se convierten a digital', correctOrder: 1}
      ],
      correctAnswer: [0, 1, 2, 3],
      module: 4
    },

    // Relacionar Conceptos
    {
      id: 10,
      type: 'matching',
      text: 'Relaciona cada tipo de IA con su descripción:',
      concepts: ['IA Débil', 'IA Fuerte', 'IA Generativa'],
      definitions: [
        {text: 'Puede realizar cualquier tarea intelectual humana', correctConcept: 'IA Fuerte'},
        {text: 'Crea contenido nuevo como texto o imágenes', correctConcept: 'IA Generativa'},
        {text: 'Especializada en una tarea específica', correctConcept: 'IA Débil'}
      ],
      correctAnswer: {'0': 'IA Fuerte', '1': 'IA Generativa', '2': 'IA Débil'},
      module: 1
    }
  ];

  userAnswers: {[key: number]: any} = {};
  correctAnswers = 0;
  scorePercentage = 0;
  passed = false;

  // Certificado: campos y estado del formulario
  studentName: string = '';
  studentId: string = '';
  rememberMe: boolean = false;
  showCertificateForm: boolean = false;
  generatingPdf: boolean = false;
  showPreview: boolean = false;
  currentDate: Date = new Date();
  certificateTitle: string = 'OVA: Introducción a la Inteligencia Artificial y la Robótica';
  certificateIssuer: string = 'OVA RoboIA';

  constructor(private progressService: ProgressService) {}

  ngOnInit(): void {
    // Al inicializar, comprobar si hay progreso guardado para el módulo 7
    const progress = this.progressService.getProgress();
    const moduleProgress = progress.find(p => p.moduleId === 7);

    if (moduleProgress && moduleProgress.completed) {
      // Mostrar resultados almacenados en lugar de la introducción
      this.showResults = true;
      this.examStarted = false;
      this.scorePercentage = moduleProgress.score ?? 0;
      this.correctAnswers = Math.round((this.scorePercentage / 100) * this.questions.length);
      this.passed = this.scorePercentage >= 70;
      // Si hay marca temporal, podríamos calcular tiempo; por ahora lo dejamos en 0
      this.elapsedTime = 0;
    }
  }

  get currentQuestion(): Question {
    return this.questions[this.currentQuestionIndex];
  }

  startExam(): void {
    this.examStarted = true;
    this.elapsedTime = 0;
    this.timer = setInterval(() => {
      this.elapsedTime++;
    }, 1000);
  }

  selectAnswer(answer: any): void {
    this.selectedAnswer = answer;
    this.userAnswers[this.currentQuestion.id] = answer;
  }

  selectSequenceItem(item: any, index: number): void {
    if (!this.selectedSequence.includes(item)) {
      this.selectedSequence.push(item);
      this.userAnswers[this.currentQuestion.id] = this.selectedSequence.map(s => 
        this.currentQuestion.sequence?.indexOf(s)
      );
    }
  }

  removeFromSequence(index: number): void {
    this.selectedSequence.splice(index, 1);
    this.userAnswers[this.currentQuestion.id] = this.selectedSequence.map(s => 
      this.currentQuestion.sequence?.indexOf(s)
    );
  }

  selectConcept(concept: string): void {
    this.selectedConcept = concept;
  }

  selectDefinition(definition: any, index: number): void {
    if (this.selectedConcept) {
      this.matches[index] = this.selectedConcept;
      this.userAnswers[this.currentQuestion.id] = {...this.matches};
      this.selectedConcept = '';
    }
  }

  isConceptUsed(concept: string): boolean {
    return Object.values(this.matches).includes(concept);
  }

  getMatchedConcept(index: number): string {
    return this.matches[index] || '';
  }

  isAnswerSelected(): boolean {
    const question = this.currentQuestion;
    
    switch (question.type) {
      case 'multiple-choice':
      case 'true-false':
        return this.selectedAnswer !== null;
      case 'sequence':
        return this.selectedSequence.length === question.sequence?.length;
      case 'matching':
        return Object.keys(this.matches).length === question.definitions?.length;
      default:
        return false;
    }
  }

  nextQuestion(): void {
    this.resetQuestionState();
    
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    } else {
      this.finishExam();
    }
  }

  previousQuestion(): void {
    this.resetQuestionState();
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  resetQuestionState(): void {
    this.selectedAnswer = null;
    this.selectedSequence = [];
    this.selectedConcept = '';
    this.matches = {};
  }

  finishExam(): void {
    clearInterval(this.timer);
    this.calculateScore();
    this.showResults = true;
    this.progressService.updateProgress(7, true, this.scorePercentage);
  }

  calculateScore(): void {
    this.correctAnswers = 0;
    
    this.questions.forEach(question => {
      const userAnswer = this.userAnswers[question.id];
      
      if (this.isAnswerCorrect(question, userAnswer)) {
        this.correctAnswers++;
      }
    });

    this.scorePercentage = Math.round((this.correctAnswers / this.questions.length) * 100);
    this.passed = this.scorePercentage >= 70;
  }

  isAnswerCorrect(question: Question, userAnswer: any): boolean {
    if (!userAnswer) return false;

    switch (question.type) {
      case 'multiple-choice':
      case 'true-false':
        return userAnswer === question.correctAnswer;
      case 'sequence':
        return JSON.stringify(userAnswer) === JSON.stringify(question.correctAnswer);
      case 'matching':
        return JSON.stringify(userAnswer) === JSON.stringify(question.correctAnswer);
      default:
        return false;
    }
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  reviewAnswers(): void {
    this.examStarted = true;
    this.showResults = false;
    this.currentQuestionIndex = 0;
  }

  retryExam(): void {
    // Marcar el módulo como no completado para permitir volver a presentar
    this.progressService.updateProgress(7, false, 0);

    this.examStarted = false;
    this.showResults = false;
    this.currentQuestionIndex = 0;
    this.userAnswers = {};
    this.correctAnswers = 0;
    this.scorePercentage = 0;
    this.passed = false;
    this.elapsedTime = 0;
    this.resetQuestionState();
  }

  generateCertificate(): void {
    // Mostrar la sección para ingresar datos y descargar el certificado
    this.openCertificateForm();
  }

  openCertificateForm(): void {
    // Prefill desde localStorage si existe
    try {
      const saved = localStorage.getItem('module7_cert_info');
      if (saved) {
        const parsed = JSON.parse(saved);
        this.studentName = parsed.name || '';
        this.studentId = parsed.id || '';
        this.rememberMe = !!parsed.remember;
      }
    } catch (e) {
      // ignore
    }

    this.showCertificateForm = true;
    // actualizar fecha al abrir
    this.currentDate = new Date();
    // desplazar la vista hacia la sección de certificado (si se desea)
    setTimeout(() => {
      const el = document.getElementById('certificate-form');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  cancelCertificateForm(): void {
    this.showCertificateForm = false;
  }

  togglePreview(): void {
    this.showPreview = !this.showPreview;
    // si abrimos la vista previa, desplazamos hacia ella
    if (this.showPreview) {
      setTimeout(() => {
        const el = document.getElementById('certificate');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  }

  downloadCertificate(): void {
    if (!this.studentName || !this.studentId) {
      alert('Por favor ingresa nombre y número de identificación.');
      return;
    }

    if (this.rememberMe) {
      try { localStorage.setItem('module7_cert_info', JSON.stringify({ name: this.studentName, id: this.studentId, remember: true })); } catch (e) {}
    } else {
      try { localStorage.removeItem('module7_cert_info'); } catch (e) {}
    }

    this.showCertificateForm = false;
    this.generateCertificatePDF();
  }

  generateCertificatePDF(): void {
    const element = document.getElementById('certificate');
    if (!element) {
      alert('No se encontró la plantilla del certificado.');
      return;
    }

    // Si la plantilla está oculta por aria-hidden, la hacemos visible temporalmente
    const prevDisplay = (element as HTMLElement).style.display;
    const prevPosition = (element as HTMLElement).style.position;
    const prevLeft = (element as HTMLElement).style.left;
    const prevAria = element.getAttribute('aria-hidden');

    try {
      (element as HTMLElement).style.display = 'block';
      (element as HTMLElement).style.position = 'fixed';
      (element as HTMLElement).style.left = '-9999px';
      element.setAttribute('aria-hidden', 'false');

      this.generatingPdf = true;
      html2canvas(element as HTMLElement, { scale: 2, useCORS: true, allowTaint: true }).then(canvas => {
        try {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF('landscape', 'pt', 'a4');
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = pdf.internal.pageSize.getHeight();
          try {
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
          } catch (addErr) {
            console.warn('[generateCertificatePDF] addImage PNG falló, intentando JPEG', addErr);
            const imgJpg = canvas.toDataURL('image/jpeg', 1.0);
            pdf.addImage(imgJpg, 'JPEG', 0, 0, pdfWidth, pdfHeight);
          }
          const safeName = this.studentName ? this.studentName.replace(/\s+/g, '_') : 'estudiante';
          const filename = `certificado_${safeName}.pdf`;
          pdf.save(filename);
        } catch (err) {
          console.error(err);
          alert('Ocurrió un error generando el PDF. Revisa la consola.');
        } finally {
          this.generatingPdf = false;
          // Restaurar estilos
          (element as HTMLElement).style.display = prevDisplay;
          (element as HTMLElement).style.position = prevPosition;
          (element as HTMLElement).style.left = prevLeft;
          if (prevAria !== null) element.setAttribute('aria-hidden', prevAria);
          else element.removeAttribute('aria-hidden');
        }
      }).catch(err => {
        console.error(err);
        this.generatingPdf = false;
        // Restaurar estilos
        (element as HTMLElement).style.display = prevDisplay;
        (element as HTMLElement).style.position = prevPosition;
        (element as HTMLElement).style.left = prevLeft;
        if (prevAria !== null) element.setAttribute('aria-hidden', prevAria);
        else element.removeAttribute('aria-hidden');
        alert('Ocurrió un error generando el PDF. Revisa la consola.');
      });
    } catch (e) {
      console.error(e);
      this.generatingPdf = false;
      // Restaurar estilos en caso de excepción
      (element as HTMLElement).style.display = prevDisplay;
      (element as HTMLElement).style.position = prevPosition;
      (element as HTMLElement).style.left = prevLeft;
      if (prevAria !== null) element.setAttribute('aria-hidden', prevAria);
      else element.removeAttribute('aria-hidden');
      alert('Ocurrió un error preparando la plantilla antes de generar el PDF.');
    }
  }
}