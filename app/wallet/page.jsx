"use client";

import { useEffect, useState } from "react";
import Navbar from "../component/layout/navbar";
import Footer from "../component/layout/footer";
import { publicApi } from "../lib/publicApi";
import "./index.css"
export default function WalletPage() {
  const [wallet, setWallet] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const loadWallet = async () => {
    const data = await publicApi.getWallet();
    setWallet(data);
  };

  const loadTransactions = async () => {
    const data = await publicApi.getWalletTransactions();
    setTransactions(data);
  };

  useEffect(() => {
    loadWallet();
    loadTransactions();
  }, []);

  const addMoney = async () => {
    if (!amount || amount <= 0) return alert("Enter valid amount");

    setLoading(true);
    await publicApi.addMoneyToWallet(Number(amount));
    setAmount("");

    await loadWallet();
    await loadTransactions();
    setLoading(false);
  };

  if (!wallet) return <p>Loading wallet...</p>;

  return (
    <>

      <Navbar />

<div className="wallet-container">
  <h2 className="wallet-title">My Wallet</h2>

  {/* Balance */}
  <div className="wallet-balance">
    <span>Available Balance</span>
    <h3>₹{wallet.balance}</h3>
  </div>

  {/* Add Money */}
  <div className="add-money">
    <input
      type="number"
      placeholder="Enter amount"
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
    />
    <button onClick={addMoney} disabled={loading}>
      {loading ? "Adding..." : "Add Money"}
    </button>
  </div>

  {/* Transactions */}
  <h3 className="transactions-title">Transactions</h3>

  {transactions.length === 0 && (
    <p className="no-transactions">No transactions found</p>
  )}

  {transactions.map((t) => (
    <div key={t._id} className="transaction-item">
      <div className="transaction-left">
        <span className="transaction-type">
          {t.type.toUpperCase()}
        </span>
        <span className="transaction-ref">
          {t.reference}
        </span>
      </div>

      <span
        className={`transaction-amount ${
          t.type === "credit" ? "credit" : "debit"
        }`}
      >
        ₹{t.amount}
      </span>
    </div>
  ))}
</div>


      <Footer />
    </>
  );
}
