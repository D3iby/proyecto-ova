import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ProgressService } from './services/progress.service';

interface Module {
  id: number;
  route: string;
  title: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    showLoader = true;
  // Control para el modal de ayuda
  showHelp = false;
    ngOnInit(): void {
      // Mostrar loader al iniciar y ocultar tras 3 segundos
      setTimeout(() => {
        this.showLoader = false;
        this.router.navigate(['/']);
      }, 5000);
    }
  title = 'taller-ia-robotica';
  currentRoute = '';
  
  modules: Module[] = [
    { id: 1, route: '/module1', title: 'Introducción a la IA' },
    { id: 2, route: '/module2', title: '¿Qué es la Robótica?' },
    { id: 3, route: '/module3', title: 'IA vs Robótica' },
    { id: 4, route: '/module4', title: 'Sensores y Datos' },
    { id: 5, route: '/module5', title: 'Programación Práctica' },
    { id: 6, route: '/module6', title: 'Aplicaciones Reales' },
    { id: 7, route: '/module7', title: 'Evaluación Final' }
  ];

  constructor(
    private router: Router,
    public progressService: ProgressService
  ) {
    // Suscribirse a los eventos de navegación de forma más simple
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }

  isModuleCompleted(moduleId: number): boolean {
    const progress = this.progressService.getProgress();
    const moduleProgress = progress.find(p => p.moduleId === moduleId);
    return moduleProgress ? moduleProgress.completed : false;
  }

  isModuleEnabled(moduleId: number): boolean {
    const started = this.progressService.getStarted();
    if (!started) {
      return false;
    }

    // El primer módulo siempre está habilitado después de empezar
    if (moduleId === 1) {
      return true;
    }

    // Para los módulos >1, comprobar si el anterior está completado
    const progress = this.progressService.getProgress();
    const prev = progress.find(p => p.moduleId === moduleId - 1);
    return prev ? !!prev.completed : false;
  }

  onResetOva(): void {
    const ok = confirm('¿Seguro que desea reiniciar el OVA y borrar todo el progreso?');
    if (!ok) {
      return;
    }
    this.progressService.resetProgress();
    // También marcar como no iniciado para que los botones se bloqueen en Home
    this.progressService.setStarted(false);
    // Recargar la aplicación para reflejar el cambio inmediatamente
    location.reload();
  }

  openHelp(): void {
    this.showHelp = true;
  }

  closeHelp(): void {
    this.showHelp = false;
  }

  // Stub para abrir el manual - se integrará cuando entregues el PDF
  openManual(): void {
    // Abrir el manual de usuario en una nueva pestaña.
    // El archivo se encuentra en `src/assets/docs/MANUAL_USUARIO.pdf`.
    const url = '/assets/docs/MANUAL_USUARIO.pdf';
    // Abrir en nueva pestaña con medidas de seguridad
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}