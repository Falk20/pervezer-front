const serverIP = "http://www.pitstopcross.ru:81";

function addIP(url) {
  return `${serverIP}/api/${url}`;
}

export const AUTH = addIP("Auth/authorization");
export const GET_CLIENTS = addIP("Client/get-clients");
export const GET_CLIENT_SETTINGS = addIP("Client/get-client-settings");
export const GET_CLIENT_DETAILS = addIP("Client/get-client-details");
export const UPDATE_CLIENT_SETTING = addIP("Client/update-client");
export const GET_PROFILES = addIP("Profile/get-profiles");
export const GET_CLIENT_IPS = addIP("Client/get-client-ips");
export const CREATE_IP = addIP("IP/create-ip");
export const REMOVE_IP = addIP("IP/remove-ip");
export const GET_CLIENT_ADDRESSES = addIP("Client/get-client-addresses");
export const CREATE_ADDRESS = addIP("Address/create-address");
export const REMOVE_ADDRESS = addIP("Address/remove-address");
export const GET_CLIENT_OFFICES = addIP("Client/get-client-offices");
export const CREATE_OFFICE = addIP("Office/create-office");
export const REMOVE_OFFICE = addIP("Office/remove-office");
export const GET_CLIENT_REQUISITES = addIP("Client/get-client-rekvizits");
export const CREATE_REQUISITE = addIP("Rekvizit/create-rekvizit");
export const REMOVE_REQUISITE = addIP("Rekvizit/remove-rekvizit");
export const GET_CLIENT_CARS = addIP("Client/get-client-cars");
export const CREATE_CAR = addIP("Car/create-car");
export const REMOVE_CAR = addIP("Car/remove-car");
export const UPDATE_CAR = addIP("Car/update-car");
