import React, { useState } from 'react';
import { useNavigation } from '../../contexts/NavigationContext';
import { StorageService } from '../../services/storageService';
import { ArrowRight, Clock, BookOpen, Tag } from 'lucide-react';

export const BlogPage: React.FC = () => {
  const { navigate } = useNavigation();
  const articles = StorageService.getBlog();
  const [selectedTag, setSelectedTag] = useState<string>('All');

  const allTags = ['All', 'Web Performance', 'SEO', 'Shopify', 'Architecture', 'Conversion Rate Optimization'];

  const filtered =
    selectedTag === 'All'
      ? articles
      : articles.filter((a) => a.tags.some((t) => t.toLowerCase() === selectedTag.toLowerCase()));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">Engineering Insights</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-display">
          Technical Writing, Architecture & Web Performance
        </h1>
        <p className="text-slate-600 text-base leading-relaxed">
          In-depth breakdowns on building lightning-fast React applications, headless e-commerce, and enterprise design
          systems.
        </p>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 pt-4">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedTag === tag
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filtered.map((art) => (
          <article
            key={art.id}
            onClick={() => navigate('/blog-post', { id: art.id })}
            className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer hover:-translate-y-1"
          >
            <div>
              {art.coverImage && (
                <div className="rounded-2xl overflow-hidden mb-6 aspect-16/9 border border-slate-200">
                  <img
                    src={art.coverImage}
                    alt={art.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                </div>
              )}

              <div className="flex items-center gap-2 text-xs text-slate-500 mb-3 font-medium">
                <span className="font-semibold text-indigo-600">{art.category}</span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  {art.readTime}
                </span>
                <span>·</span>
                <span>{art.publishedAt}</span>
              </div>

              <h2 className="text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug font-display">
                {art.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">{art.excerpt}</p>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center text-xs font-bold text-indigo-700">
                  {art.author.avatar}
                </span>
                <div className="text-xs">
                  <span className="text-slate-900 font-semibold block">{art.author.name}</span>
                  <span className="text-[10px] text-slate-500">{art.author.role}</span>
                </div>
              </div>

              <span className="text-xs font-semibold text-indigo-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                Read Article
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
