const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  // calculate items price
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  // shipping price
  state.shippingPrice = addDecimals(state.itemsPrice >= 100 ? 0 : 10);
  // tax price
  state.taxPrice = addDecimals(state.itemsPrice * 0.15);
  //total price
  state.totalPrice = addDecimals(
    state.itemsPrice + state.shippingPrice + state.taxPrice
  );

  //save on local storage
  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
