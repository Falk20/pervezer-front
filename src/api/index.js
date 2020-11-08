const serverIP = "http://94.242.58.230:81";

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
