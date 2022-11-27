import { Text, TouchableOpacity } from "react-native";

export const Button = (props) => {
  return (
    <TouchableOpacity
      className={`${props.color} rounded-lg px-2 py-2 mt-6 mx-20`}
      onPress={props.onPress}
    >
      <Text
        className={`${props.textWeight} ${props.textColor} text-center text-xl`}
      >
        {props.message}
      </Text>
    </TouchableOpacity>
  );
};
