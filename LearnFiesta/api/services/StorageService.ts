import AsyncStorage from "@react-native-async-storage/async-storage";

import * as SecureStore from "expo-secure-store";



const StorageService = {



    // Save auth token securely

    async saveToken(token: string) {

        await SecureStore.setItemAsync("token", token);

    },



    // Get token

    async getToken() {

        return await SecureStore.getItemAsync("token");

    },



    // Remove token

    async removeToken() {

        await SecureStore.deleteItemAsync("token");

    },



    // Save object

    async saveUser(user: any) {

        await AsyncStorage.setItem("user", JSON.stringify(user));

    },



    // Get object

    async getUser() {

        const data = await AsyncStorage.getItem("user");

        return data ? JSON.parse(data) : null;

    },



    // Remove user

    async removeUser() {

        await AsyncStorage.removeItem("user");

    },



    // Remove user

    async clearAsyncStorage() {

        await AsyncStorage.clear();

    }



};

export default StorageService;