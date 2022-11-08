import "react-native-gesture-handler";
import React, { useEffect, useContext } from "react";
import { AuthProvider, AuthContext } from "./src/context/AuthContext";
import AuthNavigation from "./src/navigation/AuthNavigation";

const App = () => {
	useEffect(() => {
		console.log("App mounted");
	}, []);

	return (
		<AuthProvider>
			<AuthNavigation />
		</AuthProvider>
	);
};

export default App;
