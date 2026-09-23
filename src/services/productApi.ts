// src/services/productApi.ts

export interface Product {
  id: number;
  name: string;
  description?: string;
  price?: number;

  seo_title?: string;
  meta_description?: string;
  long_description?: string;

  benefits?: string[];

  specifications?: {
    attributes?: string[];
    package_contents?: string[];
    compatibility?: string[];
  };

  usage_tips?: string[];
  seo_tags?: string[];

  rook_status:
    | 'accepted'
    | 'processing'
    | 'completed'
    | 'failed';

  created_at?: string;
}

export interface CreateProductRequest {
  name: string;
  description?: string;
  price?: number;
}

const API_URL = 'http://127.0.0.1:8000/api';

async function createProduct(
  data: CreateProductRequest
): Promise<any> {
  const response = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Erreur création produit');
  }

  return response.json();
}

async function getProduct(
  id: number
): Promise<Product> {
  const response = await fetch(
    `${API_URL}/products/${id}`
  );

  if (!response.ok) {
    throw new Error('Produit introuvable');
  }

  return response.json();
}

async function getProducts(): Promise<Product[]> {
  const response = await fetch(
    `${API_URL}/products`
  );

  if (!response.ok) {
    throw new Error('Erreur chargement');
  }

  return response.json();
}

async function deleteProduct(
  id: number
): Promise<void> {
  const response = await fetch(
    `${API_URL}/products/${id}`,
    {
      method: 'DELETE',
    }
  );

  if (!response.ok) {
    throw new Error('Erreur suppression');
  }
}

export const productApi = {
  createProduct,
  getProduct,
  getProducts,
  deleteProduct,
};