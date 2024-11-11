import { Console } from "@woowacourse/mission-utils";

export const OutputView = {
  welcome() {
    Console.print("안녕하세요. W편의점입니다.");
    Console.print("현재 보유하고 있는 상품입니다.\n");
  },

  printProducts(products) {
    products.forEach((product) => {
      const promotion = this.checkPromotion(product.promotion);
      const formattedPrice = new Intl.NumberFormat().format(product.price);
      if (product.quantity !== 0) {
        Console.print(
          `- ${product.name} ${formattedPrice}원 ${product.quantity}개${promotion}`
        );
      } else if (product.quantity === 0) {
        Console.print(`- ${product.name} ${formattedPrice}원 재고 없음`);
      }
    });
  },

  printReceipt(receipt) {
    Console.print("\n==============W 편의점================");
    Console.print("상품명\t\t수량\t금액");

    receipt.items.forEach((item) => {
      this.itemPrint(item.product, item.quantity);
    });

    if (receipt.promotionDetails.length > 0) {
      Console.print("=============증      정===============");
      receipt.promotionDetails.forEach(({ productName, freeQuantity }) => {
        this.promotionPrint({ productName, freeQuantity });
      });
    }

    receipt.promotionDetails.forEach(({ productName, freeQuantity }) => {
      this.promotionPrint({ productName, freeQuantity });
    });

    Console.print("====================================");

    Console.print(`총구매액 ${receipt.total.toLocaleString()}`);
    Console.print(`행사할인 -${receipt.promotionDiscount.toLocaleString()}`);
    Console.print(`멤버십할인 -${receipt.membershipDiscount.toLocaleString()}`);
    Console.print(`내실돈 ${receipt.calculateTotal().toLocaleString()}`);
  },

  checkPromotion(promotion) {
    if (promotion !== "null") {
      return ` ${promotion}`;
    } else if (promotion === "null") {
      return "";
    }
  },

  itemPrint(product, quantity) {
    const productName = product.name.padEnd(8, " ");
    const quantityStr = String(quantity).padEnd(4, " ");
    const totalPrice = String(product.price * quantity).padStart(6, " ");
    Console.print(`${productName} ${quantityStr} ${totalPrice}`);
  },

  promotionPrint({ productName, freeQuantity }) {
    const productNamePadded = productName.padEnd(8, " ");
    const freeQuantityStr = String(freeQuantity).padStart(2, " ");
    Console.print(`${productNamePadded} ${freeQuantityStr}`);
  },
};
