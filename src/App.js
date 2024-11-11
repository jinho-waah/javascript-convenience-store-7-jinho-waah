import { OutputView } from "./OutputView.js";
import { InputView } from "./InputView.js";
import Store from "./Store.js";

class App {
  async run() {
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
    }
  }
}

export default App;
