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
