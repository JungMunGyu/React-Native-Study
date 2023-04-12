import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const name = 'MunGyu';
  const add = (a, b) => a+b;
  const isFullname = false;

  return (
    <View style={styles.container}>
      <Text>1 + 2 = {add(1, 2)}</Text>
      <Text>{isFullname === true ? name + ' Jung' : name}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
