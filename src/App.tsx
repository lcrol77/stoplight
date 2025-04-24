import { RefObject, useEffect, useRef, useState } from 'react'
import './App.css'

enum Color {
    RED,
    YELLOW,
    GREEN
}

const TIME_OUTS = {
    0: 30 * 1000,
    1: 10 * 1000,
    2: 120 * 1000
}

interface LightProps {
    color: string
    activeColor: Color
    thisColor: Color
}

function StopLight() {
    const [activeColor, setActiveColor] = useState(Color.GREEN);
    const intervalRef: RefObject<number | null> = useRef(null);

    useEffect(() => {
        if (intervalRef.current != null) {
            clearInterval(intervalRef.current);
        }
        intervalRef.current = setInterval(() => {
            progressLights()
        }, TIME_OUTS[activeColor]);
        return ()=>clearInterval(intervalRef.current!);
    }, [activeColor]);

    const handleClick = () => {
        progressLights();
    }

    const progressLights = () => {
        if (activeColor === Color.RED) {
            setActiveColor(Color.YELLOW);
        } else if (activeColor === Color.YELLOW) {
            setActiveColor(Color.GREEN);
        } else if (activeColor === Color.GREEN) {
            setActiveColor(Color.RED);
        }
    }

    return (
        <div>
            <Light color="red" activeColor={activeColor} thisColor={Color.RED} />
            <Light color="yellow" activeColor={activeColor} thisColor={Color.YELLOW} />
            <Light color="green" activeColor={activeColor} thisColor={Color.GREEN} />
            <button style={{ marginTop: 80 }} onClick={handleClick}>
                change light
            </button>
        </div>
    )
}

const Light: React.FC<LightProps> = ({ color, activeColor, thisColor }) => {
    return (
        <>
            {
                activeColor === thisColor ?
                    <div style={{ width: 200, height: 200, background: color }} /> :
                    <div style={{ width: 200, height: 200, background: "grey" }} />
            }
        </>
    )
}

function App() {
    return (
        <>
            <StopLight />
        </>
    )
}

export default App
