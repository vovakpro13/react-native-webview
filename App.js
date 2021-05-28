import React, {useRef, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import WebView from "react-native-webview";
import {Linking} from "react-native";


//************************************************************************

//JUST INJECT SOME JAVASCRIPT CODE TO PAGE AND BLOCK THE GOOGLE AUTH BUTTON

//*************************************************************************

const uri = 'https://github.com/vovakpro13/angular';

const injectScript = `
  (function () {
    window.onclick = function(e) {
      e.preventDefault();
      window.postMessage(e.target.href);
      e.stopPropagation()
    }
  }());
`;

export default function App() {
    // const [comments, setComments] = useState(null);
    //
    // useEffect(() => {
    //     fetch('https://jsonplaceholder.typicode.com/comments')
    //         .then(response => response.json())
    //         .then(json => setComments(json));
    // }, []);

    const webviewRef = useRef(null)

    const [canGoBack, setCanGoBack] = useState(false);
    const [canGoForward, setCanGoForward] = useState(false);

    const onNavigationStateChange = (newState) => {
        const {url, loading, canGoForward, canGoBack} = newState;
        setCanGoBack(canGoBack);
        setCanGoForward(canGoForward);
        console.log(url)
    }
    const onMessage = ({nativeEvent}) => {
        const data = nativeEvent.data;

        if (data !== undefined && data !== null) {
            Linking.openURL(data);
        }
    }
    return (
        <View style={styles.container}>
            {/*<Navbar title={'Yooo'}/>*/}
            <WebView
                source={{uri}}
                ref={webviewRef}
                onNavigationStateChange={onNavigationStateChange}
                startInLoadingState={true}
                renderLoading={() => (
                    <ActivityIndicator
                        color='black'
                        size='large'
                        style={styles.flexContainer}
                    />
                )}
                onMessage={onMessage}
                injectedJavaScript={injectScript}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        justifyContent: 'flex-start',
    },

});
