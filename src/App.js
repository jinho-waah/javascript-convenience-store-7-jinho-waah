import { OutputView } from "./OutputView.js";
import { InputView } from "./InputView.js";
import Store from "./Store.js";

class App {
  async run() {
    try {
      const store = new Store();
      await store.loadProducts();
      await store.loadPromotions();

      OutputView.welcome();
      OutputView.printProducts(store.products);

      while (true) {
        // 구매할 상품
        const selectedItems = await InputView.readSelectedItems();
        // 멤버심 확인
        const membership = await InputView.askMembership();
        // store에 정보 넣기
        store.processOrder(selectedItems, membership);
        OutputView.printReceipt(store.receipt);
        const isContinue = await InputView.askContinue();
        if (!isContinue) break;
      }

      
    } catch (error) {
      throw new Error(`[ERROR]` + error.message);
    }
  }
}

export default App;
