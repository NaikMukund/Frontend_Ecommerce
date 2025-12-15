"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { publicApi } from "../../lib/publicApi";
import OrderTrack from "../../component/order/OrderTrack";
import Navbar from "../../component/layout/navbar";
import Footer from "../../component/layout/footer";

export default function OrderDetails() {
  const { id } = useParams(); // ✅ correct
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (!id) return;

    async function loadOrder() {
      const data = await publicApi.getOrderById(id);
      setOrder(data);
    }

    loadOrder();
  }, [id]);

  if (!order) return <p>Loading order...</p>;

  return (
      <>
      <Navbar></Navbar>
    <OrderTrack order={order} />
    <Footer></Footer>
  </>

  )

;
}
