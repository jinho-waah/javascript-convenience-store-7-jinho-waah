import { Console } from "@woowacourse/mission-utils";

export const OutputView = {
  welcome() {
    Console.print("안녕하세요. W편의점입니다.");
    Console.print("현재 보유하고 있는 상품입니다.\n");
  },

  printProducts(products) {
    products.forEach((product) => {
      const promotion = checkPromotion(product.promotion);
      Console.print(
        `- ${product.name} ${product.price}원 ${product.quantity}개${promotion}`
      );
    });
  },

  printReceipt(receipt) {
    Console.print("============== W 편의점 ================");
    receipt.items.forEach(({ product, quantity }) => {
      Console.print(
        `${product.name} \t${quantity} \t${product.price * quantity}`
      );
    });
    Console.print(`총구매액: \t${receipt.total}`);
    Console.print(`행사할인: \t-${receipt.promotionDiscount}`);
    Console.print(`멤버십할인: \t-${receipt.membershipDiscount}`);
    Console.print(`내실돈: \t${receipt.calculateTotal()}`);
    Console.print("========================================");
  },
};

const checkPromotion = (promotion) => {
  if (promotion !== "null") {
    return promotion;
  } else if (promotion === "null") {
    return "";
  }
};
