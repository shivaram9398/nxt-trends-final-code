import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  removeCartItem = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(each => id !== each.id),
    }))
  }

  addCartItem = product => {
    const {cartList} = this.state
    const isProductIsAlreadyAdded = cartList.some(
      eachItem => eachItem.id === product.id,
    )
    if (isProductIsAlreadyAdded === true) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(each => {
          if (each.id === product.id) {
            return {
              id: each.id,
              availability: each.availability,
              description: each.description,
              imageUrl: each.imageUrl,
              price: each.price,
              quantity: each.quantity + product.quantity,
              rating: each.rating,
              title: each.title,
              totalReviews: each.totalReviews,
            }
          }
          return each
        }),
      }))
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }
  }

  incrementCartItemQuantity = id => {
    this.setState(prev => ({
      cartList: prev.cartList.map(each => {
        if (each.id === id) {
          return {
            id: each.id,
            availability: each.availability,
            description: each.description,
            imageUrl: each.imageUrl,
            price: each.price,
            quantity: each.quantity + 1,
            rating: each.rating,
            title: each.title,
            totalReviews: each.totalReviews,
          }
        }
        return each
      }),
    }))
  }

  decrementCartItemQuantity = id => {
    this.setState(prev => ({
      cartList: prev.cartList.map(each => {
        if (each.id === id) {
          return {
            id: each.id,
            availability: each.availability,
            description: each.description,
            imageUrl: each.imageUrl,
            price: each.price,
            quantity: each.quantity - 1,
            rating: each.rating,
            title: each.title,
            totalReviews: each.totalReviews,
          }
        }
        return each
      }),
    }))
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
