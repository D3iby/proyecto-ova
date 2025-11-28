**Manual de Componentes**

Este documento describe los componentes principales del OVA "Introducción a la Inteligencia Artificial y la Robótica". Incluye selector, ruta (si está ligado al enrutador), archivos relevantes, descripción, propiedades (Inputs/Outputs), servicios usados y ejemplos prácticos. Está pensado para pasar a PDF posteriormente.

**Resumen rápido**

- **`HomeComponent`**: selector `app-home` — ruta `/` — Componente inicial con botón para iniciar el OVA.
- **`Module1Component`**: selector `app-module1` — ruta `/module1` — Actividades de clasificación de ítems; interacción y puntuación.
- **`Module2Component`**: selector `app-module2` — ruta `/module2` — Arrastrar y colocar componentes de un robot; interacción con H5P externo.
- **`Module3Component`**: selector `app-module3` — ruta `/module3` — Clasificación de ejemplos en IA/Robótica.
- **`Module4Component`**: selector `app-module4` — ruta `/module4` — Crucigrama interactivo.
- **`Module5Component`**: selector `app-module5` — ruta `/module5` — Cuestionario y simulador de movimiento simple.
- **`Module6Component`**: selector `app-module6` — ruta `/module6` — Actividad de emparejamiento y estudios de caso por sectores.
- **`Module7Component`**: selector `app-module7` — ruta `/module7` — Examen final, generación de certificado PDF.

**Estructura del manual**

Cada sección de componente incluye:
- **Selector**: cómo incrustarlo manualmente si fuera necesario.
- **Ruta**: path en `AppRoutingModule` si aplica.
- **Archivos**: `*.component.ts`, `*.component.html`, `*.component.css`.
- **Inputs / Outputs**: propiedades públicas decoradas con `@Input()` / `@Output()` (si existen).
- **Servicios usados**: servicios Angular que utiliza.
- **Descripción**: breve explicación de responsabilidades y comportamiento principal.
- **Template (.html)**: fragmento real del template.
- **Styles (.css)**: estilos relevantes.

---

**Estructura del proyecto**

El siguiente es el árbol principal del proyecto tal como está en el workspace. Útil para ubicar componentes, assets y configuración.

```
angular.json
karma.conf.js
package.json
README.md
tsconfig.app.json
tsconfig.json
tsconfig.spec.json
scripts/
src/
	index.html
	main.ts
	polyfills.ts
	styles.css
	test.ts
	app/
		app-routing.module.ts
		app.component.css
		app.component.html
		app.component.spec.ts
		app.component.ts
		app.module.ts
		components/
			home/
				home.component.ts
				home.component.html
				home.component.css
				home.component.spec.ts
			module1/
				module1.component.ts
				module1.component.html
				module1.component.css
				module1.component.spec.ts
			module2/
				module2.component.ts
				module2.component.html
				module2.component.css
				module2.component.spec.ts
			module3/
				module3.component.ts
				module3.component.html
				module3.component.css
				module3.component.spec.ts
			module4/
				module4.component.ts
				module4.component.html
				module4.component.css
				module4.component.spec.ts
			module5/
				module5.component.ts
				module5.component.html
				module5.component.css
				module5.component.spec.ts
			module6/
				module6.component.ts
				module6.component.html
				module6.component.css
				module6.component.spec.ts
			module7/
				module7.component.ts
				module7.component.html
				module7.component.css
				module7.component.spec.ts
		loader/
			loader.component.ts
			loader.component.html
			loader.component.css
			loader.component.spec.ts
		services/
			progress.service.ts
			progress.service.spec.ts
	assets/
		actividades/
			quizHotPotatos.htm
	environments/
		environment.ts
		environment.prod.ts
```

Notas:
- El árbol muestra los archivos y carpetas principales relevantes para el Manual de Componentes.
- Si quieres, puedo generar automáticamente un árbol más detallado (incluir tests, archivos adicionales y subcarpetas) o exportarlo como archivo `PROJECT_STRUCTURE.txt` en la raíz.
 - Si quieres, puedo generar automáticamente un árbol más detallado (incluir tests, archivos adicionales y subcarpetas) o exportarlo como archivo `PROJECT_STRUCTURE.txt` en la raíz.

---

**LoaderComponent**

