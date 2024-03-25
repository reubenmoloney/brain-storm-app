"use client";
import React from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useCallback, useEffect, useRef } from "react";

export default function Editor() {
    const wrapperRef = useCallback((wrapper) => {
        if (wrapper == null) return;
        wrapper.innerHTML = "";
        const editor = document.createElement('div');
        wrapper.append(editor);
        new Quill(editor, { theme: "snow" })
    }, []);//<HTMLInputElement>(null)




    return (<><div  id="container" ref={wrapperRef} className="z-20 w-[90%] h-[500px]">
        
           HELLO
    </div>
    <button onClick={() => {console.log("HELLOOOOOOOO")}} className="z-10 bg-zinc-400">
        SAVE
    </button>
    </>)
}
/*
const wrapperRef = useCallback((wrapper) => {
        if (wrapper == null) return;
        wrapper.innerHTML = "";
        const editor = document.createElement('div');
        wrapper.append(editor);
        new Quill(editor, { theme: "snow" })
    }, []);//<HTMLInputElement>(null)
*/