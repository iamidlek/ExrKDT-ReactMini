import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const BoardList = ({ boardList }) => {
  const navigate = useNavigate();
  return (
    <>
      <Grid container style={{ textAlign: "center", marginBottom: "16px" }}>
        <Grid item xs={2}>
          <ListItemText primary="유저명" />
        </Grid>
        <Grid item xs={5}>
          <ListItemText primary="제목" />
        </Grid>
        <Grid item xs={2}>
          <ListItemText primary="조회" />
        </Grid>
        <Grid item xs={3}>
          <ListItemText primary="작성일" />
        </Grid>
      </Grid>
      <Box>
        <List style={{ borderTop: "1px solid #ccc" }}>
          {boardList?.map((board) => (
            <ListItem
              disablePadding
              key={board.id}
              style={{ borderBottom: "1px solid #ccc" }}
            >
              <Grid
                container
                style={{ textAlign: "center", alignItems: "center" }}
              >
                <Grid item xs={2}>
                  <ListItemText primary={board.insert_user} />
                </Grid>
                <Grid item xs={5}>
                  <ListItemButton style={{ textAlign: "center" }}>
                    <ListItemText
                      onClick={() =>
                        navigate(`/${board.id}`, { state: { board } })
                      }
                      primary={board.title}
                    />
                  </ListItemButton>
                </Grid>
                <Grid item xs={2}>
                  <ListItemText primary={board.view_count} />
                </Grid>
                <Grid item xs={3}>
                  <ListItemText primary={board.insert_date.slice(0, 10)} />
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
};

export default BoardList;
