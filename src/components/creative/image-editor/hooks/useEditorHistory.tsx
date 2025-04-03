
import { useState } from "react";
import { toast } from "sonner";

export const useEditorHistory = () => {
  const [history, setHistory] = useState<any[]>([]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(-1);

  const handleHistoryAction = (action: 'undo' | 'redo') => {
    if (action === 'undo' && currentHistoryIndex > 0) {
      setCurrentHistoryIndex(prev => prev - 1);
      toast.info("Undo successful");
    } else if (action === 'redo' && currentHistoryIndex < history.length - 1) {
      setCurrentHistoryIndex(prev => prev + 1);
      toast.info("Redo successful");
    }
  };

  const addToHistory = (state: any) => {
    setHistory(prev => [...prev.slice(0, currentHistoryIndex + 1), state]);
    setCurrentHistoryIndex(prev => prev + 1);
  };

  return {
    history,
    currentHistoryIndex,
    handleHistoryAction,
    addToHistory
  };
};
