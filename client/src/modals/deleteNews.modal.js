import React, {useEffect, useContext} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {AuthContext} from '../contexts/auth.context';
import {useHttp} from '../hooks/http.hook';
import {useMessage} from '../hooks/message.hook';

export const DeleteNewsModal = ({status, setStatus, recordId, reloadPage}) => {

    const message = useMessage();

    const {loading, error, request, clearError} = useHttp();

    const {token} = useContext(AuthContext);

    const handleClose = () => {
        setStatus(false);
    };

    const sendRequest = async () => {
        setStatus(false);
        try {
            const data = await request(`/api/news/delete/${recordId}`, 'POST', null, {
                Authorization: `Bearer ${token}`
            });
            console.log(data);
            reloadPage(true);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    return (
        <div>
        <Dialog open={status} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Удаление новости</DialogTitle>
            <DialogContent>
                Вы уверены, что хотите удалить новость?
            </DialogContent>
            <DialogActions>
            <Button disabled={loading} onClick={handleClose} color="primary">
                Отмена
            </Button>
            <Button disabled={loading} onClick={sendRequest} color="primary">
                Удалить
            </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}