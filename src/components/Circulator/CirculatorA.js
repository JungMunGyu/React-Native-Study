import { StatusBar } from 'expo-status-bar';
import { useWindowDimensions, StyleSheet, View, Text } from 'react-native';
import Button, { ButtonTypes } from '../Button';
import { useState } from 'react';

const Operators = {
  CLEAR: 'C',
  MINUS: '-',
  PLUS: '+',
  EQULAL: '=',
};
export default function CirculatorA() {
  const [result, setResult] = useState(0);
  const [formula, setFormula] = useState([]);

  const width = (useWindowDimensions().width - 5) / 4;

  console.log(formula);

  const calculate = () => {
    let calculatedNumber = 0;
    let operator = '';

    formula.forEach((value) => {
      if ([Operators.MINUS, Operators.PLUS].includes(value)) {
        operator = value;
      } else {
        if (operator === Operators.PLUS) {
          calculatedNumber += value;
        } else if (operator === Operators.MINUS) {
          calculatedNumber -= value;
        } else {
          calculatedNumber = value;
        }
      }
      setResult(calculatedNumber);
      setFormula([]);
    });
  };

  const onPressNumber = (num) => {
    const last = formula[formula.length - 1];

    if (isNaN(last)) {
      setResult(num);
      setFormula((prev) => [...prev, num]);
    } else {
      const newNumber = (last ?? 0) * 10 + num;
      setResult(newNumber);
      setFormula((prev) => {
        formula.pop();
        return [...prev, newNumber];
      });
    }
  };
  const onPressOperator = (operator) => {
    switch (operator) {
      case Operators.CLEAR:
        setResult(0);
        setFormula([]);
        break;
      case Operators.EQULAL:
        calculate();
        break;
      default: {
        //+-
        const last = formula[formula.length - 1];
        if ([Operators.PLUS, Operators.MINUS].includes(last)) {
          setResult(operator);
          setFormula((prev) => {
            prev.pop();
            return [...prev, operator];
          });
        } else {
          setResult(operator);
          setFormula((prev) => [...prev, operator]);
        }
        break;
      }
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar style="light"></StatusBar>

      {/* 결과 */}
      <View style={styles.resultContainer}>
        <Button
          style={styles.reverseBtn}
          title="R"
          onPress={() => {}}
          buttonStyle={{
            width: 70,
            height: 70,
          }}
        ></Button>
        <Text style={styles.result}>
          {result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </Text>
      </View>

      {/* 버튼 */}
      <View style={styles.buttonContainer}>
        <View style={styles.leftPad}>
          <View style={styles.number}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => {
              return (
                <Button
                  key={num}
                  title={num.toString()}
                  onPress={() => onPressNumber(num)}
                  buttonStyle={{ width, height: width, marginTop: 1 }}
                />
              );
            })}
          </View>

          <View style={styles.bottom}>
            <Button
              title="0"
              onPress={() => onPressNumber(0)}
              buttonStyle={{ width: width * 2, height: width }}
              buttonType={ButtonTypes.NUMBER}
            ></Button>
            <Button
              title={Operators.EQULAL}
              onPress={() => onPressOperator(Operators.EQULAL)}
              buttonStyle={{ width, height: width }}
              buttonType={ButtonTypes.OPERATOR}
            ></Button>
          </View>
        </View>

        <View style={styles.operator}>
          <Button
            title={Operators.CLEAR}
            onPress={() => onPressOperator(Operators.CLEAR)}
            buttonStyle={{ width, height: width, marginBottom: 1 }}
            buttonType={ButtonTypes.OPERATOR}
          ></Button>
          <Button
            title={Operators.MINUS}
            onPress={() => onPressOperator(Operators.MINUS)}
            buttonStyle={{ width, height: width, marginBottom: 1 }}
            buttonType={ButtonTypes.OPERATOR}
          ></Button>
          <Button
            title={Operators.PLUS}
            onPress={() => onPressOperator(Operators.PLUS)}
            buttonStyle={{ width, height: width * 2, marginBottom: 1 }}
            buttonType={ButtonTypes.OPERATOR}
          ></Button>
        </View>
      </View>
    </View>
  );
}

//스타일 시트로 객체로 스타일 전달
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: '#000000',
  },
  buttonContainer: {
    backgroundColor: '#000000',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  result: {
    fontSize: 60,
    fontWeight: '700',
    color: '#ffffff',
    paddingBottom: 30,
    paddingRight: 30,
  },
  leftPad: {
    width: '75%',
  },
  number: {
    flexDirection: 'row',
    flexWrap: 'wrap-reverse',
    justifyContent: 'space-evenly',
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  operator: {},
  reverseBtn: {},
});
