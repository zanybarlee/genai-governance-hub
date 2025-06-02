
import React from 'react';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export const MarkdownRenderer = ({ content, className = "" }: MarkdownRendererProps) => {
  const formatMarkdownContent = (text: string): JSX.Element[] => {
    const lines = text.split('\n');
    const formattedLines: JSX.Element[] = [];
    
    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      
      if (trimmedLine.startsWith('# ')) {
        // Main title
        formattedLines.push(
          <h1 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4 border-b border-gray-300 pb-2">
            {trimmedLine.replace('# ', '')}
          </h1>
        );
      } else if (trimmedLine.startsWith('## ')) {
        // Section heading
        formattedLines.push(
          <h2 key={index} className="text-xl font-bold text-blue-800 mt-6 mb-3 border-b border-blue-200 pb-2">
            {trimmedLine.replace('## ', '')}
          </h2>
        );
      } else if (trimmedLine.startsWith('### ')) {
        // Sub heading
        formattedLines.push(
          <h3 key={index} className="text-lg font-semibold text-blue-700 mt-4 mb-2">
            {trimmedLine.replace('### ', '')}
          </h3>
        );
      } else if (trimmedLine.startsWith('#### ')) {
        // Sub sub heading
        formattedLines.push(
          <h4 key={index} className="text-base font-semibold text-blue-600 mt-3 mb-2">
            {trimmedLine.replace('#### ', '')}
          </h4>
        );
      } else if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
        // Bold section headers
        formattedLines.push(
          <div key={index} className="font-semibold text-gray-800 mt-3 mb-2">
            {trimmedLine.replace(/\*\*/g, '')}
          </div>
        );
      } else if (trimmedLine.startsWith('- **') && trimmedLine.includes('**:')) {
        // Bold bullet points with descriptions
        const parts = trimmedLine.match(/^- \*\*(.*?)\*\*: (.*)$/);
        if (parts) {
          formattedLines.push(
            <div key={index} className="ml-4 mb-2">
              <span className="font-semibold text-blue-800">• {parts[1]}:</span>
              <span className="ml-2 text-gray-700">{parts[2]}</span>
            </div>
          );
        }
      } else if (trimmedLine.startsWith('- ')) {
        // Regular bullet points
        formattedLines.push(
          <div key={index} className="ml-4 mb-1 text-gray-700">
            • {trimmedLine.replace('- ', '')}
          </div>
        );
      } else if (trimmedLine.startsWith('1. ') || /^\d+\. /.test(trimmedLine)) {
        // Numbered lists
        formattedLines.push(
          <div key={index} className="ml-4 mb-1 text-gray-700">
            {trimmedLine}
          </div>
        );
      } else if (trimmedLine.startsWith('---') || trimmedLine.startsWith('___')) {
        // Horizontal rule
        formattedLines.push(
          <hr key={index} className="my-4 border-gray-300" />
        );
      } else if (trimmedLine && !trimmedLine.startsWith('#')) {
        // Regular text
        const formattedText = trimmedLine
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(.*?)\*/g, '<em>$1</em>')
          .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 rounded text-sm">$1</code>');
        
        formattedLines.push(
          <p 
            key={index} 
            className="mb-2 text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: formattedText }}
          />
        );
      } else if (trimmedLine === '') {
        // Empty line for spacing
        formattedLines.push(
          <div key={index} className="mb-2" />
        );
      }
    });
    
    return formattedLines;
  };

  return (
    <div className={`prose prose-sm max-w-none ${className}`}>
      {formatMarkdownContent(content)}
    </div>
  );
};
