// import CirculatorA from './components/Circulator/CirculatorA';
import CirculatorB from './components/Circulator/CirculatorB';

export default function App() {
  return <CirculatorB />;
}

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

/* <Button
        title="+"
        onPress={() => {
          setResult(result + 1);
        }}
        buttonStyle={{ width: 100, height: 100, marginBottom: 10 }}
        buttonType={ButtonTypes.OPERATOR}
      />
      <Button
        title="-"
        onPress={() => {
          setResult(result - 1);
        }}
        buttonStyle={{ width: 100, height: 100 }}
        buttonType={ButtonTypes.OPERATOR}
/> */
