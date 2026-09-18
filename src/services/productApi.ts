export interface Product {
  id: number;
  name: string;
  description?: string;
  price?: number;
  seo_title?: string;
  meta_description?: string;
  long_description?: string;
  benefits?: string[];
  specifications?: string[];
  usage_tips?: string[];
  seo_tags?: string[];
  rook_status: 'accepted' | 'processing' | 'completed' | 'failed';
  created_at?: string;
}

export interface CreateProductRequest {
  name: string;
  description?: string;
  price?: number;
}

const API_BASE = 'http://localhost:8000/api/products';

// --- Mock storage (used when backend is unreachable) ---
let mockId = 14;
const mockDb: Record<number, Product> = {};

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function generateSeoContent(name: string, description?: string, price?: number) {
  const desc = description || `Premium ${name.toLowerCase()} designed for everyday excellence`;
  const priceStr = price ? `${(price / 100).toFixed(2)} €` : 'Premium pricing';

  return {
    seo_title: `${name} — Premium Quality & Best Price | ROOK Store`,
    meta_description: `Discover the ${name}: ${desc.slice(0, 120)}. Shop now with fast delivery and best-in-class quality.`,
    long_description: `The ${name} represents the pinnacle of modern design and engineering. ${desc} Crafted with meticulous attention to detail, this product combines cutting-edge technology with elegant aesthetics to deliver an unparalleled experience.\n\nWhether you're a professional or an enthusiast, the ${name} adapts seamlessly to your needs. Its versatile design makes it perfect for daily use, special occasions, and everything in between.\n\nAvailable now at ${priceStr}, the ${name} offers exceptional value without compromising on quality. Backed by our satisfaction guarantee and comprehensive warranty.`,
    benefits: [
      `Premium build quality ensuring long-lasting durability`,
      `Ergonomic design optimized for maximum comfort`,
      `Energy-efficient performance that saves resources`,
      `Sustainable materials with eco-friendly packaging`,
      `12-month comprehensive warranty included`,
    ],
    specifications: [
      `Material: Aerospace-grade aluminum & premium polycarbonate`,
      `Dimensions: 240 × 180 × 45 mm`,
      `Weight: 320 grams`,
      `Connectivity: Bluetooth 5.2, USB-C, Wi-Fi 6`,
      `Battery Life: Up to 40 hours continuous use`,
      `Charging Time: 1.5 hours via USB-C fast charge`,
      `Operating Temperature: -10°C to 45°C`,
    ],
    usage_tips: [
      `Charge fully before first use to optimize battery lifespan`,
      `Clean regularly with a soft, dry microfiber cloth`,
      `Store in a cool, dry place away from direct sunlight`,
      `Update firmware monthly for the latest features and security patches`,
      `Use only with certified accessories for best performance`,
    ],
    seo_tags: [
      name.toLowerCase(),
      'premium quality',
      'best price',
      'fast delivery',
      'eco-friendly',
      'warranty included',
      'top rated',
      'new arrival',
    ],
  };
}

async function tryFetch(url: string, options?: RequestInit) {
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {}),
      },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch {
    return null;
  }
}

export const productApi = {
  async createProduct(req: CreateProductRequest): Promise<{ product: Pick<Product, 'id' | 'rook_status'> }> {
    const backend = await tryFetch(API_BASE, {
      method: 'POST',
      body: JSON.stringify(req),
    });

    if (backend?.product?.id) {
      mockDb[backend.product.id] = {
        id: backend.product.id,
        name: req.name,
        description: req.description,
        price: req.price,
        rook_status: backend.product.rook_status || 'accepted',
        created_at: new Date().toISOString(),
      };
      return { product: backend.product };
    }

    // Fallback mock
    await delay(800);
    const id = ++mockId;
    mockDb[id] = {
      id,
      name: req.name,
      description: req.description,
      price: req.price,
      rook_status: 'accepted',
      created_at: new Date().toISOString(),
    };
    return { product: { id, rook_status: 'accepted' } };
  },

  async getProduct(id: number): Promise<Product> {
    const backend = await tryFetch(`${API_BASE}/${id}`);

    if (backend?.id) {
      mockDb[id] = { ...mockDb[id], ...backend };
      return backend;
    }

    // Fallback mock — simulate processing then completion
    await delay(200);
    const existing = mockDb[id];
    if (!existing) throw new Error('Product not found');

    const elapsed = Date.now() - new Date(existing.created_at!).getTime();
    const PROCESSING_DURATION = 9000;

    if (elapsed >= PROCESSING_DURATION) {
      const completed: Product = {
        ...existing,
        ...generateSeoContent(existing.name, existing.description, existing.price),
        rook_status: 'completed',
      };
      mockDb[id] = completed;
      return completed;
    }

    return { ...existing, rook_status: 'processing' };
  },

  async getAllProducts(): Promise<Product[]> {
    const backend = await tryFetch(API_BASE);
    if (Array.isArray(backend)) return backend;

    return Object.values(mockDb).sort(
      (a, b) => new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime()
    );
  },

  async deleteProduct(id: number): Promise<void> {
    await tryFetch(`${API_BASE}/${id}`, { method: 'DELETE' });
    delete mockDb[id];
  },
};
