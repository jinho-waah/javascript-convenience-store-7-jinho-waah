import { OutputView } from "./OutputView.js";
import { InputView } from "./InputView.js";
import Store from "./Store.js";

class App {
  async run() {
    try {
      const store = new Store();
      await store.loadProducts();
      await store.loadPromotions();

      while (true) {
        OutputView.welcome();
        OutputView.printProducts(store.products);
        const selectedItems = await InputView.readSelectedItems();

        await store.processOrder(selectedItems);
        OutputView.printReceipt(store.receipt);
        const isContinue = await InputView.askContinue();
        if (!isContinue) break;
      }

      
    } catch (error) {
      // throw new Error(`[ERROR]` + error.message);
      // Console.print(`[ERROR] ${error.message}`);
      throw error;
    }
  }
}

export default App;
