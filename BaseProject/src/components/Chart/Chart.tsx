import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  LayoutChangeEvent,
  Platform,
  View,
  ViewStyle,
} from 'react-native';
import WebView, {WebViewMessageEvent} from 'react-native-webview';
import templateFile from './template';
import {styles} from './styles';

export interface ChartData {
  y: number;
  label: string;
}

interface Props {
  style?: ViewStyle;
  data: Array<ChartData | null>;
}

export const _Chart = ({style, data}: Props) => {
  const [webviewLoaded, setWebviewLoaded] = useState(false);
  // pass data way 2 (step A)
  const webviewRef = useRef<WebView>(null);

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    console.log(event.nativeEvent.layout.width);
  }, []);

  const handleMessage = useCallback((event: WebViewMessageEvent) => {
    const action = JSON.parse(event.nativeEvent.data);
    console.log('handleMessage', action.type);
    if (action.type === 'DOCUMENT_LOAD') {
      setWebviewLoaded(true);
    }
  }, []);

  // pass data way 2 (step C)
  useEffect(() => {
    // normal way
    if (webviewRef.current && webviewLoaded) {
      const theJSON = JSON.stringify(data);
      const run = `
renderChart(${theJSON});
true; // note: this is required, or you'll sometimes get silent failures
`;
      webviewRef.current.injectJavaScript(run);
    }
    // big data in chunks
    // (async () => {
    //   if (webviewRef.current) {
    //     webviewRef.current.postMessage(
    //       JSON.stringify({
    //         type: 'ADD_DATA_LOAD',
    //         payload: JSON.stringify(data.slice(0, 1000)),
    //       }),
    //     );
    //     await new Promise(resolve => {
    //       setTimeout(() => resolve(undefined), 10);
    //     });
    //     webviewRef.current.postMessage(
    //       JSON.stringify({
    //         type: 'ADD_DATA_LOAD',
    //         payload: JSON.stringify(data.slice(1001, data.length)),
    //       }),
    //     );
    //   }
    // })();
  }, [data, webviewLoaded]);

  return (
    <View style={[styles.root, style]} onLayout={handleLayout}>
      <WebView
        // pass data way 2 (step B)
        ref={webviewRef}
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
        source={{
          html: templateFile,
        }}
        onMessage={handleMessage}
      />
    </View>
  );
};

export const Chart = React.memo(_Chart);
