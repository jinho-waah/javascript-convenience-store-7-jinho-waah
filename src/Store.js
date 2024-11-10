import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Product from "./Product.js";
import Promotion from "./Promotion.js";

class Store {
  constructor() {
    this.products = [];
    this.promotions = [];
  }

  async loadProducts() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filePath = path.join(__dirname, "../public/products.md");

    const productData = await fs.readFile(filePath, "utf8");
    this.products = productData
      .split("\n")
      .slice(1)
      .map((line) => {
        const [name, price, quantity, promotion] = line.split(",");
        return new Product(
          name,
          parseInt(price),
          parseInt(quantity),
          promotion || null
        );
      });
  }

  async loadPromotions() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filePath = path.join(__dirname, "../public/promotions.md");

    const promotionData = await fs.readFile(filePath, "utf8");
    this.promotions = promotionData
      .split("\n")
      .slice(1)
      .map((line) => {
        const [name, buy, get, startDate, endDate] = line.split(",");
        return new Promotion(
          name,
          parseInt(buy),
          parseInt(get),
          new Date(startDate),
          new Date(endDate)
        );
      });
  }
}

export default Store;
