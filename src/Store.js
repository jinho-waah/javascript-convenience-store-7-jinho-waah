import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Product from "./Product.js";
import Promotion from "./Promotion.js";
import Receipt from "./Receipt.js";
import { DateTimes } from "@woowacourse/mission-utils";

class Store {
  constructor() {
    this.products = [];
    this.promotions = [];
    this.receipt = new Receipt();
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

  calculatePromotionDiscount() {
    let discount = 0;
    let nonPromotionalTotal = 0; // 프로모션이 적용되지 않은 제품들의 가격 합산
    const appliedPromotions = [];

    this.receipt.items.forEach(({ product, quantity }) => {
      const applicablePromotion = this.promotions.find(
        (promo) => promo.name === product.promotion
      );

      if (applicablePromotion && applicablePromotion.isApplicable(new Date())) {
        // 프로모션 적용 가능 시 무료 제공 수량 계산
        const freeItems = Math.floor(quantity / (applicablePromotion.buy + 1));
        discount += freeItems * product.price;

        if (freeItems > 0) {
          appliedPromotions.push({ product, freeQuantity: freeItems });
        }
      } else {
        // 프로모션이 적용되지 않는 제품의 금액을 합산
        nonPromotionalTotal += product.price * quantity;
      }
    });

    return { discount, appliedPromotions, nonPromotionalTotal };
  }

  processOrder(selectedItems, membership) {
    selectedItems.forEach(({ name, quantity }) => {
      const product = this.products.find((item) => item.name === name);
      if (!product || product.quantity < quantity) {
        throw new Error("재고가 부족합니다.");
      }
      this.receipt.addItem(product, quantity);
      product.reduceQuantity(quantity);
    });

    // 프로모션 할인 적용
    const { discount, appliedPromotions, nonPromotionalTotal } =
      this.calculatePromotionDiscount();
    this.receipt.applyPromotion(discount, appliedPromotions);
    console.log(nonPromotionalTotal);
    // 멤버십 할인 적용 (프로모션 할인이 적용되지 않은 금액에만)
    if (membership) {
      const membershipDiscount = Math.min(nonPromotionalTotal * 0.3, 8000);
      this.receipt.applyMembershipDiscount(membershipDiscount);
    }
  }
}

export default Store;
