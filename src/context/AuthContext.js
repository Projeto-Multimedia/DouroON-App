import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import apiEndUsers from "../services/api/end_user_api";
import apiProfileAccounts from "../services/api/user_profile_api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [alert, setAlert] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [endUserToken, setEndUserToken] = useState(null);
  const [endUserInfo, setEndUserInfo] = useState(null);

  const login = (end_user) => {
    setIsLoading(true);

    apiEndUsers.post(end_user, "login").then((res) => {
      let endUserInfo = res.data;

      if (res.status !== 200) {
        setAlert("Error: " + res.message);
      } else {
        setEndUserInfo(endUserInfo);
        setEndUserToken(endUserInfo.token);

        AsyncStorage.setItem("endUserToken", endUserInfo.token);
        AsyncStorage.setItem("endUserInfo", JSON.stringify(endUserInfo));
      }
    });

    setAlert("");
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

  const updateProfile = (end_user) => {
    setIsLoading(true);
    console.log("end_user: ", end_user);
    apiEndUsers.post(end_user, `${endUserInfo.id}/edit`).then((res) => {
      let endUserInfo = res.data;
      if (res.status !== "success") {
        setAlert("Error: " + res.message);
      } else {
        console.log("Success:", res.status + " - " + res.message);
        setAlert("");
        setEndUserInfo(endUserInfo);
        AsyncStorage.setItem("endUserInfo", JSON.stringify(endUserInfo));
      }
    });
    setIsLoading(false);
  };

  const uploadImage = async (image) => {
    await fetch(`http://10.0.2.2:8000/api/end-users/${endUserInfo.id}/upload`, {
      method: "POST",
      headers: {
        "content-type": "multipart/form-data",
      },
      body: image,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("Success:", res.status + " - " + res.message);
        setEndUserInfo(res.data);
        AsyncStorage.setItem("endUserInfo", JSON.stringify(res.data));
      })
      .catch((err) => console.log("err: ", err));
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        setAlert,
        alert,
        updateProfile,
        isLoading,
        endUserToken,
        endUserInfo,
        uploadImage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
