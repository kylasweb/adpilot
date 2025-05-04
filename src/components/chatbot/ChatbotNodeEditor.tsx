
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChatbotNode } from "./ChatbotBuilder";

interface ChatbotNodeEditorProps {
  node: ChatbotNode;
  updateNode: (updatedNode: ChatbotNode) => void;
}

const ChatbotNodeEditor: React.FC<ChatbotNodeEditorProps> = ({ node, updateNode }) => {
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateNode({ ...node, content: e.target.value });
  };

  const handlePositionChange = (
    axis: "x" | "y",
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(e.target.value) || 0;
    updateNode({ ...node, [axis]: value });
  };

  const addCondition = () => {
    const conditions = node.conditions || {};
    updateNode({
      ...node,
      conditions: {
        ...conditions,
        [`condition-${Date.now()}`]: ""
      }
    });
  };

  const updateCondition = (id: string, value: string) => {
    const conditions = node.conditions || {};
    updateNode({
      ...node,
      conditions: {
        ...conditions,
        [id]: value
      }
    });
  };

  const removeCondition = (id: string) => {
    if (!node.conditions) return;
    
    const { [id]: _, ...remainingConditions } = node.conditions;
    updateNode({
      ...node,
      conditions: remainingConditions
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Node Type</Label>
        <div className="mt-1 text-sm bg-muted p-2 rounded-md capitalize">
          {node.type}
        </div>
      </div>

      <div>
        <Label htmlFor="node-content">Content</Label>
        <Textarea
          id="node-content"
          value={node.content}
          onChange={handleContentChange}
          className="mt-1"
          rows={4}
        />
      </div>
      
      {node.type === "question" && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <Label>Response Options</Label>
            <Button
              variant="outline"
              size="sm"
              onClick={addCondition}
            >
              <Plus className="h-3 w-3 mr-1" />
              Add Option
            </Button>
          </div>
          
          {node.conditions && Object.entries(node.conditions).length > 0 ? (
            <div className="space-y-2">
              {Object.entries(node.conditions).map(([id, value]) => (
                <div key={id} className="flex items-center gap-2">
                  <Input
                    value={value}
                    onChange={(e) => updateCondition(id, e.target.value)}
                    placeholder="Response option"
                    className="flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-10 w-10 p-0"
                    onClick={() => removeCondition(id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">
              Add response options for this question
            </p>
          )}
        </div>
      )}
      
      {node.type === "api" && (
        <div>
          <Label htmlFor="api-endpoint">API Endpoint</Label>
          <Input
            id="api-endpoint"
            placeholder="https://api.example.com/endpoint"
            className="mt-1"
          />
          
          <div className="mt-3">
            <Label htmlFor="method">Method</Label>
            <Select defaultValue="GET">
              <SelectTrigger id="method" className="mt-1">
                <SelectValue placeholder="Select method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="GET">GET</SelectItem>
                <SelectItem value="POST">POST</SelectItem>
                <SelectItem value="PUT">PUT</SelectItem>
                <SelectItem value="DELETE">DELETE</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
      
      {node.type === "action" && (
        <div>
          <Label htmlFor="action-type">Action Type</Label>
          <Select defaultValue="redirect">
            <SelectTrigger id="action-type" className="mt-1">
              <SelectValue placeholder="Select action" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="redirect">Redirect</SelectItem>
              <SelectItem value="submit">Submit Form</SelectItem>
              <SelectItem value="open-url">Open URL</SelectItem>
              <SelectItem value="custom">Custom Script</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="node-x">X Position</Label>
          <Input
            id="node-x"
            type="number"
            value={node.x}
            onChange={(e) => handlePositionChange("x", e)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="node-y">Y Position</Label>
          <Input
            id="node-y"
            type="number"
            value={node.y}
            onChange={(e) => handlePositionChange("y", e)}
            className="mt-1"
          />
        </div>
      </div>
    </div>
  );
};

export default ChatbotNodeEditor;
