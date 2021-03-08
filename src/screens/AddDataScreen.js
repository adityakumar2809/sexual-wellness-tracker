import React, { useState } from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    TextInput,
    ScrollView
} from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db.db');


const AddDataScreen = () => {

    const [periodStartDate, setPeriodStartDate] = useState(null)
    const [periodEndDate, setPeriodEndDate] = useState(null)


    const [coitusDate, setCoitusDate] = useState(null)
    const [
        instantaneousProtectionUsed,
        setInstantaneousProtectionUsed
    ] = useState(0)
    const [
        instantaneousProtectionType,
        setInstantaneousProtectionType
    ] = useState('')


    const dropTable = (table_name) => {
        db.transaction((tx) => {
            tx.executeSql(
                `DELETE FROM ${table_name}`,
                []
            );
        });
        console.log('Database Cleaned!!');
    }

    const addPeriodDates = async (periodStartDate, periodEndDate) => {
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


    const addCoitusData = async (
        coitusDate,
        instantaneousProtectionUsed,
        instantaneousProtectionType) => {
        db.transaction((tx) => {
            tx.executeSql(
                `INSERT INTO
                    coituses 
                        (
                            date, 
                            instantaneous_protection_used,
                            instantaneous_protection_type
                        ) 
                VALUES 
                    (?, ?, ?)
                `,
                [
                    coitusDate,
                    instantaneousProtectionUsed,
                    instantaneousProtectionType
                ],
                (_, result) => {},
                (_, error) => {console.log(error);}
            );
            tx.executeSql('SELECT * FROM coituses', [], (_, { rows }) =>
                console.log(JSON.stringify(rows))
            );
        });
    }



    return (
        <ScrollView>
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
                    onPress={async () => {
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

            <View>
                <Text>Add Coitus Data</Text>

                <Text>Date</Text>
                <TextInput
                    value={coitusDate}
                    onChangeText={setCoitusDate}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.textInputStyle}
                />

                <Text>Protection Used</Text>
                <Button
                    title={
                        instantaneousProtectionUsed
                            ? 'No'
                            : 'Yes'
                    }
                    style={{
                        backgroundColor: instantaneousProtectionUsed
                            ? 'red'
                            : 'green'
                    }}
                    onPress={() => {
                        setInstantaneousProtectionUsed(
                            !instantaneousProtectionUsed
                        );
                    }}
                />

                <Text>Protection Type</Text>
                <TextInput
                    value={instantaneousProtectionType}
                    onChangeText={setInstantaneousProtectionType}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.textInputStyle}
                />

                <Button
                    title='Submit'
                    onPress={async () => {
                        console.log({
                            coitusDate,
                            instantaneousProtectionUsed,
                            instantaneousProtectionType
                        });
                        await addCoitusData(
                            coitusDate,
                            instantaneousProtectionUsed,
                            instantaneousProtectionType
                        );
                    }}
                />

                <Button
                    title='Clear Database'
                    onPress={() => {
                        dropTable('coituses');
                    }}
                />
            </View>
        </ScrollView>
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