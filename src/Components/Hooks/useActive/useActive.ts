import React, { useState, useEffect } from "react";

export const useActive = (): [string | null, React.Dispatch<React.SetStateAction<string | null>>] => {
    const [activeElementId, setActiveElementId] = useState<string | null>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === "Space" && activeElementId) {
                setActiveElementId(null);
            }
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [activeElementId]);

    return [activeElementId, setActiveElementId];
}