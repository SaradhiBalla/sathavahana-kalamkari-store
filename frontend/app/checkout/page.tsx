"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "../../lib/api/client";
import { useAuth } from "../../components/auth/auth-provider";

export default function CheckoutPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [coupon, setCoupon] = useState("");
  const [couponMessage, setCouponMessage] = useState("");
  const [address, setAddress] = useState({ name: "", phone: "", line1: "", city: "", state: "", postalCode: "", country: "India" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => { if (!loading && !user) router.replace("/login?redirect=/checkout"); }, [loading, user, router]);
  async function validateCoupon() {
    try { const result = await apiRequest<{ discount: number }>(`/coupons/${encodeURIComponent(coupon)}/validate?subtotal=0`); setCouponMessage(`Coupon accepted. Discount: ${result.discount}`); } catch (e) { setCouponMessage(e instanceof Error ? e.message : "Coupon is not valid"); }
  }
  async function submit(event: React.FormEvent) {
    event.preventDefault(); setSubmitting(true); setError("");
    try { const order = await apiRequest<{ id: number }>("/orders", { method: "POST", body: { paymentMethod, idempotencyKey: crypto.randomUUID(), address, couponCode: coupon || undefined } }); router.push(`/account/orders?created=${order.id}`); }
    catch (e) { setError(e instanceof Error ? e.message : "Unable to place order. Please review your cart and try again."); }
    finally { setSubmitting(false); }
  }
  if (loading || !user) return <main className="container section"><p>Checking checkout access...</p></main>;
  return <main className="container section"><span className="eyebrow">CHECKOUT</span><h1>Complete your order</h1><div className="checkout-steps" aria-label="Checkout steps">Contact · Address · Shipping · Payment · Confirmation</div><form className="checkout-form" onSubmit={submit}><h2>Shipping address</h2>{Object.entries(address).map(([key, value]) => <label key={key}>{key === "line1" ? "Address" : key}<input required={key !== "country"} value={value} onChange={e => setAddress({ ...address, [key]: e.target.value })}/></label>)}<h2>Delivery and payment</h2><label>Delivery method<select><option>Standard shipping</option></select></label><label>Payment method<select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}><option value="COD">Cash on Delivery</option><option value="MOCK_SUCCESS">Mock payment (development only)</option></select></label><h2>Coupon</h2><div className="inline-form"><input value={coupon} onChange={e => setCoupon(e.target.value.toUpperCase())} placeholder="Coupon code"/><button className="button" type="button" onClick={validateCoupon} disabled={!coupon}>Apply</button></div>{couponMessage && <p>{couponMessage}</p>}{error && <p className="error">{error}</p>}<button className="button" disabled={submitting} type="submit">{submitting ? "Placing order..." : "Place order"}</button><Link href="/cart">Return to cart</Link></form></main>;
}
