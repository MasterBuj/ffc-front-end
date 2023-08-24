
import PropTypes from 'prop-types';
import { useState } from 'react';
import './styles/calculator.css';


ScreenComponent.propTypes = {
    result: PropTypes.any,
    entries: PropTypes.any
}

function ScreenComponent({ result, entries }) {
    return (
        <div className="screen">
            <p className="history">
                <span className='equalSign'>=</span>
                <span className='result'>{result}</span>
            </p>
            <textarea className='entries' readOnly value={entries} />
        </div>
    )
}


KeyPadComponent.propTypes = {
    onClick: PropTypes.func.isRequired
}

function KeyPadComponent({ onClick }) {
    const buttons = [
        { name: "C", label: "C" },
        { name: "CE", label: "CE" },
        { name: "(", label: "(" },
        { name: ")", label: ")" },
        { name: "1", label: "1" },
        { name: "2", label: "2" },
        { name: "3", label: "3" },
        { name: "+", label: "+" },
        { name: "4", label: "4" },
        { name: "5", label: "5" },
        { name: "6", label: "6" },
        { name: "-", label: "-" },
        { name: "7", label: "7" },
        { name: "8", label: "8" },
        { name: "9", label: "9" },
        { name: "*", label: "x" },
        { name: ".", label: "." },
        { name: "0", label: "0" },
        { name: "=", label: "=" },
        { name: "/", label: "/" }
    ];


    return (
        <div className="buttons">
            {buttons.map(({ name, label }) => (
                <button
                    key={name}
                    name={name}
                    onClick={() => onClick(name)}
                >
                    {label}
                </button>
            ))}
        </div>
    );
}

function Calculator() {
    const [result, setResult] = useState("");
    const [entries, setEntries] = useState("");

    const handleEqualsClick = () => {
        if (entries !== "" && entries !== "Error") {
            calculate(entries.toString())
        }
    };

    const handleClearClick = () => {
        setEntries("")
        setResult("")
    };

    const handleClearEntryClick = () => {
        if (entries === "Error") {
            setEntries("")
            setResult("")
        } else {
            setEntries(entries.toString().slice(0, -1))
        }
    };

    const handleDefaultClick = (button) => {
        (entries === "Error") ?
            setEntries(button)
            :
            setEntries(entries + button);
    };

    const onClick = (button) => {
        switch (button) {
            case "=":
                handleEqualsClick();
                break;

            case "C":
                handleClearClick();
                break;

            case "CE":
                handleClearEntryClick();
                break;

            default:
                handleDefaultClick(button);
        }
    };

    const calculate = async (problem) => {
        let expression = ''
        if (problem.includes('--')) {
            expression = setEntries(problem.replace('--', '+'))
        } else {
            expression = problem
        }

        try {
            const response = eval(expression);
            setResult(response);
        } catch (e) {
            alert('An error occurred while calculating. Please try again later.')
            console.log(`Error: ${e}`)
            return 'error'
        }
    };



    return (
        <div className="calculator-container">
            <ScreenComponent entries={entries} result={result} />
            <KeyPadComponent onClick={onClick} />
        </div>
    );
}

export default Calculator;

