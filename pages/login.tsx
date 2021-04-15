/*
 * @Author: ext.qiubo
 * @Date: 2021-04-15 14:30:53
 * @LastEditTime: 2021-04-15 21:04:14
 * @LastEditors: ext.qiubo
 * @FilePath: \NextJSTesing\pages\login.tsx
 * @version: 
 */
import React, { useState, useEffect, useRef, isValidElement } from "react";
import Header from "../compones/Header/index";
import CopyRight from "../compones/Footer/index";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { Theme, makeStyles, createStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
interface State {
    amount: string;
    password: string;
    weight: string;
    weightRange: string;
    showPassword: boolean;
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
            marginTop: theme.spacing(1)
        },
        submit: {
            margin: theme.spacing(3, 0, 2)
        }
    })
);

export const Login = () => {
    const form:any = useRef(null);
	const classes = useStyles();
    
	useEffect(() => {
		   
	}, []);
    const validateMail = (mail:string) => {
        let regu = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/;
        let reg = new RegExp(regu);
        if(mail === "") { //输入不能为空
            return false;
        } else if(!!!reg.test(mail)) { //正则验证不通过，格式不对
            return false;
        } else {
            return true;
        }
    }
    const validatePwd = (pwd:string) => {
        let regu = "^[0-9a-zA-Z]{6,16}$"; 
        let reg = new RegExp(regu); 
        if (!!reg.test(pwd)) { 
           return true; 
        } else { 
          return false; 
        }
    }
	const [headerDatas, setHeaderDatas] = useState({
        title: "开发者登录",
        keyword: "blog, fe, 前端开发, 技术博客",
        descript: "我的网站首页--职业前端从业者的故事"
    });
    const [mailStatus, setMailStatus] = useState(false)
    const [passwdStatus, setPasswdStatus] = useState(false)
    const [formValues, setFormValues] = useState({
		email: "",
		password: "",
		remember: false,
        showPassword: false
	});

    const handleClickShowPassword = () => {
        setFormValues({ ...formValues, showPassword: !formValues.showPassword });
    };
    
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    let mailHTML = 
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="email"
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={e => handleChange(e)}
        />
    let pwdHTML = 
        <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
                id="outlined-adornment-password"
                type={formValues.showPassword ? 'text' : 'password'}
                value={formValues.password}
                name="password"
                onChange={e => handleChange(e)}
                endAdornment={
                    <InputAdornment position="end">
                    <IconButton
                        aria-label="toggle password visibility"
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
    

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
        setMailStatus(validateMail(formValues['email']))
        setPasswdStatus(validatePwd(formValues['password']))
        mailHTML = mailStatus === false ? 
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                type="email"
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={e => handleChange(e)}
            /> : 
            <TextField
                variant="outlined"
                margin="normal"
                error
                required
                fullWidth
                type="email"
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                helperText="email格式错误."
                autoFocus
                onChange={e => handleChange(e)}
            />
        pwdHTML = passwdStatus === false ? 
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={e => handleChange(e)}
            /> : 
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                error
                helperText="密码在6~16位之间."
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={e => handleChange(e)}
            />
        // console.log("form:", form.current);
        // defaultValue="Error" error
		// form.current
	};
    // const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let key:string = e.currentTarget.name;
		let value:string;
		if (key !== "remember") {
			value = e.currentTarget.value;
		} else {
			value = e.currentTarget.checked.toString();
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
                        3CS前端开发工具登录
                    </Typography>
                    <form className={classes.form} ref={form} noValidate onSubmit={e => handleSubmit(e)}>
                        {mailHTML}
                        {pwdHTML}
                        <FormControlLabel
                            control={
                                <Checkbox
                                    value={formValues.remember}
                                    name="remember"
                                    color="primary"
                                    onChange={e => handleChange(e)}
                                />
                            }
                            label="Remember me"
                        />
                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                            登录
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    忘记密码
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/" variant="body2">
                                    {"我还没有账号"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={8}>
                    <CopyRight />
                </Box>
		</Container>
        </>
	);
};

export default Login;