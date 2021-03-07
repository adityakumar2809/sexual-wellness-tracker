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

const SignUpScreen = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const getUserHash = async (email, phone, password) => {
        return 'gfsd67fd7w36f863f';
    }

    const addNewUser = async (email, phone, password) => {
        const user_hash = await getUserHash(
            email,
            phone,
            password
        )

        db.transaction((tx) => {
            tx.executeSql(
                `INSERT INTO USERS (email, phone, password, uniquehash) VALUES (?, ?, ?, ?)`,
                [email, phone, password, user_hash]
            );
            tx.executeSql('SELECT * FROM USERS', [], (_, { rows }) =>
                console.log(JSON.stringify(rows))
            );
        });
    }

    return (
        <View>
            <Text>
                Hello World! This is SignUp
            </Text>

            <Text>Email</Text>
            <TextInput
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.textInputStyle}
            />

            <Text>Phone</Text>
            <TextInput
                value={phone}
                onChangeText={setPhone}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="numeric"
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
                    console.log({ email, password, phone });
                    addNewUser(email, phone, password);
                }}
            />

            <Button
                title='SignIn Instead'
                onPress={() => navigation.navigate('SignIn')}
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

export default SignUpScreen;