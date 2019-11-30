import React, { useState } from 'react';
import { Text, Button, Input } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import Spacer from './Spacer';

const AuthForm = ({ headerText, errorMessage, submitText, onSubmit }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <>
            <Spacer>
                <Text h3>{headerText}</Text>
            </Spacer>
            <Input 
                label='Email' 
                value={email} 
                onChangeText={setEmail}
                autoCapitalize='none'
                autoCorrect={false} />
            <Spacer />
            <Input 
                label='Password' 
                secureTextEntry
                value={password} 
                onChangeText={setPassword}
                autoCapitalize='none'
                autoCorrect={false} />

            { errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null }
            <Spacer>
                <Button title={submitText} onPress={() => onSubmit({ email, password })} />
            </Spacer>
        </>
    );
};

const styles = StyleSheet.create({
    errorMessage: {
        color: 'red',
        fontSize: 16,
        marginHorizontal: 15,
        marginTop: 15
    },
});

export default AuthForm;