- Selector: `app-loader`
- Ruta: no es una ruta, componente auxiliar (overlay global)
- Archivos: `src/app/loader/loader.component.ts`, `.html`, `.css`
- Inputs: ninguno
- Outputs: ninguno
- Descripción: Componente overlay que muestra una animación y marca visual de carga (logo + anillo giratorio). Se usa para indicar carga global o transiciones entre pantallas.
- Uso típico: insertar `<app-loader></app-loader>` en el `AppComponent` o renderizar condicionalmente cuando una operación larga está en curso.

Template (`loader.component.html`):

```html
<div class="loader-overlay">
	<div class="loader-animation">
		<div class="loader-graphic">
			<img src="assets/ova-robotia-icon.svg" alt="OVA RoboIA - Cargando" class="loader-img" />
			<div class="loader-ring" aria-hidden="true"></div>
		</div>
		<h2 class="loader-title">OVA RoboIA - Robótica e Inteligencia Artificial</h2>
		<p class="loader-desc">Cargando…</p>
	</div>
</div>
```

Styles (`loader.component.css`):

```css
.loader-overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background: linear-gradient(135deg, #0b0814 0%, #1e1640 30%, #352b5a 60%, #113241 85%), radial-gradient(500px 420px at 92% 70%, rgba(0,210,255,0.18) 0%, rgba(0,210,255,0.08) 28%, transparent 55%);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 2000;
	flex-direction: column;
}

.loader-animation { display:flex; flex-direction:column; align-items:center; text-align:center; color:#fff; animation: fadeIn 1.2s ease; }

.loader-graphic { position: relative; width:200px; height:200px; display:flex; align-items:center; justify-content:center; margin-bottom:2rem; overflow:hidden; border-radius:50%; }

.loader-img { width:160px; height:160px; border-radius:50%; position:relative; z-index:2; box-shadow:0 0 20px #00ffff66; animation: float 2.6s ease-in-out infinite, pulseGlow 2.8s ease-in-out infinite; }

.loader-ring { position:absolute; top:0; left:0; width:100%; height:100%; border-radius:50%; border:6px solid rgba(255,255,255,0.06); box-shadow:0 0 30px #00ffff55; animation: spin 6s linear infinite; }

.loader-title { font-size:2.2rem; font-weight:bold; margin-bottom:1rem; letter-spacing:2px; }
.loader-desc { font-size:1.2rem; opacity:0.8; }

@keyframes fadeIn { from { opacity:0; transform:scale(0.9); } to { opacity:1; transform:scale(1); } }
@keyframes spin { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
@keyframes float { 0%,100%{ transform:translateY(0);} 50%{ transform:translateY(-4px); } }
@keyframes pulseGlow { 0%{ box-shadow:0 0 10px #00ffff44;} 50%{ box-shadow:0 0 40px #00ffff88;} 100%{ box-shadow:0 0 10px #00ffff44;} }
```

---

**HomeComponent**

- Selector: `app-home`
- Ruta: `/`
- Archivos: `src/app/components/home/home.component.ts`, `.html`, `.css`
- Inputs: ninguno
- Outputs: ninguno
- Descripción: Componente de bienvenida; contiene el método `start()` que marca el inicio en `ProgressService` y navega a `/module1`.
- Ejemplo de uso (si se usa sin router):

```html
<app-home></app-home>
```

---

**Module1Component**

- Selector: `app-module1`
- Ruta: `/module1`
- Archivos: `src/app/components/module1/module1.component.ts`, `.html`, `.css`
- Inputs: ninguno
- Outputs: ninguno
- Descripción: Presenta una lista de actividades (interface `ActivityItem`) que el usuario selecciona. Calcula una puntuación basada en ítems con IA y actualiza `ProgressService` cuando se completan todas las selecciones.
- Ejemplo de uso (routed): acceder a `/module1`.

```html
<app-module1></app-module1>
```

---

**Module2Component**

- Selector: `app-module2`
- Ruta: `/module2`
- Archivos: `src/app/components/module2/module2.component.ts`, `.html`, `.css`
- Inputs: ninguno
- Outputs: ninguno
- Descripción: Actividad de arrastrar/colocar componentes de un robot (`RobotComponent`). Usa un script externo H5P (`h5p-resizer.js`) inyectado en `ngOnInit`. Actualiza `ProgressService` al completar la actividad.
- Nota: abre enlaces H5P externos con `openH5P()`.

---

**Module3Component**

