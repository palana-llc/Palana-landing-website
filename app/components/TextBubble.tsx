"use client";

import '../css/TextBubble.css';

export default function TextBubble({ text }: { text: string }) {
    return (
        <div className="text-bubble-container">
            {text}
            <div className="text-bubble-triangle" />
        </div>
    );
}