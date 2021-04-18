import NextApp from 'next/app'
import React from 'react'
import {
    ThemeProvider as StyledThemeProvider
} from 'styled-components'
import {
    ThemeProvider as MaterialThemeProvider,
    createMuiTheme
} from '@material-ui/core/styles';
import cookies from 'next-cookies';

const theme = {
    primary: '#f2f2f2',
    ...createMuiTheme()
}

export default class App extends NextApp {

    static async getInitialProps(ctx) {
        return {
            initialName: cookies(ctx).name || ''
        }
    }

    constructor(props) {
        super(props);
        this.state = {name: props.initialName || ''};
        console.log("name:",  this.state)
    }

    componentDidMount() {
        const jssStyles = document.querySelector('#jss-server-side')
        if (jssStyles && jssStyles.parentNode)
            jssStyles.parentNode.removeChild(jssStyles)
    }

    render() {
        const {
            Component,
            pageProps
        } = this.props
        return ( 
            <StyledThemeProvider theme = {
                theme
            } >
                <MaterialThemeProvider theme = {
                    theme
                }>
                    <Component {
                        ...pageProps
                    }/> 
                </MaterialThemeProvider> 
            </StyledThemeProvider>
        )
    }
}