import React, { useState } from 'react';
import {
    Text,
    View,
    TextInput,
    Button,
    StyleSheet
} from 'react-native'


const SignUpScreen = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View>
            <Text>
                Hello World! This is SignUpScreen
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
                onPress={() => console.log({ email, password, phone })}
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