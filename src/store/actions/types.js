// MUITO CUIDADO COM OS NOMES DAS ACTIONS,
// POIS CADA ACTION DISPARA PARA TODOS OS REDUCERS,
// OU SEJA, SE TIVEREM TYPES IGUAIS,
// ELES PODEM SER "PEGOS" POR REDUCERS DIFERENTES
// AUTH
export const SIGNUP_SUCCESS = 'signup_success';
export const SIGNUP_FAILURE = 'signup_fail';
export const SIGNIN_SUCCESS = 'signin_success';
export const SIGNIN_FAILURE = 'signin_fail';
export const IS_LOADING_AUTH = 'is_loading_auth';
export const CEP_SUCCESS = 'cep_success';
export const CEP_FAILURE = 'cep_failure';
export const CLEAR_ADDRESS = 'clear_addres';
export const CEP_LOADING = 'cep_loading';
// PRODUCTS
export const CREATE_PRODUCT_SUCCESS = 'create_product_success';
export const CREATE_PRODUCT_FAILURE = 'create_product_failure';
export const FETCH_PRODUCTS_SUCCESS = 'fetch_products_success';
export const FETCH_PRODUCTS_FAILURE = 'fetch_products_failure';
export const DELETE_PRODUCT_SUCCESS = 'delete_product_success';
export const EDIT_PRODUCT_SUCCESS = 'edit_product_success';
export const IS_LOADING_FETCH_PRODUCTS = 'is_loading_fetch_products';
export const TOGGLE_PRODUCT = 'toggle_product';
export const REMOVE_PRODUCT_SUCCESS = 'remove_product_success';
export const REMOVE_PRODUCT_FAILURE = 'remove_product_failure';
