//locate src/components/chatinput.jsx

import { MdSend, MdContentPaste } from "react-icons/md";
import { useState } from "react";

export default function ChatInput({ disabled, onSend, setIsCopyAnswer }) {
    const [message, setMessage] = useState("");

    const handlePasteAndSend = async () => {
        try {
            const text = await navigator.clipboard.readText();
            setIsCopyAnswer(true)
            setMessage(text);
            onSend(text);
            setMessage("");
        } catch (error) {
            console.error("Failed to read clipboard contents: ", error);
        }
    };
    
    return (
        <form
            className="border-slate-400 rounded-lg text-right text-slate-50"
            onSubmit={(e) => {
                e.preventDefault();
                onSend(message);
                setMessage("");
            }}
            autoComplete="off"
        >
            <input
                name="message"
                placeholder="Type your message"
                className="w-full px-4 block bg-transparent inputResult"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />

            <button
                disabled={disabled}
                className={
                    "buttonSend mr-2"
                }
            >
                Send
                {/* <MdSend /> */}
            </button>
            
        </form>
    );
}
