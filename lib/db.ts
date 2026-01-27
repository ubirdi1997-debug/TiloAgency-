import { JSONPreset } from 'lowdb/node';
import path from 'path';

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface DBSchema {
  settings: {
    siteName: string;
    adminEmail: string;
  };
  messages: Message[];
}

const defaultData: DBSchema = {
  settings: {
    siteName: 'Tilo Agency',
    adminEmail: 'admin@tiloagency.com'
  },
  messages: []
};

let dbInstance: any = null;

export async function getDB() {
  if (dbInstance) return dbInstance;
  
  const dbPath = path.join(process.cwd(), 'data', 'db.json');
  
  try {
    dbInstance = await JSONPreset(dbPath, defaultData);
    return dbInstance;
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
}
