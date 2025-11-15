"use client";
import React, { useState, useEffect, useRef } from "react";
import { 
  Bold, Code, Image, FileText, Home, Edit, Eye, Trash2, Plus, 
  Search, User, Bookmark, Share, Heart, MessageCircle, 
  MoreVertical, X, Save, Clock, Type, Link, Copy
} from "lucide-react";

// Mock storage implementation for development
const createStorage = () => {
  if (typeof window !== 'undefined') {
    // If window.storage doesn't exist, create a mock version
    if (!window.storage) {
      console.log('Creating mock storage implementation');
      window.storage = {
        async set(key, value) {
          try {
            localStorage.setItem(key, value);
            return { success: true };
          } catch (error) {
            console.error('Storage set error:', error);
            throw error;
          }
        },
        async get(key) {
          try {
            const value = localStorage.getItem(key);
            return value ? { value } : null;
          } catch (error) {
            console.error('Storage get error:', error);
            return null;
          }
        },
        async delete(key) {
          try {
            localStorage.removeItem(key);
            return { success: true };
          } catch (error) {
            console.error('Storage delete error:', error);
            throw error;
          }
        },
        async list(prefix = "") {
          try {
            const keys = [];
            for (let i = 0; i < localStorage.length; i++) {
              const key = localStorage.key(i);
              if (key && key.startsWith(prefix)) {
                keys.push(key);
              }
            }
            return { keys };
          } catch (error) {
            console.error('Storage list error:', error);
            return { keys: [] };
          }
        }
      };
    }
  }
};

