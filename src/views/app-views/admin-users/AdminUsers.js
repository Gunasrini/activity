import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Input, Select, Popconfirm, message, Checkbox } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import './AdminUsers.css';

const { Option } = Select;

const AdminUsers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [userData, setUserData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [roles, setRoles] = useState([]);
  const [form] = Form.useForm();
  const [isAdministrator, setIsAdministrator] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordForm] = Form.useForm();
  const [permissions, setPermissions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchUsers();
    fetchRoles();
    loadPermissions();
  }, []);

  useEffect(() => {
    if (isEditing && editingUser) {
      form.setFieldsValue({
        firstName: editingUser.firstName,
        lastName: editingUser.lastName,
        email: editingUser.email,
        role: editingUser.roleName,
        isAdministrator: editingUser.au_is_administrator,
      });
      setIsAdministrator(editingUser.au_is_administrator === 1);
    } else {
      form.resetFields();
      setIsAdministrator(false);
    }
  }, [isEditing, editingUser, form]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = userData.filter(
        (user) =>
          user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(userData);
    }
  }, [searchQuery, userData]);

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

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://159.89.167.135:3000/api/admin/getUsers');
      setUserData(response.data.data);
      setFilteredData(response.data.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      message.error('Failed to fetch users');
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await axios.get('http://159.89.167.135:3000/api/admin/getRole');
      setRoles(response.data.data);
    } catch (error) {
      console.error('Error fetching roles:', error);
      message.error('Failed to fetch roles');
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setIsEditing(false);
    setEditingUser(null);
    form.resetFields();
  };

  const handleAddUser = async (values) => {
    try {
      await axios.post('http://159.89.167.135:3000/api/admin/createUser', { ...values, au_is_administrator: isAdministrator ? 1 : 0 });
      message.success('User added successfully');
      fetchUsers();
      toggleModal();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        message.error(error.response.data.message);
      } else {
        message.error('An unexpected error occurred');
      }
    }
  };

  const handleEditUser = (record) => {
    setIsEditing(true);
    setEditingUser(record);
    setIsModalOpen(true);
  };

  const handleUpdateUser = async (values) => {
    try {
      await axios.put(`http://159.89.167.135:3000/api/admin/updateUser/${editingUser.id}`, { ...values, au_is_administrator: isAdministrator ? 1 : 0 });
      message.success('User updated successfully');
      fetchUsers();
      toggleModal();
    } catch (error) {
      console.error('Error updating user:', error);
      message.error('Failed to update user');
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://159.89.167.135:3000/api/admin/deleteUser/${id}`);
      message.success('User deleted successfully');
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      message.error('Failed to delete user');
    }
  };

  const handleChangePassword = (record) => {
    setEditingUser(record);
    setIsPasswordModalOpen(true);
  };

  const handlePasswordChange = async (values) => {
    try {
      await axios.put(`http://159.89.167.135:3000/api/admin/changePassword/${editingUser.id}`, {
        password: values.password,
      });
      message.success('Password changed successfully');
      setIsPasswordModalOpen(false);
      passwordForm.resetFields();
    } catch (error) {
      console.error('Error changing password:', error);
      message.error('Failed to change password');
    }
  };

  const columns = [
    { title: 'S.No', dataIndex: 'id', key: 'id' },
    { title: 'First Name', dataIndex: 'firstName', key: 'firstName' },
    { title: 'Last Name', dataIndex: 'lastName', key: 'lastName' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Role', dataIndex: 'roleName', key: 'roleName' },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <span>
          {hasPermission(9, 'edit') && (
            <Button type="link" onClick={() => handleEditUser(record)}>Edit</Button>
          )}
          {hasPermission(9, 'edit') && (
            <Button
              type="link"
              icon={<LockOutlined />}
              onClick={() => handleChangePassword(record)}
            >
              Change Password
            </Button>
          )}
          {hasPermission(9, 'delete') && (
            <Popconfirm title="Are you sure to delete this user?" onConfirm={() => handleDeleteUser(record.id)}>
              <Button type="link" danger>Delete</Button>
            </Popconfirm>
          )}
        </span>
      ),
    },
  ];

  return (
    <div className="admin-users">
      <div className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Admin Users</h2>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Input
            placeholder="Search users"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ marginRight: 16, width: 200, borderRadius: 0 }}
          />
          {hasPermission(9, 'add') && (
            <Button type="primary" onClick={toggleModal} style={{ borderRadius: 0 }}>
              Add User
            </Button>
          )}
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        pagination={{ pageSize: 10, showSizeChanger: false, position: ['bottomRight'] }}
      />

      {/* Add/Edit User Modal */}
      <Modal
        title={isEditing ? "Edit User" : "Add New User"}
        visible={isModalOpen}
        onCancel={toggleModal}
        footer={null}
      >
        <Form
          form={form}
          onFinish={isEditing ? handleUpdateUser : handleAddUser}
        >
          <Form.Item label="Name" style={{ marginBottom: 0 }}>
            <Form.Item
              name="firstName"
              rules={[{ required: true, message: 'Please enter the first name' }]}
              style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
            >
              <Input placeholder="First Name" />
            </Form.Item>
            <Form.Item
              name="lastName"
              rules={[{ required: true, message: 'Please enter the last name' }]}
              style={{ display: 'inline-block', width: 'calc(50% - 8px)', marginLeft: '16px' }}
            >
              <Input placeholder="Last Name" />
            </Form.Item>
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Please enter a valid email', type: 'email' }]}
          >
            <Input />
          </Form.Item>
          {!isEditing && (
            <>
              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true, message: 'Please enter the password' }]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                name="confirmPassword"
                label="Confirm Password"
                dependencies={['password']}
                rules={[
                  { required: true, message: 'Please confirm the password' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('The passwords do not match!'));
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
            </>
          )}
          <Form.Item
            name="isAdministrator"
            valuePropName="checked"
          >
            <Checkbox
              checked={isAdministrator}
              onChange={(e) => setIsAdministrator(e.target.checked)}
            >
              Administrator
            </Checkbox>
          </Form.Item>
          {!isAdministrator && (
            <Form.Item
              name="role"
              label="Role"
              rules={[{ required: !isAdministrator, message: 'Please select a role' }]}
            >
              <Select placeholder="Select Role">
          {roles.map((role) => (
            <Select.Option key={role.id} value={role.id}>
              {role.rm_role_name}
            </Select.Option>
          ))}
        </Select>
            </Form.Item>
          )}
          <Form.Item className="form-buttons" style={{ textAlign: 'right' }}>
            <Button type="default" onClick={toggleModal} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              {isEditing ? "Update User" : "Add User"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>


      {/* Change Password Modal */}
      <Modal
        title="Change Password"
        visible={isPasswordModalOpen}
        onCancel={() => setIsPasswordModalOpen(false)}
        footer={null}
      >
        <Form
          form={passwordForm}
          onFinish={handlePasswordChange}
        >
          <Form.Item
            name="password"
            label="New Password"
            rules={[{ required: true, message: 'Please enter the new password' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm the password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The passwords do not match!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item className="form-buttons" style={{ textAlign: 'right' }}>
            <Button type="default" onClick={() => setIsPasswordModalOpen(false)} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Change Password
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminUsers;
