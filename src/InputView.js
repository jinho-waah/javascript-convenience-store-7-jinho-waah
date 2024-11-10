import { Console } from "@woowacourse/mission-utils";

export const InputView = {
  async readSelectedItems() {
    const input = await Console.readLineAsync(
      "구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])"
    );

    const items = input.match(/\[(.*?)\]/g).map((item) => {
      const [name, quantity] = item.replace(/[\[\]]/g, "").split("-");
      return { name, quantity: parseInt(quantity) };
    });
    return items;
  },

  async askContinue() {
    const input = await Console.readLineAsync(
      "추가 구매를 원하시면 'Y'를 입력하세요 (종료하려면 'N'):"
    );
    return input.toUpperCase() === "Y";
  },
};
