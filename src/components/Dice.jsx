import { useState, useRef, useEffect } from "react";
import Confetti from 'react-confetti'
export default function Dice() {
    const [dice, setDice] = useState(() => 
        new Array(10).fill(0).map(() => Math.floor(Math.random() * 6) + 1)
    );

    const [isHeld, setIsHeld] = useState(new Array(10).fill(false));

    const [won, setWon] = useState(false);

    const toggleHeld = (index) => {
        setIsHeld(prevHeld => {
            const newHeld = [...prevHeld];
            newHeld[index] = !newHeld[index];
            return newHeld;
        });
    };

    const rollDice = () => {
        if (!won) {
            setDice(prevDice => 
                prevDice.map((die, index) => 
                    isHeld[index] ? die : Math.floor(Math.random() * 6) + 1
                )
            );
        }
    };

    useEffect(() => {
        const allHeld = isHeld.every(held => held);
        const firstValue = dice[0];
        const allSameValue = dice.every(die => die === firstValue);
        
        if (allHeld && allSameValue) {
            setWon(true);
        }
    }, [dice, isHeld]);

    const resetGame = () => {
        setDice(new Array(10).fill(0).map(() => Math.floor(Math.random() * 6) + 1));
        setIsHeld(new Array(10).fill(false));
        setWon(false);
    };

    return (
        <div className="dice">
            {won && <Confetti width={800} height={400}/>}
            {dice.map((die, index) => (
                <button 
                    key={`die-${index}`}
                    className="die"
                    style={{ backgroundColor: isHeld[index] ? "#59E391" : "white", pointerEvents : won ? "none" : "auto"}}
                    onClick={() => toggleHeld(index)}
                >
                    {die}
                </button>
            ))}
            <button 
                className="roll-dice" 
                onClick={won ? resetGame : rollDice}
            >
                {won ? "New Game" : "Roll"}
            </button>
        </div>
    );
}