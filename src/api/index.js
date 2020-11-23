const serverIP = "http://pitstopshop.site:81";

function addIP(url) {
  return `${serverIP}/api/${url}`;
}

export const AUTH = addIP("Auth/authorization");
export const GET_CLIENTS = addIP("Client/get-clients");
export const CREATE_CLIENT = addIP("Client/create-client");
export const GET_VENDORS = addIP("Vendor/get-vendors");
export const CREATE_VENDOR = addIP("Vendor/create-vendor");
export const GET_MANAGERS = addIP("Manager/get-managers");
export const GET_CLIENT_DETAILS = addIP("Client/get-client-details");
export const UPDATE_CLIENT_SETTING = addIP("Client/update-client");
export const GET_VENDOR_DETAILS = addIP("Vendor/get-vendor-details");
export const UPDATE_VENDOR_SETTING = addIP("Vendor/update-vendor");
export const GET_PROFILES = addIP("Profile/get-profiles");
export const CREATE_PROFILE = addIP("Profile/create-profile");
export const REMOVE_PROFILE = addIP("Profile/remove-profile");
export const GET_PROFILES_TO_UPDATE = addIP("Profile/get-profiles-to-update");
export const GET_CLIENT_IPS = addIP("Client/get-client-ips");
export const CREATE_IP = addIP("IP/create-ip");
export const REMOVE_IP = addIP("IP/remove-ip");
export const GET_CLIENT_ADDRESSES = addIP("Client/get-client-addresses");
export const CREATE_ADDRESS = addIP("Address/create-address");
export const REMOVE_ADDRESS = addIP("Address/remove-address");
export const GET_OFFICES = addIP("Office/get-offices");
export const GET_GUESTS = addIP("Guest/get-guests");
export const GET_CLIENT_OFFICES = addIP("Client/get-client-offices");
export const CREATE_OFFICE = addIP("Office/create-office");
export const REMOVE_OFFICE = addIP("Office/remove-office");
export const GET_CLIENT_REQUISITES = addIP("Client/get-client-rekvizits");
export const CREATE_UR_REQUISITE = addIP("Rekvizit/create-ur-rekvizit");
export const CREATE_FIZ_REQUISITE = addIP("Rekvizit/create-fiz-rekvizit");
export const REMOVE_REQUISITE = addIP("Rekvizit/remove-rekvizit");
export const GET_CLIENT_CARS = addIP("Client/get-client-cars");
export const CREATE_CAR = addIP("Car/create-car");
export const REMOVE_CAR = addIP("Car/remove-car");
export const UPDATE_CAR = addIP("Car/update-car");
export const GET_CLIENT_EMPLOYEES = addIP("Client/get-client-employees");
export const CREATE_EMPLOYEE = addIP("Employee/create-employee");
export const REMOVE_EMPLOYEE = addIP("Employee/remove-employee");

export const GET_CLIENT_CART = addIP("Client/get-client-cart");
export const REMOVE_CART_ITEM = addIP("Cart/remove-cart-item");
export const CREATE_CART_ITEM = addIP("Cart/create-cart-item");
export const GET_PRODUCTS = addIP("Product/get-products");
export const CREATE_CONTRACT = addIP("Contract/create-contract");

export const CREATE_DISCOUNT = addIP("Discount/create-discount");
export const REMOVE_DISCOUNT = addIP("Discount/remove-discount");

export const GET_PAYMENTS = addIP("Payment/get-all-payments");

export const GET_CLIENT_ORDERS = addIP("Client/get-client-orders");
export const GET_ORDERS = addIP("Order/get-orders");

export const GET_PRICELIST = addIP("Vendor/get-vendor-priselist");
export const GET_WAREHOUSES = addIP("Vendor/get-vendor-wareouses");
export const CREATE_WAREHOUSE = addIP("Vendor/create-wareouse");
