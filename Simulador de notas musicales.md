# Simulador de Notas Musicales

Este proyecto crea una aplicación que simula un piano virtual. Los usuarios pueden hacer clic en teclas para reproducir notas musicales, ver las notas que han tocado, grabar secuencias de notas y reproducirlas.

## Temas Cumplidos en el Proyecto

### 1. **Escribir tu primer componente de React**
   - **Componente:** `App.tsx`, `Keyboard.tsx`, `Recorder.tsx`, `Key.tsx`, `Player.tsx`
   - **Explicación:** Se han creado múltiples componentes en React, empezando por el componente `App`, que contiene la estructura principal de la aplicación, y luego los componentes secundarios como `Keyboard`, `Recorder`, `Key`, y `Player` para modularizar la funcionalidad.
 ```typescript
 import './App.css'
import React, { useState } from 'react';
import Recorder from './Recorder.tsx';
import Keyboard from "./piano.tsx";
import Player from "./Player.tsx";


const playNote = (note: string) => {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();

    const frequencies: { [key: string]: number } = {
        'C': 261.63, 'C#': 277.18, 'D': 293.66, 'D#': 311.13, 'E': 329.63,
        'F': 349.23, 'F#': 369.99, 'G': 392.00, 'G#': 415.30, 'A': 440.00,
        'A#': 466.16, 'B': 493.88
    };

    oscillator.frequency.setValueAtTime(frequencies[note], audioCtx.currentTime);
    oscillator.connect(audioCtx.destination);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.5); // La nota dura 0.5 segundos
};

const App: React.FC = () => {
    const [recordedNotes, setRecordedNotes] = useState<string[]>([]);

    const useRecordNote = (note: string) => {
        setRecordedNotes(prevNotes => [...prevNotes, note]);
        playNote(note);
    };

    const usePlayNote = () => {
        recordedNotes.forEach((note, index) => {
            setTimeout(() => {
                playNote(note);
            }, index * 500);
        });
    };

    return (
        <div className="app">
            <Keyboard onNotePlayed={useRecordNote} /> {/* Se agrega onNotePlayed */}
            <Recorder recordedNotes={recordedNotes} onRecord={useRecordNote} />
            <Player recordedNotes={recordedNotes} onPlay={usePlayNote}/>
        </div>
    );
};

export default App;
 ```

### 2. **Crear un componente Tecla que represente cada tecla del piano**
   - **Componente:** `Key.tsx`
   - **Explicación:** El componente `Key` representa cada tecla del piano y gestiona la interacción del usuario (clic en la tecla) para reproducir notas. Cada tecla tiene una propiedad `note` que indica qué nota se debe reproducir al hacer clic.

   ```typescript
   import React from 'react';

interface KeyProps {
    note: string;
    onClick: (note: string) => void,
    isActive: boolean;
}


const Key: React.FC<KeyProps> = ({note, onClick, isActive}) => {
    const isSharp = note.includes('#');
    return (
        <button
            onClick={() => onClick(note)} className={key ${isSharp ? key-sharp : white-key} ${isActive ? active-key : ''}}>
            {note}
        </button>
    );
};
export default Key;

 ```


### 3. **Crear archivos con múltiples componentes**
   - **Componente:** `Recorder.tsx`, `Keyboard.tsx`, `Key.tsx`, `App.tsx`
   - **Explicación:** Se crean varios archivos de componentes para mantener la aplicación modular. Cada componente se enfoca en una parte específica de la interfaz, lo que hace que la aplicación sea escalable y fácil de mantener.

### 4. **Añadir marcado a JavaScript con JSX**
   - **Componente:** Todos los componentes.
   - **Explicación:** Se usa JSX para crear la estructura de la interfaz de usuario. Los elementos HTML están escritos dentro de archivos `.tsx` para su correcto renderizado y manipulación en React.

### 5. **Usar JSX para renderizar el teclado y la interfaz de grabación/reproducción**
   - **Componente:** `App.tsx`, `Keyboard.tsx`, `Recorder.tsx`
   - **Explicación:** JSX se usa para renderizar dinámicamente las teclas del piano, las opciones de grabación y la reproducción de las notas grabadas.

### 6. **Añadir llaves con JSX**
   - **Componente:** `Recorder.tsx`
   - **Explicación:** En el componente `Recorder`, se usa la función `map` con llaves en JSX para iterar a través de las notas grabadas y renderizarlas como una lista.

