import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, BookOpen, FileText, ChevronRight } from 'lucide-react';

const LibraryPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Categories', count: 156 },
    { id: 'neonatology', name: 'Neonatology', count: 23 },
    { id: 'cardiology', name: 'Pediatric Cardiology', count: 18 },
    { id: 'infectious', name: 'Infectious Diseases', count: 31 },
    { id: 'respiratory', name: 'Respiratory', count: 19 },
    { id: 'gastroenterology', name: 'Gastroenterology', count: 15 },
    { id: 'neurology', name: 'Neurology', count: 22 },
    { id: 'endocrinology', name: 'Endocrinology', count: 12 },
    { id: 'hematology', name: 'Hematology/Oncology', count: 16 }
  ];

  const sampleContent = [
    {
      id: 1,
      title: 'Neonatal Jaundice: Diagnosis and Management',
      chapter: 'Neonatology',
      pageNumber: 102,
      excerpt: 'Neonatal jaundice is a common condition affecting approximately 60% of term newborns...',
      lastUpdated: '2024-01-15'
    },
    {
      id: 2,
      title: 'Fever Management in Pediatric Patients',
      chapter: 'General Pediatrics',
      pageNumber: 156,
      excerpt: 'Fever in children is defined as a rectal temperature ≥38°C (100.4°F)...',
      lastUpdated: '2024-01-12'
    },
    {
      id: 3,
      title: 'Growth and Development Milestones',
      chapter: 'Development',
      pageNumber: 45,
      excerpt: 'Normal growth and development in children follows predictable patterns...',
      lastUpdated: '2024-01-10'
    },
    {
      id: 4,
      title: 'Pediatric Respiratory Infections',
      chapter: 'Respiratory Medicine',
      pageNumber: 234,
      excerpt: 'Respiratory tract infections are among the most common illnesses in children...',
      lastUpdated: '2024-01-08'
    },
    {
      id: 5,
      title: 'Nutrition and Feeding in Infants',
      chapter: 'Nutrition',
      pageNumber: 78,
      excerpt: 'Proper nutrition is crucial for optimal growth and development in children...',
      lastUpdated: '2024-01-05'
    }
  ];

  const filteredContent = sampleContent.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           item.chapter.toLowerCase().includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="h-full bg-[#121212] flex">
      {/* Sidebar */}
      <div className="w-80 border-r border-[#262626] p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">Library</h1>
          <p className="text-[#B0B0B0]">Browse Nelson Textbook content</p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#B0B0B0]" size={20} />
          <input
            type="text"
            placeholder="Search content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1E1E1E] text-white placeholder-[#B0B0B0] pl-10 pr-4 py-3 rounded-lg border border-[#262626] focus:border-[#333333] outline-none"
          />
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-white font-semibold mb-3">Categories</h3>
          <div className="space-y-1">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-[#1E1E1E] text-white'
                    : 'text-[#B0B0B0] hover:text-white hover:bg-[#1E1E1E]'
                }`}
              >
                <span>{category.name}</span>
                <span className="text-xs bg-[#262626] px-2 py-1 rounded">
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-4xl">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white mb-2">
              {selectedCategory === 'all' ? 'All Content' : categories.find(c => c.id === selectedCategory)?.name}
            </h2>
            <p className="text-[#B0B0B0]">
              {filteredContent.length} articles found
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid gap-4">
            {filteredContent.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#1E1E1E] rounded-lg p-6 border border-[#262626] hover:border-[#333333] transition-colors cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <BookOpen size={16} className="text-[#B0B0B0]" />
                    <span className="text-[#B0B0B0] text-sm">{item.chapter}</span>
                    <span className="text-[#B0B0B0] text-sm">•</span>
                    <span className="text-[#B0B0B0] text-sm">Page {item.pageNumber}</span>
                  </div>
                  <ChevronRight size={16} className="text-[#B0B0B0] group-hover:text-white transition-colors" />
                </div>
                
                <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-[#B0B0B0] mb-4 line-clamp-2">
                  {item.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <FileText size={14} className="text-[#B0B0B0]" />
                    <span className="text-[#B0B0B0]">Full Article</span>
                  </div>
                  <span className="text-[#B0B0B0]">
                    Updated {new Date(item.lastUpdated).toLocaleDateString()}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredContent.length === 0 && (
            <div className="text-center py-12">
              <BookOpen size={48} className="text-[#B0B0B0] mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">No content found</h3>
              <p className="text-[#B0B0B0]">
                Try adjusting your search terms or category filter.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LibraryPage;

