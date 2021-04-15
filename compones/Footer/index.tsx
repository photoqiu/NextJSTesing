/*
 * @Author: ext.qiubo
 * @Date: 2021-04-15 16:56:43
 * @LastEditTime: 2021-04-15 17:57:04
 * @LastEditors: ext.qiubo
 * @FilePath: \NextJSTesing\compones\Footer\index.tsx
 * @version: 
 */
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const CopyRight = () => {
    const cpyStyle = {
        display:"block",
        width: '100%',
        lineHeight: '20px'
    }
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			<span style={cpyStyle}>
				使用 <b>登录账号</b> use OAuth2.0协议
			</span>
			{"Copyright © "}
			<Link color="inherit" href="https://photoqiu.github.io">
				3CS前端开发工具登录
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

export default CopyRight;