- Selector: `app-module3`
- Ruta: `/module3`
- Archivos: `src/app/components/module3/module3.component.ts`, `.html`, `.css`
- Inputs: ninguno
- Outputs: ninguno
- Descripción: Actividad de clasificación de ejemplos en categorías `ia`, `robotics` o `both`. Lleva contadores y almacena ítems clasificados; llama a `ProgressService.updateProgress` al terminar.

---

**Module4Component**

- Selector: `app-module4`
- Ruta: `/module4`
- Archivos: `src/app/components/module4/module4.component.ts`, `.html`, `.css`
- Inputs: ninguno
- Outputs: ninguno
- Descripción: Crucigrama interactivo. Mantiene la estructura del tablero en `crossword` y comprueba respuestas con `checkAnswer()`. Marca el módulo como completado en `ProgressService` si todas las palabras son correctas.

---

**Module5Component**

- Selector: `app-module5`
- Ruta: `/module5`
- Archivos: `src/app/components/module5/module5.component.ts`, `.html`, `.css`
- Inputs: ninguno
- Outputs: ninguno
- Descripción: Contiene un quiz por preguntas y un pequeño simulador de movimiento en cuadrícula con sensores y obstáculos. Actualiza progreso y permite reiniciar quiz y simulador.

---

**Module6Component**

- Selector: `app-module6`
- Ruta: `/module6`
- Archivos: `src/app/components/module6/module6.component.ts`, `.html`, `.css`
- Inputs: ninguno
- Outputs: ninguno
- Descripción: Actividades de emparejamiento (drag & drop) entre `matchingItems` y `sectors`. Incluye estudios de caso y lógica para comprobar aciertos y completar módulo.

---

**Module7Component**

- Selector: `app-module7`
- Ruta: `/module7`
- Archivos: `src/app/components/module7/module7.component.ts`, `.html`, `.css`
- Inputs: ninguno
- Outputs: ninguno
- Descripción: Examen final con varios tipos de preguntas (múltiple, VF, secuencia, emparejar). Calcula nota, guarda progreso y permite generar un certificado en PDF usando `html2canvas` y `jsPDF`.

---

**Notas generales y recomendaciones**

- Todos los componentes usan `ProgressService` para leer/actualizar el avance; revisar `src/app/services/progress.service.ts` para entender el contrato.
- No se encontraron `@Input()` ni `@Output()` en los componentes analizados; la comunicación se realiza mediante `ProgressService` y enrutamiento.
- Los componentes se usan principalmente vía rutas (`AppRoutingModule`). Si deseas documentar el API público (entradas/salidas), se recomienda añadir JSDoc en los métodos públicos y/o `@Input`/`@Output` donde aplique.

**Siguientes pasos sugeridos**

- Completar la sección de cada componente con fragmentos de `template` reales (`.html`) y notas de CSS específicas.
- Añadir capturas de pantalla o GIFs de interacción para el manual del OVA.
- Documentar la API de `ProgressService` en una sección separada.

Si quieres, continúo extrayendo el contenido de los archivos `.html` y `.css` de cada componente para incluir ejemplos reales y capturas de uso en este manual.

*** Fin del manual inicial automático ***

---

A continuación se incluyen los templates (`.html`) y estilos (`.css`) reales extraídos del proyecto para cada componente. Puedes copiar directamente estos fragmentos al manual o exportarlos a PDF.

**HomeComponent — Template y Styles**

`src/app/components/home/home.component.html`:

```html
<div class="home-container">
	<div class="futuristic-header">
		<h1 class="main-title">Bienvenido al mundo del OVA RoboIA</h1>
		<div class="tech-background">
			<div class="circuit-animation"></div>
			<div class="floating-robot"></div>
		</div>
	</div>
  
	<div class="instructions-section">
		<div class="instruction-card">
			<h3>🎯 Propósito del OVA</h3>
			<p>Proporcionar a los estudiantes una experiencia de aprendizaje interactiva en 7 módulos sobre Inteligencia Artificial (IA) y Robótica, combinando teoría, simuladores y ejercicios prácticos para reforzar conceptos y habilidades.</p>
		</div>
    
		<div class="instruction-card">
			<h3>📚 Contenido del OVA</h3>
			<ul>
				<li>Módulo 1: Introducción a la IA</li>
				<li>Módulo 2: ¿Qué es la Robótica?</li>
				<li>Módulo 3: IA vs Robótica</li>
				<li>Módulo 4: Sensores y Datos</li>
				<li>Módulo 5: Programación Práctica</li>
				<li>Módulo 6: Aplicaciones Reales</li>
				<li>Módulo 7: Evaluación Final</li>
			</ul>
		</div>
	</div>

	<div class="start-section">
		<button class="start-button" (click)="start()">
			<span class="button-text">Comenzar</span>
			<div class="button-glow"></div>
		</button>
	</div>
</div>
```

