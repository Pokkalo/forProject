import React, {useState, useRef,useEffect, } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Table, Alert, Container } from 'react-bootstrap'
//for sending data to firebase
import {doc, setDoc, getDocs,updateDoc, collection, onSnapshot} from 'firebase/firestore'

import { db } from '../firebase-config'
import { UserAuth } from '../data/UserData'

import { useShoppingCart } from '../data/CartContent'

import { productInput } from '../data/DummyData'
// For icons
import {AiOutlineShoppingCart, AiOutlineSync} from 'react-icons/ai'
import {FaRegTrashAlt} from 'react-icons/fa'

 

const Cart = () => {
  
  const inputValue = useRef(null)
  const [cartData, setCartData] = useState([])
  const [cartQua, setCartQua] = useState()
  const [state, setState] = useState(false)

  const userRef = collection(db, "user")
  const {user, logged} = UserAuth()

  const nav = useNavigate()

  const {getItemQuantity,increaseCartQuantity, decreaseCartQuantity, updateCartItems, setCartQuantity, removeFromCart, cartItems, cartQuantity } = useShoppingCart()


  useEffect(() => {
    setCartData([])
    
    
    const fetchData = async() =>{
    const data = await getDocs(userRef, user.uid)
    let cart = []
    data.forEach((doc) => {
      cart.push({...doc.data(), id: doc.id})
    })
    setCartData(cart.find((data)=> data.id === user.uid).shoppingCart)
    console.log(cart.find((data)=> data.id === user.uid).shoppingCart)
    console.log(cart)

    updateCartItems(cart.find((data)=> data.id === user.uid).shoppingCart.map((item) =>{
      const id = item.id
      return {id: id, quantity: 1}}
      ))
    setCartQua(cart.find((data)=> data.id === user.uid).shoppingCart.map((item) =>{
      const id = item.id
      return {id: id, quantity: 1}}
      ))
  }
    

    try {
      fetchData()
      console.log(cartQua)
    } catch (error) {
      console.log(error.message)
      // setState(false)
    } finally{
      
    }
  },[logged,])

  const removeItem = async(id) =>{
    const newData = cartData.filter((_, data) => data !== id)
    setCartData(newData)
    console.log(newData)
    try {
      await updateDoc(doc(collection(db, "user"), user.uid),{
        shoppingCart: newData
      })
  } catch (error) {
      console.log(error.message)
  } finally{
      console.log(user.uid)
      // nav('../cart')
  }
  console.log(cartData.map((data) => (data)))

  }

  const goPayment = () => {
    setState(true)
  }

  const testing = () =>{
    console.log(cartQua)
    console.log(cartQuantity)
  }

  const changeQuantity = (e, id) => {
    
    setCartQua(cartQua => {
      return cartQua.map(item => {
          if(item.id === id){
              console.log(e.target.value)
              return {...item, quantity: e.target.value*1}
          }else{
              return item
          }
      })
  })
  }

  return (
    <div className='d-flex flex-column justify-content-center align-items-center'>
      {logged? null:
      <div className='position-absolute --cart-entire_page_size w-100 h-100' style={{zIndex: "250"}}>
      <Alert variant="primary" 
        className='position-fixed --warnning_sign-styling col-10 col-sm-8 col-md-7 col-lg-6 ' style={{zIndex: "300"}}>
      <Container className='h-50 col'>
      <Alert.Heading className='text-center'>Please login your account</Alert.Heading>
      <p className='text-center'>
          The shopping cart is unable without login your account.
      </p>
      
      </Container>
      <hr className=''/>
      <Container className="col ">
          <div className='d-flex align-content-center justify-content-between my-0'>
              <Button className='w-50 align-content-center ml-1 mr-5' onClick={()=> {nav("../account")}}> Login </Button>
              
              <Button className='w-50 align-content-center mr-1' onClick={()=> {nav("../")}}> Back to Home </Button>                    
          </div>
      </Container>
        </Alert>
        </div>
        }

      {state? 
      
      <div class="--payment-body w-100 pt-3 ">
  
            <div class="--payment-card-body">
                <div class="--payment-row row">
                    <div class="col-md-6">
                        <div class="--payment-left border">
                            <div class="--payment-row">
                                <span class="--payment-header">Payment</span>
                                <div class="--payment-icons">
                                    <img src="https://img.icons8.com/color/48/000000/visa.png" />
                                    <img src="https://img.icons8.com/color/48/000000/mastercard-logo.png" />
                                    <img src="https://img.icons8.com/color/48/000000/maestro.png" />
                                </div>
                            </div>

                            <form className='--payment-form'>
                                <span>Cardholder's name:</span>
                                <input placeholder="your name" className='--payment-input'/>
                                    <span>Card Number:</span>
                                    <input placeholder="0125 6780 4567 9909" className='--payment-input'/>
                                        <div class="--payment-row">
                                            <div class="col-4"><span>Expiry date:</span>
                                                <input placeholder="YY/MM" className='--payment-input'/>
                                            </div>
                                            <div class="col-4"><span>CVV:</span>
                                                <input id="cvv" className='--payment-input'/>
                                            </div>
                                        </div>
                                <input type="checkbox" id="save_card" class="align-left" className='--payment-input'/>
                                <label for="save_card">Save card details to wallet</label>
                            </form>
                            <div class="col-md-5">
                            </div>
                        </div>
                                
                        </div>
                        <div className="col-md-6">
                        <div class="--payment-right border">
                            <div class="--payment-header">Order Summary</div>
                            <p>{cartQua.reduce((tot, item) => (tot + item.quantity),0)} item(s)</p>

                            {
                               cartData.map((item) => (
                                    <div key={item.id} class="--payment-row row p-2">
                                        <div class="col-4 align-self-center"><img class="img-fluid" src={item.images[0]} /></div>
                                        <div class="--payment-col-8 col-8">
                                            <div class="--payment-row"><b>$ {item.price}</b></div>
                                            <div class="--payment-row text-muted">{item.description}</div>
                                            <div class="--payment-row">Quantity: {cartItems.find((i) => i.id == item.id).quantity}</div>
                                        </div>
                                    </div>
                                ))
                            }
                            
                            <hr />
                            <div class="--payment-row --payment-lower row">
                                <div class="col text-left">Subtotal</div>
                                <div class="col text-right">$ {
                                  cartData.reduce((tot, item) =>{
                                  const qua = cartItems.find((i) => i.id == item.id).quantity
                                  return (tot + item.price*qua)}
                                  ,0)}
                                  </div>
                            </div>
                            <div class="--payment-row --payment-lower row">
                                <div class="col text-left">Delivery</div>
                                <div class="col text-right">Free</div>
                            </div>
                            <div class="--payment-row --payment-lower row">
                                <div class="col text-left"><b>Total to pay</b></div>
                                <div class="col text-right"><b>$ {
                                  cartData.reduce((tot, item) =>{
                                  const qua = cartItems.find((i) => i.id == item.id).quantity
                                  return (tot + item.price*qua)}
                                  ,0)}
                                  </b></div>
                            </div>
                            <div class="--payment-row --payment-lower">
                                <div class="col text-left"><a href="#"><u>Add promo code</u></a></div>
                            </div>
                            <button class="--payment-btn" onClick={testing}>Place order</button>
                            <p class="text-muted text-center">Complimentary Shipping & Returns</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      
      
      :
      
      <section class="pt-5 pb-5">
  <div class="container">
    <div class="row w-100">
        <div class="col-lg-12 col-md-12 col-12">
            <h3 class="display-5 mb-2 text-center">Confirming list</h3>
            { cartData.length>0? <p class="mb-5 text-center">
              <i class="text-info font-weight-bold">{cartData.length} </i>
              item(s) in your cart
            </p>:
            null
            }

               
    <Table responsive>
  <thead>
    <tr>


      <th className='' style={{width: "60%"}}>Product</th>
      <th className='' style={{width: "12%"}}>Price</th>
      <th className='' style={{width: "10%"}}>Quanlity</th>
      <th className='' style={{width: "16%"}}>#</th>
    </tr>
  </thead>

  <tbody>
    
      {cartData.map((data, index) => (
      <tr key={index}>

        <td data-th="Product">
        <div class="row">
            <div class="col-md-3 text-left">
                <img src={data.images[0]}  alt="" class="img-fluid d-none d-md-block rounded mb-2 shadow "/>
            </div>
            <div class="col-md-9 text-left mt-sm-2">
                <h4>{data.title}</h4>
                <p class="font-weight-light">{data.brand} &amp; {data.category}</p>
            </div>
            
        </div>
    </td>
    <td data-th="Price">{data.price}</td>
          <td data-th="Quantity">
              <input type="number" 
              class="form-control form-control-lg text-center"  
              placeholder='1'
              min={1}
              ref={inputValue}
              onChange={(e) => 
                {
                setCartQuantity(e, data.id)
                changeQuantity(e, data.id)
              }
              }
              />
          </td>
          <td class="actions" data-th="">
              <div class="text-right row">
                  <button class="btn btn-white border-0 bg-white btn-md mb-2 mx-1">
                    <AiOutlineSync/>
                  </button>
                  <button class="btn btn-white border-0 bg-white btn-md mb-2 mx-1"
                  onClick={()=> removeItem(index)}>
                    <FaRegTrashAlt/>
                  </button>
                  
              </div>
          </td>
    </tr>
      ))}
  </tbody>
</Table>
            
            <div class="float-right text-right">
                <h4>Subtotal:</h4>
                <h1>{cartData.reduce((tot, item) =>{
                  const qua = cartItems.find((i) => i.id == item.id).quantity
                  return (tot + item.price*qua)}
                  ,0)}</h1>
                <button onClick={testing}>Button</button>
            </div>
        </div>
    </div>
    <div class="row mt-4 d-flex align-items-center">
        <div class="col-sm-6 order-md-2 text-right">
            <a class="btn btn-primary mb-4 btn-lg pl-5 pr-5" onClick={goPayment}>Checkout</a>
        </div>
        <div class="col-sm-6 mb-3 mb-m-1 order-md-1 text-md-left">
            <a onClick={()=>{nav("/products")}}>
            <AiOutlineShoppingCart /> Continue Shopping</a>
        </div>
    </div>
</div>
</section>}

    </div>
  )
}


export default Cart