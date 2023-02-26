import React from 'react'
import { useLocation } from 'react-router-dom'



function Payment() {
    const location = useLocation();

    const test = () =>{
        console.log(location.state.shoppingCart)
        console.log("quantity here: ", location.state.quantity)
    }


  return (
    <div className=" w-100">
        <img src="" alt="" />
        {

        }
        
        {/* <div class="--payment-body w-100 pt-3 ">
  
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
                            <p>{location.state.shoppingCart.length} item(s)</p>
                            <img src="./imgs/006_1.jpg" alt="" />

                            {
                                location.state.shoppingCart.map((item) => (
                                    <div key={item.id} class="--payment-row row item">
                                        <div class="col-4 align-self-center"><img class="img-fluid" src="./imgs/006_1.jpg" /></div>
                                        <div class="--payment-col-8">
                                            <div class="--payment-row"><b>$ {item.price}</b></div>
                                            <div class="--payment-row text-muted">Be Legandary Lipstick-Nude rose</div>
                                            <div class="--payment-row">Qty:1</div>
                                        </div>
                                    </div>
                                ))
                            }
                            
                            <div class="--payment-row row item">
                                <div class="col-4 align-self-center"><img class="img-fluid" src="https://i.imgur.com/Ew8NzKr.jpg" /></div>
                                <div class="--payment-col-8">
                                    <div class="--payment-row"><b>$ 19.99</b></div>
                                    <div class="--payment-row text-muted">Be Legandary Lipstick-Sheer Navy Cream</div>
                                    <div class="--payment-row">Qty:1</div>
                                </div>
                            </div>
                            <hr />
                            <div class="--payment-row --payment-lower row">
                                <div class="col text-left">Subtotal</div>
                                <div class="col text-right">$ 46.98</div>
                            </div>
                            <div class="--payment-row --payment-lower row">
                                <div class="col text-left">Delivery</div>
                                <div class="col text-right">Free</div>
                            </div>
                            <div class="--payment-row --payment-lower row">
                                <div class="col text-left"><b>Total to pay</b></div>
                                <div class="col text-right"><b>$ 46.98</b></div>
                            </div>
                            <div class="--payment-row --payment-lower">
                                <div class="col text-left"><a href="#"><u>Add promo code</u></a></div>
                            </div>
                            <button class="--payment-btn" onClick={test}>Place order</button>
                            <p class="text-muted text-center">Complimentary Shipping & Returns</p>
                        </div>
                    </div>
                </div>
            </div>
        </div> */}
    </div>)
}

export default Payment