import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Modal,
  Typography,
} from "@mui/material";
import { productList } from "../../utils/contants";
import { useState } from "react";

const HomePage = () => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [addCardItem, setAddCardItem] = useState([]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const totalAmout = addCardItem.reduce(
    (acc, vvv) => acc + vvv.count * vvv.price,
    0
  );

  return (
    <Box padding={8}>
      <Box>
        <Button sx={{ marginBottom: "80px" }} onClick={handleOpen}>
          Card item: {addCardItem.length}
        </Button>
      </Box>

      <Grid container spacing={2}>
        {productList?.map((v,i) => {
          return (
            <Grid size={{ xs: 6, md: 4 }} key={i}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image="/static/images/cards/contemplative-reptile.jpg"
                  title="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {v.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {v.discription}
                  </Typography>
                </CardContent>
                <Typography
                  variant="h6"
                  sx={{ color: "text.secondary", paddingLeft: "18px" }}
                >
                  Price: {v.price}
                </Typography>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => {
                      if (addCardItem.find((item) => item.id === v.id)) {
                        return "";
                      } else {
                        setAddCardItem([...addCardItem, { ...v, count: 1 }]);
                      }
                    }}
                  >
                    Add to Card
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Button onClick={handleClose}> close</Button>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Card Item
          </Typography>
          {addCardItem.map((itme, i) => {
            return (
              <Box sx={{ display: "flex", gap: 2, paddingTop: "10px" }} key={i}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  ItemName:{itme.name}
                </Typography>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Count:{itme.count}
                </Typography>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Count:{itme.price}
                </Typography>
                <Button
                  onClick={() => {
                    const availabledata = addCardItem.find(
                      (dd) => dd.id === itme.id
                    );
                    if (availabledata && availabledata.count > 1) {
                      const data = addCardItem.map((v,i) => {
                        return v.id === itme.id
                          ? { ...v, count: v.count - 1 }
                          : v;
                      });
                      setAddCardItem(data);
                    }
                  }}
                  variant="outlined"
                  disabled={itme.count < 2}
                >
                  -
                </Button>
                <Button
                  disabled={itme.count > 4}
                  onClick={() => {
                    const availabledata = addCardItem.find(
                      (dd) => dd.id === itme.id
                    );
                    if (availabledata) {
                      const data = addCardItem.map((v) => {
                        return v.id === itme.id
                          ? { ...v, count: v.count + 1 }
                          : v;
                      });
                      setAddCardItem(data);
                    }
                  }}
                  variant="outlined"
                >
                  +
                </Button>

                <Button
                  variant="contained"
                  onClick={() => {
                    const availabledata = addCardItem.find(
                      (dd) => dd.id === itme.id
                    );
                    if (availabledata) {
                      const data = addCardItem.filter(
                        (dsf) => dsf.id !== itme.id
                      );
                      setAddCardItem(data);
                    }
                  }}
                >
                  Delete
                </Button>
              </Box>
            );
          })}
          <Typography variant="h5">total Amout : {totalAmout}</Typography>
        </Box>
      </Modal>
    </Box>
  );
};

export default HomePage;
