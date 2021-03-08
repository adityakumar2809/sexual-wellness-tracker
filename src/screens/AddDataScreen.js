import React, { useState } from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    TextInput
} from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db.db');


const AddDataScreen = () => {

    const [periodStartDate, setPeriodStartDate] = useState(null)
    const [periodEndDate, setPeriodEndDate] = useState(null)

    const dropTable = (table_name) => {
        db.transaction((tx) => {
            tx.executeSql(
                `DELETE FROM ${table_name}`,
                []
            );
        });
        console.log('Database Cleaned!!');
    }

    const addPeriodDates = (periodStartDate, periodEndDate) => {
        db.transaction((tx) => {
            tx.executeSql(
                `INSERT INTO periods (start_date, end_date) VALUES (?, ?)`,
                [periodStartDate, periodEndDate]
            );
            tx.executeSql('SELECT * FROM periods', [], (_, { rows }) =>
                console.log(JSON.stringify(rows))
            );
        });
    }

    return (
        <View>
            <Text>
                Hello World! This is AddDataScreen
            </Text>

            <View>
                <Text>Add Period Dates</Text>
                
                <Text>Start Date</Text>
                <TextInput
                    value={periodStartDate}
                    onChangeText={setPeriodStartDate}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.textInputStyle}
                />
                
                <Text>End Date</Text>
                <TextInput
                    value={periodEndDate}
                    onChangeText={setPeriodEndDate}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.textInputStyle}
                />

                <Button
                    title='Submit'
                    onPress={ async () => { 
                        console.log({ periodStartDate, periodEndDate });
                        await addPeriodDates(periodStartDate, periodEndDate);
                    }}
                />

                <Button
                    title='Clear Database'
                    onPress={() => {
                        dropTable('periods');
                    }}
                />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    textInputStyle: {
        borderColor: '#000000',
        borderWidth: 2,
        margin: 10
    }
}) 


export default AddDataScreen;