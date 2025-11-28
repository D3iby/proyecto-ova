import { Injectable } from '@angular/core';

export interface ModuleProgress {
  moduleId: number;
  completed: boolean;
  score?: number;
  timestamp?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  private readonly STORAGE_KEY = 'taller-ia-progress';
  private readonly STARTED_KEY = 'taller-ia-started';

  getProgress(): ModuleProgress[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  updateProgress(moduleId: number, completed: boolean, score?: number): void {
    const progress = this.getProgress();
    const existingIndex = progress.findIndex(p => p.moduleId === moduleId);
    
    const moduleProgress: ModuleProgress = {
      moduleId,
      completed,
      score,
      timestamp: new Date()
    };

    if (existingIndex >= 0) {
      progress[existingIndex] = moduleProgress;
    } else {
      progress.push(moduleProgress);
    }

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(progress));
  }

  getOverallProgress(): number {
    const progress = this.getProgress();
    const completed = progress.filter(p => p.completed).length;
    return (completed / 7) * 100; // 7 módulos totales
  }

  resetProgress(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  // Indica si el usuario ya ha empezado el OVA (se pulsa "Comenzar" en Home)
  getStarted(): boolean {
    try {
      const v = localStorage.getItem(this.STARTED_KEY);
      return v === 'true';
    } catch (e) {
      return false;
    }
  }

  setStarted(started: boolean): void {
    try {
      localStorage.setItem(this.STARTED_KEY, started ? 'true' : 'false');
    } catch (e) {}
  }

  isModuleCompleted(moduleId: number): boolean {
    try {
      const progress = this.getProgress();
      const p = progress.find(x => x.moduleId === moduleId);
      return !!(p && p.completed);
    } catch (e) {
      return false;
    }
  }
}