import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function getDb() {
    return open({
      filename: '../../../backend/Data.db',
      driver: sqlite3.Database
    });
  }

