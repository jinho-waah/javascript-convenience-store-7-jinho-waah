import { Console } from "@woowacourse/mission-utils";

export const InputView = {
  async readSelectedItems() {
    const input = await Console.readLineAsync(
      "\n구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])\n"
    );

    const items = input.match(/\[(.*?)\]/g).map((item) => {
      const [name, quantity] = item.replace(/[\[\]]/g, "").split("-");
      return { name, quantity: parseInt(quantity) };
    });

    return items;
  },

  async askMembership() {
    const input = await Console.readLineAsync(
      "\n멤버십 할인을 받으시겠습니까? (Y/N)\n"
    );
    switch (input.toUpperCase()) {
      case "Y":
        return true;
      case "N":
        return false;
      default:
        throw new Error("[ERROR] 입력 값이 정확하지 않습니다.");
    }
  },

  async askPromotionAddition(productName, freeQuantity) {
    const input = await Console.readLineAsync(
      `현재 ${productName}은(는) ${freeQuantity}개를 무료로 더 받을 수 있습니다. 추가하시겠습니까? (Y/N)\n`
    );
    switch (input.toUpperCase()) {
      case "Y":
        return true;
      case "N":
        return false;
      default:
        throw new Error("입력 값이 정확하지 않습니다.");
    }
  },

  async askRegularPricePurchase(productName, nonDiscountedQuantity) {
    const input = await Console.readLineAsync(
      `현재 ${productName} ${nonDiscountedQuantity}개는 프로모션 할인이 적용되지 않습니다. 그래도 구매하시겠습니까? (Y/N)\n`
    );
    switch (input.toUpperCase()) {
      case "Y":
        return true;
      case "N":
        return false;
      default:
        throw new Error("입력 값이 정확하지 않습니다.");
    }
  },

  async askContinue() {
    const input = await Console.readLineAsync(
      "감사합니다. 구매하고 싶은 다른 상품이 있나요? (Y/N)\n"
    );
    switch (input.toUpperCase()) {
      case "Y":
        return true;
      case "N":
        return false;
      default:
        throw new Error("입력 값이 정확하지 않습니다.");
    }
  },
};
