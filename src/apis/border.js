import axios from "axios";

// 개시물 총 개수
export const boardTotal = async () => {
  const {
    data: { json },
  } = await axios.post("api/Board?type=count");
  return json[0].total_count;
};

// 페이지 네이션
export const boardPage = async (start = 1) => {
  const {
    data: { json },
  } = await axios.post("api/Board?type=page", {
    start: (Number(start) - 1) * 10,
    length: 10,
  });
  return json;
};

// 게시물 등록
export const createBoard = async ({
  id = "",
  title,
  content,
  insert_user,
  write_password,
}) => {
  await axios.post("api/Board?type=save", {
    id,
    view_count: 0,
    title,
    content,
    insert_user,
    write_password,
  });
};

// 조회수 증가
export const visitBoard = async (id) => {
  await axios.post("api/Board?type=upCount", { id });
};

// 내용으로 검색
export const searchBoardContent = async (content = "") => {
  const {
    data: { json },
  } = await axios.post("api/Board?type=list", { content });
  return json;
};
