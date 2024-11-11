class Receipt {
  constructor() {
    this.items = [];
    this.total = 0;
    this.promotionDiscount = 0;
    this.membershipDiscount = 0;
    this.promotionDetails = [];
  }

  addItem(product, quantity) {
    const existingItem = this.items.find(
      (item) => item.product.name === product.name
    );
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({ product, quantity });
    }
    this.total += product.price * quantity;
  }

  applyPromotion(promotionDiscount, appliedPromotions) {
    this.promotionDiscount += promotionDiscount;

    appliedPromotions.forEach(({ product, freeQuantity }) => {
      const existingPromo = this.promotionDetails.find(
        (detail) => detail.productName === product.name
      );
      if (existingPromo) {
        existingPromo.freeQuantity = freeQuantity;
      } else {
        this.addPromotionDetail(product, freeQuantity);
      }
    });
  }

  addPromotionDetail(product, freeQuantity) {
    this.promotionDetails.push({ productName: product.name, freeQuantity });
  }

  applyMembershipDiscount(membershipDiscount) {
    this.membershipDiscount = membershipDiscount;
  }

  calculateTotal() {
    return this.total - this.promotionDiscount - this.membershipDiscount;
  }
  getPromotionDetails() {
    return this.promotionDetails;
  }
}

export default Receipt;
