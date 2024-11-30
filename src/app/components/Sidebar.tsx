"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import NaturePeopleIcon from "@mui/icons-material/NaturePeople";
import { Home } from "@mui/icons-material";

const drawerWidth = 240;

const NAV_ITEMS = [
  {title: "ホーム", href: "/", icon: <HomeIcon/>},
  {title: "ニュース", href: "/news", icon: <NewspaperIcon/>},
  {title: "政治・政策", href: "/news/political", icon: <AccountBalanceIcon/>},
  {title: "ビジネス", href: "/news/business", icon: <BusinessCenterIcon/>},
  {title: "政策広場", href: "/square", icon: <NaturePeopleIcon/>},
  {title: "プロフィール", href: "/square", icon: <NaturePeopleIcon/>},
];

interface SidebarProps {
  mobileOpen: boolean;
  onDrawerToggle: () => void;
}

export default function Sidebar({mobileOpen, onDrawerToggle} : SidebarProps){
  const pathname = usePathname();

  const drawer = (
    <div>
      <Toolbar />
      <List>
        {NAV_ITEMS.map((item) => (
          <ListItem key={item.title} disablePadding>
            <Link href={item.href} passHref legacyBehavior>
              <ListItemButton selected={pathname == item.href}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title}></ListItemText>
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </div>
  );

return(
  <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="navigation">
    <Drawer
      variant="temporary"
      open={mobileOpen}
      onClose={onDrawerToggle}
      ModalProps={{ keepMounted: true }}
      sx={{ display: { xs: "block", sm: "none" }, "& .MuiDrawer-paper": { width: drawerWidth, zIndex: (theme) => theme.zIndex.appBar - 1, } }}
    >
      {drawer}
    </Drawer>
    <Drawer
      variant="permanent"
      sx={{ display: { xs: "none", sm: "block" }, "& .MuiDrawer-paper": { width: drawerWidth, zIndex: (theme) => theme.zIndex.appBar - 1, } }}
      open
    >
      {drawer}
    </Drawer>
  </Box>
);

}