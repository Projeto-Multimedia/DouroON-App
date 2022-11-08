import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { AuthProvider } from "./src/context/AuthContext";
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
