import React from 'react';

interface KeyProps {
    note: string;
    onClick: (note: string) => void;
}


const Key: React.FC<KeyProps> = ({note, onClick}) => {
    return (
        <button onClick={() => onClick(note)} className="key">
            {note}
        </button>
    );
};
export default Key;