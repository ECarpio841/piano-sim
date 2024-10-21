
import Key from "./Key";
import React, { useState } from "react";

const notes = ['C','C#', 'D','D#', 'E', 'F','F#', 'G', 'G#', 'A', 'A#', 'B'];

interface KeyboardProps {
    onNotePlayed: (note: string) => void;
}

const Keyboard: React.FC<KeyboardProps> = ({ onNotePlayed }) => {
    const [playedNote, setPlayedNote] = useState<string | null>(null);

    const handleClick = (note: string) => {
        setPlayedNote(note);
        onNotePlayed(note);
    };

    return (
        <div>
            <div className="Keyboard">
                {notes.map(note => (
                    <Key key={note} note={note} onClick={handleClick} isActive={note === playedNote} />
                ))}
            </div>
            {playedNote && <p>Played Note: {playedNote}</p>}
        </div>
    );
};

export default Keyboard;
