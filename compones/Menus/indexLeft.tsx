import React, { useState } from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MenuIcon from '@material-ui/icons/Menu';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, useTheme, Theme } from '@material-ui/core/styles';

interface Datas {
    Icons: ArrayDatas;
    SubIcons: ArrayDatas;
    CateUrl: ArrayDatas;
    CateName: ArrayDatas;
    window?: () => Window;
}

interface ArrayDatas {
    [index: number]: string;
}

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
createStyles({
    root: {
        display: 'flex'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0
        }
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth
        }
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none'
        }
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    }
})
);

const IndexLeft: React.FC < Datas > = (props) => {
    const { window, Icons, SubIcons } = props;
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const theme = useTheme();
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const container = window !== undefined ? () => window().document.body : undefined;
    const drawer = (
    <>
        <div className={classes.toolbar} />
        <Divider />
        <List>
            {Icons.map((text, index) => (
                <ListItem button key={text}>
                    <ListItemIcon>
                        { 
                            index % 2 === 0 ?  <InboxIcon /> : <MenuIcon />
                        }
                    </ListItemIcon>
                    <ListItemText primary={text} />
                </ListItem>
            ))}
        </List>
        <Divider />
        <List>
            { SubIcons.map((text, index) => (
                <ListItem button key={text}>
                    <ListItemIcon>
                        { 
                            index % 2 === 0 ?  <InboxIcon /> : <MenuIcon />
                        }
                    </ListItemIcon>
                    <ListItemText primary={text} />
                </ListItem>
            ))}
        </List>
    </>
    );
    return (
        <>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle}
                        className={classes.menuButton}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Responsive drawer
                    </Typography>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer container={container} variant="temporary" anchor={ theme.direction==='rtl' ? 'right' : 'left' }
                        open={mobileOpen} onClose={handleDrawerToggle} classes={{
                            paper: classes.drawerPaper,
                        }} ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}>
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer classes={{paper: classes.drawerPaper}} variant="permanent" open>
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
        </>
    )
}

export default IndexLeft