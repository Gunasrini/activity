import { 
  DashboardOutlined, 
  DotChartOutlined,
  FundOutlined,
  UserOutlined,
  CalendarOutlined,
  TrophyOutlined,
  FileTextOutlined,
  SettingOutlined,
  UserSwitchOutlined,
  SafetyOutlined,
  TeamOutlined,
  AppstoreAddOutlined
} from '@ant-design/icons';
import { APP_PREFIX_PATH, AUTH_PREFIX_PATH } from 'configs/AppConfig'


const iconMap = {
  DashboardOutlined,
  DotChartOutlined,
  FundOutlined,
  UserOutlined,
  CalendarOutlined,
  TrophyOutlined,
  FileTextOutlined,
  SettingOutlined,
  UserSwitchOutlined,
  SafetyOutlined,
  TeamOutlined,
  AppstoreAddOutlined
};

// Load menuList from localStorage and parse it
// const menuList = JSON.parse(localStorage.getItem('user_menu'));
const menuList = JSON.parse(localStorage.getItem('user_menu') || '[]');
const transformMenuToNavTree = (menuData) => {
  return menuData.map(item => ({
    key: item.name,
    path: `${APP_PREFIX_PATH}${item.path}`,
    title: item.name,
    icon: iconMap[item.icon] || null,  // Map icon using iconMap
    breadcrumb: false,
    isGroupTitle: false,
    submenu: item.submenu ? transformMenuToNavTree(item.submenu) : []
  }));
};

const dashBoardNavTree = transformMenuToNavTree(menuList || []);

const navigationConfig = [
  ...dashBoardNavTree,
];

export default navigationConfig;
