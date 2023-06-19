export const handelDeleteItem = (i, mode) => {
    
  const data = JSON.parse(localStorage.getItem(mode));
  data[i].name = "";
  localStorage.setItem(mode, JSON.stringify(data));

};
export const updateProduct = (value, mode, i) => {

  const data = JSON.parse(localStorage.getItem(mode));
  data[i].name = value.product_name;
  data[i].price = value.product_price;
  data[i].description = value.description;
  localStorage.setItem(mode, JSON.stringify(data));
  return;

}
