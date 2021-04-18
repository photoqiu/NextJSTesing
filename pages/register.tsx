/*
 * @Author: ext.qiubo
 * @Date: 2021-04-16 15:55:56
 * @LastEditTime: 2021-04-16 20:05:34
 * @LastEditors: ext.qiubo
 * @FilePath: \NextJSTesing\pages\register.tsx
 * @version: 
 */
import React, { useRef, forwardRef, useState } from "react";
import Header from "../compones/Header/index";
import CopyRight from "../compones/Footer/index";
import Avatar from "@material-ui/core/Avatar";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { Theme, makeStyles, createStyles } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import Container from "@material-ui/core/Container";
import HttpReq from '../api/requireURL';
import API from '../api/config';

const Http = new HttpReq();

export async function getFetch(url:string, params:any) {
    return Http.getFetch(url, params);
}

export async function postFetch(url:string, params:any) {
    return Http.postFetch(url, params);
}

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        paper: {
            marginTop: theme.spacing(8),
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        },
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main
        },
        form: {
            width: "100%", // Fix IE 11 issue.
            marginTop: theme.spacing(3)
        },
        submit: {
            margin: theme.spacing(3, 0, 2)
        }
    })
);

export const Register = () => {
    const form:any = useRef(null);
    const classes = useStyles();
    const [mailStatus, setMailStatus] = useState(true)
    const [passwdStatus, setPasswdStatus] = useState(true)
    const [nameStatus, setNameStatus] = useState(true)
    const [nickNameStatus, setNickNameStatus] = useState(true)
    const [phoneStatus, setPhoneStatus] = useState(true)
    /////////////////////////////////////////////////////////////////////
    const [formValues, setFormValues] = useState({
		name: "",
		nickName: "",
		email: "",
		password: "",
		phone: "",
        showPassword: false,
		marketing: false
	});

    const validateMail = (mail:string) => {
        let regu = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/;
        let reg = new RegExp(regu);
        console.log("mail:", mail)
        if(mail === "") { //输入不能为空
            return false;
        } else if(!!!reg.test(mail)) { //正则验证不通过，格式不对
            return false;
        } else {
            return true;
        }
    }
    const validateName = (name:string) => {
        let regu = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
        let reg = new RegExp(regu);
        if(name.length < 2 && name.length > 8) { //输入不能为空
            return false;
        } else if(!!!reg.test(name)) { //正则验证不通过，格式不对
            return false;
        } else {
            return true;
        }
    }
    const validatePhone = (phone:string) => {
        let regu = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
        let reg = new RegExp(regu);
        if(phone === "") { //输入不能为空
            return false;
        } else if(!!!reg.test(phone)) { //正则验证不通过，格式不对
            return false;
        } else {
            return true;
        }
    }
    const validatePwd = (pwd:string) => {
        let regu = /^[0-9a-zA-Z]{6,16}$/; 
        let reg = new RegExp(regu); 
        if (!!reg.test(pwd)) { 
           return true; 
        } else { 
          return false; 
        }
    }
    
    const [headerDatas, setHeaderDatas] = useState({
        title: "开发者---注册新网站",
        keyword: "blog, fe, 前端开发, 技术博客",
        descript: "我的网站首页--职业前端从业者的故事"
    });

    const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
        let isName = validateName(formValues['name'])
        let isNickName = validateName(formValues['nickName'])
        let isEmail = validateMail(formValues['email'])
        let isPasswd = validatePwd(formValues['password'])
        let isPhone = validatePhone(formValues['phone'])
		setNameStatus(isName);
        setNickNameStatus(isNickName);
        setMailStatus(isEmail);
        setPasswdStatus(isPasswd);
        setPhoneStatus(isPhone);
        if (isPhone && isPasswd && isEmail && isNickName && isName) {
            /////这里调用异步提交请求。
        }
        return false;
        //////////////////////////////////////////设置状态是异步的。所以，还是要一个判断
	};

    const handleClickShowPassword = () => {
        setFormValues({ ...formValues, showPassword: !formValues.showPassword });
    };
    
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let key = e.target.name;
		let value;
		if (key !== "marketing") {
			value = e.target.value;
		} else {
			value = e.target.checked;
		}
		setFormValues({
			...formValues,
			[key]: value
		});
	};

    return (
        <>
            <Header headers={headerDatas} />
            <Container component="main" maxWidth="xs">
			    <CssBaseline />
			    <div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					注册新用户
				</Typography>
				<form className={classes.form} ref={form} noValidate onSubmit={e => handleSubmit(e)}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete="fname"
								type="text"
								name="name"
								variant="outlined"
								required
								fullWidth
                                error={!nameStatus}
								id="firsName"
								label="姓名"
								onChange={e => handleChange(e)}
								autoFocus
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								variant="outlined"
								required
								type="text"
								fullWidth
                                error={!nickNameStatus}
								id="lastName"
								label="昵称"
								name="nickName"
								onChange={e => handleChange(e)}
								autoComplete="lname"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
                                error={!mailStatus}
								type="email"
								id="email"
								label="邮箱地址"
								name="email"
								onChange={e => handleChange(e)}
								autoComplete="email"
							/>
						</Grid>
						<Grid item xs={12}>
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                fullWidth
                                required
                                type={formValues.showPassword ? 'text' : 'password'}
                                value={formValues.password}
                                error={!passwdStatus}
                                name="password"
                                onChange={e => handleChange(e)}
                                endAdornment={
                                    <InputAdornment position="end">
                                    <IconButton
                                        aria-label="显示/隐藏，密码输入框"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {formValues.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                    </InputAdornment>
                                }
                                labelWidth={70}
                            />
                        </FormControl>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
                                error={!phoneStatus}
								type="tel"
								id="phone"
								label="手机号"
								name="phone"
								onChange={e => handleChange(e)}
								autoComplete="phone"
							/>
						</Grid>
						<Grid item xs={12}>
							<FormControlLabel
								control={
									<Checkbox
										value={formValues.marketing}
										name="marketing"
										onChange={e => handleChange(e)}
										color="primary"
									/>
								}
								label="接收，最新系统推荐的技术邮件"
							/>
						</Grid>
					</Grid>
					<Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
						注册
					</Button>

					<Grid container justify="flex-end">
						<Grid item>
							<Link href="/login" variant="body2">
								我有账号了，登录
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
                <Box mt={5}>
                    <CopyRight />
                </Box>
		    </Container>
        </>
    )
}

export default Register;