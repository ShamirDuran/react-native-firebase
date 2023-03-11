import {View} from 'react-native';

interface Props {
  space: number;
  axis?: 'horizontal' | 'vertical';
}

export const SpaceBox = ({space, axis = 'horizontal'}: Props) => {
  return (
    <View
      style={
        axis === 'horizontal'
          ? {
              width: space,
            }
          : {
              height: space,
            }
      }
    />
  );
};
