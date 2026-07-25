import './ModeButton.css';

type Props = {
    mode: string;
    setMode: (mode: string) => void;
    setCurrIdx: (idx: number) => void;
};

//  backgroundColor: mode==="Students" ? "green" : "blue"

export default function ModeButton({mode, setMode, setCurrIdx} : Props) {
    return (
        <div className="mode-button-container">
            <div className="mode-button-container-inner">
                <div className="mode-highlight" 
                style={{left: mode==="Schools" ? "52.5%" : "2%", backgroundColor: mode==="Schools" ? "#94D2E6" : "#AFE6A6"}}>
                </div>
                <button
                    onClick={() => {
                        setMode("Students");
                        setCurrIdx(0);
                    }}
                    className="mode-button"
                >
                    For Students
                </button>
                <button
                    onClick={() => {
                        setMode("Schools");
                        setCurrIdx(0);
                    }}
                    className="mode-button"
                >
                    For Schools
                </button>
            </div>
        </div>
    );
}