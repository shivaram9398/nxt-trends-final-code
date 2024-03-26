import CartContext from '../../context/CartContext'
import './index.css'

const Cartsummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let t = 0
      const total = cartList.map(each => (t += each.price * each.quantity))
      console.log(t)
      return (
        <div className="container-summary">
          <h1 className="h1">
            Order Total: <span>{t}/-</span>
          </h1>
          <p>{cartList.length} Items in cart</p>
          <button type="button" className="checkout">
            checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default Cartsummary
