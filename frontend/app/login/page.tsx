export const metadata = { title: "Login" };

export default function LoginPage() {
  return <main className="container section"><span className="eyebrow">YOUR ACCOUNT</span><h1>Welcome back</h1><form className="checkout-form"><label>Email<input required type="email" /></label><label>Password<input required type="password" /></label><button className="button" type="submit">Sign in</button></form></main>;
}
