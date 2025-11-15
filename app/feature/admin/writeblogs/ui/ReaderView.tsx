// src/components/medium/ReaderView.tsx
import React from "react";
import { Home, Edit, Heart, Trash2, Clock, Share, Copy } from "lucide-react";
import { Article, ContentBlock } from "./types";

interface ReaderViewProps {
  currentArticle: Article | null;
  title: string;
  subtitle: string;
  content: ContentBlock[];
  onGoHome: () => void;
  onEditArticle: (article: Article) => void;
  onLikeArticle: (id: string) => void;
  onDeleteArticle: (id: string) => void;
  copyToClipboard: (text: string) => Promise<void>;
  formatDate: (dateString: string) => string;
}

const ReaderView: React.FC<ReaderViewProps> = ({
  currentArticle,
  title,
  subtitle,
  content,
  onGoHome,
  onEditArticle,
  onLikeArticle,
  onDeleteArticle,
  copyToClipboard,
  formatDate,
}) => {
  if (!currentArticle) return null;

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200 sticky top-0 bg-white/95 backdrop-blur-sm z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={onGoHome}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
          >
            <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Home
          </button>
          <div className="flex gap-3">
            <button
              onClick={() => onEditArticle(currentArticle)}
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors group"
            >
              <Edit className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Edit
            </button>
            <button
              onClick={() => onLikeArticle(currentArticle.id)}
              className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors group"
            >
              <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {currentArticle.likes || 0}
            </button>
            <button
              onClick={() => onDeleteArticle(currentArticle.id)}
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
          {content.map((block) => {
            if (block.type === "paragraph") {
              return (
                <p
                  key={block.id}
                  className="text-xl leading-relaxed text-gray-800 font-serif mb-6"
                >
                  {block.text}
                </p>
              );
            } else if (block.type === "heading") {
              return (
                <h2
                  key={block.id}
                  className="text-3xl font-serif font-bold text-gray-900 mt-12 mb-6 border-b pb-2"
                >
                  {block.text}
                </h2>
              );
            } else if (block.type === "code") {
              return (
                <div
                  key={block.id}
                  className="bg-gray-900 rounded-xl p-6 overflow-x-auto my-8"
                >
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
              onClick={() => onLikeArticle(currentArticle.id)}
              className="flex items-center gap-2 px-6 py-3 rounded-full border border-gray-300 hover:border-red-300 hover:bg-red-50 transition-all group"
            >
              <Heart className="w-5 h-5 text-gray-600 group-hover:text-red-600 group-hover:scale-110 transition-transform" />
              <span className="text-gray-600 group-hover:text-red-600">
                {currentArticle.likes || 0} Likes
              </span>
            </button>
            <button className="flex items-center gap-2 px-6 py-3 rounded-full border border-gray-300 hover:border-blue-300 hover:bg-blue-50 transition-all group">
              <Share className="w-5 h-5 text-gray-600 group-hover:text-blue-600 group-hover:scale-110 transition-transform" />
              <span className="text-gray-600 group-hover:text-blue-600">
                Share
              </span>
            </button>
          </div>
        </footer>
      </article>
    </div>
  );
};

export default ReaderView;