```typescript
   import React, { useState } from 'react';

interface RecorderProps {
    recordedNotes: string[];
    onRecord: (note: string) => void;
}

const Recorder: React.FC<RecorderProps> = ({ recordedNotes, onRecord }) => {
    const [recording, setRecording] = useState<boolean>(false);

    const startRecording = () => {
        setRecording(true);
    };

    const stopRecording = () => {
        setRecording(false);
    };

    return (
        <div>
            <button onClick={startRecording} disabled={recording}>Start Recording</button>
            <button onClick={stopRecording} disabled={!recording}>Stop Recording</button>
            <ul>
                {recordedNotes.map((note, index) => (
                    <li key={index}>{note}</li>
                ))}
            </ul>
        </div>
    );
};

export default Recorder;
```


### 7. **Configurar componentes con props**
   - **Componente:** `Recorder.tsx`, `Keyboard.tsx`, `App.tsx`
   - **Explicación:** Los componentes se comunican entre sí usando props. Por ejemplo, el componente `Recorder` recibe `recordedNotes` y `onRecord` como props para manejar la grabación de notas, mientras que `Keyboard` pasa la nota tocada al componente `App`.

### 8. **Renderizar condicionalmente**
   - **Componente:** `Keyboard.tsx`
   - **Explicación:** El componente `Keyboard` renderiza visualmente qué tecla ha sido presionada mediante el estado `playedNote`, que cambia dinámicamente al hacer clic en las teclas.


```typescript
import React, {useState} from "react";
import Key from "./Key";

const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const Keyboard: React.FC = () => {
    const [playedNote, setPlayedNote] = useState<string | null>(null);

    const useClick = (note: string) => {
        setPlayedNote(note);
        console.log('Played Note:', note);
    };

    return (
        <div>
            <div className="Keyboard">



                {notes.map(notes => (
                    <Key key={notes} note={notes} onClick={useClick} />
                ))}
            </div>
            {playedNote && <p>Played Note: {playedNote}</p>}
        </div>
    );

};

export default Keyboard;

```
### 9. **Renderizar múltiples componentes a la vez**
   - **Componente:** `Keyboard.tsx`
   - **Explicación:** En el componente `Keyboard`, se usa la función `map` para renderizar todas las teclas del piano de manera eficiente, pasando cada una a través del componente `Key`.

### 10. **Mantener componentes puros**
   - **Componente:** `Key.tsx`
   - **Explicación:** El componente `Key` es un componente puro, ya que no muta el estado directamente. Recibe información (como si la tecla está activa) a través de props, y simplemente se encarga de renderear un botón.

### 11. **Entender la UI como árboles**
   - **Componente:** `App.tsx`, `Keyboard.tsx`, `Recorder.tsx`
   - **Explicación:** La estructura de la interfaz se organiza jerárquicamente, con el componente `App` en la raíz, que contiene otros componentes como `Keyboard`, `Recorder` y `Player`, creando una jerarquía clara y fácil de navegar.

### 12. **Controlar eventos del usuario**
   - **Componente:** `Keyboard.tsx`, `Recorder.tsx`, `Key.tsx`
   - **Explicación:** Los eventos de clic del usuario son manejados mediante las funciones `onClick` y `onRecord`, que permiten tocar las notas y grabar secuencias de notas.

### 13. **Gestionar el estado**
   - **Componente:** `App.tsx`, `Recorder.tsx`, `Keyboard.tsx`
   - **Explicación:** El estado de las notas grabadas y las teclas presionadas es gestionado dentro del componente `App` y pasado a los componentes hijos como props. Esto asegura que el estado se mantenga sincronizado en toda la aplicación.

### 14. **Levantar el estado**
   - **Componente:** `App.tsx`, `Recorder.tsx`
   - **Explicación:** El estado de las notas grabadas se "levanta" al componente `App`, que luego pasa el estado a `Recorder` y `Keyboard` para que todos los componentes compartan la misma información.

### 15. **Sincronización de efectos**
   - **Componente:** `App.tsx`
   - **Explicación:** Se usa la función `setTimeout` para reproducir las notas grabadas en una secuencia. Aunque no se usa `useEffect` explícitamente, el ciclo de reproducción está sincronizado para que las notas se toquen una a una con un retraso.

### 16. **Acceder a valores del DOM**
   - **Componente:** No se ha usado explícitamente `useRef` en este caso.
   - **Explicación:** Aunque el uso de `useRef` no está implementado en este código, el acceso al DOM se manejaría si fuera necesario (por ejemplo, para manipular el foco o elementos específicos del DOM de las teclas).

## Resumen de los Componentes

1. **`App.tsx`**: Componente principal que maneja la lógica de grabación y reproducción de notas.
2. **`Keyboard.tsx`**: Renderiza las teclas del piano y maneja la interacción del usuario.
3. **`Recorder.tsx`**: Muestra las notas grabadas y permite empezar y detener la grabación.
4. **`Key.tsx`**: Representa una tecla del piano y se encarga de renderizarla y gestionar los clics.
5. **`Player.tsx`**: No proporcionado en el código, pero se asume que se utiliza para reproducir las notas grabadas.

