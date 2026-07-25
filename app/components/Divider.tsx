import Image from "next/image";

export default function Divider() {
    return (
        <img 
            src="/Divider.svg" 
            alt="divider"
            style={{width: "100%", height: "auto", position: "absolute", bottom: "-1.5%"}}
        >
        </img>
    );
}