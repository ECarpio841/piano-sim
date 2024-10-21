import React from 'react';

interface PlayerProps {
    recordedNotes: string[];
    onPlay: () => void;
}

const Player: React.FC<PlayerProps> = ({ recordedNotes, onPlay }) => {
    return (
        <div>
            <button onClick={onPlay} disabled={recordedNotes.length === 0}>
                Play
            </button>
        </div>
    );
};

export default Player;