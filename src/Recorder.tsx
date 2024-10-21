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
