import './FeatureButton.css';
import Image from 'next/image';
import pyramid from '../pyramid.svg';
import { IconType } from 'react-icons';

import {useState} from 'react';

type Props = {
    Icon: IconType;
    label: string;
    side: "L" | "R";
    thisClicked: boolean;
    setIdClicked: () => void;
};

export default function FeatureButton({Icon, label, side, thisClicked, setIdClicked} : Props) {
    return (
        <div className="feature-button-container" 
            style={{ 
                transform: `${side=="L" ? "rotateY(180deg)" : "rotateY(0deg)"} scaleY(-1)`,
            }}
        >
            <button className={!thisClicked ? "feature-button" : "feature-button-clicked"} 
                onClick={setIdClicked}
            >
                <Icon className="feature-icon" color={!thisClicked ? "white" : "rgb(255, 157, 0)"} style={{transition: 'ease-in-out 0.3s' }}/>
            </button>
            <div className="feature-button-label">
                {label}
            </div>
        </div>
        
    );
}