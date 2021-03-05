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

const editProfileDetails = (firstName, lastName, dob, user_hash) => {
    db.transaction((tx) => {
        tx.executeSql(
            `UPDATE USERS SET first_name = ?, last_name = ?, dob = ? WHERE UNIQUEHASH = ?`,
            [firstName, lastName, dob, user_hash]
        );
        tx.executeSql('SELECT * FROM USERS', [], (_, { rows }) =>
            console.log(JSON.stringify(rows))
        );
    });
}


const EditProfileScreen = ({navigation}) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState('');

    const user_hash = navigation.getParam('user_hash');

    return (
        <View>
            <Text>
                Hello World! This is EditProfileScreen {user_hash}
            </Text>
            
            <Text>First Name</Text>
            <TextInput
                value={firstName}
                onChangeText={setFirstName}
                autoCapitalize="words"
                autoCorrect={false}
                style={styles.textInputStyle}
            />
            
            <Text>Last Name</Text>
            <TextInput
                value={lastName}
                onChangeText={setLastName}
                autoCapitalize="words"
                autoCorrect={false}
                style={styles.textInputStyle}
            />
            
            <Text>DOB</Text>
            <TextInput
                value={dob}
                onChangeText={setDob}
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.textInputStyle}
            />

            <Button
                title='Submit'
                onPress={ async () => { 
                    console.log({ firstName, lastName, dob });
                    await editProfileDetails(firstName, lastName, dob, user_hash);
                    navigation.navigate('mainFlow');
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

export default EditProfileScreen;