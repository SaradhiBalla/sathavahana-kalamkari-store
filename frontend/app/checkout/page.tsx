export const metadata = { title: "Checkout" };

export default function CheckoutPage() {
  return <main className="container section"><span className="eyebrow">CHECKOUT</span><h1>Complete your order</h1><form className="checkout-form"><label>Email<input required type="email" name="email" /></label><label>Full name<input required name="name" /></label><label>Address<textarea required name="address" rows={4} /></label><button className="button" type="submit">Place order with Cash on Delivery</button></form></main>;
}
