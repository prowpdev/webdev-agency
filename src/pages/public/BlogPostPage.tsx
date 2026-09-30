import React from 'react';
import { useNavigation } from '../../contexts/NavigationContext';
import { StorageService } from '../../services/storageService';
import { ArrowLeft, Clock, Share2, ArrowRight } from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';

export const BlogPostPage: React.FC = () => {
  const { params, navigate } = useNavigation();
  const articles = StorageService.getBlog();
  const { success } = useToast();

  const article = articles.find((a) => a.id === params.id) || articles[0];

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      success('Link Copied', 'Article URL copied to clipboard');
    }
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <button
        onClick={() => navigate('/blog')}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Articles</span>
      </button>

      <header className="space-y-6">
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-medium">
          <span className="font-semibold text-indigo-600">{article.category}</span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            {article.readTime}
          </span>
          <span>·</span>
          <span>Published {article.publishedAt}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-display leading-[1.15] text-balance">
          {article.title}
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">{article.excerpt}</p>

        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center font-bold text-sm text-indigo-700">
              {article.author.avatar}
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">{article.author.name}</div>
              <div className="text-xs text-slate-500">{article.author.role}</div>
            </div>
          </div>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
          >
            <Share2 className="w-3.5 h-3.5 text-slate-400" />
            <span>Share Article</span>
          </button>
        </div>
      </header>

      {article.coverImage && (
        <div className="rounded-3xl overflow-hidden border border-slate-200 aspect-16/9 shadow-md">
          <img
            src={article.coverImage}
            alt={article.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Prose content */}
      <div className="max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-6">
        <p>{article.content}</p>

        <h3 className="text-xl font-bold text-slate-900 font-display pt-4">1. The Cost of Sub-Optimal Latency</h3>
        <p>
          Every 100ms delay in page response directly correlates with measurable conversion loss. When prospective
          enterprise customers land on your web platform, cognitive trust is established within the first quarter of a
          second. A sluggish interface creates subconscious doubt regarding the reliability of the underlying product.
        </p>

        <h3 className="text-xl font-bold text-slate-900 font-display pt-4">2. Structural Architecture Decisions</h3>
        <p>
          Choosing between monolithic server templates and decoupled client applications requires analyzing data mutation
          frequency, SEO crawl priority, and international edge caching. By decoupling UI render trees from business logic
          controllers, applications remain resilient against unexpected spikes in traffic.
        </p>

        <div className="p-6 rounded-2xl bg-indigo-50/70 border border-indigo-100 my-8">
          <h4 className="text-sm font-bold text-indigo-950 mb-2 font-display">Key Takeaways for Technical Founders</h4>
          <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-indigo-900">
            <li>Keep critical rendering path dependencies under 80KB.</li>
            <li>Enforce zero layout shift (CLS &lt; 0.05) through explicit image and container aspect dimensions.</li>
            <li>Store immutable edge cache headers for all static media assets.</li>
          </ul>
        </div>
      </div>
    </article>
  );
};
