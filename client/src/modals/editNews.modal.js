import React, {useState, useEffect, useContext, useCallback} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import {AuthContext} from '../contexts/auth.context';
import {useHttp} from '../hooks/http.hook';
import {useMessage} from '../hooks/message.hook';

const useStyles = makeStyles((theme) => ({
    field: {
        padding: '10px 0',
    }    
}));

export const EditNewsModal = ({status, setStatus, recordId, reloadPage}) => {
    const [recordData, setRecordData] = useState([]);

    const message = useMessage();

    const {loading, error, request, clearError} = useHttp();

    const {token} = useContext(AuthContext);

    const [form, setForm] = useState({
        title: '', text: ''
    });

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value});
    }

    const handleClose = () => {
        setStatus(false);
    };

    const sendRequest = async () => {
        setStatus(false);
        try {
            const data = await request(`/api/news/update/${recordId}`, 'POST', {...form}, {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            });
            console.log(data);
            reloadPage(true);
        } catch (e) {
            console.log(e);
        }
    }

    const getData = useCallback(async () => {
        try {
            const data = await request(`/api/news/get/${recordId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            });
            setRecordData(data.data);
        } catch (e) {
            console.log(e);
        }
    }, [recordId, request, token]);

    useEffect(() => {
        getData();
    }, [recordId, getData])

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    const classes = useStyles();

    return (
        <div>
        <Dialog open={status} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Редактирование новости</DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    name="title"
                    id="outlined-multiline-static"
                    label="Заголовок"
                    multiline
                    rows={1}
                    defaultValue={recordData.title}
                    variant="outlined"
                    onChange={changeHandler}
                    className={classes.field}
                />
                <TextField
                    fullWidth
                    name="text"
                    id="outlined-multiline-static"
                    label="Текст"
                    multiline
                    rows={6}
                    defaultValue={recordData.text}
                    variant="outlined"
                    onChange={changeHandler}
                    className={classes.field}
                />
            </DialogContent>
            <DialogActions>
            <Button disabled={loading} onClick={handleClose} color="primary">
                Отмена
            </Button>
            <Button disabled={loading} onClick={sendRequest} color="primary">
                ОК
            </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}