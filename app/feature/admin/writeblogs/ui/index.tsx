// src/components/medium/MediumClone.tsx
"use client";

import React, {
  useState,
  useEffect,
  useRef,
  MutableRefObject,
} from "react";
import {
  Bold,
  Code,
  FileText,
  Home,
  Edit,
  Trash2,
  Plus,
  Search,
  Heart,
  X,
  Save,
  Clock,
  Type,
} from "lucide-react";
import { Article, ContentBlock, BlockType } from "./types";
import { createStorage } from "./storage";
import StatusNotification from "./StatusNotification";
import HomeView from "./HomeView";
import ReaderView from "./ReaderView";

type ViewMode = "home" | "reader" | "editor";

const MediumCloneUI: React.FC = () => {
  const [view, setView] = useState<ViewMode>("home");
  const [articles, setArticles] = useState<Article[]>([]);
  const [currentArticle, setCurrentArticle] = useState<Article | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<string>("");
  const [error, setError] = useState<string>("");

  const [title, setTitle] = useState<string>("");
  const [subtitle, setSubtitle] = useState<string>("");
  const [content, setContent] = useState<ContentBlock[]>([]);
  const [selectedBlockIndex, setSelectedBlockIndex] = useState<number | null>(
    null
  );
  const [autoSave, setAutoSave] = useState<boolean>(false);

  const titleRef = useRef<HTMLInputElement | null>(null);
  const subtitleRef = useRef<HTMLInputElement | null>(null);
  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Initialize storage and load articles
  useEffect(() => {
    createStorage();
    loadArticles();
  }, []);

  // Filter articles based on search
  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.subtitle?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Auto-save functionality
  useEffect(() => {
    if (editMode && (title || content.length > 0)) {
      if (autoSaveTimer.current) {
        clearTimeout(autoSaveTimer.current);
      }

      autoSaveTimer.current = setTimeout(() => {
        if (autoSave) {
          handleAutoSave();
        }
      }, 2000);
    }

    return () => {
      if (autoSaveTimer.current) {
        clearTimeout(autoSaveTimer.current);
      }
    };
  }, [title, subtitle, content, editMode, autoSave]);

  const showStatus = (message: string, isError = false) => {
    setSaveStatus(isError ? "" : message);
    setError(isError ? message : "");

    setTimeout(() => {
      setSaveStatus("");
      if (!isError) setError("");
    }, 3000);
  };

  const loadArticles = async (): Promise<void> => {
    setIsLoading(true);
    setError("");
    try {
      if (typeof window !== "undefined" && !window.storage) {
        createStorage();
      }

      const keys = await window.storage?.list("article:");
      const loadedArticles: Article[] = [];

      if (keys?.keys) {
        for (const key of keys.keys) {
          try {
            const result = await window.storage?.get(key);
            if (result && result.value) {
              loadedArticles.push(JSON.parse(result.value) as Article);
            }
          } catch (err) {
            console.log("Skipping invalid article:", key, err);
          }
        }
      }

      loadedArticles.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setArticles(loadedArticles);
    } catch (err) {
      console.error("Error loading articles:", err);
      setError("Failed to load articles");
      setArticles([]);
    }
    setIsLoading(false);
  };

  const handleAutoSave = async (): Promise<void> => {
    if (!title.trim()) return;

    const article: Article = {
      id: currentArticle?.id || `article_${Date.now()}`,
      title,
      subtitle,
      content,
      createdAt: currentArticle?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      readTime: calculateReadTime(),
      isDraft: true,
      likes: currentArticle?.likes || 0,
      bookmarks: currentArticle?.bookmarks || 0,
    };

    try {
      await window.storage?.set(`article:${article.id}`, JSON.stringify(article));
      showStatus("Auto-saved successfully");
    } catch (err) {
      console.error("Auto-save failed:", err);
      showStatus("Auto-save failed", true);
    }
  };

  const saveArticle = async (publish = true): Promise<void> => {
    if (!title.trim()) {
      showStatus("Please add a title", true);
      return;
    }

    if (content.length === 0) {
      showStatus("Please add some content", true);
      return;
    }

    setIsLoading(true);
    setError("");

    const article: Article = {
      id: currentArticle?.id || `article_${Date.now()}`,
      title: title.trim(),
      subtitle: subtitle.trim(),
      content,
      createdAt: currentArticle?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      readTime: calculateReadTime(),
      isDraft: !publish,
      likes: currentArticle?.likes || 0,
      bookmarks: currentArticle?.bookmarks || 0,
    };

    try {
      if (typeof window !== "undefined" && !window.storage) {
        createStorage();
      }

      await window.storage?.set(`article:${article.id}`, JSON.stringify(article));
      await loadArticles();

      if (publish) {
        showStatus("Article published successfully!");
        setView("home");
        resetEditor();
      } else {
        showStatus("Draft saved successfully!");
        setCurrentArticle(article);
      }
    } catch (err) {
      console.error("Save error:", err);
      showStatus("Failed to save article. Please try again.", true);
    }
    setIsLoading(false);
  };

  const deleteArticle = async (articleId: string): Promise<void> => {
    if (
      !window.confirm(
        "Are you sure you want to delete this article? This action cannot be undone."
      )
    )
      return;

    try {
      if (typeof window !== "undefined" && !window.storage) {
        createStorage();
      }

      await window.storage?.delete(`article:${articleId}`);
      await loadArticles();

      if (currentArticle?.id === articleId) {
        setView("home");
        setCurrentArticle(null);
      }

      showStatus("Article deleted successfully");
    } catch (err) {
      console.error("Delete error:", err);
      showStatus("Failed to delete article", true);
    }
  };

  const likeArticle = async (articleId: string): Promise<void> => {
    const updatedArticles = articles.map((article) =>
      article.id === articleId
        ? { ...article, likes: (article.likes || 0) + 1 }
        : article
    );
    setArticles(updatedArticles);

    const article = updatedArticles.find((a) => a.id === articleId);
    if (article) {
      try {
        await window.storage?.set(
          `article:${articleId}`,
          JSON.stringify(article)
        );
      } catch (err) {
        console.error("Like save error:", err);
      }
    }
  };

  const copyToClipboard = async (text: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text);
      showStatus("Copied to clipboard!");
    } catch (err) {
      console.error("Copy failed:", err);
      showStatus("Copy failed", true);
    }
  };

  const calculateReadTime = (): number => {
    const text = content.map((block) => block.text || "").join(" ");
    const words = text.split(/\s+/).filter((word) => word.length > 0).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return minutes;
  };

  const resetEditor = (): void => {
    setTitle("");
    setSubtitle("");
    setContent([]);
    setCurrentArticle(null);
    setEditMode(false);
    setSelectedBlockIndex(null);
    setAutoSave(false);
    setError("");
    setSaveStatus("");
  };

  const startNewArticle = (): void => {
    resetEditor();
    setView("editor");
    setEditMode(true);
    setAutoSave(true);
    setTimeout(() => titleRef.current?.focus(), 100);
  };

  const editArticle = (article: Article): void => {
    setCurrentArticle(article);
    setTitle(article.title);
    setSubtitle(article.subtitle || "");
    setContent(article.content || []);
    setView("editor");
    setEditMode(true);
    setAutoSave(true);
    setTimeout(() => titleRef.current?.focus(), 100);
  };

  const viewArticle = (article: Article): void => {
    setCurrentArticle(article);
    setTitle(article.title);
    setSubtitle(article.subtitle || "");
    setContent(article.content || []);
    setView("reader");
    setEditMode(false);
  };

  const addBlock = (type: BlockType): void => {
    const newBlock: ContentBlock = {
      id: Date.now(),
      type,
      text: "",
      language: type === "code" ? "javascript" : undefined,
    };
    const newContent = [...content, newBlock];
    setContent(newContent);
    setSelectedBlockIndex(newContent.length - 1);
  };

  const updateBlock = (
    index: number,
    field: keyof ContentBlock,
    value: string
  ): void => {
    const updated = [...content];
    updated[index] = { ...updated[index], [field]: value };
    setContent(updated);
  };

  const deleteBlockFromContent = (index: number): void => {
    setContent(content.filter((_, i) => i !== index));
    setSelectedBlockIndex(null);
  };

  const moveBlock = (fromIndex: number, toIndex: number): void => {
    if (toIndex < 0 || toIndex >= content.length) return;

    const newContent = [...content];
    const [movedBlock] = newContent.splice(fromIndex, 1);
    newContent.splice(toIndex, 0, movedBlock);
    setContent(newContent);
    setSelectedBlockIndex(toIndex);
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // ───────────────── VIEWS ─────────────────

  if (view === "home") {
    return (
      <div className="min-h-screen bg-white">
        <StatusNotification saveStatus={saveStatus} error={error} />
        <HomeView
          error={error}
          isLoading={isLoading}
          filteredArticles={filteredArticles}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onNewArticle={startNewArticle}
          onViewArticle={viewArticle}
          onEditArticle={editArticle}
          onLikeArticle={likeArticle}
          onDeleteArticle={deleteArticle}
          formatDate={formatDate}
        />
      </div>
    );
  }

  if (view === "reader") {
    return (
      <div className="min-h-screen bg-white">
        <StatusNotification saveStatus={saveStatus} error={error} />
        <ReaderView
          currentArticle={currentArticle}
          title={title}
          subtitle={subtitle}
          content={content}
          onGoHome={() => setView("home")}
          onEditArticle={editArticle}
          onLikeArticle={likeArticle}
          onDeleteArticle={deleteArticle}
          copyToClipboard={copyToClipboard}
          formatDate={formatDate}
        />
      </div>
    );
  }

  // Editor View
  return (
    <div className="min-h-screen bg-gray-50">
      <StatusNotification saveStatus={saveStatus} error={error} />

      <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => {
              if (
                window.confirm("Discard changes and return to home?")
              ) {
                setView("home");
                resetEditor();
              }
            }}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
          >
            <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Home
          </button>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={autoSave}
                onChange={(e) => setAutoSave(e.target.checked)}
                className="rounded border-gray-300"
              />
              Auto-save
            </label>

            <button
              onClick={() => saveArticle(false)}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              Save Draft
            </button>

            <button
              onClick={() => saveArticle(true)}
              disabled={isLoading}
              className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
              ) : (
                <Edit className="w-4 h-4" />
              )}
              {isLoading ? "Publishing..." : "Publish"}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 text-red-800">
              <X className="w-5 h-5" />
              <span>{error}</span>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm p-8 mb-6">
          <input
            ref={titleRef}
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-5xl font-serif font-bold text-gray-900 mb-4 outline-none placeholder-gray-300 resize-none"
            style={{ minHeight: "60px" }}
          />

          <input
            ref={subtitleRef}
            type="text"
            placeholder="Subtitle (optional)"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="w-full text-2xl text-gray-600 outline-none placeholder-gray-300 font-serif resize-none"
            style={{ minHeight: "40px" }}
          />

          <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {calculateReadTime()} min read
            </div>
            {autoSave && (
              <div className="flex items-center gap-1 text-green-600">
                <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
                Auto-save enabled
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4 mb-8">
          {content.map((block, index) => (
            <div
              key={block.id}
              className={`relative group bg-white rounded-lg transition-all duration-200 ${
                selectedBlockIndex === index
                  ? "ring-2 ring-blue-500 shadow-md"
                  : "hover:ring-1 hover:ring-gray-300 hover:shadow-sm"
              }`}
              onClick={() => setSelectedBlockIndex(index)}
            >
              <div className="p-4">
                {block.type === "paragraph" && (
                  <textarea
                    value={block.text}
                    onChange={(e) =>
                      updateBlock(index, "text", e.target.value)
                    }
                    placeholder="Tell your story..."
                    className="w-full text-xl leading-relaxed text-gray-800 outline-none resize-none font-serif min-h-[120px]"
                  />
                )}

                {block.type === "heading" && (
                  <input
                    type="text"
                    value={block.text}
                    onChange={(e) =>
                      updateBlock(index, "text", e.target.value)
                    }
                    placeholder="Heading"
                    className="w-full text-3xl font-serif font-bold text-gray-900 outline-none"
                  />
                )}

                {block.type === "code" && (
                  <div className="bg-gray-900 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <select
                        value={block.language}
                        onChange={(e) =>
                          updateBlock(index, "language", e.target.value)
                        }
                        className="text-sm text-gray-400 bg-gray-800 rounded px-2 py-1"
                      >
                        <option value="javascript">JavaScript</option>
                        <option value="python">Python</option>
                        <option value="html">HTML</option>
                        <option value="css">CSS</option>
                        <option value="java">Java</option>
                      </select>
                    </div>
                    <textarea
                      value={block.text}
                      onChange={(e) =>
                        updateBlock(index, "text", e.target.value)
                      }
                      placeholder="// Enter code here"
                      className="w-full bg-transparent text-sm font-mono text-gray-100 outline-none resize-none min-h-[150px]"
                    />
                  </div>
                )}
              </div>

              {/* Block Controls */}
              <div className="absolute -left-16 top-4 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    moveBlock(index, index - 1);
                  }}
                  disabled={index === 0}
                  className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                  title="Move up"
                >
                  ↑
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    moveBlock(index, index + 1);
                  }}
                  disabled={index === content.length - 1}
                  className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                  title="Move down"
                >
                  ↓
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteBlockFromContent(index);
                  }}
                  className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                  title="Delete block"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Floating Action Button */}
        <div className="fixed bottom-8 right-8">
          <div className="bg-white rounded-full shadow-lg border border-gray-200 p-1">
            <div className="flex gap-2">
              <button
                onClick={() => addBlock("paragraph")}
                className="p-3 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-full transition-all group"
                title="Add text"
              >
                <Type className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
              <button
                onClick={() => addBlock("heading")}
                className="p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all group"
                title="Add heading"
              >
                <Bold className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
              <button
                onClick={() => addBlock("code")}
                className="p-3 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-all group"
                title="Add code"
              >
                <Code className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Empty state for editor */}
        {content.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-serif text-gray-600 mb-2">
              Start writing your article
            </h3>
            <p className="text-gray-500 mb-6">
              Add your first content block to begin
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => addBlock("paragraph")}
                className="flex items-center gap-2 px-6 py-3 border-2 border-dashed border-gray-300 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all group"
              >
                <Type className="w-5 h-5 text-gray-400 group-hover:text-green-600" />
                <span className="text-gray-600 group-hover:text-green-600">
                  Text
                </span>
              </button>
              <button
                onClick={() => addBlock("heading")}
                className="flex items-center gap-2 px-6 py-3 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group"
              >
                <Bold className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                <span className="text-gray-600 group-hover:text-blue-600">
                  Heading
                </span>
              </button>
              <button
                onClick={() => addBlock("code")}
                className="flex items-center gap-2 px-6 py-3 border-2 border-dashed border-gray-300 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all group"
              >
                <Code className="w-5 h-5 text-gray-400 group-hover:text-purple-600" />
                <span className="text-gray-600 group-hover:text-purple-600">
                  Code
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediumCloneUI;
