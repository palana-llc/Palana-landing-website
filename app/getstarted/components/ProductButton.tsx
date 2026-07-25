import './ProductButton.css';

type Props = {
    title: string;
    content: string;
    color: string;
    left?: string;
    targetRef: React.RefObject<HTMLDivElement | null>;
    onModeSelect?: () => void;
}
export default function ProductButton({title, content, color, left="35%", targetRef, onModeSelect}: Props){
    return (
        <div 
            className="product-button-container"
            style={{left: left}}
        >
             <div className="pb-header">
                {title}
            </div>
            <div className="pb-content">
                {content}
            </div>
            <div className="pb-button-container">
                <button 
                    className="pb-button"
                    style={{backgroundColor: color}}
                    onClick={() => { onModeSelect?.(); scrollToTarget(targetRef); }}
                >
                    Learn More
                </button>
            </div>
        </div>
    );
}

function scrollToTarget(targetRef: React.RefObject<HTMLDivElement | null>) {
    if (targetRef.current) {
        targetRef.current.scrollIntoView({ behavior: 'smooth' });
    }
}