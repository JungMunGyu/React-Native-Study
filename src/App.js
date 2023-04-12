import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Button from './components/Button';
export default function App() {
  // 1장 내용
  //   const name = 'MunGyu';
  //   const add = (a, b) => a + b;
  //   const isFullname = false;
  //   <Text>1 + 2 = {add(1, 2)}</Text>
  //   <Text>{isFullname === true ? name + ' Jung' : name}</Text>

  //2장 - 스타일
  //   {/* <Text style={styles.error}>Error Message</Text>
  //       {/* 여러개의 스타일 시트 전달 -> 배열 형태 , 뒤에가 앞을 덮어쓴다*/}
  //       <Text style={[styles.text, styles.error]}>Error Message</Text>
  //       <Text style={[styles.error, styles.text]}>Error Message</Text>
  //       {/* 조건에 따라 에러가 있을때 에러메세지 출력 */}
  //       <Text style={[styles.text, isError && styles.error]}>Error Message</Text>

  const isError = true;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>RN Calc App</Text>
      <Button title="button" color={'red'} />
      <StatusBar style="auto" />
    </View>
  );
}

//스타일 시트로 객체로 스타일 전달
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
    fontWeight: '700',
    color: 'green',
  },
  error: {
    fontSize: 30,
    fontWeight: '700',
    color: 'red',
  },
});
