import NextApp from 'next/app'
import React from 'react'
import {
    ThemeProvider as StyledThemeProvider
} from 'styled-components'
import {
    ThemeProvider as MaterialThemeProvider,
    createMuiTheme
} from '@material-ui/core/styles';
import { Cookie, withCookie } from 'next-cookie'

const theme = {
    primary: '#f2f2f2',
    ...createMuiTheme()
}
class App extends NextApp {

    static async getInitialProps(ctx) {
        const name = ctx.cookie.get('myfeCookies')
        console.log("cookie:", ctx.cookie)
        let initialName = "";
        if (!!name) {
            initialName = name
        }
        return { initialName }
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

export default withCookie(App)