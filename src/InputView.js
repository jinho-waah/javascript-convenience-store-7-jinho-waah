import { Console } from "@woowacourse/mission-utils";

export const InputView = {
  async readSelectedItems() {
    while (true) {
      try {
        const input = await Console.readLineAsync(
          "\n구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])\n"
        );

        const list = input.split(",");
        if (list.length === 1 && (input.match(/\[/g) || []).length > 1) {
          throw new Error(
            "[ERROR] 올바르지 않은 형식으로 입력했습니다. 다시 입력해 주세요."
          );
        }

        const matches = input.match(/\[(.*?)\]/g);
        if (!matches) {
          throw new Error(
            "[ERROR] 올바르지 않은 형식으로 입력했습니다. 다시 입력해 주세요."
          );
        }

        const items = matches.map((item) => {
          const [name, quantity] = item.replace(/[\[\]]/g, "").split("-");
          if (!name || isNaN(parseInt(quantity))) {
            throw new Error(
              "[ERROR] 올바르지 않은 형식으로 입력했습니다. 다시 입력해 주세요."
            );
          }
          return { name, quantity: parseInt(quantity) };
        });
        return items;
      } catch (error) {
        Console.print(`\n${error.message}`);
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
            Console.print("[ERROR] 입력 값이 정확하지 않습니다.");
        }
      } catch (error) {
        Console.print("\n[ERROR] 입력 값이 정확하지 않습니다.");
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
            Console.print("\n[ERROR] 입력 값이 정확하지 않습니다.");
        }
      } catch (error) {
        Console.print("\n[ERROR] 입력 값이 정확하지 않습니다.");
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
            Console.print("\n[ERROR] 입력 값이 정확하지 않습니다.");
        }
      } catch (error) {
        Console.print("\n[ERROR] 입력 값이 정확하지 않습니다.");
      }
    }
  },

  async askContinue() {
    while (true) {
      const input = await Console.readLineAsync(
        "\n감사합니다. 구매하고 싶은 다른 상품이 있나요? (Y/N)\n"
      );
      switch (input) {
        case "Y":
          return true;
        case "N":
          return false;
        default:
          Console.print("\n[ERROR] 잘못된 입력입니다. 다시 입력해 주세요.");
      }
    }
  },
};
