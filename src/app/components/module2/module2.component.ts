import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProgressService } from '../../services/progress.service';

interface RobotComponent {
  name: string;
  icon: string;
  type: string;
}

@Component({
  selector: 'app-module2',
  templateUrl: './module2.component.html',
  styleUrls: ['./module2.component.css']
})
export class Module2Component implements OnInit {
  components: RobotComponent[] = [
    { name: 'Sensor de Cámara', icon: '📷', type: 'sensor' },
    { name: 'Motor Principal', icon: '⚙️', type: 'actuator' },
    { name: 'CPU Central', icon: '🧠', type: 'controller' },
    { name: 'Estructura', icon: '🔩', type: 'chassis' },
    { name: 'Sensor Táctil', icon: '👆', type: 'sensor' },
    { name: 'Altavoz', icon: '🔊', type: 'actuator' }
  ];

  placedComponents: RobotComponent[] = [];
  showFeedback = false;

  constructor(public progressService: ProgressService, private router: Router) {}

  ngOnInit(): void {
    // Cargar el script de redimensionamiento de H5P para que el iframe ajuste su tamaño si es necesario
    const scriptId = 'h5p-resizer-js';
    if (!document.getElementById(scriptId)) {
      const s = document.createElement('script');
      s.id = scriptId;
      s.src = 'https://universidaddenario3.h5p.com/js/h5p-resizer.js';
      s.charset = 'UTF-8';
      s.async = true;
      document.body.appendChild(s);
    }
  }

  goNext(): void {
    if (this.progressService.isModuleCompleted(2)) {
      this.router.navigate(['/module3']);
    } else {
      alert('No has completado el módulo para avanzar. Completa las actividades primero.');
    }
  }

  addComponent(component: RobotComponent): void {
    if (!this.isComponentUsed(component)) {
      this.placedComponents.push(component);
      
      if (this.placedComponents.length === this.components.length) {
        this.showFeedback = true;
        this.progressService.updateProgress(2, true);
      }
    }
  }

  isComponentUsed(component: RobotComponent): boolean {
    return this.placedComponents.some(c => c.name === component.name);
  }

  isRobotComplete(): boolean {
    return this.placedComponents.length === this.components.length;
  }

  resetActivity(): void {
    this.placedComponents = [];
    this.showFeedback = false;
  }

  openH5P(): void {
    window.open('https://universidaddenario3.h5p.com/content/1292757428791495218', '_blank');
  }
}