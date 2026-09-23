import { motion } from 'framer-motion';
import {
  Pin,
  FileText,
  BookOpen,
  Target,
  Settings,
  Lightbulb,
  Tag,
  Copy,
  Check,
  Download,
  Plus,
} from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/Button';
import { useToast } from '@/hooks/useToast';
import type { Product } from '@/services/productApi';

interface ProductSheetProps {
  product: Product;
  onNew: () => void;
}

interface Section {
  key: string;
  label: string;
  icon: typeof Pin;
  content: string | string[];
}

function CopyButton({
  text,
  label,
}: {
  text: string;
  label: string;
}) {
  const [copied, setCopied] = useState(false);
  const { show } = useToast();

  const copy = async () => {
    await navigator.clipboard.writeText(text);

    setCopied(true);
    show(`${label} copied to clipboard`, 'success');

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <button
      onClick={copy}
      className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-ink-muted hover:text-brand-600 hover:bg-brand-50 dark:text-ink-dark-muted dark:hover:text-brand-400 dark:hover:bg-brand-500/10 transition-colors"
    >
      {copied ? (
        <Check className="h-3.5 w-3.5" />
      ) : (
        <Copy className="h-3.5 w-3.5" />
      )}

      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

function SectionCard({
  section,
  index,
}: {
  section: Section;
  index: number;
}) {
  const Icon = section.icon;

  const isList = Array.isArray(section.content);

  const content = section.content;

  const copyText = isList
    ? (content as string[])
        .map((item) => `• ${item}`)
        .join('\n')
    : (content as string);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.08,
        type: 'spring',
        stiffness: 200,
        damping: 25,
      }}
      className="group rounded-2xl border border-edge bg-surface-card p-6 dark:bg-surface-dark-card dark:border-edge-dark hover:shadow-card-hover transition-shadow"
    >
      {/* Section header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
            <Icon className="h-[18px] w-[18px]" />
          </div>

          <h3 className="text-sm font-bold text-ink dark:text-ink-dark">
            {section.label}
          </h3>
        </div>

        <CopyButton
          text={copyText}
          label={section.label}
        />
      </div>

      {/* Content */}
      {isList ? (
        <ul className="space-y-2">
          {(content as string[]).map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-2.5 text-sm text-ink dark:text-ink-dark"
            >
              <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />

              <span className="leading-relaxed">
                {item}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm leading-relaxed text-ink dark:text-ink-dark whitespace-pre-line">
          {content as string}
        </p>
      )}
    </motion.div>
  );
}

export function ProductSheet({
  product,
  onNew,
}: ProductSheetProps) {
  const { show } = useToast();

  /*
   * specifications vient de Laravel sous cette forme :
   *
   * {
   *   attributes: [],
   *   package_contents: [],
   *   compatibility: []
   * }
   *
   * On transforme l'objet en tableau de strings
   * pour pouvoir l'afficher avec SectionCard.
   */
  const specifications = product.specifications
    ? [
        ...(product.specifications.attributes || []),
        ...(product.specifications.package_contents || []),
        ...(product.specifications.compatibility || []),
      ]
    : [];

  const sections: Section[] = [
    {
      key: 'seo_title',
      label: 'SEO Title',
      icon: Pin,
      content: product.seo_title || '',
    },

    {
      key: 'meta_description',
      label: 'Meta Description',
      icon: FileText,
      content: product.meta_description || '',
    },

    {
      key: 'long_description',
      label: 'Long Description',
      icon: BookOpen,
      content: product.long_description || '',
    },

    {
      key: 'benefits',
      label: 'Benefits',
      icon: Target,
      content: product.benefits || [],
    },

    {
      key: 'specifications',
      label: 'Specifications',
      icon: Settings,
      content: specifications,
    },

    {
      key: 'usage_tips',
      label: 'Usage Tips',
      icon: Lightbulb,
      content: product.usage_tips || [],
    },

    {
      key: 'seo_tags',
      label: 'SEO Keywords',
      icon: Tag,
      content: product.seo_tags || [],
    },
  ];

  const copyFullSheet = async () => {
    const lines: string[] = [
      `# ${product.name}`,
      '',
    ];

    sections.forEach((section) => {
      lines.push(`## ${section.label}`);

      if (Array.isArray(section.content)) {
        section.content.forEach((item) => {
          lines.push(`- ${item}`);
        });
      } else {
        lines.push(section.content);
      }

      lines.push('');
    });

    await navigator.clipboard.writeText(
      lines.join('\n')
    );

    show(
      'Full product sheet copied',
      'success'
    );
  };

  const exportPdf = () => {
    window.print();

    show(
      'Opening print dialog for PDF export',
      'info'
    );
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <motion.div
        initial={{
          opacity: 0,
          y: 16,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="rounded-2xl border border-edge bg-gradient-to-br from-brand-50 via-white to-secondary-50 p-6 dark:from-brand-500/5 dark:via-surface-dark-card dark:to-secondary-500/5 dark:border-edge-dark"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

          {/* Product information */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-success/20 bg-success/10 px-2.5 py-1 text-xs font-semibold text-success">
                <Check className="h-3 w-3" />
                Completed
              </span>
            </div>

            <h2 className="text-xl font-bold text-ink dark:text-ink-dark">
              {product.name}
            </h2>

            {product.price !== undefined &&
              product.price !== null && (
                <p className="text-sm text-ink-muted dark:text-ink-dark-muted mt-1">
                  {(product.price / 100).toFixed(2)} €
                </p>
              )}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2">

            <Button
              variant="outline"
              size="sm"
              onClick={copyFullSheet}
            >
              <Copy className="h-4 w-4" />
              Copy Sheet
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={exportPdf}
            >
              <Download className="h-4 w-4" />
              Export PDF
            </Button>

            <Button
              size="sm"
              onClick={onNew}
            >
              <Plus className="h-4 w-4" />
              New Product
            </Button>

          </div>
        </div>
      </motion.div>

      {/* Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {sections.map((section, index) => (
          <SectionCard
            key={section.key}
            section={section}
            index={index}
          />
        ))}
      </div>

    </div>
  );
}