const MediumClone = () => {
  const [view, setView] = useState("home");
  const [articles, setArticles] = useState([]);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");
  const [error, setError] = useState("");
  
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState([]);
  const [selectedBlockIndex, setSelectedBlockIndex] = useState(null);
  const [autoSave, setAutoSave] = useState(false);

  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const autoSaveTimer = useRef(null);

  // Initialize storage on component mount
  useEffect(() => {
    createStorage();
    loadArticles();
  }, []);

  // Filter articles based on search
  const filteredArticles = articles.filter(article => 
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

  const showStatus = (message, isError = false) => {
    setSaveStatus(message);
    setError(isError ? message : "");
    
    setTimeout(() => {
      setSaveStatus("");
      if (!isError) setError("");
    }, 3000);
  };

  const loadArticles = async () => {
    setIsLoading(true);
    setError("");
    try {
      // Ensure storage is available
      if (!window.storage) {
        createStorage();
      }

      const keys = await window.storage.list("article:");
      const loadedArticles = [];
      
      for (const key of keys.keys) {
        try {
          const result = await window.storage.get(key);
          if (result && result.value) {
            loadedArticles.push(JSON.parse(result.value));
          }
        } catch (err) {
          console.log("Skipping invalid article:", key, err);
        }
      }
      
      loadedArticles.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setArticles(loadedArticles);
    } catch (err) {
      console.error("Error loading articles:", err);
      setError("Failed to load articles");
      setArticles([]);
    }
    setIsLoading(false);
  };

  const handleAutoSave = async () => {
    if (!title.trim()) return;

    const article = {
      id: currentArticle?.id || `article_${Date.now()}`,
      title,
      subtitle,
      content,
      createdAt: currentArticle?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      readTime: calculateReadTime(),
      isDraft: true
    };

    try {
      await window.storage.set(`article:${article.id}`, JSON.stringify(article));
      showStatus("Auto-saved successfully");
    } catch (err) {
      console.error("Auto-save failed:", err);
      showStatus("Auto-save failed", true);
    }
  };

  const saveArticle = async (publish = true) => {
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
    
    const article = {
      id: currentArticle?.id || `article_${Date.now()}`,
      title: title.trim(),
      subtitle: subtitle.trim(),
      content,
      createdAt: currentArticle?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      readTime: calculateReadTime(),
      isDraft: !publish,
      likes: currentArticle?.likes || 0,
      bookmarks: currentArticle?.bookmarks || 0
    };

    try {
      // Ensure storage is available
      if (!window.storage) {
        createStorage();
      }

      await window.storage.set(`article:${article.id}`, JSON.stringify(article));
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

  const deleteArticle = async (articleId) => {
    if (!confirm("Are you sure you want to delete this article? This action cannot be undone.")) return;
    
    try {
      if (!window.storage) {
        createStorage();
      }

      await window.storage.delete(`article:${articleId}`);
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

  const likeArticle = async (articleId) => {
    const updatedArticles = articles.map(article => 
      article.id === articleId 
        ? { ...article, likes: (article.likes || 0) + 1 }
        : article
    );
    setArticles(updatedArticles);

    // Update storage
    const article = updatedArticles.find(a => a.id === articleId);
    if (article) {
      try {
        await window.storage.set(`article:${articleId}`, JSON.stringify(article));
      } catch (err) {
        console.error("Like save error:", err);
      }
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      showStatus("Copied to clipboard!");
    } catch (err) {
      console.error("Copy failed:", err);
      showStatus("Copy failed", true);
    }
  };

  const calculateReadTime = () => {
    const text = content.map(block => block.text || "").join(" ");
    const words = text.split(/\s+/).filter(word => word.length > 0).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return minutes;
  };

  const resetEditor = () => {
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

  const startNewArticle = () => {
    resetEditor();
    setView("editor");
    setEditMode(true);
    setAutoSave(true);
    setTimeout(() => titleRef.current?.focus(), 100);
  };

  const editArticle = (article) => {
    setCurrentArticle(article);
    setTitle(article.title);
    setSubtitle(article.subtitle || "");
    setContent(article.content || []);
    setView("editor");
    setEditMode(true);
    setAutoSave(true);
    setTimeout(() => titleRef.current?.focus(), 100);
  };

  const viewArticle = (article) => {
    setCurrentArticle(article);
    setTitle(article.title);
    setSubtitle(article.subtitle || "");
    setContent(article.content || []);
    setView("reader");
    setEditMode(false);
  };

  const addBlock = (type) => {
    const newBlock = {
      id: Date.now(),
      type,
      text: "",
      language: type === "code" ? "javascript" : undefined
    };
    const newContent = [...content, newBlock];
    setContent(newContent);
    setSelectedBlockIndex(newContent.length - 1);
  };

  const updateBlock = (index, field, value) => {
    const updated = [...content];
    updated[index] = { ...updated[index], [field]: value };
    setContent(updated);
  };

  const deleteBlock = (index) => {
    setContent(content.filter((_, i) => i !== index));
    setSelectedBlockIndex(null);
  };

  const moveBlock = (fromIndex, toIndex) => {
    if (toIndex < 0 || toIndex >= content.length) return;
    
    const newContent = [...content];
    const [movedBlock] = newContent.splice(fromIndex, 1);
    newContent.splice(toIndex, 0, movedBlock);
    setContent(newContent);
    setSelectedBlockIndex(toIndex);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  // Status Notification Component
  const StatusNotification = () => {
    if (!saveStatus && !error) return null;

    return (
      <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg border transition-all duration-300 ${
        error 
          ? 'bg-red-50 border-red-200 text-red-800' 
          : 'bg-green-50 border-green-200 text-green-800'
      }`}>
        <div className="flex items-center gap-2">
          {error ? (
            <X className="w-5 h-5" />
          ) : (
            <Save className="w-5 h-5" />
          )}
          <span className="font-medium">{saveStatus}</span>
        </div>
      </div>
    );
  };

  // Home View
  if (view === "home") {
    return (
      <div className="min-h-screen bg-white">
        <StatusNotification />
        
        <header className="border-b border-gray-200 sticky top-0 bg-white z-10">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView("home")}>
              <FileText className="w-8 h-8 text-green-600" />
              <h1 className="text-3xl font-serif font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                WriteSpace
              </h1>
            </div>
            
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={startNewArticle}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-all duration-200 transform hover:scale-105"
              >
                <Plus className="w-5 h-5" />
                Write
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-4 py-8">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 text-red-800">
                <X className="w-5 h-5" />
                <span>{error}</span>
              </div>
            </div>
          )}

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="text-center py-20">
              <FileText className="w-24 h-24 text-gray-300 mx-auto mb-6" />
              <h2 className="text-3xl font-serif text-gray-600 mb-4">
                {searchQuery ? "No articles found" : "No articles yet"}
              </h2>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                {searchQuery 
                  ? "Try adjusting your search terms" 
                  : "Start writing your first article to share your thoughts with the world"
                }
              </p>
              {!searchQuery && (
                <button
                  onClick={startNewArticle}
                  className="bg-black text-white px-8 py-4 rounded-full hover:bg-gray-800 transition-all duration-200 transform hover:scale-105"
                >
                  Create Your First Article
                </button>
              )}
            </div>
          ) : (
            <div className="grid gap-8">
              {filteredArticles.map((article, index) => (
                <article 
                  key={article.id} 
                  className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-green-200"
                >
                  <div className="flex gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        {article.isDraft && (
                          <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                            Draft
                          </span>
                        )}
                        <span className="text-sm text-gray-500">{formatDate(article.createdAt)}</span>
                        <span className="text-gray-300">•</span>
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {article.readTime} min read
                        </span>
                      </div>
                      
                      <h2 
                        className="text-2xl font-serif font-bold text-gray-900 mb-3 hover:text-green-600 cursor-pointer transition-colors"
                        onClick={() => viewArticle(article)}
                      >
                        {article.title}
                      </h2>
                      
                      {article.subtitle && (
                        <p className="text-gray-600 mb-4 font-serif text-lg leading-relaxed">
                          {article.subtitle}
                        </p>
                      )}

                      <div className="flex items-center justify-between mt-6">
                        <div className="flex gap-4">
                          <button
                            onClick={() => viewArticle(article)}
                            className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors group"
                          >
                            <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            Read
                          </button>
                          <button
                            onClick={() => editArticle(article)}
                            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors group"
                          >
                            <Edit className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            Edit
                          </button>
                          <button
                            onClick={() => likeArticle(article.id)}
                            className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors group"
                          >
                            <Heart className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            {article.likes || 0}
                          </button>
                        </div>
                        
                        <div className="flex gap-2">
                          <button
                            onClick={() => deleteArticle(article.id)}
                            className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-full hover:bg-red-50"
                            title="Delete article"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Reader View
  if (view === "reader") {
    return (
      <div className="min-h-screen bg-white">
        <StatusNotification />
        
        <header className="border-b border-gray-200 sticky top-0 bg-white/95 backdrop-blur-sm z-10">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <button
              onClick={() => setView("home")}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
            >
              <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Home
            </button>
            <div className="flex gap-3">
              <button
                onClick={() => editArticle(currentArticle)}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors group"
              >
                <Edit className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Edit
              </button>
              <button
                onClick={() => likeArticle(currentArticle.id)}
                className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors group"
              >
                <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {currentArticle.likes || 0}
              </button>
              <button
                onClick={() => deleteArticle(currentArticle.id)}
                className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors group"
              >
                <Trash2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        </header>

        <article className="max-w-3xl mx-auto px-4 py-12">
          <header className="mb-12">
            <h1 className="text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-2xl text-gray-600 mb-8 font-serif leading-relaxed">
                {subtitle}
              </p>
            )}
            <div className="flex items-center gap-6 text-sm text-gray-500 border-t border-b border-gray-200 py-4">
              <span>{formatDate(currentArticle.createdAt)}</span>
              <span className="text-gray-300">•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {currentArticle.readTime} min read
              </span>
              {currentArticle.isDraft && (
                <>
                  <span className="text-gray-300">•</span>
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                    Draft
                  </span>
                </>
              )}
            </div>
          </header>

          <div className="prose prose-lg max-w-none">
            {content.map((block, index) => {
              if (block.type === "paragraph") {
                return (
                  <p key={block.id} className="text-xl leading-relaxed text-gray-800 font-serif mb-6">
                    {block.text}
                  </p>
                );
              } else if (block.type === "heading") {
                return (
                  <h2 key={block.id} className="text-3xl font-serif font-bold text-gray-900 mt-12 mb-6 border-b pb-2">
                    {block.text}
                  </h2>
                );
              } else if (block.type === "code") {
                return (
                  <div key={block.id} className="bg-gray-900 rounded-xl p-6 overflow-x-auto my-8">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-gray-400 text-sm font-mono">
                        {block.language}
                      </span>
                      <button 
                        onClick={() => copyToClipboard(block.text)}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    <pre className="text-sm font-mono text-gray-100">
                      <code>{block.text}</code>
                    </pre>
                  </div>
                );
              }
              return null;
            })}
          </div>

          <footer className="mt-16 pt-8 border-t border-gray-200">
            <div className="flex gap-4 justify-center">
              <button 
                onClick={() => likeArticle(currentArticle.id)}
                className="flex items-center gap-2 px-6 py-3 rounded-full border border-gray-300 hover:border-red-300 hover:bg-red-50 transition-all group"
              >
                <Heart className="w-5 h-5 text-gray-600 group-hover:text-red-600 group-hover:scale-110 transition-transform" />
                <span className="text-gray-600 group-hover:text-red-600">
                  {currentArticle.likes || 0} Likes
                </span>
              </button>
              <button className="flex items-center gap-2 px-6 py-3 rounded-full border border-gray-300 hover:border-blue-300 hover:bg-blue-50 transition-all group">
                <Share className="w-5 h-5 text-gray-600 group-hover:text-blue-600 group-hover:scale-110 transition-transform" />
                <span className="text-gray-600 group-hover:text-blue-600">Share</span>
              </button>
            </div>
          </footer>
        </article>
      </div>
    );
  }

  // Editor View
  return (
    <div className="min-h-screen bg-gray-50">
      <StatusNotification />
      
      <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => {
              if (confirm("Discard changes and return to home?")) {
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
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
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
                <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
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
                  ? 'ring-2 ring-blue-500 shadow-md' 
                  : 'hover:ring-1 hover:ring-gray-300 hover:shadow-sm'
              }`}
              onClick={() => setSelectedBlockIndex(index)}
            >
              <div className="p-4">
                {block.type === "paragraph" && (
                  <textarea
                    value={block.text}
                    onChange={(e) => updateBlock(index, "text", e.target.value)}
                    placeholder="Tell your story..."
                    className="w-full text-xl leading-relaxed text-gray-800 outline-none resize-none font-serif min-h-[120px]"
                  />
                )}
                
                {block.type === "heading" && (
                  <input
                    type="text"
                    value={block.text}
                    onChange={(e) => updateBlock(index, "text", e.target.value)}
                    placeholder="Heading"
                    className="w-full text-3xl font-serif font-bold text-gray-900 outline-none"
                  />
                )}
                
                {block.type === "code" && (
                  <div className="bg-gray-900 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <select
                        value={block.language}
                        onChange={(e) => updateBlock(index, "language", e.target.value)}
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
                      onChange={(e) => updateBlock(index, "text", e.target.value)}
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
                    deleteBlock(index);
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

        {/* Add Block Buttons */}
        {content.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-serif text-gray-600 mb-2">Start writing your article</h3>
            <p className="text-gray-500 mb-6">Add your first content block to begin</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => addBlock("paragraph")}
                className="flex items-center gap-2 px-6 py-3 border-2 border-dashed border-gray-300 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all group"
              >
                <Type className="w-5 h-5 text-gray-400 group-hover:text-green-600" />
                <span className="text-gray-600 group-hover:text-green-600">Text</span>
              </button>
              <button
                onClick={() => addBlock("heading")}
                className="flex items-center gap-2 px-6 py-3 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group"
              >
                <Bold className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                <span className="text-gray-600 group-hover:text-blue-600">Heading</span>
              </button>
              <button
                onClick={() => addBlock("code")}
                className="flex items-center gap-2 px-6 py-3 border-2 border-dashed border-gray-300 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all group"
              >
                <Code className="w-5 h-5 text-gray-400 group-hover:text-purple-600" />
                <span className="text-gray-600 group-hover:text-purple-600">Code</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediumClone;