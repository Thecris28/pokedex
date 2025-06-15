
import CartCounter from "@/cart/components/CartCounter"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Counter Page",
  description: "Contador de productos en el carrito"
}

export default function Counterpage() {



  return (
    <div className="flex flex-col items-center justify-center h-full">
      <span>Productos en el carrito</span>
      <CartCounter/>
     
    </div>
  )
}
