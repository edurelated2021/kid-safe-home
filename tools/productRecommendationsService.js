import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function findProductsMatchingKeyWords(inputKeywords) {
  const dbPath = path.join(__dirname, '../data', 'products.json');
  const productData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

  const matchedProducts = productData.filter(product =>
    product.keywords.some(keyword => inputKeywords.includes(keyword.toLowerCase()))
  );

  return matchedProducts;
}
