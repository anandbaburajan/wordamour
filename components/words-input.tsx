"use client";

import { normalizeProps, useMachine } from "@zag-js/react";
import * as tagsInput from "@zag-js/tags-input";
import { X } from "lucide-react";
import { useEffect, useId, useRef } from "react";

interface WordsInputProps {
  value: string[];
  onValueChange: (value: string[]) => void;
  inputValue: string;
  onInputValueChange: (value: string) => void;
}

export function WordsInput({
  value,
  onValueChange,
  inputValue,
  onInputValueChange,
}: WordsInputProps) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const service = useMachine(tagsInput.machine, {
    id,
    value,
    inputValue,
    onValueChange: ({ value }) => onValueChange(value.filter(Boolean)),
    onInputValueChange: ({ inputValue }) => onInputValueChange(inputValue),
    delimiter: /[,\s]+/,
    addOnPaste: true,
    blurBehavior: "add",
    editable: false,
    allowDuplicates: true,
    placeholder: "Words",
    translations: {
      deleteTagTriggerLabel: (word) => `Remove ${word}`,
    },
  });
  const api = tagsInput.connect(service, normalizeProps);
  const inputProps = api.getInputProps();

  useEffect(() => {
    const input = inputRef.current;
    if (input && document.activeElement === input) {
      input.scrollIntoView({ block: "nearest", inline: "nearest" });
    }
  }, [value.length]);

  return (
    <div
      {...api.getRootProps()}
      className="mb-4 h-[20rem] w-full shrink-0 overflow-y-auto overscroll-contain rounded-md border-none bg-gray-400/10 px-3 py-2 font-medium shadow-none backdrop-blur-2xl transition duration-200 hover:bg-gray-400/15 focus-within:bg-gray-400/15"
    >
      <label {...api.getLabelProps()} className="sr-only">
        Words
      </label>
      <span id={`${id}-hint`} className="sr-only">
        Type a word, then press space, comma, or Enter to add it. Use the remove
        button to delete a word.
      </span>
      <div
        {...api.getControlProps()}
        className="flex min-h-full cursor-text flex-wrap content-start items-start gap-1.5"
        onClick={(event) => {
          if (event.target === event.currentTarget) api.focus();
        }}
      >
        {api.value.map((word, index) => (
          <span
            key={index}
            {...api.getItemProps({ value: word, index })}
            className="max-w-full"
          >
            <span
              {...api.getItemPreviewProps({ value: word, index })}
              className="inline-flex max-w-full items-center rounded-md bg-white/60 pl-2.5 text-sm text-gray-800 data-[highlighted]:ring-2 data-[highlighted]:ring-gray-500"
            >
              <span
                {...api.getItemTextProps({ value: word, index })}
                className="min-w-0 break-all"
              >
                {word}
              </span>
              <button
                {...api.getItemDeleteTriggerProps({ value: word, index })}
                // Keep the tag's pointer handler from cancelling a Safari tap.
                onPointerDown={(event) => event.stopPropagation()}
                className="group flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center rounded-md text-gray-500 focus-visible:outline-none lg:h-7 lg:w-7"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full transition-colors duration-150 group-hover:bg-rose-100 group-hover:text-rose-700 group-active:bg-rose-200 group-focus-visible:bg-rose-100 group-focus-visible:text-rose-700 group-focus-visible:ring-2 group-focus-visible:ring-rose-300">
                  <X className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </button>
            </span>
          </span>
        ))}
        <input
          {...inputProps}
          ref={inputRef}
          aria-describedby={`${id}-hint`}
          size={Math.max(1, inputValue.length + 1)}
          className="h-11 min-w-[2ch] max-w-full flex-auto bg-transparent text-base font-medium outline-none placeholder:text-gray-500 lg:h-7 lg:text-sm"
          spellCheck={false}
          onInput={(event) => {
            if ((event.nativeEvent as InputEvent).isComposing) {
              api.setInputValue(event.currentTarget.value);
              return;
            }
            // Ignore repeated separators, including input-only mobile events.
            if (/^[,\s]+$/.test(event.currentTarget.value)) {
              event.currentTarget.value = "";
              api.clearInputValue();
              return;
            }
            inputProps.onInput?.(event);
          }}
          onCompositionEnd={(event) => inputProps.onInput?.(event)}
          onPaste={(event) => {
            // Read newlines before the single-line input strips them out.
            event.preventDefault();
            const input = event.currentTarget;
            const start = input.selectionStart ?? input.value.length;
            const end = input.selectionEnd ?? start;
            const pastedValue =
              input.value.slice(0, start) +
              event.clipboardData.getData("text/plain") +
              input.value.slice(end);
            api.setValue([
              ...api.value,
              ...pastedValue.split(/[,\s]+/).filter(Boolean),
            ]);
            input.value = "";
            api.clearInputValue();
          }}
        />
      </div>
    </div>
  );
}
