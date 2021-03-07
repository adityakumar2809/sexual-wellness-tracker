import React, { useState } from 'react';
import {
    Text,
    View,
    TextInput,
    Button,
    StyleSheet
} from 'react-native';
import * as SQLite from 'expo-sqlite';


const db = SQLite.openDatabase('db.db');

const SignInScreen = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const authenticateUser = (email, password) => {
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM USERS WHERE email = ? AND password = ?',
                [email, password],
                (_, { rows }) => {
                    const user_hash = rows['_array'][0]['UNIQUEHASH'];
                    navigation.navigate('EditProfile', { user_hash: user_hash })
                }
            );
        });
    }

    return (
        <View>
            <Text>
                Hello World! This is SignInScreen
            </Text>

            <Text>Email</Text>
            <TextInput
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.textInputStyle}
            />

            <Text>Password</Text>
            <TextInput
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.textInputStyle}
            />

            <Button
                title='Submit'
                onPress={() => {
                    console.log({ email, password });
                    authenticateUser(email, password);
                }}
            />

            <Button
                title='SignUp Instead'
                onPress={() => navigation.navigate('SignUp')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    textInputStyle: {
        borderColor: '#000000',
        borderWidth: 2,
        margin: 10
    }
});

export default SignInScreen;