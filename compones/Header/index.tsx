/*
 * @Author: ext.qiubo
 * @Date: 2021-04-06 08:31:28
 * @LastEditTime: 2021-04-15 17:38:47
 * @LastEditors: ext.qiubo
 * @FilePath: \NextJSTesing\compones\Header\index.tsx
 * @version: 
 */
import Head from 'next/head'
interface Datas {
    title: string;
    keyword: string;
    descript: string;
}

const Header: React.FC<Datas> = (props) => {
    const { headers } = props
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <title>{headers.title}</title>
                <meta name="keywords" content={headers.keyword} />
                <meta name="description" content={headers.descript} />
                <meta name="apple-mobile-web-app-title" content={headers.title} />
                <meta name="format-detection" content="telephone=no" />
                <meta name="format-detection" content="email=no" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="grey" />
                <meta name="HandheldFriendly" content="true" />
                <meta name="screen-orientation" content="portrait" />
                <meta name="x5-orientation" content="portrait" />
                <meta name="msapplication-tap-highlight" content="no" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta httpEquiv="Cache-Control" content="max-age=1800" />
                <meta content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
            </Head>
        </>
    )
}

export default Header