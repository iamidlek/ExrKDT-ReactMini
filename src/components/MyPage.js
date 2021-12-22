import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import {
  changePassword,
  checkPassword,
  getUserInfo,
  modyInfo,
} from "../apis/user";
import { useRecoilValue } from "recoil";
import { userAuth } from "../atoms";
import Swal from "sweetalert2";

const MyPage = () => {
  const [expanded, setExpanded] = useState(false);
  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [major, setMajor] = useState("");
  const [phone, setPhone] = useState("");

  const [aprove, setAprove] = useState(true);
  const [newPw, setNewPw] = useState("");

  const auth = useRecoilValue(userAuth);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const changeInfo = async () => {
    const res = await modyInfo({
      user_email: auth.user_email,
      user_name: name,
      user_org: org,
      user_major: major,
      user_phone: phone,
      user_confirm: "Y",
    });
    if (res) {
      // fire 변경에 성공
      Swal.fire("정보 변경 성공", "수정한 정보로 반영되었습니다", "success");
    } else {
      // 변경에 실패
      Swal.fire("정보 변경 실패", "다시 한번 시도해 주세요", "error");
    }
  };

  const changePw = async () => {
    const res = await changePassword(auth.user_email, newPw);
    if (res) {
      Swal.fire(
        "비밀번호 변경 성공",
        "수정한 비밀번호로 반영되었습니다",
        "success"
      );
    } else {
      Swal.fire("비밀번호 변경 실패", "다시 한번 시도해 주세요", "error");
    }
  };

  const checkPw = async (pw) => {
    const res = await checkPassword(auth.user_email, pw);
    if (res) {
      setAprove(false);
    } else {
      setAprove(true);
    }
  };

  useEffect(() => {
    (async () => {
      const { user_name, user_org, user_major, user_phone } = await getUserInfo(
        auth.user_email
      );
      setName(user_name);
      setOrg(user_org);
      setMajor(user_major);
      setPhone(user_phone);
    })();
  }, []);
  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            개인 정보 변경
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container style={{ textAlign: "center" }}>
            <Grid item xs={12} sx={{ marginBottom: 1 }}>
              <TextField
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{ backgroundColor: "white", width: "300px" }}
                label="user name"
              />
            </Grid>
            <Grid item xs={12} sx={{ marginBottom: 1 }}>
              <TextField
                id="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                sx={{ backgroundColor: "white", width: "300px" }}
                label="phone number"
              />
            </Grid>
            <Grid item xs={12} sx={{ marginBottom: 1 }}>
              <TextField
                id="major"
                value={major}
                onChange={(e) => setMajor(e.target.value)}
                sx={{ backgroundColor: "white", width: "300px" }}
                label="major"
              />
            </Grid>
            <Grid item xs={12} sx={{ marginBottom: 1 }}>
              <TextField
                id="org"
                value={org}
                onChange={(e) => setOrg(e.target.value)}
                sx={{ backgroundColor: "white", width: "300px" }}
                label="org"
              />
            </Grid>
            <Grid item xs={12} sx={{ marginBottom: 3 }}>
              <Button
                type="button"
                variant="outlined"
                sx={{
                  width: "300px",
                  height: "100%",
                  backgroundColor: "white",
                }}
                onClick={changeInfo}
              >
                정보 변경
              </Button>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            비밀 번호 변경
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container style={{ textAlign: "center" }}>
            <Grid item xs={12} sx={{ marginBottom: 1 }}>
              <TextField
                id="currpass"
                type="password"
                onChange={(e) => checkPw(e.target.value)}
                sx={{ backgroundColor: "white", width: "300px" }}
                label="기존 비밀 번호"
              />
            </Grid>
            <Grid item xs={12} sx={{ marginBottom: 1 }}>
              <TextField
                id="newpass"
                type="password"
                disabled={aprove}
                value={newPw}
                onChange={(e) => setNewPw(e.target.value)}
                sx={{ backgroundColor: "white", width: "300px" }}
                label="새로운 비밀 번호"
              />
            </Grid>

            <Grid item xs={12} sx={{ marginBottom: 3 }}>
              <Button
                type="button"
                variant="outlined"
                disabled={aprove || newPw.length < 8}
                sx={{
                  width: "300px",
                  height: "100%",
                  backgroundColor: "white",
                }}
                onClick={changePw}
              >
                비밀 번호 변경
              </Button>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default MyPage;
