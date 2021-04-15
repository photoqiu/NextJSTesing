/*
 * @Author: ext.qiubo
 * @Date: 2021-04-06 08:31:28
 * @LastEditTime: 2021-04-09 15:52:00
 * @LastEditors: ext.qiubo
 * @FilePath: \Mock_NodeJs_Interfaced:\Project\FE\NextJSTesing\pages\_document.js
 * @version: 
 */
import React from 'react'
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import {
    ServerStyleSheet as StyledComponentSheets
} from 'styled-components'
import {
    ServerStyleSheets as MaterialUiServerStyleSheets
} from '@material-ui/core/styles'

export default class Document extends NextDocument {
    static async getInitialProps(ctx) {
        const styledComponentSheet = new StyledComponentSheets()
        const materialUiSheets = new MaterialUiServerStyleSheets()
        const originalRenderPage = ctx.renderPage
        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: App => props =>
                        styledComponentSheet.collectStyles(
                            materialUiSheets.collect( 
                                <App {
                                    ...props
                                }/>
                            )
                        )
                })
                const initialProps = await NextDocument.getInitialProps(ctx)
                return {
                    ...initialProps,
                    styles: [ 
                        <React.Fragment key = "styles"> 
                            {
                                initialProps.styles
                            } 
                            {
                                materialUiSheets.getStyleElement()
                            } 
                            {
                                styledComponentSheet.getStyleElement()
                            } 
                        </React.Fragment>
                    ]
                }
            } finally {
                styledComponentSheet.seal()
            }
    }
    render() {
        return (
            <Html lang="zh-CN" className="ua-windows ua-webkit">
                <Head />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}