import { useContext } from "react"
import { UIContext } from "../../context/ui"
import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material"
import { Box } from "@mui/system"
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined'
import { MailOutlineOutlined } from "@mui/icons-material"

const menuItems: string[] = ['Inbox', 'Starred', 'Send email', 'Drafts']

export const SideBar = () => {

  const { sidemenuOpen, closeSideMenu } = useContext(UIContext)

  return (
    <Drawer
        anchor="left"
        open={ sidemenuOpen }
        onClose={closeSideMenu}
    >
      <Box sx={{ width: 250 }}>
        <Box sx={{ padding: '5px 10px' }}>
            <Typography variant= "h4">Menu</Typography>
        </Box>

        <List>
            {menuItems.map((text,index) => (
                <ListItem button key={ text }>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxOutlinedIcon/> : <MailOutlineOutlined/>}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
            ))}
        </List>

        <Divider />
      </Box>
    </Drawer>
  )
}
