import { Text } from "react-native";

export const Alert = (props) => {
    if (props.alert) {
        return (
            <Text className={props.class}>{props.alert}</Text>
        );
    }
};