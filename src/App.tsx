import { useRef, useState } from 'react'
import './App.css'

function StopLight() {
    const [state, setState] = useState({
        redIsActive: true,
        yellowIsActive: false,
        greenIsActive: false,
    });
    const timerId = useRef(null);
    const handleClick = () => {
        progressLights();
    }
    const progressLights = () => {
        if (state.redIsActive) {
            setState({ ...state, redIsActive: false, yellowIsActive: true });
        } else if (state.yellowIsActive) {
            setState({ ...state, yellowIsActive: false, greenIsActive: true });
        } else if (state.greenIsActive) {
            setState({ ...state, greenIsActive: false, redIsActive: true });
        }
    }
    return (
        <div>
            <Light color="red" isActive={state.redIsActive} />
            <Light color="yellow" isActive={state.yellowIsActive} />
            <Light color="green" isActive={state.greenIsActive} />
            <button style={{ marginTop: 80 }} onClick={handleClick}>
                change light
            </button>
        </div>
    )
}

interface LightProps {
    color: string
    isActive: boolean
}

const Light: React.FC<LightProps> = ({ color, isActive }) => {
    return (
        <>
            {
                isActive ?
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
