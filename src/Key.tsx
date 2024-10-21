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