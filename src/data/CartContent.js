import { createContext, ReactNode, useContext, useState } from "react"
import { productInput } from "./DummyData"

const ShoppingCartContext = createContext({})


export function useShoppingCart(){
    return useContext(ShoppingCartContext)
}
export function ShoppingCartProvider({children}){
    const [isOpen, setIsOpen] = useState(false)

    const [cartItems, setCartItems] = useState([])

    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)



    function getItemQuantity(id){
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    function increaseCartQuantity(id){
        setCartItems(currItems => {
            if(currItems.find(item => item.id === id) == null){
                return [...currItems, {id, quantity: 1}]
            } else{
                return currItems.map(item => {
                    if(item.id === id){
                        return {...item, quantity: item.quantity + 1}
                    }else{
                        return item
                    }
                })
            }
        })
    }

    function decreaseCartQuantity(id){
        setCartItems(currItems => {
            if(currItems.find(item => item.id === id)?.quantity === 1){
                return currItems.filter(item => item.id !== id)
            } else{
                return currItems.map(item => {
                    if(item.id === id){
                        return {...item, quantity: item.quantity - 1}
                    }else{
                        return item
                    }
                })
            }
        })
    }
    function updateCartItems(value){
        setCartItems(value);
    }
    function setCartQuantity(e, id){
        setCartItems(currItems => {
            return currItems.map(item => {
                if(item.id === id){
                    console.log(e.target.value)
                    return {...item, quantity: e.target.value}
                }else{
                    return item
                }
            })
        })
    }

    function removeFromCart(id){
        setCartItems(currItems => {
            return currItems.filter(item => item.id !== id)
        })
    }

    const cartQuantity = cartItems.reduce(
        (quantity, item) => (item.quantity + quantity*1), 0
    )
    return (
        <ShoppingCartContext.Provider 
        value={{ getItemQuantity, increaseCartQuantity, decreaseCartQuantity, setCartQuantity, updateCartItems, removeFromCart, 
        openCart, closeCart,
        cartItems, cartQuantity}}>
            {children}
        </ShoppingCartContext.Provider>
    )
}