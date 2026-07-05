export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  author: string;
  category: string;
  tags: string[];
  date?: string;
  publishedAt?: string;
  updatedAt?: string;
  readingTime?: number;
  featured?: boolean;
  image?: string;
  [key: string]: any;
}

export interface Tool {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  icon?: string;
  color?: string;
  badge?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface Subscription {
  id: string;
  userId: string;
  plan: 'basic' | 'professional' | 'enterprise';
  status: 'active' | 'inactive' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}
