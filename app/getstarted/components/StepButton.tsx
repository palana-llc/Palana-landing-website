'use client';
import './StepButton.css';

type Props = {
    stepNumber: number;
    title: string;
    isActive: boolean;
    onClick: () => void;
};

export default function StepButton({ stepNumber, title, isActive, onClick }: Props) {
    return (
        <button
            className={isActive ? 'step-button-active' : 'step-button'}
            onClick={onClick}
        >
            <span className="step-button-number">{stepNumber}</span>
            <span className="step-button-title">{title}</span>
        </button>
    );
}
