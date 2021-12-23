import { useEffect, useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import Swal from "sweetalert2";
import { userAuth } from "../../atoms";
import { useRecoilValue } from "recoil";
import { getUserInfo, modyInfo } from "../../apis/user";

const MyInfo = () => {
  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [major, setMajor] = useState("");
  const [phone, setPhone] = useState("");

  const { user_email } = useRecoilValue(userAuth);

  const changeInfo = async () => {
    const res = await modyInfo({
      user_email: user_email,
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

  useEffect(() => {
    (async () => {
      const { user_name, user_org, user_major, user_phone } = await getUserInfo(
        user_email
      );
      setName(user_name);
      setOrg(user_org);
      setMajor(user_major);
      setPhone(user_phone);
    })();
  }, []);
  return (
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
  );
};

export default MyInfo;
