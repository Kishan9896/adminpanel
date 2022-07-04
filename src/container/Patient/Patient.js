import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Form, Formik, useFormik } from "formik";
import * as yup from "yup";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import DialogContentText from "@mui/material/DialogContentText";
import EditIcon from "@mui/icons-material/Edit";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Patient(props) {
    const [popen, setPopen] = useState(false);
    const [data, setData] = useState([]);
    const [deleteAlert, setDeleteAlert] = useState(false);
    const [rowData, setRowdata] = useState(null);
    const [edit, setEdit] = useState(false);

    const handleClickOpen = () => {
        setPopen(true);
    };

    const handleClose = () => {
        setPopen(false);
        formikOrg.resetForm();
    };

    let schema = yup.object().shape({
        name: yup.string().required("Please Enter Patient Name."),
        number: yup.number().required("Please Enter Patient Number."),
        condition: yup.string().required("Please Enter Patient Condition."),
        insurance: yup.string().required("Please Enter Patient Insurance Detail."),
    });

    const inserthandle = (values) => {
        const localData = JSON.parse(localStorage.getItem("Patient"));

        const id = Math.floor(Math.random() * 1000);

        const dataIn = {
            id: id,
            ...values,
        };

        if (localData === null) {
            localStorage.setItem("Patient", JSON.stringify([dataIn]));
        } else {
            localData.push(dataIn);
            localStorage.setItem("Patient", JSON.stringify(localData));
        }
        handleClose();
        local();
    };


    const dataEdit = (values) => {
        const dataEditupdate = JSON.parse(localStorage.getItem("Patient"));

        const uData = dataEditupdate.map((P) => {
            if (P.id === values.id) {
                return values;
            } else {
                return P;
            }
        })
        localStorage.setItem("Patient", JSON.stringify(uData));

        handleClose()
        local()
        setEdit(false)
    }

    const formikOrg = useFormik({
        initialValues: {
            name: "",
            number: "",
            condition: "",
            insurance: "",
        },
        validationSchema: schema,
        onSubmit: (values, action) => {
            if (edit) {
                dataEdit(values);
            } else {
                inserthandle(values);
            }
            action.resetForm();
        },
    });

    const Delete = () => {
        const DeleteData = JSON.parse(localStorage.getItem("Patient"));

        const deleteHandel = DeleteData.filter((p) => p.id !== rowData.id);

        setData(deleteHandel);

        localStorage.setItem("Patient", JSON.stringify(deleteHandel));
        setDeleteAlert(false);
    };

    const handleDeleteAlertOpen = (params) => {
        setDeleteAlert(true);
        setRowdata(params);
    };

    const handleDeleteAlertClose = () => {
        setDeleteAlert(false);
    };

    const handleEdit = (params) => {
        setPopen(true);

        setEdit(true);
        formikOrg.setValues(params.row);
    }

    const columns = [
        { field: "name", headerName: "Name", width: 130 },
        { field: "number", headerName: "Number", width: 130 },
        { field: "condition", headerName: "Condition", width: 130 },
        { field: "insurance", headerName: "Insurance", width: 130 },
        {
            field: "Action",
            headerName: "Action",
            width: 130,
            renderCell: (params) => (
                <>
                    <IconButton
                        aria-label="edit"
                        onClick={() => handleEdit(params)}
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        aria-label="delete"
                        onClick={() => handleDeleteAlertOpen(params)}
                    >
                        <DeleteIcon />
                    </IconButton>
                </>
            ),
        },
    ];

    const local = () => {
        const Datahandle = JSON.parse(localStorage.getItem("Patient"));

        if (Datahandle !== null) {
            setData(Datahandle);
        }
    };

    useEffect(() => {
        local();
    }, []);

    const { handleSubmit, handleChange, handleBlur, errors, touched, values } = formikOrg;

    return (
        <div>
            <h1>Patient Detail</h1>
            <div>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Patient
                </Button>
                <div style={{ height: 400, width: "100%" }}>
                    <DataGrid
                        rows={data}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                    />
                </div>

                <Dialog fullWidth open={popen} onClose={handleClose}>
                    <DialogTitle>Add Patient Details</DialogTitle>
                    <Formik values={formikOrg}>
                        <Form onSubmit={handleSubmit}>
                            <DialogContent>
                                <TextField
                                    value={values.name}
                                    margin="dense"
                                    name="name"
                                    label="Patient Name"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <p>{errors.name && touched.name ? errors.name : ""}</p>
                                <TextField
                                    value={values.number}
                                    margin="dense"
                                    name="number"
                                    label="Patient Number"
                                    type="number"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <p>{errors.number && touched.number ? errors.number : ""}</p>
                                <TextField
                                    value={values.condition}
                                    margin="dense"
                                    name="condition"
                                    label="Patient Condition"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <p>{errors.condition && touched.condition ? errors.condition : ""}</p>
                                <TextField
                                    value={values.insurance}
                                    margin="dense"
                                    name="insurance"
                                    label="Patient Insurance"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <p>{errors.insurance && touched.insurance ? errors.insurance : ""}</p>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                {
                                    edit ?
                                        <Button type="submit">Update</Button>
                                        :
                                        <Button type="submit">submit</Button>
                                }
                            </DialogActions>
                        </Form>
                    </Formik>
                </Dialog>
            </div>
            <Dialog
                open={deleteAlert}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleDeleteAlertClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Are you want to sure Delete?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteAlertClose}>No</Button>
                    <Button onClick={Delete}>Yes</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Patient;