import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Collapse } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import NaturePeopleIcon from "@mui/icons-material/NaturePeople";
import BadgeIcon from '@mui/icons-material/Badge';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const drawerWidth = 240;

const NAV_ITEMS = [
  { title: "ホーム", href: "/", icon: <HomeIcon /> },
  {
    title: "ニュース",
    href: "",
    icon: <NewspaperIcon />,
    children: [
      {
        title: "政治・政策",
        href: "/news/political",
        icon: <AccountBalanceIcon />,
      },
      {
        title: "ビジネス",
        href: "/news/business",
        icon: <BusinessCenterIcon />,
      },
    ],
  },
  { title: "政策広場", href: "/square", icon: <NaturePeopleIcon /> },
  { title: "プロフィール", href: "/profile", icon: <BadgeIcon /> },
];

interface SidebarProps {
  mobileOpen: boolean;
  onDrawerToggle: () => void;
}

export default function Sidebar({ mobileOpen, onDrawerToggle }: SidebarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    const activeParent = NAV_ITEMS.find((item) => 
      item.children?.some((child) => child.href == pathname)
    );
    if(activeParent){
      setOpen(activeParent.title);
    }
  }, [pathname]);

  const handleClick = (title: string) => {
    setOpen(open === title ? null : title);  // 展開/折りたたみ処理
  };

  const drawer = (
    <div>
      <Toolbar />
      <List>
        {NAV_ITEMS.map((item) => (
          <div key={item.title}>
            {/* 親アイテム */}
            <ListItem onClick={(e) => {
              if (!item.href) {
                e.preventDefault();
                if(item.children){
                  handleClick(item.title)
                }
              }
            }}>
              <Link href={item.href || "#"} passHref legacyBehavior>
                <ListItemButton selected={pathname === item.href}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.title} />
                  {/* 子アイテムがあれば展開アイコンを表示 */}
                  {item.children && (
                    open === item.title ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />
                  )}
                </ListItemButton>
              </Link>
            </ListItem>
            

            {/* 子アイテム（展開時のみ表示） */}
            {item.children && (
              <Collapse in={open === item.title} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.children.map((child) => (
                    <ListItem key={child.title} sx={{paddingLeft: 4}}>
                      <Link href={child.href} passHref legacyBehavior>
                        <ListItemButton selected={pathname === child.href}>
                          <ListItemIcon>{child.icon}</ListItemIcon>
                          <ListItemText primary={child.title} />
                        </ListItemButton>
                      </Link>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </div>
        ))}
      </List>
    </div>
  );

  return (
    <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="navigation">
      {/* モバイル用ドロワー */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { width: drawerWidth, zIndex: (theme) => theme.zIndex.appBar - 1 },
        }}
      >
        {drawer}
      </Drawer>
      {/* デスクトップ用ドロワー */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { width: drawerWidth, zIndex: (theme) => theme.zIndex.appBar - 1 },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}
