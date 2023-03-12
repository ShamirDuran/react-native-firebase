import React from 'react';
import {View, ActivityIndicator, Modal, StyleSheet} from 'react-native';

interface Props {
  visible: boolean;
}

export const LoadingScreen = ({visible}: Props) => {
  return (
    <Modal transparent visible={visible}>
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
