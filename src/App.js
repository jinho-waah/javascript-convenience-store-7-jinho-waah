import { OutputView } from "./OutputView.js";
import { InputView } from "./InputView.js";
import Store from "./Store.js";
import { Console } from "@woowacourse/mission-utils";

class App {
  async run() {
    // try {
    const store = new Store();
    await store.loadProducts();
    await store.loadPromotions();

    while (true) {
      OutputView.welcome();
      OutputView.printProducts(store.products);

      await store.processOrder();
      OutputView.printReceipt(store.receipt);
      const isContinue = await InputView.askContinue();
      if (!isContinue) break;

      Console.print("[ERROR] 잘못된 입력입니다. 다시 입력해 주세요.");
    }
    // } catch (error) {
    //   throw error;
    // }
  }
}

export default App;
