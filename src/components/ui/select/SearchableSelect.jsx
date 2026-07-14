'use client';

import { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '@/lib/cn';
import { normalizeOptions } from './selectVariants';

const SearchableSelect = forwardRef(function SearchableSelect(
  {
    name,
    options = [],
    value,
    onChange,
    placeholder = 'Digite para filtrar e selecione...',
    emptyMessage = 'Nenhuma opção encontrada',
    disabled = false,
    isRequired = false,
    className,
  },
  ref
) {
  const normalizedOptions = useMemo(() => normalizeOptions(options), [options]);
  const selectedOption = normalizedOptions.find(
    (option) => String(option.value) === String(value ?? '')
  );

  const [inputValue, setInputValue] = useState(selectedOption?.label ?? '');
  const [isEditing, setIsEditing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const listRef = useRef(null);
  const listboxId = useMemo(
    () => `searchable-select-${name || 'field'}-listbox`,
    [name]
  );

  useEffect(() => {
    const current = normalizedOptions.find(
      (option) => String(option.value) === String(value ?? '')
    );
    setInputValue(current?.label ?? '');
  }, [value, normalizedOptions]);

  const filterText = isEditing ? inputValue.trim().toLowerCase() : '';
  const filteredOptions = useMemo(
    () =>
      filterText
        ? normalizedOptions.filter((option) =>
            option.label.toLowerCase().includes(filterText)
          )
        : normalizedOptions,
    [normalizedOptions, filterText]
  );

  useEffect(() => {
    if (highlightedIndex >= filteredOptions.length) {
      setHighlightedIndex(filteredOptions.length > 0 ? filteredOptions.length - 1 : 0);
    }
  }, [filteredOptions, highlightedIndex]);

  function revertToSelected() {
    const current = normalizedOptions.find(
      (option) => String(option.value) === String(value ?? '')
    );
    setInputValue(current?.label ?? '');
    setIsEditing(false);
  }

  function openDropdown() {
    if (disabled) return;
    setIsOpen(true);
    setIsEditing(false);
    setHighlightedIndex(0);
  }

  function handleInputChange(event) {
    setInputValue(event.target.value);
    setIsEditing(true);
    setIsOpen(true);
    setHighlightedIndex(0);
  }

  function selectOption(option) {
    setIsEditing(false);
    setInputValue(option.label);
    setIsOpen(false);
    onChange?.({ target: { name, value: option.value } });
  }

  function handleClear(event) {
    event.stopPropagation();
    setInputValue('');
    setIsEditing(false);
    setIsOpen(false);
    onChange?.({ target: { name, value: '' } });
  }

  function handleBlur() {
    setIsOpen(false);
    revertToSelected();
  }

  function handleKeyDown(event) {
    if (!isOpen && (event.key === 'ArrowDown' || event.key === 'Enter')) {
      event.preventDefault();
      openDropdown();
      return;
    }
    if (!isOpen) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setHighlightedIndex((prev) => Math.min(prev + 1, filteredOptions.length - 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setHighlightedIndex((prev) => Math.max(prev - 1, 0));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const option = filteredOptions[highlightedIndex];
      if (option) selectOption(option);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      setIsOpen(false);
      revertToSelected();
    }
  }

  return (
    <div className="relative flex items-center w-full">
      <input
        ref={ref}
        type="text"
        name={name}
        autoComplete="off"
        disabled={disabled}
        aria-required={isRequired || undefined}
        aria-expanded={isOpen}
        aria-autocomplete="list"
        aria-controls={listboxId}
        role="combobox"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        onFocus={openDropdown}
        onClick={openDropdown}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        className={cn(
          'rounded-xl outline-none transition-all w-full px-4 pr-16 h-auto py-2.5 text-sm',
          'bg-white border border-gray-200 shadow-sm text-gray-800',
          'focus:border-[#103D85] focus:ring-0.5 focus:ring-[#103D85]',
          'dark:bg-[#303746] dark:border-white/15 dark:text-[#E2E2EA]',
          'dark:focus:border-[#1A4A9E] dark:focus:ring-[#1A4A9E]',
          'disabled:opacity-60 disabled:cursor-not-allowed',
          className
        )}
      />

      {selectedOption && !disabled && (
        <button
          type="button"
          tabIndex={-1}
          onMouseDown={(event) => event.preventDefault()}
          onClick={handleClear}
          aria-label="Limpar seleção"
          className="absolute right-9 opacity-40 hover:opacity-70 transition-opacity"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-gray-600 dark:text-[#E2E2EA]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}

      <div className="absolute right-4 pointer-events-none opacity-40" aria-hidden="true">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5 text-gray-600 dark:text-[#E2E2EA]"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>

      {isOpen && !disabled && (
        <ul 
          ref={listRef}
          id={listboxId}
          role="listbox"
          onMouseDown={(event) => event.preventDefault()}
          className="absolute left-0 top-full z-20 mt-1 max-h-56 w-full overflow-y-auto scrollbar-thin rounded-xl border border-gray-200 bg-white shadow-lg dark:border-white/15 dark:bg-[#303746]"
        >
          {filteredOptions.length === 0 ? (
            <li className="px-4 py-2.5 text-sm text-gray-400 dark:text-[#8A8FA3]">
              {emptyMessage}
            </li>
          ) : (
            filteredOptions.map((option, index) => (
              <li
                key={option.value}
                onClick={() => selectOption(option)}
                onMouseEnter={() => setHighlightedIndex(index)}
                className={cn(
                  'px-4 py-2.5 text-sm cursor-pointer text-gray-800 dark:text-[#E2E2EA]',
                  index === highlightedIndex && 'bg-[#103D85]/10 dark:bg-white/10',
                  String(option.value) === String(value ?? '') && 'font-semibold'
                )}
              >
                {option.label}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
});

export { SearchableSelect };
export default SearchableSelect;