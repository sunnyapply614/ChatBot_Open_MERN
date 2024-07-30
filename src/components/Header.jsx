import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Dropdown from 'react-bootstrap/Dropdown';

export default function Header({ onNewChat, disabled, onSend, setIsCopyAnswer }) {

    const navigate = useNavigate();
    const [message, setMessage] = useState("");

    const logout = () => {
        localStorage.removeItem('isAuthenticated');
        navigate("/login");

    };
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
        <div className="flex1 flex-column px-3 bg-slate-500 rounded-xl h-full">
            <button
                className="bg-blue-500 hidden text-white font-bold py-2 px-4 rounded hover:bg-blue-400 mr-2"
                onClick={onNewChat}
            >New chat</button>
            <div className="h__full">
                <button
                    className="logout w-full"
                    onClick={logout}
                >Logout</button>
            </div>
            <div className="copyPaste">
                <Dropdown>
                    <Dropdown.Toggle 
                        variant="success" 
                        style={{ marginBottom: '37px' }} 
                        className={ "btn__paste" }
                    >
                    Auto paste/copy
                    </Dropdown.Toggle>
                    <Dropdown.Menu className={ "btn_dropdown_item" }>
                        <Dropdown.Item href="#" className={ "btn_dropdown_item_active" }>
                            Assitant ID1
                        </Dropdown.Item>
                        <Dropdown.Item href="#" className={ "btn_dropdown_item_active" }>
                            Assitant ID2
                        </Dropdown.Item>
                        <Dropdown.Item href="#" className={ "btn_dropdown_item_active" }>
                            Assitant ID3
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

            </div>
        </div>
    )
}
