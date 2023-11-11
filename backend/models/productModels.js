class Product {
  constructor(id, name, price, description, rating, images, category, retailer, numOfReviews, amountInStock) {
    (this.id = id),
      (this.name = name),
      (this.price = price),
      (this.description = description),
      (this.rating = rating),
      (this.images = images),
      (this.category = category),
      (this.retailer = retailer),
      (this.numOfReviews = numOfReviews),
      (this.amountInStock = amountInStock);
  }
}

export default Product;

