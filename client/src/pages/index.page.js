import React, {useEffect, useCallback, useState} from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
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
        backgroundColor: '#3f51b5',
        color: '#fff'
    },
    itemContent: {
        border: '2px solid #3f51b5',
        padding: '10px 15px',
    },
    itemFooter: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: '15px',
        color: 'rgba(128,128,128,0.8)',
        fontSize: '14px',
    },
    itemTitle: {
        fontSize: '24px',
    },
    itemText: {
        textAlign: 'justify',
        fontSize: '14px',
        color: 'rgba(0,0,0,0.8)',
    },
  }));

export const IndexPage = () => {

    const [news, setNews] = useState([]);

    const message = useMessage();

    const {loading, error, request, clearError} = useHttp();

    const getData = useCallback(async () => {
        try {
            const data = await request('/api/news/get', 'GET');
            setNews(data.data);
        } catch (e) {
            console.log(e);
        }
    }, [request]);

    useEffect(() => {
        getData();
    }, [getData]);

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);
    
    const classes = useStyles();
    
    return (
        <Container className={classes.paper}>
            <h2 className={classes.title}>Новости</h2>

            {!loading && <NewsList data={news} />}

        </Container>
    )
}