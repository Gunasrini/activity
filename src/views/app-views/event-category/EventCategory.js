import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Input, Popconfirm, message } from 'antd';

const EventCategory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [eventCategories, setEventCategories] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);

  const API_BASE_URL = 'http://localhost:3000/api/admin';

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setIsEditing(false);
    setEditingCategory(null);
    form.resetFields();
  };

  useEffect(() => {
    fetchEventCategories();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = eventCategories.filter((category) =>
        category.ec_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(eventCategories);
    }
  }, [searchQuery, eventCategories]);

  // Fetch event categories from the API
  const fetchEventCategories = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getEventCategory`);
      setEventCategories(response.data.data);
      setFilteredData(response.data.data);
    } catch (error) {
      message.error('Failed to fetch event categories');
    }
  };

  // Handle the addition of a new event category
  const handleAddCategory = async (values) => {
    try {
      await axios.post(`${API_BASE_URL}/addEventCategory`, { ec_name: values.name });
      message.success('Event category added successfully');
      fetchEventCategories();
      toggleModal();
    } catch (error) {
      message.error('Failed to add event category');
    }
  };

  // Handle editing an existing event category
  const handleEditCategory = (category) => {
    setIsEditing(true);
    setEditingCategory(category);
    form.setFieldsValue({ name: category.ec_name });
    setIsModalOpen(true);
  };

  // Handle updating the event category
  const handleUpdateCategory = async (values) => {
    try {
      await axios.put(`${API_BASE_URL}/updateEventCategory/${editingCategory.id}`, { ec_name: values.name });
      message.success('Event category updated successfully');
      fetchEventCategories();
      toggleModal();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        message.error(error.response.data.message);
      } else {
        message.error('An unexpected error occurred');
      }
    }
  };

  // Handle deleting an event category
  const handleDeleteCategory = async (categoryId) => {
    try {
      await axios.delete(`${API_BASE_URL}/deleteEventCategory/${categoryId}`);
      message.success('Event category deleted successfully');
      fetchEventCategories();
    } catch (error) {
      message.error('Failed to delete event category');
    }
  };

  const columns = [
    { title: 'S.No', dataIndex: 'id', key: 'id' },
    { title: 'Category Name', dataIndex: 'ec_name', key: 'name' },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <span>
          <Button type="link" onClick={() => handleEditCategory(record)}>Edit</Button>
          <Popconfirm
            title="Are you sure to delete this category?"
            onConfirm={() => handleDeleteCategory(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>Delete</Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div className="event-category">
      <div className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Event Categories</h2>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Input
            placeholder="Search categories"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ marginRight: 16, width: 200, borderRadius: 0 }}
          />
          <Button type="primary" onClick={toggleModal} style={{ borderRadius: 0 }}>
            Add Category
          </Button>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        pagination={{ pageSize: 10, showSizeChanger: false, position: ['bottomRight'] }}
      />

      <Modal
        title={isEditing ? "Edit Event Category" : "Add New Event Category"}
        visible={isModalOpen}
        onCancel={toggleModal}
        footer={null}
      >
        <Form
          form={form}
          onFinish={isEditing ? handleUpdateCategory : handleAddCategory}
        >
          <Form.Item
            name="name"
            label="Category Name"
            rules={[{ required: true, message: 'Please enter a category name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item className="form-buttons" style={{ textAlign: 'right' }}>
            <Button type="default" onClick={toggleModal} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              {isEditing ? "Update Category" : "Add Category"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EventCategory;