`src/app/components/home/home.component.css` (fragmento):

```css
.home-container {
	min-height: calc(100vh - 120px);
	background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
	color: white;
	font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	box-sizing: border-box;
}

.futuristic-header {
	text-align: center;
	padding: 1.2rem 2rem;
	position: relative;
	overflow: hidden;
}

.main-title {
	font-size: 3rem;
	font-weight: 700;
	margin-bottom: 1rem;
	color: #00ffff;
}

.start-button {
	position: relative;
	background: #2196F3;
	border: none;
	padding: 1rem 2rem;
	border-radius: 50px;
	color: white;
	font-size: 1rem;
	font-weight: bold;
	cursor: pointer;
	overflow: hidden;
	transition: all 0.3s ease;
}
```

---

**Module1Component — Template y Styles**

`src/app/components/module1/module1.component.html`:

```html
<div class="module-container">
	<div class="module-header">
		<h1>Módulo 1: Introducción a la Inteligencia Artificial</h1>
		<div class="navigation">
			<button class="nav-button" routerLink="/">Inicio</button>
			<button class="nav-button" (click)="goNext()">Siguiente →</button>
		</div>
	</div>

	<div class="content-wrapper">
		<div class="interactive-presentation">
			<div class="genially-placeholder">
				<h3>Presentación Interactiva</h3>
				<div class="presentation-content">
					<h4>¿Qué es la IA?</h4>
					<p>La Inteligencia Artificial es la simulación de procesos de inteligencia humana por parte de máquinas.</p>
          
					<h4>Tipos de IA:</h4>
					<ul>
						<li><strong>IA Débil:</strong> Especializada en una tarea específica (ej: asistentes virtuales)</li>
						<li><strong>IA Fuerte:</strong> Capacidades humanas completas (aún en desarrollo)</li>
						<li><strong>IA Generativa:</strong> Crea contenido nuevo (texto, imágenes, música)</li>
					</ul>
          
					<h4>Ejemplos en la vida real:</h4>
					<ul>
						<li>Asistentes virtuales (Siri, Alexa, Google Assistant)</li>
						<li>Sistemas de recomendación (Netflix, YouTube, Amazon)</li>
						<li>Chatbots de atención al cliente</li>
						<li>Reconocimiento facial en redes sociales</li>
					</ul>
				</div>
				<div style="width: 100%;">
					<div style="position: relative; padding-bottom: 56.25%; padding-top: 0; height: 0;">
						<iframe title="Introducción a la Actividad: Selecciona las Parejas" frameborder="0" width="1200px" height="675px" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" src="https://view.genially.com/6928fd9361e2adf4468e8e41" type="text/html" allowscriptaccess="always" allowfullscreen="true" scrolling="yes" allownetworking="all"></iframe>
					</div>
				</div>
			</div>
		</div>

		<div class="mini-activity">
			<h3>Mini Actividad: Identifica la IA</h3>
			<p>Haz clic en los elementos que creas que usan Inteligencia Artificial</p>
      
			<div class="activity-grid">
				<div class="activity-item" 
						 *ngFor="let item of activityItems" 
						 [class.correct]="item.selected && item.hasAI"
						 [class.incorrect]="item.selected && !item.hasAI"
						 (click)="selectItem(item)">
					<div class="item-icon">{{item.icon}}</div>
					<span>{{item.name}}</span>
				</div>
			</div>

			<div class="activity-feedback" *ngIf="showFeedback">
				<p *ngIf="score >= 3">✅ ¡Excelente! Has identificado correctamente {{score}} de 5 elementos con IA.</p>
				<p *ngIf="score < 3">❌ Puedes mejorar. Has identificado {{score}} de 5 elementos con IA.</p>
				<button class="reset-button" (click)="resetActivity()">Reintentar</button>
			</div>
		</div>
	</div>
</div>
```

`src/app/components/module1/module1.component.css` (fragmento):

