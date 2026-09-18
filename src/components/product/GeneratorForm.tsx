import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Package, FileText, DollarSign, Sparkles } from 'lucide-react';
import { Input, Textarea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useToast } from '@/hooks/useToast';
import { productApi } from '@/services/productApi';

interface GeneratorFormProps {
  onCreated: (id: number) => void;
}

export function GeneratorForm({ onCreated }: GeneratorFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const { show } = useToast();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      show('Product name is required', 'error');
      return;
    }

    setLoading(true);
    try {
      const result = await productApi.createProduct({
        name: name.trim(),
        description: description.trim() || undefined,
        price: price ? parseFloat(price) : undefined,
      });
      show('Product created! AI is generating your SEO sheet...', 'success');
      onCreated(result.product.id);
    } catch {
      show('Failed to create product. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 sm:p-8">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-ink dark:text-ink-dark">Product Information</h2>
        <p className="text-sm text-ink-muted dark:text-ink-dark-muted mt-1">
          Enter your product details and let AI handle the rest.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Product Name"
          required
          placeholder="e.g. Bluetooth Headphones"
          icon={<Package className="h-4 w-4" />}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Textarea
          label="Product Description"
          optional
          placeholder="Briefly describe your product (optional)"
          rows={3}
          icon={<FileText className="h-4 w-4" />}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Product Price"
            optional
            type="number"
            placeholder="e.g. 59000"
            icon={<DollarSign className="h-4 w-4" />}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
          <Button type="submit" size="lg" loading={loading} className="w-full">
            <Sparkles className="h-5 w-5" />
            Generate SEO Product Sheet
          </Button>
        </motion.div>
      </form>
    </Card>
  );
}
