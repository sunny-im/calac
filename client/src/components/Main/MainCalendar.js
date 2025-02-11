import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Box, Grid, Typography, List, ListItem } from "@mui/material";
import Calendar from "react-calendar";
import "../../assets/css/Calendar.css";
import moment from "moment";
import axios from "axios";
import { useEffect } from "react";

const MainCalendar = ({ isLoggedIn, userInfo }) => {
  const [value, onChange] = useState(new Date());
  //======================================================
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const today = `${year}년 ${month}월 ${date}일 `;

  const [parsedEventData, setParsedEventData] = useState([]);

  const parseEvents = (data) => {
    return data.map((item) => {
      return {
        date: new Date(item.start),
        title: item.title,
      };
    });
  };

  //이벤트 목록을 불러옴.
  useEffect(() => {
    if (!isLoggedIn || !userInfo || !userInfo.userInfo) return;
    axios
      .get(
        `http://localhost:5000/scheduler?currentUserNo=${userInfo.userInfo.no}`,
        { withCredentials: true }
      )
      .then((response) => {
        setParsedEventData(parseEvents(response.data));
      })
      .catch((error) => {
        console.error(error);
      });
  }, [isLoggedIn]);

  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };
  //======================================================
  return (
    <SectionCalendar container>
      <CalendarLeft item xs={8}>
        <CalendarWrap>
          <Calendar
            onChange={onChange}
            value={value}
            calendarType='US'
            formatDay={(locale, date) =>
              date.toLocaleString("en", { day: "numeric" })
            }
            tileContent={({ date, view }) =>
              parsedEventData &&
              view === "month" &&
              parsedEventData.find(
                (event) => event.date.getTime() === date.getTime()
              ) && (
                <div
                  className='event'
                  onClick={() =>
                    handleEventClick(
                      parsedEventData.find(
                        (event) => event.date.getTime() === date.getTime()
                      )
                    )
                  }
                >
                  Events
                </div>
              )
            }
            locale='ko'
          />
          <CalendarText>
            {/* 클릭이 없을 시엔 today, 클릭 시 선택한 날짜만 하단에 나타나도록 작업 */}
            <Box> {moment(value).format("YYYY년 MM월 DD일")} </Box>
          </CalendarText>
        </CalendarWrap>
      </CalendarLeft>
      <Grid item xs={4}>
        <TodayScheduleBox>
          <Typography variant='p' fontWeight={600} color='primary'>
            2023.02.16 (today 날짜)
          </Typography>
          <Box className='event-details'>
            {selectedEvent && (
              <div>
                <h3>{selectedEvent.title}</h3>
                <p>{selectedEvent.description}</p>
              </div>
            )}
          </Box>
          <List>
            <ListItem>05:00 수강신청</ListItem>
            <ListItem>12:00 점심 약속</ListItem>
            <ListItem>17:00 미용실 예약</ListItem>
          </List>
        </TodayScheduleBox>
      </Grid>
    </SectionCalendar>
  );
};
//style=================================================
const SectionCalendar = styled(Grid)({
  width: "100%",
  height: "100%",
});
const CalendarLeft = styled(Grid)({
  maxHeight: "100%",
});
const CalendarWrap = styled(Box)({
  padding: `0 30px`,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});
const CalendarText = styled(Box)({
  marginTop: "10px",
  color: "#171717",
  fontSize: "14px",
});
const TodayScheduleBox = styled(Box)({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});
//======================================================
export default MainCalendar;
