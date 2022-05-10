import React, { useState, useEffect } from 'react'
import Filter from '../components/filter/Filter';
import { ReactComponent as PlusIc } from '../assets/icons/plus.svg';
import InputAdornment from '@mui/material/InputAdornment';
import { TextField } from '@mui/material';
import { ReactComponent as SearchIc } from '../assets/icons/search.svg';
import { Button } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import UserImg from '../assets/img/user.jpg';
import { ReactComponent as CloseIc } from '../assets/icons/close.svg'
import Axios from 'axios';
import InfiniteScroll from "react-infinite-scroll-component";
import { useDebounce } from 'usehooks-ts'


const Layout = () => {
  const [checked, setChecked] = React.useState([0]);
  const [token, setToken] = useState('');
  const [contactList, setContactList] = useState([]);
  const [Record, setRecord] = useState<any>(10);
  const [search, setSearch] = useState('');
  const [minMessagesSent , setMinMessagesSent ] = useState<number>()
  const [maxMessagesSent , setMaxMessagesSent ] = useState<number>()
  const [minMessagesRecv  , setMinMessagesRecv  ] = useState<number>()
  const [maxMessagesRecv , setMaxMessagesRecv ] = useState<number>()
  const debouncedValue = useDebounce<string>(search, 500)

  console.log(contactList.length, Record);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  useEffect(() => {
    const payload = {
      "refreshToken": "059c420e-7424-431f-b23b-af0ecabfe7b8",
      "teamId": "a001994b-918b-4939-8518-3377732e4e88"
    }

    Axios.post('https://api-teams.chatdaddy.tech/token', payload)
      .then(response => {
        console.log(response.data);
        setToken(response.data.access_token)
      })
  }, [])

  useEffect(() => {
    Axios({
      method: "GET",
      url: "https://api-im.chatdaddy.tech/contacts",
      headers: { Authorization: 'Bearer ' + token, "Content-Type": "multipart/form-data" },
      params:{
        "q" : search,
        "count" :Record
      }
    }).then(res => {
      if (res.status === 200) {
        setContactList(res.data.contacts)
      }
      console.log(res);
    })


  }, [token,debouncedValue,Record])

  const fetchMoreData = () => {
    // setTimeout(() => {
      setRecord(Record + 10)
    // }, 100);
  };

const handleSearch = (e:any) =>{
  console.log(e.target.value);
  setSearch(e.target.value)
}
const handleMessage = (e:any) =>{
  const value = e.target.value;
  const name = e.target.name;
    if(name === 'minMessagesSent'){
      setMinMessagesSent(value)
    }else if(name === 'maxMessagesSent'){
      setMaxMessagesSent(value)
    }else if(name === "minMessagesRecv" ){
      setMinMessagesRecv(value)
    }else if(name === 'maxMessagesRecv'){
      setMaxMessagesRecv(value)
    }
  console.log(name,value);
}
const handleSaveFilter = () =>{
  if(minMessagesSent || maxMessagesSent || minMessagesRecv || maxMessagesRecv){
    Axios({
      method: "GET",
      url: "https://api-im.chatdaddy.tech/contacts",
      headers: { Authorization: 'Bearer ' + token, "Content-Type": "multipart/form-data" },
      params:{
        "minMessagesSent" : minMessagesSent,
        "maxMessagesSent" : maxMessagesSent,
        "minMessagesRecv": minMessagesRecv,
        "maxMessagesRecv": maxMessagesRecv
      }
    }).then(res => {
      if (res.status === 200) {
        setContactList(res.data.contacts)
      }
      console.log(res);
    })
  }
  
}

  return (
    <div className='main'>
      <div className="container">
        <div className="sidebar">
          <Filter handleMessage={handleMessage} handleSaveFilter={handleSaveFilter}/>
        </div>
        <div className="main-wapper">
          <div className="d-flex justify-content-between align-items-center">
            <h1>All Contacts(100)</h1>
            <span><PlusIc /></span>
          </div>
          <div className="search">
            <TextField
              // label="With normal TextField"
              placeholder='Search conatcts'
              onChange={handleSearch}
              InputProps={{
                startAdornment: <InputAdornment position="start"><span><SearchIc /></span></InputAdornment>,
              }}
            />
          </div>
          <div className="select__all d-flex justify-content-between align-items-center">
            <div className='selectAll'>
              <Checkbox /> Select All
            </div>
            <Button variant="contained">Export All</Button>
          </div>
          <List>
            <InfiniteScroll
              className='scrollBox'
              dataLength={contactList.length}
              next={fetchMoreData}
              hasMore={true}
              loader={<h4>Loading...</h4>}
              height={300}
            >

              {contactList && contactList.map((item: any) => {
                const labelId = `checkbox-list-label-${item.id}`;
                return (
                  <ListItem
                    key={item.id}
                    secondaryAction={
                      <IconButton edge="end" aria-label="comments">
                        {item.tags.map((tag: any) =>
                          <span className='added-tag'>{tag.name} <CloseIc /></span>
                        )}
                        <PlusIc />
                      </IconButton>
                    }
                    disablePadding
                  >

                    <ListItemButton role={undefined} onClick={handleToggle(item.id)} dense>
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={checked.indexOf(item.id) !== -1}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </ListItemIcon>
                      <span className='userProfile'>
                        <img src={item.img ? item.img : UserImg} className="img-fluid" alt="" />
                      </span>
                      <p> {item.name}
                        <span className='mobileNo'>{item.phoneNumber}</span>
                      </p>

                      {/* <span>9374982349</span> */}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </InfiniteScroll>
          </List>
        </div>
      </div>
    </div>
  )
}

export default Layout