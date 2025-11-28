import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class AppComponent implements OnInit, OnDestroy {
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

  // -------------------------
  // Controles de música de fondo
  // -------------------------
  audio: HTMLAudioElement | null = null;
  isPlaying = false;
  // Ruta recomendada: crea la carpeta assets/audio/ y coloca un MP3 llamado background.mp3
  audioSrc = '/assets/audio/background.mp3';
  // Flags para saber si usar archivo o sintetizador
  audioChecked = false; // ya intentamos comprobar existencia del archivo
  useAudioFile = false; // si true usamos HTMLAudioElement; si false usamos synth

  // WebAudio synth fallback
  audioCtx: AudioContext | null = null;
  synthTimer: any = null;
  synthIndex = 0;
  // Melodía sencilla (frecuencias en Hz) - original y sin licencia
  synthNotes: number[] = [523.25, 659.25, 783.99, 659.25, 523.25, 392.00]; // C5, E5, G5, E5, C5, G4
  synthDur = 450; // ms por nota

  async toggleMusic(): Promise<void> {
    // Si ya está reproduciendo, detener cualquiera de los dos
    if (this.isPlaying) {
      // detener reproducción de archivo si se está usando
      if (this.useAudioFile && this.audio) {
        this.audio.pause();
      } else {
        // detener synth
        this.stopSynth();
      }
      this.isPlaying = false;
      return;
    }

    // No está reproduciendo ahora. Si no hemos comprobado la existencia del archivo, hacerlo
    if (!this.audioChecked) {
      await this.verifyAudioFile();
    }

    if (this.useAudioFile) {
      // inicializar audio si hace falta
      if (!this.audio) {
        this.createAudio();
      }
      if (!this.audio) { return; }
      try {
        const p = this.audio.play();
        if (p && p instanceof Promise) {
          await p;
        }
        this.isPlaying = true;
      } catch (err) {
        console.warn('No se pudo reproducir el archivo, usando sintetizador como fallback.', err);
        this.useAudioFile = false;
        this.startSynth();
      }
    } else {
      // usar sintetizador interno
      this.startSynth();
    }
  }

  private createAudio(): void {
    try {
      this.audio = new Audio(this.audioSrc);
      this.audio.loop = true;
      this.audio.preload = 'auto';
    } catch (err) {
      console.warn('No se pudo crear la instancia de audio:', err);
      this.audio = null;
    }
  }

  // Intentar comprobar si el archivo existe (HEAD), si no existe usaremos synth
  private async verifyAudioFile(): Promise<void> {
    this.audioChecked = true;
    try {
      const res = await fetch(this.audioSrc, { method: 'HEAD' });
      if (res.ok) {
        this.useAudioFile = true;
      } else {
        this.useAudioFile = false;
      }
    } catch (err) {
      // fallback: no existe o no se puede acceder
      this.useAudioFile = false;
    }
  }

  // ------------------------
  // Synth (WebAudio) logic
  // ------------------------
  private startSynth(): void {
    if (this.synthTimer) { return; }
    try {
      if (!this.audioCtx) {
        this.audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      // resume context in case it's suspended by autoplay policies
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      // start looping melody
      this.synthIndex = 0;
      this.playSynthNote();
      this.synthTimer = setInterval(() => this.playSynthNote(), this.synthDur);
      this.isPlaying = true;
    } catch (err) {
      console.warn('No se pudo iniciar WebAudio synth', err);
    }
  }

  private playSynthNote(): void {
    if (!this.audioCtx) { return; }
    const freq = this.synthNotes[this.synthIndex % this.synthNotes.length];
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;
    // simple envelope
    gain.gain.setValueAtTime(0, this.audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.16, this.audioCtx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + this.synthDur / 1000 - 0.02);
    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start();
    // stop after duration
    setTimeout(() => { try { osc.stop(); osc.disconnect(); gain.disconnect(); } catch {} }, this.synthDur - 10);
    this.synthIndex++;
  }

  private stopSynth(): void {
    if (this.synthTimer) {
      clearInterval(this.synthTimer);
      this.synthTimer = null;
    }
    if (this.audioCtx) {
      // optionally suspend to save resources
      try { this.audioCtx.suspend(); } catch {}
      // don't close the context to avoid permission issues on some browsers
    }
  }

  ngOnDestroy(): void {
    if (this.audio) {
      this.audio.pause();
      this.audio = null;
    }
    this.stopSynth();
    if (this.audioCtx) {
      try { this.audioCtx.close(); } catch {}
      this.audioCtx = null;
    }
    this.isPlaying = false;
  }
}
