import React, { useState, useEffect } from "react";

export const useActive = (setAsRead: (id: string) => void): [string | null, React.Dispatch<React.SetStateAction<string | null>>] => {
    const [activeElementId, setActiveElementId] = useState<string | null>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === "Space" && activeElementId) {
                e.preventDefault();
                setAsRead(activeElementId);
                setActiveElementId(null);
            }
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [activeElementId, setAsRead]);

    return [activeElementId, setActiveElementId];
}