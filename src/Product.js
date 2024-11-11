class Product {
  constructor(name, price, quantity, promotion = null) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.promotion = promotion;
  }

  reduceQuantity(count) {
    if (this.quantity < count)
      throw new Error(
        "[ERROR] 재고 수량을 초과하여 구매할 수 없습니다. 다시 입력해 주세요."
      );
    this.quantity -= count;
  }

  increaseQuantity(count) {
    this.quantity += count;
  }
}

export default Product;
