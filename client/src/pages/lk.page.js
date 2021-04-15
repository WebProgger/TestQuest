import React, { useContext, useEffect, useState, useCallback } from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {AuthContext} from '../contexts/auth.context'
import {useHttp} from '../hooks/http.hook';
import {useMessage} from '../hooks/message.hook';
import {NewsList} from '../components/news-list.component';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Roboto',
    },
    title: {
        fontSize: '36px',
        color: 'rgba(0,0,0,0.8)',
    },
    items: {
        display: 'flex',
        flexDirection: 'column',
        padding: '20px 0'
    },
    item: {
        display: 'flex',
        flexDirection: 'column',
        padding: '10px 0',
    },
    itemHeader: {
        padding: '10px 15px',
        color: 'rgba(0,0,0,0.8)',
    },
    itemContent: {
        padding: '10px 15px',
    },
    itemTitle: {
        fontSize: '24px',
    },
    itemText: {
        textAlign: 'justify',
        fontSize: '14px',
        color: 'rgba(0,0,0,0.8)',
    },
    formItem: {
        padding: '5px 0',
    },
    formButton: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    }
  }));

export const LkPage = () => {

    const [reloadPage, setReloadPage] = useState(true);
    const [news, setNews] = useState([]);

    const {token} = useContext(AuthContext);
    
    const message = useMessage();

    const {loading, error, request, clearError} = useHttp();

    const [form, setForm] = useState({
        title: '', text: ''
    });

    const getData = useCallback(async () => {
        try {
            const data = await request('/api/news/get-from-user', 'GET', null, {
                Authorization: `Bearer ${token}`
            });
            setNews(data.data);
        } catch (e) {
            console.log(e);
        }
    }, [request, token]);

    useEffect(() => {
        if(reloadPage) {
            getData();
            setReloadPage(false);
        }
    }, [getData, reloadPage]);

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);
    
    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value});
    }

    const sendHandler = async () => {
        try {
            await request('/api/news/create', 'POST', {...form}, {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            });
            setReloadPage(true);
        } catch (e) {
            console.log(e);
        }
    }

    const classes = useStyles();
    
    return (
        <Container className={classes.paper}>
            <h2 className={classes.title}>Личный кабинет</h2>
            <div className={classes.items}>
                <div className={classes.item}>
                    <div className={classes.itemHeader}>
                        <h3 className={classes.itemTitle}>Добавить новость</h3>
                    </div>
                    <div className={classes.itemContent}>
                        <form className={classes.form} noValidate>
                            <Grid item xs={12} sm={12} className={classes.formItem}>
                                <TextField
                                    required
                                    fullWidth
                                    name="title"
                                    id="standart-required"
                                    label="Заголовок"
                                    defaultValue=""
                                    onChange={changeHandler}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} className={classes.formItem}>
                                <TextField
                                    fullWidth
                                    name="text"
                                    id="outlined-multiline-static"
                                    label="Текст"
                                    multiline
                                    rows={6}
                                    defaultValue=""
                                    variant="outlined"
                                    onChange={changeHandler}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} className={classes.formButton}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    onClick={sendHandler}
                                    disabled={loading}
                                >
                                    Добавить
                                </Button>
                            </Grid>
                        </form>
                    </div>
                </div>
                <div className={classes.item}>
                    <div className={classes.itemHeader}>
                        <h3 className={classes.itemTitle}>Ваши новости</h3>
                    </div>
                    <div className={classes.itemContent}>
                        {!loading && <NewsList data={news} editable={true} reloadPage={setReloadPage} />}
                    </div>
                </div>
            </div>

        </Container>
    )
}