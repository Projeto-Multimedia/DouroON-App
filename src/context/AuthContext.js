import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import apiEndUsers from "../services/api/end_user_api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [endUserToken, setEndUserToken] = useState(null);
	const [endUserInfo, setEndUserInfo] = useState(null);

	const login = (end_user) => {
		setIsLoading(true);
		apiEndUsers.post(end_user, "login").then((res) => {
			let endUserInfo = res.data;

			if (res.status !== 200) {
				console.log("Error:", res.status + " - " + res.message);
			}
			else {
				setEndUserInfo(endUserInfo);
				setEndUserToken(endUserInfo.token);
				AsyncStorage.setItem("endUserToken", endUserInfo.token);
				AsyncStorage.setItem("endUserInfo", JSON.stringify(endUserInfo));
			}
		});

		setIsLoading(false);
	};

	const logout = () => {
		setIsLoading(true);
		setEndUserToken(null);
		AsyncStorage.removeItem("endUserInfo");
		AsyncStorage.removeItem("endUserToken");
		setIsLoading(false);
		console.log("Logged out");
	};

	const isLoggedIn = async () => {
		try {
			setIsLoading(true);
			let endUserInfo = await AsyncStorage.getItem("endUserInfo");
			let endUserToken = await AsyncStorage.getItem("endUserToken");

			endUserInfo = JSON.parse(endUserInfo);

			if (endUserInfo) {
				setEndUserToken(endUserToken);
				setEndUserInfo(endUserInfo);
				console.log("Logged in");
			}
			setIsLoading(false);

		} catch (e) {
			console.log("IsLoggedIn error: ", e);
		}
	};

	useEffect(() => {
		isLoggedIn();
	}, []);

	return (
		<AuthContext.Provider value={{ login, logout, isLoading, endUserToken, endUserInfo }}>
			{children}
		</AuthContext.Provider>
	);
};
