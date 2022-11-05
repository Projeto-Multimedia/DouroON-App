import "react-native-gesture-handler";
import React, { useEffect, useContext } from "react";
import { AuthProvider, AuthContext } from "./src/context/AuthContext";
import AppNav from "./src/navigation/AppNav";

const App = () => {
	useEffect(() => {
		console.log("App mounted");
	}, []);

	return (
		<AuthProvider>
			<AppNav />
		</AuthProvider>
	);
};

export default App;
