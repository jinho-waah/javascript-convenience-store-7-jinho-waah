import { Console } from "@woowacourse/mission-utils";

export const OutputView = {
  welcome() {
    Console.print("안녕하세요. W편의점입니다.");
    Console.print("현재 보유하고 있는 상품입니다.\n");
  },

  printProducts(products) {
    products.forEach((product) => {
      const promotion = this.checkPromotion(product.promotion);
      Console.print(
        `- ${product.name} ${product.price}원 ${product.quantity}개${promotion}`
      );
    });
  },

  printReceipt(receipt) {
    Console.print("\n==============W 편의점================");
    Console.print("상품명\t\t수량\t금액");
    receipt.items.forEach((item) => {
      this.itemPrint(item.product, item.quantity);
    });
    Console.print("=============증      정===============");
    receipt.promotionDetails.map(({ productName, freeQuantity }) => {
      this.promotionPrint({ productName, freeQuantity });
    });
    Console.print("====================================");
    Console.print(`총구매액: \t\t${receipt.total}`);
    Console.print(`행사할인: \t\t-${receipt.promotionDiscount}`);
    Console.print(`멤버십할인: \t\t-${receipt.membershipDiscount}`);
    Console.print(`내실돈: \t\t${receipt.calculateTotal()}`);
  },

  checkPromotion(promotion) {
    if (promotion !== "null") {
      return promotion;
    } else if (promotion === "null") {
      return "";
    }
  },

  itemPrint(product, quantity) {
    if (product.name.length < 3) {
      Console.print(
        `${product.name} \t\t${quantity} \t${product.price * quantity}`
      );
    } else {
      Console.print(
        `${product.name} \t${quantity} \t${product.price * quantity}`
      );
    }
  },

  promotionPrint({ productName, freeQuantity }) {
    if (productName.length < 3) {
      Console.print(`${productName} \t\t${freeQuantity}`);
    } else {
      Console.print(`${productName} \t${freeQuantity} `);
    }
  },
};
