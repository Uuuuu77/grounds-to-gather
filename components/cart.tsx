'use client'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
export type Product = { id:string; name:string; slug:string; description:string; weightG:number; priceKsh:number; imageUrl:string; stock:number; origin:string; roast:string; process:string; flavorProfile:string[] }
type Item = Product & { qty:number }
type CartValue = { items:Item[]; count:number; total:number; add:(p:Product)=>void; remove:(id:string)=>void; setQty:(id:string,q:number)=>void }
const CartCtx = createContext<CartValue>({items:[],count:0,total:0,add:()=>{},remove:()=>{},setQty:()=>{}})
export function CartProvider({children}:{children:React.ReactNode}) { const [items,setItems]=useState<Item[]>([]); useEffect(()=>{try{setItems(JSON.parse(localStorage.getItem('gtg-cart')||'[]'))}catch{}},[]); useEffect(()=>{localStorage.setItem('gtg-cart',JSON.stringify(items))},[items]); const value=useMemo(()=>({items,count:items.reduce((a,i)=>a+i.qty,0),total:items.reduce((a,i)=>a+i.qty*i.priceKsh,0),add:(p:Product)=>setItems(x=>x.some(i=>i.id===p.id)?x.map(i=>i.id===p.id?{...i,qty:i.qty+1}:i):[...x,{...p,qty:1}]),remove:(id:string)=>setItems(x=>x.filter(i=>i.id!==id)),setQty:(id:string,q:number)=>setItems(x=>q<1?x.filter(i=>i.id!==id):x.map(i=>i.id===id?{...i,qty:q}:i))}),[items]); return <CartCtx.Provider value={value}>{children}</CartCtx.Provider> }
export const useCart=()=>useContext(CartCtx)
export const DELIVERY_LABEL='Delivery: Free'
