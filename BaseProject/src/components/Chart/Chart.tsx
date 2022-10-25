import React, {useCallback} from 'react';
import {
  ActivityIndicator,
  LayoutChangeEvent,
  Platform,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import WebView from 'react-native-webview';
import {styles} from './styles';

interface Props {
  style?: ViewStyle;
}

export const _Chart = ({style}: Props) => {
  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    console.log(event.nativeEvent.layout.width);
  }, []);

  return (
    <View style={[styles.root, style]} onLayout={handleLayout}>
      <WebView
        // androidLayerType="software"
        androidLayerType={Platform.select({
          android: 'software',
          ios: 'hardware',
        })}
        startInLoadingState
        automaticallyAdjustContentInsets={false}
        scalesPageToFit={false}
        setBuiltInZoomControls={false}
        cacheEnabled={false}
        renderLoading={() => <ActivityIndicator color="#00008b" />}
        source={{html: '<body></body>'}}
        injectedJavaScript={'javascript void 0;'}
      />
    </View>
  );
};

export const Chart = React.memo(_Chart);