```css
.module-container { min-height: 100vh; background: linear-gradient(135deg, #0f0c29, #302b63, #24243e); color: white; padding: 2rem; }
.module-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:2rem; }
.nav-button { background: rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.3); color:white; padding:0.5rem 1rem; border-radius:5px; }
```

---

**Module2Component — Template y Styles**

`src/app/components/module2/module2.component.html` (fragmento):

```html
<div class="module-container">
	<div class="module-header">
		<h1>Módulo 2: ¿Qué es la Robótica?</h1>
		<div class="navigation">
			<button class="nav-button" routerLink="/module1">← Anterior</button>
			<button class="nav-button" routerLink="/">Inicio</button>
			<button class="nav-button" (click)="goNext()">Siguiente →</button>
		</div>
	</div>

	<div class="content-wrapper">
		<div class="h5p-presentation">
			<h3>Presentación Interactiva - H5P</h3>
			<!-- Cards y video embebido -->
		</div>

		<div class="drag-drop-activity">
			<h3>Actividad: Arma tu Robot</h3>
			<div class="drag-drop-container">
				<div class="components-pool">
					<div class="draggable-component" *ngFor="let component of components" (click)="addComponent(component)" [class.used]="isComponentUsed(component)">{{component.icon}} {{component.name}}</div>
				</div>
				<div class="robot-body"> ... </div>
			</div>
		</div>
	</div>
</div>
```

`src/app/components/module2/module2.component.css` (fragmento):

```css
.module-container { min-height:100vh; background: linear-gradient(135deg,#0f0c29,#302b63,#24243e); color:white; padding:2rem; }
.h5p-embed-wrapper .responsive-embed iframe { position:absolute; top:0; left:0; width:100% !important; height:100% !important; border:0; }
```

---

**Module3Component — Template y Styles (resumen)**

`src/app/components/module3/module3.component.html` contiene:

- Mapa conceptual con listas de ejemplos para "Solo IA", "Solo Robótica" y "Ambas".
- Un iframe embebido de Educaplay para un juego interactivo.
- Actividad de clasificación con botones para asignar cada ejemplo a una categoría y visualización de resultados.

Fragmento (actividad de clasificación):

```html
<div class="classification-game">
	<div class="current-example" *ngIf="currentExample">
		<div class="example-card">
			<h4>Ejemplo:</h4>
			<p>{{currentExample.text}}</p>
		</div>
		<div class="category-buttons">
			<button class="category-btn ia-btn" (click)="classifyExample('ia')">🤖 Solo IA</button>
			<button class="category-btn robotics-btn" (click)="classifyExample('robotics')">🦾 Solo Robótica</button>
			<button class="category-btn both-btn" (click)="classifyExample('both')">🚀 Ambas</button>
		</div>
	</div>
</div>
```

Styles en `module3.component.css` (resumen): layout en grid, tarjetas con fondo translúcido y botones de categoría.

---

**Module4Component — Template y Styles (fragmentos)**

`src/app/components/module4/module4.component.html` incluye la actividad local `assets/actividades/quizHotPotatos.htm` y el crucigrama implementado en la vista. Fragmento del crucigrama:

```html
<div class="crossword-grid">
	<div class="crossword-row" *ngFor="let row of crossword; let i = index">
		<div class="crossword-cell" *ngFor="let cell of row; let j = index" [class.fillable]="cell === ''">
			<input *ngIf="cell === ''" type="text" maxlength="1" [(ngModel)]="userAnswers[i][j]" (input)="checkAnswer()">
			<span *ngIf="(cell !== null && cell !== '')">{{cell}}</span>
		</div>
	</div>
</div>
```

Styles en `module4.component.css`: grid de crucigrama, clases `.fillable`, `.correct`, `.empty` y adaptaciones responsive.

---

**Module5Component — Template y Styles (fragmentos)**

`src/app/components/module5/module5.component.html` contiene quiz embebidos (Wayground), explicación de condicionales y el simulador de robot (grid 3x3). Fragmento del simulador:

```html
<div class="simulator-grid">
	<div *ngFor="let cell of grid; let i = index" class="grid-cell" [class.robot]="cell === 'R'" [class.obstacle]="cell === 'X'" [class.goal]="cell === 'G'"> ... </div>
</div>
```

Styles en `module5.component.css`: disposición en grid para simulador, controles y botones, bloques para feedback.

---

