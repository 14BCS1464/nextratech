// src/components/medium/HomeView.tsx
import React from "react";
import {
  FileText,
  Search,
  Plus,
  Eye,
  Edit,
  Heart,
  Trash2,
  Clock,
} from "lucide-react";
import { Article } from "./types";

interface HomeViewProps {
  error: string;
  isLoading: boolean;
  filteredArticles: Article[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onNewArticle: () => void;
  onViewArticle: (article: Article) => void;
  onEditArticle: (article: Article) => void;
  onLikeArticle: (id: string) => void;
  onDeleteArticle: (id: string) => void;
  formatDate: (dateString: string) => string;
}

const HomeView: React.FC<HomeViewProps> = ({
  error,
  isLoading,
  filteredArticles,
  searchQuery,
  onSearchChange,
  onNewArticle,
  onViewArticle,
  onEditArticle,
  onLikeArticle,
  onDeleteArticle,
  formatDate,
}) => {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200 sticky top-0 bg-white z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer">
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
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onNewArticle}
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
              <span>{error}</span>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600" />
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
                : "Start writing your first article to share your thoughts with the world"}
            </p>
            {!searchQuery && (
              <button
                onClick={onNewArticle}
                className="bg-black text-white px-8 py-4 rounded-full hover:bg-gray-800 transition-all duration-200 transform hover:scale-105"
              >
                Create Your First Article
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-8">
            {filteredArticles.map((article) => (
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
                      <span className="text-sm text-gray-500">
                        {formatDate(article.createdAt)}
                      </span>
                      <span className="text-gray-300">•</span>
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {article.readTime} min read
                      </span>
                    </div>

                    <h2
                      className="text-2xl font-serif font-bold text-gray-900 mb-3 hover:text-green-600 cursor-pointer transition-colors"
                      onClick={() => onViewArticle(article)}
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
                          onClick={() => onViewArticle(article)}
                          className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors group"
                        >
                          <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
                          Read
                        </button>
                        <button
                          onClick={() => onEditArticle(article)}
                          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors group"
                        >
                          <Edit className="w-4 h-4 group-hover:scale-110 transition-transform" />
                          Edit
                        </button>
                        <button
                          onClick={() => onLikeArticle(article.id)}
                          className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors group"
                        >
                          <Heart className="w-4 h-4 group-hover:scale-110 transition-transform" />
                          {article.likes || 0}
                        </button>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => onDeleteArticle(article.id)}
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
};

export default HomeView;
