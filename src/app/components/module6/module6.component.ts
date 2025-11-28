import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProgressService } from '../../services/progress.service';

interface Application {
  sector: string;
  icon: string;
  description: string;
  examples: string[];
}

interface MatchingItem {
  id: number;
  name: string;
  correctSector: number;
}

interface Sector {
  id: number;
  name: string;
  icon: string;
}

interface CaseStudy {
  icon: string;
  title: string;
  description: string;
  impact: string;
  technologies: string[];
}

@Component({
  selector: 'app-module6',
  templateUrl: './module6.component.html',
  styleUrls: ['./module6.component.css']
})
export class Module6Component {
  applications: Application[] = [
    {
      sector: '🏥 Salud',
      icon: '🏥',
      description: 'IA y robótica en diagnóstico, cirugía y atención médica.',
      examples: [
        'Robots quirúrgicos Da Vinci',
        'Diagnóstico por imágenes con IA',
        'Asistentes virtuales para pacientes'
      ]
    },
    {
      sector: '🏭 Industria',
      icon: '🏭',
      description: 'Automatización de procesos de manufactura y logística.',
      examples: [
        'Brazos robóticos en ensamblaje',
        'Vehiculos autónomos en almacenes',
        'Control de calidad con visión artificial'
      ]
    },
    {
      sector: '🚗 Transporte',
      icon: '🚗',
      description: 'Sistemas de transporte autónomo y gestión de tráfico.',
      examples: [
        'Vehículos autónomos (Tesla)',
        'Sistemas de navegación inteligente',
        'Drones de entrega'
      ]
    },
    {
      sector: '🏠 Hogar',
      icon: '🏠',
      description: 'Dispositivos inteligentes para el hogar y domótica.',
      examples: [
        'Asistentes virtuales (Alexa, Google Home)',
        'Aspiradoras robot (Roomba)',
        'Sistemas de seguridad inteligentes'
      ]
    },
    {
      sector: '🎓 Educación',
      icon: '🎓',
      description: 'Herramientas de aprendizaje personalizado y asistencia.',
      examples: [
        'Plataformas de aprendizaje adaptativo',
        'Tutores virtuales con IA',
        'Robots educativos para niños'
      ]
    },
    {
      sector: '🛡️ Seguridad',
      icon: '🛡️',
      description: 'Sistemas de vigilancia y protección avanzados.',
      examples: [
        'Reconocimiento facial en aeropuertos',
        'Drones de vigilancia',
        'Detección de fraudes con IA'
      ]
    }
  ];

  sectors: Sector[] = [
    { id: 1, name: 'Salud', icon: '🏥' },
    { id: 2, name: 'Industria', icon: '🏭' },
    { id: 3, name: 'Transporte', icon: '🚗' },
    { id: 4, name: 'Hogar', icon: '🏠' },
    { id: 5, name: 'Educación', icon: '🎓' },
    { id: 6, name: 'Seguridad', icon: '🛡️' }
  ];

  matchingItems: MatchingItem[] = [
    { id: 1, name: 'Robot cirujano Da Vinci', correctSector: 1 },
    { id: 2, name: 'Brazo industrial ensamblador', correctSector: 2 },
    { id: 3, name: 'Auto Tesla autónomo', correctSector: 3 },
    { id: 4, name: 'Roomba aspiradora', correctSector: 4 },
    { id: 5, name: 'Tutor virtual de matemáticas', correctSector: 5 },
    { id: 6, name: 'Sistema reconocimiento facial', correctSector: 6 }
  ];

  placedItems: {item: MatchingItem, sectorId: number}[] = [];
  showFeedback = false;
  correctMatches = 0;

  caseStudies: CaseStudy[] = [
    {
      icon: '🤖',
      title: 'Robot Da Vinci en Cirugía',
      description: 'Sistema robótico que permite a cirujanos realizar operaciones complejas con mayor precisión.',
      impact: 'Reducción del 50% en tiempo de recuperación y 30% menos complicaciones post-operatorias.',
      technologies: ['Robótica médica', 'Visión 3D', 'IA para planificación']
    },
    {
      icon: '🚗',
      title: 'Vehículos Autónomos Tesla',
      description: 'Sistema de conducción autónoma que usa IA para navegar y tomar decisiones en tiempo real.',
      impact: 'Reducción del 40% en accidentes y optimización del 25% en consumo de energía.',
      technologies: ['Computer Vision', 'Deep Learning', 'Sensores LIDAR']
    },
    {
      icon: '🏭',
      title: 'Fábricas Inteligentes Amazon',
      description: 'Almacenes completamente automatizados con robots que gestionan inventario y entregas.',
      impact: 'Procesamiento 10x más rápido y reducción del 90% en errores de inventario.',
      technologies: ['Robots Kiva', 'IA logística', 'Internet de las Cosas']
    }
  ];

  constructor(public progressService: ProgressService, private router: Router) {}

  goNext(): void {
    if (this.progressService.isModuleCompleted(6)) {
      this.router.navigate(['/module7']);
    } else {
      alert('No has completado el módulo para avanzar. Completa las actividades primero.');
    }
  }

  onDragStart(event: DragEvent, item: MatchingItem): void {
    event.dataTransfer?.setData('text/plain', item.id.toString());
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onDrop(event: DragEvent, sector: Sector): void {
    event.preventDefault();
    const itemId = parseInt(event.dataTransfer?.getData('text/plain') || '0');
    const item = this.matchingItems.find(i => i.id === itemId);
    
    if (item) {
      // Remover item existente si ya estaba colocado
      this.placedItems = this.placedItems.filter(p => p.item.id !== item.id);
      
      // Agregar nuevo placement
      this.placedItems.push({ item, sectorId: sector.id });
      
      this.checkCompletion();
    }
  }

  getSectorItems(sectorId: number): MatchingItem[] {
    return this.placedItems
      .filter(p => p.sectorId === sectorId)
      .map(p => p.item);
  }

  getCorrectSectorItems(sectorId: number): MatchingItem[] {
    return this.matchingItems.filter(item => item.correctSector === sectorId);
  }

  checkCompletion(): void {
    if (this.placedItems.length === this.matchingItems.length) {
      this.correctMatches = this.placedItems.filter(
        p => p.item.correctSector === p.sectorId
      ).length;
      
      this.showFeedback = true;
      this.progressService.updateProgress(6, true, this.correctMatches);
    }
  }

  resetActivity(): void {
    this.placedItems = [];
    this.showFeedback = false;
    this.correctMatches = 0;
  }
}