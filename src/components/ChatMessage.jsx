import Markdown from 'react-markdown';
import { SiOpenai } from "react-icons/si";
import remarkGfm from "remark-gfm";
import React, { useEffect } from 'react';
import  user  from '../assets/user.png'

export default function ChatMessage({ message, role}) {
    const roleIcon = role === "user"
        ? <div className="rounded-full h-8 w-8 flex items-center justify-center font-semibold text-slate-300 shrink-0 "><img src={user} alt = "User" /></div>
        : <div className="rounded-full h-8 w-8 flex items-center justify-center font-semibold text-slate-50 shrink-0 "><SiOpenai /></div>;

    return (
        <div className="flex flex-row mx-2 my-4">
            {roleIcon}
            <div className="p-1 ml-2">
                <div className="flex-col">
                    //Markdown (Msg)
                    
                </div>
            </div>
        </div>
    );
}
