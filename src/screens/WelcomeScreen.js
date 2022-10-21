import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { UserList } from '../components/UserList';

const SCREENHEIGHT = Dimensions.get('window').height;
const SCREENWIDTH = Dimensions.get('window').width;

const WelcomeScreen = () => {
    const navigation = useNavigation();

    return ( 
        <View>
            <UserList />
            <View style={styles.textContainer}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Signup')}>
                <Text style={[styles.text, {
                    fontSize: 18,
                    color: 'black',
                    top: 0,
                    alignSelf: 'center'
                }]}>
                    Get started
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={[styles.text, {
                    fontSize: 16,
                    color: 'white',
                    top: 90,
                    alignSelf: 'center'
                }]}>
                    Log in
                </Text>
            </TouchableOpacity>
        </View>
    </View>
    );

}

export default WelcomeScreen

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'white',
        width: '80%',
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 15,
        top: 70,
    },
    text: {
        fontFamily: 'Montserrat',
        fontSize: 38,
        color: 'white',
        alignSelf: 'center',
        top: 20
    },
    textContainer: {
        height: SCREENHEIGHT/2.8,
        width: SCREENWIDTH,
        backgroundColor: 'black',
        top: SCREENHEIGHT-(SCREENHEIGHT/2.8),
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
});