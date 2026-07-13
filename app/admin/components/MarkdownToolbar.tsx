"use client";

import { Bold, Italic, Heading2, List, Link as LinkIcon } from "lucide-react";

type Props = {
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  value: string;
  onChange: (newValue: string) => void;
};

// Insère ou entoure la sélection courante du textarea avec la syntaxe markdown
// donnée, puis remet le focus/curseur à un endroit utile.
function applyMarkdown(
  textarea: HTMLTextAreaElement,
  value: string,
  onChange: (v: string) => void,
  before: string,
  after: string,
  placeholder: string
) {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selected = value.slice(start, end) || placeholder;

  const newValue = value.slice(0, start) + before + selected + after + value.slice(end);
  onChange(newValue);

  requestAnimationFrame(() => {
    textarea.focus();
    const cursorStart = start + before.length;
    const cursorEnd = cursorStart + selected.length;
    textarea.setSelectionRange(cursorStart, cursorEnd);
  });
}

export default function MarkdownToolbar({ textareaRef, value, onChange }: Props) {
  return (
    <div
      className="flex items-center gap-1 p-1.5 rounded-t-lg"
      style={{ background: "var(--admin-bg)", border: "1px solid var(--admin-border)", borderBottom: "none" }}
    >
      <button
        type="button"
        onClick={() => {
          const textarea = textareaRef.current;
          if (textarea) applyMarkdown(textarea, value, onChange, "**", "**", "texte en gras");
        }}
        aria-label="Gras"
        title="Gras"
        className="p-1.5 rounded"
        style={{ color: "var(--admin-text-muted)" }}
      >
        <Bold size={14} />
      </button>
      <button
        type="button"
        onClick={() => {
          const textarea = textareaRef.current;
          if (textarea) applyMarkdown(textarea, value, onChange, "*", "*", "texte en italique");
        }}
        aria-label="Italique"
        title="Italique"
        className="p-1.5 rounded"
        style={{ color: "var(--admin-text-muted)" }}
      >
        <Italic size={14} />
      </button>
      <button
        type="button"
        onClick={() => {
          const textarea = textareaRef.current;
          if (textarea) applyMarkdown(textarea, value, onChange, "## ", "", "Titre de section");
        }}
        aria-label="Titre"
        title="Titre"
        className="p-1.5 rounded"
        style={{ color: "var(--admin-text-muted)" }}
      >
        <Heading2 size={14} />
      </button>
      <button
        type="button"
        onClick={() => {
          const textarea = textareaRef.current;
          if (textarea) applyMarkdown(textarea, value, onChange, "- ", "", "élément de liste");
        }}
        aria-label="Liste"
        title="Liste"
        className="p-1.5 rounded"
        style={{ color: "var(--admin-text-muted)" }}
      >
        <List size={14} />
      </button>
      <button
        type="button"
        onClick={() => {
          const textarea = textareaRef.current;
          if (textarea) applyMarkdown(textarea, value, onChange, "[", "](https://)", "texte du lien");
        }}
        aria-label="Lien"
        title="Lien"
        className="p-1.5 rounded"
        style={{ color: "var(--admin-text-muted)" }}
      >
        <LinkIcon size={14} />
      </button>
    </div>
  );
}
