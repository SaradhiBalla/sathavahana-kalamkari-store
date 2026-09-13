export const metadata = { title: "Register" };

export default function RegisterPage() {
  return <main className="container section"><span className="eyebrow">JOIN THE HOUSE</span><h1>Create your account</h1><form className="checkout-form"><label>Name<input required /></label><label>Email<input required type="email" /></label><label>Password<input required minLength={8} type="password" /></label><button className="button" type="submit">Create account</button></form></main>;
}
