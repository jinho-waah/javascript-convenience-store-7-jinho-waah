import { Console } from "@woowacourse/mission-utils";

export const InputView = {
  async readSelectedItems() {
    while (true) {
      try {
        const input = await Console.readLineAsync(
          "\n구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])\n"
        );
        console.log(input);
        const items = input.match(/\[(.*?)\]/g).map((item) => {
          const [name, quantity] = item.replace(/[\[\]]/g, "").split("-");
          if (!name || isNaN(parseInt(quantity))) {
            throw new Error(" 잘못된 형식입니다. 다시 입력해 주세요.");
          }
          return { name, quantity: parseInt(quantity) };
        });
        return items;
      } catch (error) {
        throw new Error(" 잘못된 형식입니다. 다시 입력해 주세요.");
      }
    }
  },

  async askMembership() {
    while (true) {
      try {
        const input = await Console.readLineAsync(
          "\n멤버십 할인을 받으시겠습니까? (Y/N)\n"
        );
        switch (input) {
          case "Y":
            return true;
          case "N":
            return false;
          default:
            throw new Error(" 입력 값이 정확하지 않습니다.");
        }
      } catch (error) {
        throw new Error(" 입력 값이 정확하지 않습니다.");
      }
    }
  },

  async askPromotionAddition(productName) {
    while (true) {
      try {
        const input = await Console.readLineAsync(
          `\n현재 ${productName}은(는) 1개를 무료로 더 받을 수 있습니다. 추가하시겠습니까? (Y/N)\n`
        );
        switch (input) {
          case "Y":
            return true;
          case "N":
            return false;
          default:
            throw new Error(" 입력 값이 정확하지 않습니다.");
        }
      } catch (error) {
        throw new Error(" 입력 값이 정확하지 않습니다.");
      }
    }
  },

  async askRegularPricePurchase(productName, nonDiscountedQuantity) {
    while (true) {
      try {
        const input = await Console.readLineAsync(
          `\n현재 ${productName} ${nonDiscountedQuantity}개는 프로모션 할인이 적용되지 않습니다. 그래도 구매하시겠습니까? (Y/N)\n`
        );
        switch (input) {
          case "Y":
            return true;
          case "N":
            return false;
          default:
            throw new Error(" 입력 값이 정확하지 않습니다.");
        }
      } catch (error) {
        throw new Error(" 입력 값이 정확하지 않습니다.");
      }
    }
  },

  async askContinue() {
    while (true) {
      try {
        const input = await Console.readLineAsync(
          "\n감사합니다. 구매하고 싶은 다른 상품이 있나요? (Y/N)\n"
        );
        switch (input) {
          case "Y":
            return true;
          case "N":
            return false;
          default:
            throw new Error(" 입력 값이 정확하지 않습니다.");
        }
      } catch (error) {
        throw new Error(" 입력 값이 정확하지 않습니다.");
      }
    }
  },

  async askRegularPricePurchase(productName, quantity) {
    while (true) {
      try {
        const input = await Console.readLineAsync(
          `\n현재 ${productName} ${quantity}개는 프로모션 할인이 적용되지 않습니다. 그래도 구매하시겠습니까? (Y/N)\n`
        );

        if (input === "Y") {
          return true;
        } else if (input === "N") {
          return false;
        } else {
          throw new Error(
            " 입력 값이 정확하지 않습니다. Y 또는 N을 입력해 주세요."
          );
        }
      } catch (error) {
        throw new Error(
          " 입력 값이 정확하지 않습니다. Y 또는 N을 입력해 주세요."
        );
      }
    }
  },
};
