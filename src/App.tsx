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