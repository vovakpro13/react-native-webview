import React, {useRef, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import Navbar from "./src/Navbar";
import WebView from "react-native-webview";
import {Linking} from "react-native-web";

const uri = 'https://www.google.com/';

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

    return (
        <View style={styles.container}>
            <Navbar title={'Yooo'}/>
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
                onShouldStartLoadWithRequest={event => {
                    console.log(event)
                    if (event.url !== uri) {
                        Linking.openURL(event.url)
                        return false
                    }

                    return true
                }}
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
