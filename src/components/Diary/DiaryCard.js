import React, {useState,useEffect} from 'react';
import { styled } from "@mui/material/styles";
import { Box, List, ListItem, ListItemText, Card, CardHeader, IconButton, CardMedia, CardContent, Typography, Button, Modal, Fade, Backdrop, Divider, TextField } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DiaryMoreButton from './DiaryMoreButton';
import DiaryDetail from './DiaryDetail';
import axios from 'axios';
import ReactHtmlParser from "react-html-parser";

const DiaryCard = () => {
  const [openMoreButton, setOpenMoreButton] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [countIndex, setCountIndex] = useState(0);
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [posts, setPosts] = useState([]);
  const [commentCnt, setCommentCnt] = useState('0');
  //======================================================
  const handleOpenMoreButton = (e,idx) => {
    setCountIndex(idx);
    setOpenMoreButton(!openMoreButton);
  }
  //======================================================
  const openDetailModal = (id,title,content,image,createdAt) => {
    setIsDetailOpen(true);
    setId(id);
    setTitle(title);
    setContent(content);
    setCreatedAt(createdAt)
    setImage(image);
  }
  //======================================================
  useEffect(()=>{
    axios.get('http://localhost:5000/comments/count')
    .then(res=>{
      setCommentCnt(res.data);
      console.log("cnt",res.data)
    })
  },[])
  //======================================================
  useEffect(()=>{
    axios.get('http://localhost:5000/dairy')
    .then(res=>setPosts(res.data));
  },[posts])
  //======================================================
  return (
    <Box>
      <CardList>
        {posts.map((list,idx)=>{
          return(
          <CardListItem key={idx}>
            <Box>
              <MyCardHeader
                action={
                  <MyIconButton aria-label="settings" onClick={(e)=>handleOpenMoreButton(e,list.dairy_no)}>
                    <MoreVertIcon />
                    {countIndex === list.dairy_no && (
                      openMoreButton && (
                        <DiaryMoreButton 
                          posts={posts} 
                          id={list.dairy_no}
                        />
                      )
                    )}
                  </MyIconButton>
                }
                title={list.title}
                disableTypography
              />
              <DateTypography>{list.createdAt.substring(0,10)}</DateTypography>
              <Button onClick={()=>openDetailModal(list.dairy_no,list.title, list.content,list.image,list.createdAt)}>
                {list.image === "NULL" && (
                  <MyCardMedia
                    component="img"
                    width="40vh"
                    height="194"
                    src="/images/logo.png"
                    alt="이미지"
                  />
                  ) 
                }
              </Button>
              <Button onClick={()=>openDetailModal(list.dairy_no,list.title, list.content,list.image,list.createdAt)}>
                <MyCardContent>
                  <ContentBox variant="body2" color="text.secondary">
                    {list.content.includes("<img") ? (
                      ReactHtmlParser((list.content))
                    ) : (
                      ReactHtmlParser((list.content).substring(0,list.content.indexOf('</')))
                    )}
                  </ContentBox>
                </MyCardContent>
              </Button>
              <CommentBox>
              {commentCnt.arr !== 0 && (
                commentCnt.map((count,idx) => {
                  return(
                    list.dairy_no === count.dairy_no && (
                      <CountCommentTypography key={idx}>댓글 {count.cnt}개</CountCommentTypography>
                    )
                  )
                })
              )}
              </CommentBox>
            </Box>
          </CardListItem>
        )})}
      </CardList>
      {isDetailOpen && (
        <DiaryDetail
          isDetailOpen={isDetailOpen}
          setIsDetailOpen={setIsDetailOpen}
          id={id}
          title={title}
          content={content}
          image={image}
          createdAt={createdAt}
        />
      )}
    </Box>
  );
};
//style=================================================
const CardList = styled(List)({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
});
const CardListItem = styled(ListItem)({
  width: `45vh`,
  border: `1px solid #ebebec`,
  margin: `20px 10px 15px 20px`,
});
const MyCardHeader = styled(CardHeader)({
  fontSize: 25,
  fontWeight: 'bold',
});
const DateTypography = styled(Typography)({
  display: 'flex',
  justifyContent: 'end',
  marginRight: '1vh'
});
const MyCardMedia = styled(CardMedia)({
  width : '40vh',
  objectFit : 'none'
});
const MyIconButton = styled(IconButton)({
  marginRight: '-2vh',
});
const MyCardContent = styled(CardContent)({
  padding: 0,
});
const ContentBox = styled(Box)({
  width: '40vh',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  wordWrap: 'break-word',
});
const CommentBox = styled(Box)({
});
const CountCommentTypography = styled(Typography)({
  color: 'rgba(0, 0, 0, 0.6)',
  fontSize: '0.875rem'
});
//======================================================
export default DiaryCard;