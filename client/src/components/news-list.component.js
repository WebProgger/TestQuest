import React, {useState, useEffect} from 'react';
import {formatDateTime} from '../engine/functions';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import {EditNewsModal} from '../modals/editNews.modal';
import {DeleteNewsModal} from '../modals/deleteNews.modal';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(4),
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
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
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
    pagination: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: '20px 0',
    },
    actions: {
        display: 'flex',
        flexDirection: 'row',
    },
    action: {
        padding: '0 5px',
    },
    actionButton: {
        cursor: 'pointer',
        color: '#fff',
        background: 'transparent',
        border: 'none',
        '&:hover': {
            outline: 'none',
        },
        '&:focus': {
            outline: 'none',
        }
    }
  }));

export const NewsList = ({data, editable, reloadPage}) => {

    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const [recordId, setRecordId] = useState(null);

    const [records, setRecords] = useState(data);
    const [pageNumber, setPageNumber] = useState(0);

    const recordsPerPage = 2;
    const pagesVisited = pageNumber * recordsPerPage;

    const pageCount = Math.ceil(records.length / recordsPerPage);

    const editHandler = (id) => {
        setRecordId(id);
        setOpenEditModal(true);
    }

    const deleteHandler = (id) => {
        setRecordId(id);
        setOpenDeleteModal(true);
    }

    useEffect(() => {
        setRecords(data);
    }, [data])

    const classes = useStyles();

    if(!records.length) {
        return <p>Новостей не обнаружено</p>;
    }

    const displayRecords = records
        .slice(pagesVisited, pagesVisited + recordsPerPage)
        .map((record) => {
            if(editable) {
                return (
                    <div key={record.id} className={classes.item}>
                        <div className={classes.itemHeader}>
                            <h3 className={classes.itemTitle}>{record.title}</h3>
                            <div className={classes.actions}>
                                <div className={classes.action}>
                                    <button onClick={() => { editHandler(record.id) }} className={classes.actionButton}>
                                        <CreateIcon />
                                    </button>
                                </div>
                                <div className={classes.action}>
                                    <button onClick={() => { deleteHandler(record.id) }} className={classes.actionButton}>
                                        <DeleteIcon />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={classes.itemContent}>
                            <p className={classes.itemText}>
                                {record.text}
                            </p>
                            <div className={classes.itemFooter}>
                                <p>{record.author}</p>
                                <p>{formatDateTime(record.updated_at)}</p>
                            </div>
                        </div>
                    </div>
                )
            }

            return (
                <div key={record.id} className={classes.item}>
                    <div className={classes.itemHeader}>
                        <h3 className={classes.itemTitle}>{record.title}</h3>
                    </div>
                    <div className={classes.itemContent}>
                        <p className={classes.itemText}>
                            {record.text}
                        </p>
                        <div className={classes.itemFooter}>
                            <p>{record.author}</p>
                            <p>{formatDateTime(record.updated_at)}</p>
                        </div>
                    </div>
                </div>
            )
        });

    const pageHandler = (event, value) => {
        setPageNumber(value-1);
    }

    return (

        <div className={classes.items}>

            {displayRecords}

            <Pagination
                count={pageCount}
                color="primary"
                className={classes.pagination}
                onChange={pageHandler}
            />

            { openEditModal && <EditNewsModal status={openEditModal} setStatus={setOpenEditModal} recordId={recordId} reloadPage={reloadPage} />}
            { openDeleteModal && <DeleteNewsModal status={openDeleteModal} setStatus={setOpenDeleteModal} recordId={recordId} reloadPage={reloadPage} />}

        </div>
    )
}