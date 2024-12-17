import React, { useState, useRef, useEffect } from 'react';
import { Check, X } from 'lucide-react';
import { Button } from './Button';

interface InlineEditProps {
  value: string;
  onChange: (value: string) => void;
  onCancel?: () => void;
  type?: 'text' | 'textarea';
  className?: string;
  placeholder?: string;
}

export const InlineEdit: React.FC<InlineEditProps> = ({
  value,
  onChange,
  onCancel,
  type = 'text',
  className = '',
  placeholder
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSubmit = () => {
    onChange(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
    onCancel?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (!isEditing) {
    return (
      <div
        className={`cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded px-2 py-1 ${className}`}
        onClick={() => setIsEditing(true)}
      >
        {value || <span className="text-gray-400">{placeholder}</span>}
      </div>
    );
  }

  const InputComponent = type === 'textarea' ? 'textarea' : 'input';

  return (
    <div className="flex items-start gap-2">
      <InputComponent
        ref={inputRef as any}
        value={editValue}
        onChange={e => setEditValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 px-2 py-1 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
        rows={type === 'textarea' ? 3 : undefined}
        placeholder={placeholder}
      />
      <div className="flex gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSubmit}
          className="text-green-600 hover:text-green-700"
          icon={<Check className="w-4 h-4" />}
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCancel}
          className="text-red-600 hover:text-red-700"
          icon={<X className="w-4 h-4" />}
        />
      </div>
    </div>
  );
};