"use client";
import { useState } from "react";

interface FAQItem {
  q: string;
  a: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

function FAQAccordionItem({ item, isOpen, onToggle, index }: { item: FAQItem; isOpen: boolean; onToggle: () => void; index: number }) {
  return (
    <div 
      className="group rounded-3xl border border-[#E3E5E8] bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:border-[#6BCFCF]/40 overflow-hidden motion-safe:animate-fade-up-soft"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left transition-all duration-300"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-4 flex-1">
          {/* Numéro avec design tech */}
          <span className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl text-sm font-bold transition-all duration-300 ${
            isOpen 
              ? 'bg-gradient-to-br from-[#6BCFCF] to-[#4FB8B8] text-white shadow-[0_0_20px_rgba(107,207,207,0.4)]' 
              : 'bg-[#F8F9FA] text-[#4b5c6b] border-2 border-[#E3E5E8] group-hover:border-[#6BCFCF]/40 group-hover:bg-[#6BCFCF]/10'
          }`}>
            {index + 1}
          </span>
          <h3 className="text-base md:text-lg font-bold text-[#04163a] leading-tight">
            {item.q}
          </h3>
        </div>
        
        {/* Chevron avec rotation smooth */}
        <div
          className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl border-2 transition-all duration-300 ${
            isOpen 
              ? "rotate-180 border-[#6BCFCF] bg-[#6BCFCF]/10 text-[#2B7A78]" 
              : "border-[#E3E5E8] text-[#4b5c6b] group-hover:border-[#6BCFCF]/40 group-hover:bg-[#F8F9FA]"
          }`}
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>
      
      {/* Contenu avec animation smooth */}
      <div
        className={`transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{
          overflow: "hidden",
        }}
      >
        <div className="px-5 md:px-6 pb-5 md:pb-6">
          <div className="pl-12 pr-4">
            {/* Séparateur mint subtil */}
            <div className="h-px bg-gradient-to-r from-[#6BCFCF]/40 via-[#6BCFCF]/20 to-transparent mb-4" />
            <p className="text-sm md:text-base text-[#4b5c6b] leading-relaxed">
              {item.a}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Premier item ouvert par défaut

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <FAQAccordionItem
          key={item.q}
          item={item}
          isOpen={openIndex === index}
          onToggle={() => handleToggle(index)}
          index={index}
        />
      ))}
    </div>
  );
}
