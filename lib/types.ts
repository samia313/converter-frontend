// BlogPost is imported from blog-data.ts to avoid duplication
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
