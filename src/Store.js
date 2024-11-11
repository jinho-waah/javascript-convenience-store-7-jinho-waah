import fs from "node:fs/promises";
import Product from "./Product.js";
import Promotion from "./Promotion.js";
import Receipt from "./Receipt.js";
import { Console, DateTimes } from "@woowacourse/mission-utils";
import { InputView } from "./InputView.js";

class Store {
  constructor() {
    this.products = [];
    this.promotions = [];
    this.receipt = null;
  }

  async loadProducts() {
    const productData = await fs.readFile("./public/products.md", "utf8");
    this.products = productData
      .split("\n")
      .slice(1)
      .filter((line) => line.trim() !== "")
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
    const promotionData = await fs.readFile("./public/promotions.md", "utf8");
    this.promotions = promotionData
      .split("\n")
      .slice(1)
      .filter((line) => line.trim() !== "")
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

  getProductVariants(name) {
    const promotionalProduct = this.products.find(
      (product) => product.name === name && product.promotion !== "null"
    );
    const regularProduct = this.products.find(
      (product) => product.name === name && product.promotion === "null"
    );
    return { promotionalProduct, regularProduct };
  }

  async processOrder() {
    while (true) {
      try {
        const selectedItems = await InputView.readSelectedItems();
        this.receipt = new Receipt();
        let totalNonPromotionalPrice = 0;

        for (const { name, quantity } of selectedItems) {
          const { promotionalProduct, regularProduct } =
            this.getProductVariants(name);
          let remainingQuantity = quantity;
          let noPromotionQuantity = 0;

          if (
            (promotionalProduct?.quantity || 0) +
              (regularProduct?.quantity || 0) <
            quantity
          ) {
            throw new Error(
              "[ERROR] 재고 수량을 초과하여 구매할 수 없습니다. 다시 입력해 주세요."
            );
          }

          if (promotionalProduct) {
            ({ remainingQuantity, noPromotionQuantity } =
              await this.addPromotion(
                promotionalProduct,
                remainingQuantity,
                noPromotionQuantity
              ));
          }

          if (regularProduct) {
            const nonPromotionQuantity = await this.addNoPromotion(
              name,
              regularProduct,
              remainingQuantity,
              remainingQuantity < quantity,
              noPromotionQuantity
            );
            totalNonPromotionalPrice +=
              regularProduct.price * nonPromotionQuantity;
          }
        }

        await this.membershipCheck(totalNonPromotionalPrice);

        break;
      } catch (error) {
        Console.print(error.message);
      }
    }
  }

  async addPromotion(
    promotionalProduct,
    remainingQuantity,
    noPromotionQuantity
  ) {
    if (promotionalProduct && promotionalProduct.quantity > 0) {
      const applicablePromotion = this.promotions.find(
        (promotion) => promotion.name === promotionalProduct.promotion
      );

      let promoQuantity = Math.min(
        promotionalProduct.quantity,
        remainingQuantity
      );
      let freeItems = 0;

      if (
        applicablePromotion &&
        applicablePromotion.isApplicable(DateTimes.now())
      ) {
        const requiredQuantityForPromo = applicablePromotion.buy + 1;

        if (
          promoQuantity < promotionalProduct.quantity &&
          promoQuantity % requiredQuantityForPromo === applicablePromotion.buy
        ) {
          const wantAdditional = await InputView.askPromotionAddition(
            promotionalProduct.name
          );
          if (wantAdditional) {
            remainingQuantity += 1;
            promoQuantity += 1;
          }
        }

        freeItems = Math.floor(remainingQuantity / requiredQuantityForPromo);
      }

      noPromotionQuantity = promoQuantity % (applicablePromotion.buy + 1);
      this.receipt.addItem(promotionalProduct, promoQuantity);
      promotionalProduct.reduceQuantity(promoQuantity);
      remainingQuantity -= promoQuantity;

      const { discount, appliedPromotions } = this.calculatePromotionDiscount();
      this.receipt.applyPromotion(discount, appliedPromotions);
    }
    return { remainingQuantity, noPromotionQuantity };
  }

  async addNoPromotion(
    name,
    regularProduct,
    remainingQuantity,
    flag,
    noPromotionQuantity
  ) {
    if (remainingQuantity > 0 && regularProduct) {
      const nonPromotionQuantity = Math.min(
        regularProduct.quantity,
        remainingQuantity
      );

      const totalNonPromotionQuantity =
        noPromotionQuantity + nonPromotionQuantity;

      const proceedWithRegularPrice = await this.askPurchase(
        flag,
        name,
        totalNonPromotionQuantity
      );

      if (proceedWithRegularPrice) {
        this.receipt.addItem(regularProduct, nonPromotionQuantity);
        regularProduct.reduceQuantity(nonPromotionQuantity);
        return nonPromotionQuantity;
      } else {
        return 0;
      }
    }
    return 0;
  }

  async askPurchase(flag, name, totalNonPromotionQuantity) {
    if (flag) {
      const proceedWithRegularPrice = await InputView.askRegularPricePurchase(
        name,
        totalNonPromotionQuantity
      );
      return proceedWithRegularPrice;
    }
    return true;
  }

  async membershipCheck(totalNonPromotionalPrice) {
    const membership = await InputView.askMembership();
    if (membership) {
      const membershipDiscount = Math.min(totalNonPromotionalPrice * 0.3, 8000);
      this.receipt.applyMembershipDiscount(membershipDiscount);
    }
  }

  calculatePromotionDiscount() {
    let discount = 0;
    const appliedPromotions = [];
    this.receipt.items.forEach(({ product, quantity }) => {
      const applicablePromotion = this.promotions.find(
        (promotion) => promotion.name === product.promotion
      );

      if (
        applicablePromotion &&
        applicablePromotion.isApplicable(DateTimes.now())
      ) {
        const freeItems = Math.floor(quantity / (applicablePromotion.buy + 1));
        discount += freeItems * product.price;
        if (freeItems > 0) {
          appliedPromotions.push({ product, freeQuantity: freeItems });
        }
      }
    });
    return { discount, appliedPromotions };
  }

  getProductVariants(name) {
    const promotionalProduct = this.products.find(
      (product) => product.name === name && product.promotion !== "null"
    );
    const regularProduct = this.products.find(
      (product) => product.name === name && product.promotion === "null"
    );
    return { promotionalProduct, regularProduct };
  }
}

export default Store;