**Module6Component — Template y Styles (fragmentos)**

`src/app/components/module6/module6.component.html` incluye tarjetas de aplicaciones por sector, drag & drop para relacionar items con sectores y casos de estudio. Fragmento del drag start / drop zones:

```html
<div class="draggable-item" *ngFor="let item of matchingItems" draggable="true" (dragstart)="onDragStart($event, item)">{{item.name}}</div>

<div *ngFor="let sector of sectors" class="sector-dropzone" (drop)="onDrop($event, sector)" (dragover)="onDragOver($event)"> ... </div>
```

Styles en `module6.component.css`: tarjetas de aplicación, zonas `sector-dropzone` y estilos de `dropped-item`.

---

**Module7Component — Template y Styles (fragmentos)**

`src/app/components/module7/module7.component.html` contiene el flujo completo del examen, la visualización de preguntas por tipo y la plantilla del certificado que se renderiza y convierte a PDF con `html2canvas` + `jsPDF`.

Fragmentos clave:

```html
<!-- Botón para iniciar examen -->
<button class="start-exam-button" (click)="startExam()">Comenzar Evaluación</button>

<!-- Contenedor de pregunta (ngSwitch por tipo) -->
<div class="question-card" [ngSwitch]="currentQuestion.type"> ... </div>

<!-- Plantilla del certificado (preview / PDF) -->
<div *ngIf="showPreview" id="certificate" class="certificate-preview"> ... </div>
```

Styles en `module7.component.css`: diseño de examen, botones, progress bar y estilos específicos para la plantilla del certificado.

---

**ProgressService — API y código**

El servicio central que gestiona el progreso de los módulos está en `src/app/services/progress.service.ts`. Resumen:

- `getProgress()` → devuelve `ModuleProgress[]` (lectura desde `localStorage`).
- `updateProgress(moduleId, completed, score?)` → crea/actualiza entrada con `timestamp`.
- `getOverallProgress()` → porcentaje calculado sobre 7 módulos.
- `resetProgress()` → elimina la clave del storage.
- `getStarted()` / `setStarted()` → controla si el usuario pulsó "Comenzar" en `HomeComponent`.
- `isModuleCompleted(moduleId)` → helper boolean.

Código completo (ya presente en el repositorio):

```typescript
import { Injectable } from '@angular/core';

export interface ModuleProgress {
	moduleId: number;
	completed: boolean;
	score?: number;
	timestamp?: Date;
}

@Injectable({ providedIn: 'root' })
export class ProgressService {
	private readonly STORAGE_KEY = 'taller-ia-progress';
	private readonly STARTED_KEY = 'taller-ia-started';

	getProgress(): ModuleProgress[] { const stored = localStorage.getItem(this.STORAGE_KEY); return stored ? JSON.parse(stored) : []; }

	updateProgress(moduleId: number, completed: boolean, score?: number): void {
		const progress = this.getProgress();
		const existingIndex = progress.findIndex(p => p.moduleId === moduleId);
		const moduleProgress: ModuleProgress = { moduleId, completed, score, timestamp: new Date() };
		if (existingIndex >= 0) progress[existingIndex] = moduleProgress; else progress.push(moduleProgress);
		localStorage.setItem(this.STORAGE_KEY, JSON.stringify(progress));
	}

	getOverallProgress(): number { const progress = this.getProgress(); const completed = progress.filter(p => p.completed).length; return (completed / 7) * 100; }

	resetProgress(): void { localStorage.removeItem(this.STORAGE_KEY); }
	getStarted(): boolean { try { const v = localStorage.getItem(this.STARTED_KEY); return v === 'true'; } catch (e) { return false; } }
	setStarted(started: boolean): void { try { localStorage.setItem(this.STARTED_KEY, started ? 'true' : 'false'); } catch (e) {} }
	isModuleCompleted(moduleId: number): boolean { try { const progress = this.getProgress(); const p = progress.find(x => x.moduleId === moduleId); return !!(p && p.completed); } catch (e) { return false; } }
}
```

---

Si quieres, pego íntegramente cada archivo `.html` y `.css` (ya tengo su contenido) en secciones separadas del MD para que el archivo quede auto-contenido y listo para exportar a PDF. Confirma si deseas que incluya los contenidos íntegros (esto hará el MD bastante largo). De lo contrario, puedo dejar este resumen y generar el PDF desde aquí.
