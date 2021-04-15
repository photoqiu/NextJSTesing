/*
 * @Author: ext.qiubo
 * @Date: 2021-04-15 13:48:32
 * @LastEditTime: 2021-04-15 17:40:00
 * @LastEditors: ext.qiubo
 * @FilePath: \NextJSTesing\compones\Menus\indexTop.tsx
 * @version: 
 */
import {useState, useImperativeHandle, forwardRef} from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, purple } from '@material-ui/core/colors';

interface Datas {
    users:userDatas;
    status: boolean;
}

interface userDatas {
    userName: string;
    ages?: number;
    sex?: number;
    userImages: string;
    userId: number;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            '& > *': {
                margin: theme.spacing(1)
            }
        },
        square: {
            color: theme.palette.getContrastText(deepOrange[500]),
            backgroundColor: purple[500]
        },
        rounded: {
            color: '#fff',
            backgroundColor: purple[500]
        }
    })
);

const IndexTop: React.FC < Datas > = forwardRef((props, ref) => {
    const {users, status} = props
    const [isLogined, setIsLogined] = useState(false);
    const classes = useStyles();
    // useImperativeHandle(ref, () => ({
    //     changeVal: (newVal) => {
    //     }
    // }));
    return (
        <>
            (
                if (!!users.userImages) {
                    <Avatar alt="Cindy Baker" src={users.userImages} />
                } else {
                    <Avatar variant="rounded" className={classes.rounded}>{users.userName.charAt(0)}</Avatar>
                }
            )
        </>
    )
})

export default IndexTop
