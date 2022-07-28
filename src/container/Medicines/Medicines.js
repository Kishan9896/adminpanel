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
import { useDispatch, useSelector } from "react-redux";
import { Medicine } from "../redux/action/Medicines.action";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Medicines(props) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [rowData, setRowdata] = useState(null);
  const [edit, setEdit] = useState(false);
  const [search, setSearch] = useState([]);
  
  const dispatch = useDispatch ()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    formikOrg.resetForm();
  };

  let schema = yup.object().shape({
    name: yup.string().required("Please Enter Medicine Name."),
    price: yup.number().required("Please Enter Medicine Price."),
    quntity: yup.number().required("Please Enter Medicine Quntity."),
    expiry: yup.number().required("Please Enter Medicine Expiry."),
  });

  const inserthandle = (values) => {
    const localData = JSON.parse(localStorage.getItem("Medicines"));

    const id = Math.floor(Math.random() * 1000);

    const dataIn = {
      id: id,
      ...values,
    };

    if (localData === null) {
      localStorage.setItem("Medicines", JSON.stringify([dataIn]));
    } else {
      localData.push(dataIn);
      localStorage.setItem("Medicines", JSON.stringify(localData));
    }
    handleClose();
    local();
  };

  const dataEdit = (values) => {
    const dataEditupdate = JSON.parse(localStorage.getItem("Medicines"));

    const uData = dataEditupdate.map((P) => {
      if (P.id === values.id) {
        return values;
      } else {
        return P;
      }
    });
    localStorage.setItem("Medicines", JSON.stringify(uData));

    handleClose();
    local();
    setEdit(false);
  };

  const formikOrg = useFormik({
    initialValues: {
      name: "",
      price: "",
      quntity: "",
      expiry: "",
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
    const DeleteData = JSON.parse(localStorage.getItem("Medicines"));

    const deleteHandel = DeleteData.filter((p) => p.id !== rowData.id);

    setData(deleteHandel);

    localStorage.setItem("Medicines", JSON.stringify(deleteHandel));
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
    setOpen(true);

    setEdit(true);
    formikOrg.setValues(params.row);
  };

  const columns = [
    { field: "name", headerName: "Name", width: 130 },
    { field: "price", headerName: "Price", width: 130 },
    { field: "quntity", headerName: "Quntity", width: 130 },
    { field: "expiry", headerName: "Expiry", width: 130 },
    {
      field: "Action",
      headerName: "Action",
      width: 130,
      renderCell: (params) => (
        <>
          <IconButton aria-label="edit" onClick={() => handleEdit(params)}>
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
    const Datahandle = JSON.parse(localStorage.getItem("Medicines"));

    if (Datahandle !== null) {
      setData(Datahandle);
    }
  };

  const handleSearch = (value) => {
    const localSearch = JSON.parse(localStorage.getItem("Medicines"));

    const filterData = localSearch.filter((a) => ( 
    a.name.toLowerCase().includes(value) ||
    a.price.toString().includes(value) ||
    a.quntity.toString().includes(value) ||
    a.expiry.toString().includes(value)
  ))
  setSearch (filterData);
  }

  const Sdata = search.length > 0 ? search : data;
  const Medicines = useSelector (state => state.Medicines);
  console.log(Medicines);

  useEffect(() => {
    // local();
    dispatch(Medicine())
  }, []);

  const { handleSubmit, handleChange, handleBlur, errors, touched, values } =
    formikOrg;

    const c = useSelector(state => state.counter)

  return (
    <div>
    {
      Medicines.isLoding ? 
      <p>Loading...</p> 
      :
      Medicines.error !== "" ?
      <p>{Medicines.error}</p>
      :
      <div>
      <h1>Medicines: {c.counter}</h1>
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Medicines
        </Button>
        <TextField
          margin="dense"
          name="name"
          label="Medicine Search"
          type="text"
          fullWidth
          variant="standard"
          onChange={(e) => handleSearch(e.target.value)}
        />
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={Medicines.Medicines}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </div>

        <Dialog fullWidth open={open} onClose={handleClose}>
          <DialogTitle>Add Medicine</DialogTitle>
          <Formik values={formikOrg}>
            <Form onSubmit={handleSubmit}>
              <DialogContent>
                <TextField
                  value={values.name}
                  margin="dense"
                  name="name"
                  label="Medicine Name"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <p>{errors.name && touched.name ? errors.name : ""}</p>
                <TextField
                  value={values.price}
                  margin="dense"
                  name="price"
                  label="Medicine Price"
                  type="number"
                  fullWidth
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <p>{errors.price && touched.price ? errors.price : ""}</p>
                <TextField
                  value={values.quntity}
                  margin="dense"
                  name="quntity"
                  label="Medicine Quntity"
                  type="number"
                  fullWidth
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <p>{errors.quntity && touched.quntity ? errors.quntity : ""}</p>
                <TextField
                  value={values.expiry}
                  margin="dense"
                  name="expiry"
                  label="Medicine Expiry"
                  type="number"
                  fullWidth
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <p>{errors.expiry && touched.expiry ? errors.expiry : ""}</p>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                {edit ? (
                  <Button type="submit">Update</Button>
                ) : (
                  <Button type="submit">submit</Button>
                )}
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
    }
    </div>
    
  );
}

export default Medicines;
