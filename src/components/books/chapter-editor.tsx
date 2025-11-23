"use client";

import { useState, useEffect } from "react";
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Undo,
  Redo,
  Type,
  Highlighter,
  Pen,
} from "lucide-react";

interface Chapter {
  id: string;
  title: string;
  content: string;
  order: number;
}

interface ChapterEditorProps {
  chapters: Chapter[];
  currentChapterId: string;
  onChapterChange: (chapterId: string) => void;
  onContentChange: (chapterId: string, content: string) => void;
  onAddChapter: () => void;
  onDeleteChapter: (chapterId: string) => void;
}

export default function ChapterEditor({
  chapters,
  currentChapterId,
  onChapterChange,
  onContentChange,
  onAddChapter,
  onDeleteChapter,
}: ChapterEditorProps) {
  const [fontSize, setFontSize] = useState(120);
  const [highlightColor, setHighlightColor] = useState("#FFEB3B");
  const [showHighlighter, setShowHighlighter] = useState(false);
  const [showInsertMenu, setShowInsertMenu] = useState(false);
  const [editorRef, setEditorRef] = useState<HTMLDivElement | null>(null);

  const currentChapter = chapters.find((ch) => ch.id === currentChapterId);

  // Update editor content when chapter changes
  useEffect(() => {
    if (editorRef && currentChapter) {
      // Only update if content is different to avoid cursor issues
      if (editorRef.innerHTML !== currentChapter.content) {
        editorRef.innerHTML = currentChapter.content;
      }
    }
  }, [currentChapterId, currentChapter?.content, editorRef]);

  const applyFormat = (command: string, value?: string) => {
    // Focus the editor first to ensure commands work
    if (editorRef) {
      editorRef.focus();
    }
    document.execCommand(command, false, value);
  };

  const handleContentChange = (e: React.FormEvent<HTMLDivElement>) => {
    if (currentChapter) {
      const newContent = e.currentTarget.innerHTML;
      onContentChange(currentChapter.id, newContent);
    }
  };

  // Update editor content when chapter changes, preserving cursor
  const updateEditorContent = (content: string) => {
    if (editorRef && editorRef.innerHTML !== content) {
      const selection = window.getSelection();
      const range = selection?.getRangeAt(0);
      const cursorPosition = range?.startOffset;
      const cursorNode = range?.startContainer;

      editorRef.innerHTML = content;

      // Restore cursor position
      if (cursorNode && cursorPosition !== undefined) {
        try {
          const newRange = document.createRange();
          const newSelection = window.getSelection();
          newRange.setStart(cursorNode, cursorPosition);
          newRange.collapse(true);
          newSelection?.removeAllRanges();
          newSelection?.addRange(newRange);
        } catch (e) {
          // If cursor restoration fails, just focus the editor
          editorRef.focus();
        }
      }
    }
  };

  const handleFontSizeChange = (newSize: number) => {
    setFontSize(newSize);
    // Apply font size to selected text or entire content
    if (editorRef) {
      editorRef.focus();
      const selection = window.getSelection();
      if (selection && selection.toString().length > 0) {
        // Apply to selection
        document.execCommand('fontSize', false, '7');
        const fontElements = editorRef.querySelectorAll('font[size="7"]');
        fontElements.forEach((el) => {
          (el as HTMLElement).removeAttribute('size');
          (el as HTMLElement).style.fontSize = `${newSize}%`;
        });
      }
    }
  };

  const insertImage = () => {
    const url = prompt("Enter image URL:");
    if (url) {
      applyFormat("insertImage", url);
    }
    setShowInsertMenu(false);
  };

  const insertLink = () => {
    const url = prompt("Enter link URL:");
    if (url) {
      applyFormat("createLink", url);
    }
    setShowInsertMenu(false);
  };

  const insertHorizontalRule = () => {
    applyFormat("insertHorizontalRule");
    setShowInsertMenu(false);
  };

  const highlightColors = [
    { color: "#FF6B6B", label: "Red" },
    { color: "#FFD93D", label: "Yellow" },
    { color: "#6BCB77", label: "Green" },
    { color: "#C77DFF", label: "Purple" },
  ];

  return (
    <div className="flex h-screen bg-[#181818]">
      {/* Chapter Sidebar */}
      <div className="w-48 bg-[#1E1E1E] border-r border-[#454545] flex flex-col">
        <div className="flex-1 overflow-y-auto">
          {chapters.map((chapter) => (
            <button
              key={chapter.id}
              onClick={() => onChapterChange(chapter.id)}
              className={`w-full p-4 text-left text-sm transition-colors ${
                chapter.id === currentChapterId
                  ? "bg-[#2A2A2A] text-white border-l-4 border-[#8B5CF6]"
                  : "text-gray-400 hover:bg-[#252525] hover:text-white"
              }`}
            >
              {chapter.title}
            </button>
          ))}
        </div>

        <button
          onClick={onAddChapter}
          className="p-4 text-[#8B5CF6] hover:bg-[#2A2A2A] border-t border-[#454545] text-sm font-medium"
        >
          + Add Chapter
        </button>
      </div>

      {/* Editor Area */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="bg-[#1E1E1E] border-b border-[#454545] p-3 flex items-center gap-1">
          <button
            onClick={() => applyFormat("undo")}
            className="p-2 hover:bg-[#2A2A2A] rounded text-gray-300 hover:text-white"
            title="Undo"
          >
            <Undo className="w-5 h-5" />
          </button>
          <button
            onClick={() => applyFormat("redo")}
            className="p-2 hover:bg-[#2A2A2A] rounded text-gray-300 hover:text-white"
            title="Redo"
          >
            <Redo className="w-5 h-5" />
          </button>

          <div className="w-px h-6 bg-[#454545] mx-2"></div>

          {/* Insert Button */}
          <div className="relative">
            <button
              onClick={() => setShowInsertMenu(!showInsertMenu)}
              className="px-3 py-2 hover:bg-[#2A2A2A] rounded text-gray-300 hover:text-white text-sm font-medium"
              title="Insert"
            >
              Insert
            </button>
            {showInsertMenu && (
              <div className="absolute top-full mt-2 bg-[#2A2A2A] border border-[#454545] rounded-lg shadow-lg z-10 min-w-[150px]">
                <button
                  onClick={insertImage}
                  className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-[#333333] hover:text-white"
                >
                  Image
                </button>
                <button
                  onClick={insertLink}
                  className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-[#333333] hover:text-white"
                >
                  Link
                </button>
                <button
                  onClick={insertHorizontalRule}
                  className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-[#333333] hover:text-white"
                >
                  Horizontal Line
                </button>
              </div>
            )}
          </div>

          <div className="w-px h-6 bg-[#454545] mx-2"></div>

          <button
            onClick={() => applyFormat("bold")}
            className="p-2 hover:bg-[#2A2A2A] rounded text-gray-300 hover:text-white"
            title="Bold"
          >
            <Bold className="w-5 h-5" />
          </button>
          <button
            onClick={() => applyFormat("italic")}
            className="p-2 hover:bg-[#2A2A2A] rounded text-gray-300 hover:text-white"
            title="Italic"
          >
            <Italic className="w-5 h-5" />
          </button>
          <button
            onClick={() => applyFormat("underline")}
            className="p-2 hover:bg-[#2A2A2A] rounded text-gray-300 hover:text-white"
            title="Underline"
          >
            <Underline className="w-5 h-5" />
          </button>

          <div className="w-px h-6 bg-[#454545] mx-2"></div>

          <select
            value={fontSize}
            onChange={(e) => handleFontSizeChange(Number(e.target.value))}
            className="px-3 py-1 bg-[#2A2A2A] text-white rounded border border-[#454545] text-sm"
          >
            <option value={80}>80</option>
            <option value={100}>100</option>
            <option value={120}>120</option>
            <option value={140}>140</option>
            <option value={160}>160</option>
          </select>

          <div className="w-px h-6 bg-[#454545] mx-2"></div>

          <button
            onClick={() => applyFormat("justifyLeft")}
            className="p-2 hover:bg-[#2A2A2A] rounded text-gray-300 hover:text-white"
            title="Align Left"
          >
            <AlignLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => applyFormat("justifyCenter")}
            className="p-2 hover:bg-[#2A2A2A] rounded text-gray-300 hover:text-white"
            title="Align Center"
          >
            <AlignCenter className="w-5 h-5" />
          </button>
          <button
            onClick={() => applyFormat("justifyRight")}
            className="p-2 hover:bg-[#2A2A2A] rounded text-gray-300 hover:text-white"
            title="Align Right"
          >
            <AlignRight className="w-5 h-5" />
          </button>
          <button
            onClick={() => applyFormat("justifyFull")}
            className="p-2 hover:bg-[#2A2A2A] rounded text-gray-300 hover:text-white"
            title="Justify"
          >
            <AlignJustify className="w-5 h-5" />
          </button>

          <div className="w-px h-6 bg-[#454545] mx-2"></div>

          <div className="relative">
            <button
              onClick={() => setShowHighlighter(!showHighlighter)}
              className="p-2 hover:bg-[#2A2A2A] rounded text-gray-300 hover:text-white"
              title="Highlight"
            >
              <Highlighter className="w-5 h-5" />
            </button>
            {showHighlighter && (
              <div className="absolute top-full mt-2 bg-[#2A2A2A] border border-[#454545] rounded-lg p-2 flex gap-2 shadow-lg z-10">
                {highlightColors.map((item) => (
                  <button
                    key={item.color}
                    onClick={() => {
                      applyFormat("backColor", item.color);
                      setShowHighlighter(false);
                    }}
                    className="w-8 h-8 rounded hover:scale-110 transition-transform"
                    style={{ backgroundColor: item.color }}
                    title={item.label}
                  />
                ))}
                <button
                  onClick={() => {
                    applyFormat("backColor", "transparent");
                    setShowHighlighter(false);
                  }}
                  className="w-8 h-8 rounded border-2 border-gray-500 hover:scale-110 transition-transform flex items-center justify-center"
                  title="Remove highlight"
                >
                  <Pen className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Content Editor */}
        <div className="flex-1 overflow-y-auto bg-[#181818] p-8">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-2xl min-h-[800px] p-16">
            <div
              ref={setEditorRef}
              contentEditable
              onInput={handleContentChange}
              suppressContentEditableWarning
              className="outline-none text-gray-900 leading-relaxed"
              style={{
                fontSize: `${fontSize}%`,
                fontFamily: "Nunito, sans-serif",
                textAlign: "left",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
