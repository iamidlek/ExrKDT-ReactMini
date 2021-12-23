import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";

const CartTable = ({ cartList }) => {
  return (
    <TableContainer sx={{ maxWidth: 830 }} component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ width: 60 }} align="center">
              이미지
            </TableCell>
            <TableCell style={{ width: 380 }} align="center">
              상품명
            </TableCell>
            <TableCell style={{ width: 130 }} align="center">
              가격
            </TableCell>
            <TableCell style={{ width: 130 }} align="center">
              개수
            </TableCell>
            <TableCell style={{ width: 130 }} align="center">
              금액
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cartList?.map((item) => (
            <TableRow
              key={item.product_id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">
                <img
                  src={item.image}
                  alt="thumbnail"
                  style={{ width: "80px" }}
                />
              </TableCell>
              <TableCell align="center">
                <div dangerouslySetInnerHTML={{ __html: item.title }}></div>
              </TableCell>
              <TableCell align="center">
                {Number(item.l_price).toLocaleString()}
              </TableCell>
              <TableCell align="center">{item.amount}</TableCell>
              <TableCell align="center">
                {(item.amount * item.l_price).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CartTable;
