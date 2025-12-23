"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, MapPin, Tag, Home, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { getSearchSuggestions } from "@/lib/api";

interface Suggestion {
  type: "category" | "location" | "title";
  label: string;
  value: string;
}

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  initialValue?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  placeholder = "Etkinlik türü, şehir veya mekan adı ile arayın...",
  className = "",
  initialValue = ""
}) => {
  const router = useRouter();
  const [input, setInput] = useState(initialValue);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState<Suggestion[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Türkçe karakterleri normalize eden fonksiyon
  const normalize = (str?: string) => {
    if (!str) return "";
    return str
      .toLocaleLowerCase("tr")
      .replace(/ı/g, "i")
      .replace(/ü/g, "u")
      .replace(/ö/g, "o")
      .replace(/ş/g, "s")
      .replace(/ç/g, "c")
      .replace(/ğ/g, "g")
      .replace(/â/g, "a")
      .replace(/[^a-z0-9]/g, "");
  };

  useEffect(() => {
    async function loadSuggestions() {
      const data = await getSearchSuggestions();
      const allSuggestions: Suggestion[] = [
        ...data.kategoriler.map(k => ({ type: "category" as const, label: k.ad, value: k.ad })),
        ...data.locations.map(l => ({ type: "location" as const, label: l, value: l })),
        ...data.titles.map(t => ({ type: "title" as const, label: t, value: t }))
      ];
      setSuggestions(allSuggestions);
    }
    loadSuggestions();
  }, []);

  useEffect(() => {
    if (input.trim().length > 1) {
      const normInput = normalize(input);
      const filtered = suggestions
        .filter(s => normalize(s.label).includes(normInput))
        .slice(0, 8); // Limit to 8 suggestions for better UX
      setFilteredSuggestions(filtered);
      
      // Sadece input focused ise dropdown göster
      if (isFocused) {
        setShowDropdown(filtered.length > 0);
      }
    } else {
      setFilteredSuggestions([]);
      setShowDropdown(false);
    }
    setActiveIndex(-1);
  }, [input, suggestions, isFocused]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && 
          inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (value: string) => {
    if (!value.trim()) return;
    setShowDropdown(false);
    router.push(`/properties?kategori=${encodeURIComponent(value.trim())}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      setActiveIndex(prev => (prev < filteredSuggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      setActiveIndex(prev => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter") {
      if (activeIndex >= 0) {
        const selected = filteredSuggestions[activeIndex];
        setInput(selected.label);
        handleSearch(selected.label);
      } else {
        handleSearch(input);
      }
    } else if (e.key === "Escape") {
      setShowDropdown(false);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "category": return <Tag className="w-4 h-4 text-emerald-500" />;
      case "location": return <MapPin className="w-4 h-4 text-blue-500" />;
      case "title": return <Home className="w-4 h-4 text-purple-500" />;
      default: return null;
    }
  };

  return (
    <div className={`relative w-full max-w-2xl mx-auto ${className}`}>
      <div 
        className={`flex items-center bg-white/95 dark:bg-dark/90 backdrop-blur-md rounded-full shadow-2xl px-5 py-2.5 gap-3 transition-all duration-300 border border-white/20 hover:border-primary/30 group ${showDropdown ? 'ring-2 ring-primary/20' : ''}`}
      >
        <Search className="text-primary w-6 h-6 transition-transform group-hover:scale-110" />
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            setIsFocused(true);
            if (input.length > 1 && filteredSuggestions.length > 0) {
              setShowDropdown(true);
            }
          }}
          placeholder={placeholder}
          className="flex-grow bg-transparent outline-none text-gray-900 dark:text-white text-lg placeholder-gray-400 dark:placeholder-gray-500 py-1"
        />
        {input && (
          <button 
            onClick={() => { setInput(""); inputRef.current?.focus(); }}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        )}
        <button
          onClick={() => handleSearch(input)}
          className="bg-primary hover:bg-primary-hover active:scale-95 rounded-full px-8 py-2.5 font-bold text-white text-base transition-all shadow-lg hover:shadow-primary/20"
        >
          Ara
        </button>
      </div>

      {/* Autocomplete Dropdown */}
      {showDropdown && (
        <div 
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-3 bg-white/95 dark:bg-dark/95 backdrop-blur-xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-gray-100 dark:border-gray-800 overflow-hidden z-[100] animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <div className="py-2">
            {filteredSuggestions.map((suggestion, index) => (
              <button
                key={`${suggestion.type}-${suggestion.value}-${index}`}
                onClick={() => {
                  setInput(suggestion.label);
                  handleSearch(suggestion.label);
                }}
                onMouseEnter={() => setActiveIndex(index)}
                className={`w-full flex items-center gap-4 px-5 py-3.5 transition-all text-left group
                  ${index === activeIndex ? 'bg-primary/5 dark:bg-primary/10' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'}
                `}
              >
                <div className={`p-2 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 transition-transform ${index === activeIndex ? 'scale-110' : ''}`}>
                  {getIcon(suggestion.type)}
                </div>
                <div className="flex flex-col">
                  <span className={`text-base font-medium transition-colors ${index === activeIndex ? 'text-primary' : 'text-gray-900 dark:text-gray-100'}`}>
                    {suggestion.label}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                    {suggestion.type === 'category' ? 'Kategori' : suggestion.type === 'location' ? 'Lokasyon' : 'Mekan Adı'}
                  </span>
                </div>
              </button>
            ))}
          </div>
          <div className="bg-gray-50 dark:bg-gray-800/50 px-5 py-2 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
            <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Öneriler</span>
            <span className="text-[10px] text-gray-400 italic">↵ ile seçin</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
