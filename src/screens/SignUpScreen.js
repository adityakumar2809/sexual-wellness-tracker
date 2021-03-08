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

    const dropTable = () => {
        db.transaction((tx) => {
            tx.executeSql(
                `DELETE FROM users`,
                []
            );
        });
        console.log('Database Cleaned!!');
    }

    const getUniqueHash = async (email, phone, password) => {
        var length = 20;
        var unique_hash = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            unique_hash += characters.charAt(
                Math.floor(Math.random() * charactersLength)
            );
        }
        return unique_hash;
    }

    const addNewUser = async (email, phone, password) => {
        
        // API LOGIC TO BE IMPLEMENTED HERE
        const unique_hash = await getUniqueHash(
            email,
            phone,
            password
        )

        db.transaction((tx) => {
            tx.executeSql(
                `INSERT INTO users (email, phone, password, unique_hash) VALUES (?, ?, ?, ?)`,
                [email, phone, password, unique_hash]
            );
            tx.executeSql('SELECT * FROM users', [], (_, { rows }) =>
                console.log(JSON.stringify(rows))
            );
        });

        return unique_hash;
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
                onPress={async () => { 
                    console.log({ email, password, phone });
                    const unique_hash = await addNewUser(email, phone, password);
                    navigation.navigate('EditProfile', { unique_hash: unique_hash });
                }}
            />

            <Button
                title='SignIn Instead'
                onPress={() => navigation.navigate('SignIn')}
            />

            <Button
                title='Clear Database'
                onPress={() => {
                    dropTable();
                }}
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