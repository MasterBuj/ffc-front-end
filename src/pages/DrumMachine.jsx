import { useEffect, useState } from 'react';
import "./styles/DrumMachine.css";
const audioData = [
    { id: 'Q', name: 'Heater 1', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3' },
    { id: 'W', name: 'Heater 2', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3' },
    { id: 'E', name: 'Heater 3', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3' },
    { id: 'A', name: 'Heater 4', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3' },
    { id: 'S', name: 'Clap', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' },
    { id: 'D', name: 'Open-HH', src: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' },
    { id: 'Z', name: 'Kick-n\'-Hat', src: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' },
    { id: 'X', name: 'Kick', src: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' },
    { id: 'C', name: 'Closed-HH', src: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3' },
];

function DrumMachine() {
    const [displayText, setDisplayText] = useState('');

    const playSound = (src) => {
        const audio = new Audio(src);
        audio.play();
    };

    const handleKeyPress = (event) => {
        const key = event.key.toUpperCase();
        const audio = audioData.find((item) => item.id === key);
        if (audio) {
            playSound(audio.src);
            setDisplayText(audio.name);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    });

    return (
        <div id="drum-machine" className="drum-machine-container">
            <div id="display">{displayText}</div>
            <div className="drum-pads">
                {audioData.map((audio) => (
                    <div
                        key={audio.id}
                        className="drum-pad"
                        id={audio.id}
                        onClick={() => {
                            playSound(audio.src);
                            setDisplayText(audio.name);
                        }}
                    >
                        {audio.id}
                        <audio className="clip" id={audio.id} src={audio.src}></audio>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DrumMachine
