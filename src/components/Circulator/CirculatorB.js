import { StatusBar } from "expo-status-bar";
import { useWindowDimensions, StyleSheet, View, Text } from "react-native";
import Button, { ButtonTypes } from "../Button";
import { useState } from "react";

const Operators = {
  CLEAR: "C",
  MINUS: "-",
  PLUS: "+",
  Delete: "D",
  EQULAL: "=",
  MULTI: "X",
  DIVIDE: "%",
};
export default function CirculatorB() {
  const [result, setResult] = useState(0);
  const [formula, setFormula] = useState([]);

  const width = (useWindowDimensions().width - 6) / 5;
  const height = (useWindowDimensions().width - 5) / 4;

  console.log(formula);

  const calculate = () => {
    let calculatedNumber = 0;
    let operator = "";

    formula.forEach((value) => {
      if (
        [
          Operators.MINUS,
          Operators.PLUS,
          Operators.MULTI,
          Operators.DIVIDE,
        ].includes(value)
      ) {
        operator = value;
      } else {
        if (operator === Operators.PLUS) {
          calculatedNumber += value;
        } else if (operator === Operators.MINUS) {
          calculatedNumber -= value;
        } else if (operator === Operators.MULTI) {
          calculatedNumber = calculatedNumber * value;
        } else if (operator === Operators.DIVIDE) {
          calculatedNumber = calculatedNumber / value;
        } else {
          calculatedNumber = value;
        }
      }
      setResult(calculatedNumber);
      setFormula((prev) => {
        return [calculatedNumber];
      });
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
      case Operators.Delete:
        {
          const last = formula[formula.length - 1];
          if (
            ![Operators.PLUS, Operators.MINUS].includes(last) &&
            !isNaN(last)
          ) {
            const prevNumber = last % 10;
            const newNumber = (last - prevNumber) / 10;
            if (newNumber != 0) {
              setResult(newNumber);
              setFormula((prev) => {
                formula.pop();
                return [...prev, newNumber];
              });
            } else {
              setResult(0);
              setFormula([]);
            }
          }
        }
        break;
      default: {
        //+-
        const last = formula[formula.length - 1];
        if (
          [
            Operators.PLUS,
            Operators.MINUS,
            Operators.DIVIDE,
            Operators.MULTI,
          ].includes(last)
        ) {
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
        <Text style={styles.result}>
          {result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </Text>
      </View>

      {/* 새로운 버튼 */}
      <View style={styles.buttonContainer}>
        <View style={styles.columnPad}>
          <Button
            title={Operators.CLEAR}
            onPress={() => onPressOperator(Operators.CLEAR)}
            buttonStyle={{ width, height, marginRight: 1, marginTop: 1 }}
            buttonType={ButtonTypes.OPERATOR}
          ></Button>
          <Button
            style={styles.reverseBtn}
            title={Operators.Delete}
            onPress={() => onPressOperator(Operators.Delete)}
            buttonStyle={{
              width,
              height: height - 1,
              marginRight: 1,
              marginTop: 1,
            }}
            buttonType={ButtonTypes.OPERATOR}
          ></Button>
          <Button
            title={Operators.EQULAL}
            onPress={() => onPressOperator(Operators.EQULAL)}
            buttonStyle={{
              width,
              height: height * 2,
              marginRight: 1,
              marginTop: 1,
            }}
            buttonType={ButtonTypes.OPERATOR}
          ></Button>
          <Button
            title={Operators.PLUS}
            onPress={() => onPressOperator(Operators.PLUS)}
            buttonStyle={{ width, height, marginTop: 1 }}
            buttonType={ButtonTypes.OPERATOR}
          ></Button>
          <Button
            title={Operators.MINUS}
            onPress={() => onPressOperator(Operators.MINUS)}
            buttonStyle={{ width, height: height - 1, marginTop: 1 }}
            buttonType={ButtonTypes.OPERATOR}
          ></Button>
          <Button
            title={Operators.MULTI}
            onPress={() => onPressOperator(Operators.MULTI)}
            buttonStyle={{ width, height, marginTop: 1 }}
            buttonType={ButtonTypes.OPERATOR}
          ></Button>
          <Button
            title={Operators.DIVIDE}
            onPress={() => onPressOperator(Operators.DIVIDE)}
            buttonStyle={{ width, height: height - 1, marginTop: 1 }}
            buttonType={ButtonTypes.OPERATOR}
          ></Button>
        </View>
        <View style={styles.rowPad}>
          <View style={styles.number}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => {
              return (
                <Button
                  key={num}
                  title={num.toString()}
                  onPress={() => onPressNumber(num)}
                  buttonStyle={{ width, height, marginTop: 1 }}
                />
              );
            })}
            <Button
              title="0"
              onPress={() => onPressNumber(0)}
              buttonStyle={{
                width: width * 3 + 3,
                height: height - 1,
                marginLeft: 1,
                marginTop: 1,
              }}
              buttonType={ButtonTypes.NUMBER}
            ></Button>
          </View>
        </View>
      </View>
    </View>
  );
}
//스타일 시트로 객체로 스타일 전달
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center",
  },
  resultContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    backgroundColor: "#000000",
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "#000000",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  result: {
    fontSize: 60,
    fontWeight: "700",
    color: "#ffffff",
    paddingBottom: 30,
    paddingRight: 30,
  },
  columnPad: {
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  // leftPad: {
  //   width: '75%',
  // },
  rowPad: {
    width: "60%",
  },
  number: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  // bottom: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-evenly',
  // },
  operator: {},
  reverseBtn: {},
});
