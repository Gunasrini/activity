import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Modal, message, Checkbox, Popconfirm } from 'antd';
import axios from 'axios';
import { SettingOutlined } from '@ant-design/icons';
import './RoleMaster.css';

const RoleMaster = () => {
  const [roles, setRoles] = useState([]);
  const [newRoleName, setNewRoleName] = useState('');
  const [editRoleId, setEditRoleId] = useState(null);
  const [editRoleName, setEditRoleName] = useState('');
  const [isAddRoleModalVisible, setIsAddRoleModalVisible] = useState(false);
  const [isPermissionModalVisible, setIsPermissionModalVisible] = useState(false);
  const [menuList, setMenuList] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedPermissions, setSelectedPermissions] = useState({});
  const [permissions, setPermissions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchRoles();
    loadMenuList();
    loadPermissions();
  }, []);

  const loadPermissions = () => {
    const storedPermissions = JSON.parse(localStorage.getItem('permissions'));
    setPermissions(storedPermissions || []);
  };

  const hasPermission = (menuId, action) => {
    if (!permissions || permissions.length === 0) {
      return true; // Super admin has all permissions
    }
    const permission = permissions.find((perm) => perm.menu_id === menuId);
    return permission ? permission[action] === 1 : false;
  };

  const loadMenuList = () => {
    const menu = localStorage.getItem('user_menu');
    if (menu) {
      try {
        const parsedMenu = JSON.parse(menu);
        setMenuList(parsedMenu);
      } catch (error) {
        console.error("Error parsing menu:", error);
      }
    } else {
      console.warn("No 'user_menu' found in localStorage.");
      setMenuList([]);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await axios.get('http://159.89.167.135:3000/api/admin/getRole');
      setRoles(response.data.data);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  const handleAddRole = async () => {
    if (!newRoleName.trim()) return;
    try {
      await axios.post('http://159.89.167.135:3000/api/admin/addRole', { role_name: newRoleName });
      message.success('Role added successfully');
      setNewRoleName('');
      setIsAddRoleModalVisible(false);
      fetchRoles();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        message.error(error.response.data.message);
      } else {
        message.error('An unexpected error occurred');
      }
    }
  };

  const handleUpdateRole = async () => {
    if (!editRoleName.trim()) return;
    try {
      await axios.put(`http://159.89.167.135:3000/api/admin/updateRole/${editRoleId}`, { role_name: editRoleName });
      message.success('Role updated successfully');
      setEditRoleId(null);
      setEditRoleName('');
      fetchRoles();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        message.error(error.response.data.message);
      } else {
        message.error('An unexpected error occurred');
      }
    }
  };

  const handleDeleteRole = async (id) => {
    try {
      await axios.delete(`http://159.89.167.135:3000/api/admin/deleteRole/${id}`);
      message.success('Role deleted successfully');
      fetchRoles();
    } catch (error) {
      message.error('Error deleting role');
    }
  };

  const handlePermissionChange = (category, action, isSubmenu = false, parentCategory = null) => {
    setSelectedPermissions((prevPermissions) => {
      const newPermissions = { ...prevPermissions };

      // If it is a submenu, ensure the parent (master) menu is selected first
      if (isSubmenu && parentCategory && !newPermissions[parentCategory]?.view) {
        message.warning(`Please select the master menu "${parentCategory}" first.`);
        return newPermissions;
      }

      // Toggle the permission
      if (!newPermissions[category]) {
        newPermissions[category] = {};
      }
      newPermissions[category][action] = !newPermissions[category][action];

      // If unselecting a master menu, unselect all its submenus
      if (!newPermissions[category].view && action === 'view' && !isSubmenu) {
        menuList
          .find(menuItem => menuItem.name === category)
          ?.submenu?.forEach(submenu => {
            newPermissions[submenu.name] = { view: false, add: false, edit: false, delete: false };
          });
      }

      return newPermissions;
    });
  };

  const openPermissionModal = async (role) => {
    console.log("seleted role", role);
    setSelectedRole(role);
    try {
      const response = await axios.get(`http://159.89.167.135:3000/api/admin/getRolePermissions/${role.id}`);
      setSelectedPermissions(response.data.permissions || {});
    } catch (error) {
      console.error("Error loading permissions:", error);
    }
    setIsPermissionModalVisible(true);
  };

  const closePermissionModal = () => {
    setIsPermissionModalVisible(false);
    setSelectedPermissions({});
    setSelectedRole(null);
  };

  const savePermissions = async () => {
    if (selectedRole) {
      try {
        await axios.post('http://159.89.167.135:3000/api/admin/setRolePermission', {
          role_id: selectedRole.id,
          permissions: selectedPermissions,
        });
        message.success('Permissions added successfully');
        fetchRoles();
      } catch (error) {
        message.error('Error updating permissions');
      }
    }
    closePermissionModal();
  };

  const startEditing = (role) => {
    setEditRoleId(role.id);
    setEditRoleName(role.rm_role_name);
  };

  const filteredRoles = roles.filter(role =>
    role.rm_role_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Role Name',
      dataIndex: 'rm_role_name',
      key: 'rm_role_name',
      render: (text, record) =>
        editRoleId === record.id ? (
          <Input
            value={editRoleName}
            onChange={(e) => setEditRoleName(e.target.value)}
            onPressEnter={handleUpdateRole}
          />
        ) : (
          text
        ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) =>
        editRoleId === record.id ? (
          <>
            <Button type="primary" onClick={handleUpdateRole} style={{ marginRight: 8 }}>Save</Button>
            <Button onClick={() => setEditRoleId(null)}>Cancel</Button>
          </>
        ) : (
          <>
            {hasPermission(7, 'edit') && (<SettingOutlined
              style={{ fontSize: '20px', marginRight: '8px', cursor: 'pointer' }}
              onClick={() => openPermissionModal(record)}
            />)}
            {hasPermission(7, 'edit') && (<Button type="link" onClick={() => startEditing(record)} style={{ marginRight: 8 }}>
              Edit
            </Button>)}
            {/* {hasPermission(7, 'delete') && (<Button onClick={() => handleDeleteRole(record.id)} danger>
              Delete
            </Button>)} */}
            {hasPermission(7, 'delete') && (
              <Popconfirm title="Are you sure to delete this role?" onConfirm={() => handleDeleteRole(record.id)}>
                <Button type="link" danger>Delete</Button>
              </Popconfirm>
            )}
          </>
        ),
    },
  ];

  return (
    <div className="role-master-container">
      <div className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2>Role Master</h2>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Input
            placeholder="Search roles"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ marginRight: 16, width: 200, borderRadius: 0 }}
          />
          {hasPermission(7, 'add') && (
            <Button
              type="primary"
              onClick={() => setIsAddRoleModalVisible(true)}
              style={{ borderRadius: 0 }}
            >
              Add Role Master
            </Button>
          )}
        </div>
      </div>


      <Table
        columns={columns}
        dataSource={filteredRoles}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />

      {/* Modal for Adding New Role */}
      <Modal
        title="Add New Role"
        visible={isAddRoleModalVisible}
        onOk={handleAddRole}
        onCancel={() => setIsAddRoleModalVisible(false)}
        okText="Add"
        cancelText="Cancel"
      >
        <Input
          placeholder="Enter role name"
          value={newRoleName}
          onChange={(e) => setNewRoleName(e.target.value)}
        />
      </Modal>

      {/* Modal for Role Permissions */}
      <Modal
        title={`${selectedRole?.rm_role_name} Permissions`}
        visible={isPermissionModalVisible}
        onOk={savePermissions}
        onCancel={closePermissionModal}
        footer={[
          <Button key="cancel" onClick={closePermissionModal}>
            Cancel
          </Button>,
          <Button key="save" type="primary" onClick={savePermissions}>
            Save
          </Button>,
        ]}
      >
        <table className="permissions-table" style={{ width: '100%' }}>
          <thead>
            <tr style={{ backgroundColor: 'white' }}>
              <th>Permission</th>
              <th>View</th>
              <th>Add</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {menuList && menuList.length > 0 ? (
              menuList.map((menuItem, index) => (
                <React.Fragment key={index}>
                  <tr style={{ fontWeight: 'bold' }}>
                    <td>{menuItem.name}</td>
                    {["view", "add", "edit", "delete"].map((action) => (
                      <td key={action}>
                        <Checkbox
                          checked={selectedPermissions[menuItem.name]?.[action] || false}
                          onChange={() => handlePermissionChange(menuItem.name, action)}
                        />
                      </td>
                    ))}
                  </tr>

                  {/* Render submenu items with disabled option if master menu is not selected */}
                  {menuItem.submenu && menuItem.submenu.length > 0 && (
                    menuItem.submenu.map((submenu, subIndex) => (
                      <tr key={`${index}-${subIndex}`}>
                        <td style={{ paddingLeft: '20px' }}>{submenu.name}</td>
                        {["view", "add", "edit", "delete"].map((action) => (
                          <td key={action}>
                            <Checkbox
                              checked={selectedPermissions[submenu.name]?.[action] || false}
                              onChange={() => handlePermissionChange(submenu.name, action, true, menuItem.name)}
                              disabled={!selectedPermissions[menuItem.name]?.view}
                            />
                          </td>
                        ))}
                      </tr>
                    ))
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan="5">No menu items available</td>
              </tr>
            )}
          </tbody>
        </table>
      </Modal>

    </div>
  );
};

export default RoleMaster;
