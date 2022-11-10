import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { AuthProvider } from "./src/context/AuthContext";
import Navigation from "./src/navigation/Navigation";

const App = () => {
	useEffect(() => {
		console.log("App mounted");
	}, []);

	return (
		<AuthProvider>
			<Navigation />
		</AuthProvider>
	);
};

export default App;
