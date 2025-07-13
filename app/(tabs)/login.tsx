import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import * as Keychain from 'react-native-keychain';

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Load saved credentials on component mount
    useEffect(() => {
        const loadCredentials = async () => {
            try {
                const credentials = await Keychain.getGenericPassword();
                if (credentials) {
                    setUsername(credentials.username);
                    setPassword(credentials.password);
                    console.log('Loaded saved credentials');
                }
            } catch (error) {
                console.error("Error loading credentials:", error);
            }
        };

        loadCredentials();
    }, []);

    const handleLogin = async () => {
        if (username && password) {
            try {
                // Save credentials securely
                await Keychain.setGenericPassword(username, password);
                Alert.alert('Login Successful', `Welcome, ${username}!`);
            } catch (error) {
                Alert.alert('Error', 'Failed to save credentials.');
                console.error('Keychain error:', error);
            }
        } else {
            Alert.alert('Error', 'Please enter both username and password.');
        }
    };

    const handleLogout = async () => {
        try {
            await Keychain.resetGenericPassword();
            setUsername('');
            setPassword('');
            Alert.alert('Logged Out', 'Credentials cleared.');
        } catch (error) {
            console.error('Error clearing credentials:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                autoCapitalize="none"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Button title="Login" onPress={handleLogin} />
            <View style={{ marginTop: 16 }}>
                <Button title="Logout (Clear Saved)" onPress={handleLogout} color="red" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 24,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 32,
        textAlign: 'center',
    },
    input: {
        height: 48,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 16,
        paddingHorizontal: 12,
        fontSize: 16,
    },
});

export default LoginScreen;
