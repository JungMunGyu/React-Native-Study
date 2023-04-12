import { Text, Pressable } from 'react-native';
import PropTypes from 'prop-types';

const Button = ({ title }) => {
  // TouchableHighlight : 클릭시 하이라이트 효과
  // TouchableOpacity : 클릭시 투명도 낮아짐
  // Presable : 클릭시 이벤트 발생하게 할 수 있다.
  //   -> style={({ pressed }) => {
  //     return [
  //       { backgroundColor: 'red' },
  //       pressed && { backgroundColor: 'orange', opacity: 0.3 },
  //     ];
  //   }}

  return (
    <Pressable
      onPress={() => console.log('click')}
      style={({ pressed }) => {
        return [
          { backgroundColor: 'red' },
          pressed && { backgroundColor: 'orange', opacity: 0.3 },
        ];
      }}
    >
      <Text>{title}</Text>
    </Pressable>
  );
};

Button.propTypes = {
  title: PropTypes.string.isRequired, // -> title이 string형이고 다른 형태가 전달되면 어디서 잘못된 형태가 전달되었는지 확인 가능함, isRequired를 통해 title이 꼭 전달되어야 함을 표시
};

Button.defaultProps = {
  title: 'Default', // -> 해당 props가 전달되지 않았을 경우 Default값을 표시
};

export default Button;
