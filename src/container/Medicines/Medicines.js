import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Form, Formik, useFormik } from "formik";
import * as yup from "yup";

function Medicines(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let schema = yup.object().shape({
    name: yup.string().required("Please Enter Medicine Name."),
    price: yup.number().required("Please Enter Medicine Price."),
    quntity: yup.string().required("Please Enter Medicine Quntity."),
    expiry: yup.string().required("Please Enter Medicine Expiry."),
  });

  const formikOrg = useFormik({
    initialValues: {
      name: "",
      price: "",
      quntity: "",
      expiry: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const { handleSubmit, handleChange, handleBlur, errors, touched } = formikOrg;

  return (
    <div>
      <h1>Medicines</h1>
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Medicines
        </Button>
        <Formik values={formikOrg}>
          <Form onSubmit={handleSubmit}>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Add Medicine</DialogTitle>
              <DialogContent>
                <TextField
                  margin="dense"
                  id="name"
                  label="Medicine Name"
                  type="name"
                  fullWidth
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.name && touched.errors ? errors.name:''}
                <TextField
                  margin="dense"
                  id="price"
                  label="Medicine Price"
                  type="price"
                  fullWidth
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.price && touched.errors ? errors.price:''}
                <TextField
                  margin="dense"
                  id="quntity"
                  label="Medicine Quntity"
                  type="quntity"
                  fullWidth
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.quntity && touched.errors ? errors.quntity:''}
                <TextField
                  margin="dense"
                  id="expiry"
                  label="Medicine Expiry"
                  type="expiry"
                  fullWidth
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.expiry && touched.errors ? errors.expiry:''}
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button type="submit">Subscribe</Button>
                </DialogActions>
              </DialogContent>
            </Dialog>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default Medicines;
