import ProductDetails from "../pages/ProductDetails";

const backendDomain = import.meta.env.VITE_API_BASE_URL;

const SummaryApi ={
  signUp: {
    url : `${backendDomain}/api/signup`,
    method : "POST",
  },
  signIn: {
    url: `${backendDomain}/api/signin`,
    method : "POST",
  },
  current_user: {
    url: `${backendDomain}/api/user-details`,
    method: "GET",
  },
  logout_user: {
    url: `${backendDomain}/api/userLogout`,
    method: "GET", // or "POST" depending on your backend
  },
  all_users: {
    url: `${backendDomain}/api/all-users`,
    method: "GET",
  },
  update_user: {
    url: `${backendDomain}/api/update-user`,  
    method: "POST",
  },
  upload_product: {
    url: `${backendDomain}/api/upload-product`,
    method: "POST",
  },
  allProducts: {
    url: `${backendDomain}/api/get-product`,
    method: 'GET'
  },
  updateProduct: {
    url: `${backendDomain}/api/update-product`,
    method: 'POST'
  },
  CategoryProduct: {
    url: `${backendDomain}/api/get-categoryProduct`,
    method: 'GET'
  },
  categoryWiseProduct : {
    url:  `${backendDomain}/api/category-product`,
    method : 'POST'
  },
  productDetails : {
    url : `${backendDomain}/api/product-details`,
    method : 'POST'
  },
  addTocartProduct : {
    url : `${backendDomain}/api/addToCart`,
    method : 'POST'
  },
  addTocartProductCount : {
    url : `${backendDomain}/api/countAddToCartProduct `,
    method : 'GET'
  },
  addToCartProductView : {
    url : `${backendDomain}/api/view-cart-product`,
    method : 'GET'
  },
  updateCartProduct : {
        url : `${backendDomain}/api/update-cart-product`,
        method : 'post'
  },
  deleteCartProduct : {
    url : `${backendDomain}/api/delete-cart-product`,
    method : 'post'
  },
  searchProduct : {
        url : `${backendDomain}/api/search`,
        method : 'get'
    },
    filterProduct : {
        url : `${backendDomain}/api/filter-product`,
        method : 'post'
    }
}

export default SummaryApi;