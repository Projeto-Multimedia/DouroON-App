import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import apiEndUsers from "../services/api/end_user_api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [userToken, setUserToken] = useState(null);
	const [endUserInfo, setEndUserInfo] = useState(null);

	const login = (end_user) => {
		setIsLoading(true);
		apiEndUsers.post(end_user, "login").then((res) => {
			setEndUserInfo(res);
			setUserToken(res.token);
			console.log('User token: ' + res.token);
		});
		// setUserToken("asdf");
		// AsyncStorage.setItem("userToken", "asdf");
		setIsLoading(false);
	};

	const logout = () => {
		setIsLoading(true);
		setUserToken(null);
		AsyncStorage.removeItem("userToken");
		setIsLoading(false);
	};

	const isLoggedIn = async () => {
		try {
			setIsLoading(true);
			let userToken = await AsyncStorage.getItem("userToken");
			setUserToken(userToken);
			setIsLoading(false);
		} catch (e) {
			console.log("IsLoggedIn error: ", e);
		}
	};

	useEffect(() => {
		isLoggedIn();
	}, []);

	return (
		<AuthContext.Provider value={{ login, logout, isLoading, userToken }}>
			{children}
		</AuthContext.Provider>
	);
};
