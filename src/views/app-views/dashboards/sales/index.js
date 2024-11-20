import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Input, Select, Popconfirm, message, DatePicker,Col,Row } from 'antd';
import moment from 'moment';

const { Option } = Select;

const Event = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [events, setEvents] = useState([]);
  const [eventCategories, setEventCategories] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingEvent, setEditingEvent] = useState(null);

  const API_BASE_URL = 'http://localhost:3000/api/admin';

  // Toggle modal for Add/Edit
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setIsEditing(false);
    setEditingEvent(null);
    form.resetFields();
  };

  // Fetch events and categories on component load
  useEffect(() => {
    fetchEvents();
    fetchEventCategories();
  }, []);

  // Handle search query updates
  useEffect(() => {
    const filtered = searchQuery
      ? events.filter((event) =>
          event.e_name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : events;
    setFilteredData(filtered);
  }, [searchQuery, events]);

  // Fetch events from API
  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getAllEvents`);
      setEvents(response.data.data || []);
      setFilteredData(response.data.data || []);
    } catch (error) {
      message.error('Failed to fetch events');
    }
  };

  // Fetch event categories for the dropdown
  const fetchEventCategories = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getEventCategory`);
      setEventCategories(response.data.data || []);
    } catch (error) {
      message.error('Failed to fetch event categories');
    }
  };

  // Add a new event
  const handlecreateEvent = async (values) => {
    try {
      await axios.post(`${API_BASE_URL}/createEvent`, values);
      message.success('Event added successfully');
      fetchEvents();
      toggleModal();
    } catch (error) {
      message.error('Failed to add event');
    }
  };

  // Edit an existing event
  const handleEditEvent = (event) => {
    setIsEditing(true);
    setEditingEvent(event);
    form.setFieldsValue({
      ...event,
      e_date: event.e_date ? moment(event.e_date) : null,
    });
    setIsModalOpen(true);
  };

  // Update an existing event
  const handleUpdateEvent = async (values) => {
    try {
      await axios.put(`${API_BASE_URL}/updateEvent/${editingEvent.id}`, values);
      message.success('Event updated successfully');
      fetchEvents();
      toggleModal();
    } catch (error) {
      message.error('Failed to update event');
    }
  };

  // Delete an event
  const handleDeleteEvent = async (eventId) => {
    try {
      await axios.delete(`${API_BASE_URL}/deleteEvent/${eventId}`);
      message.success('Event deleted successfully');
      fetchEvents();
    } catch (error) {
      message.error('Failed to delete event');
    }
  };

  const columns = [
    { title: 'S.No', dataIndex: 'id', key: 'id' },
    { title: 'Event', dataIndex: 'e_name', key: 'e_name' },
    { title: 'Category', dataIndex: 'e_category_id', key: 'e_category_id', render: (id) => {
        const category = eventCategories.find((cat) => cat.id === id);
        return category ? category.ec_name : 'N/A';
      },
    },
    { title: 'Short Description', dataIndex: 'e_short_description', key: 'e_short_description' },
    { title: 'Description', dataIndex: 'e_description', key: 'e_description' },
    { title: 'Date', dataIndex: 'e_date', key: 'e_date' },
    { title: 'Location', dataIndex: 'e_location', key: 'e_location' },
    { title: 'Status', dataIndex: 'e_status', key: 'e_status' },
    { title: 'Image', dataIndex: 'e_image', key: 'e_image', render: (image) => (
        <img src={`/images/${image}`} alt="Event" style={{ width: 50, height: 50 }} />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <span>
          <Button type="link" onClick={() => handleEditEvent(record)}>Edit</Button>
          <Popconfirm
            title="Are you sure you want to delete this event?"
            onConfirm={() => handleDeleteEvent(record.id)}
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
    <div className="events">
      <div className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Events</h2>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Input
            placeholder="Search events"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ marginRight: 16, width: 200, borderRadius: 0 }}
          />
          <Button type="primary" onClick={toggleModal} style={{ borderRadius: 0 }}>
            Add Event
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
  title={isEditing ? "Edit Event" : "Add New Event"}
  open={isModalOpen}
  onCancel={toggleModal}
  footer={null}
>
  <Form
    form={form}
    layout="vertical"
    onFinish={isEditing ? handleUpdateEvent : handlecreateEvent}
  >
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          name="e_category_id"
          label="Event Category"
          rules={[{ required: true, message: "Please select an event category" }]}
        >
          <Select placeholder="Select category">
            {eventCategories.map((category) => (
              <Option key={category.id} value={category.id}>
                {category.ec_name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="e_name"
          label="Event Name"
          rules={[{ required: true, message: "Please enter an event name" }]}
        >
          <Input />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="e_date"
          label="Event Date"
          rules={[{ required: true, message: "Please select an event date" }]}
        >
          <DatePicker format="DD-MM-YYYY" style={{ width: "100%" }} />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="e_location"
          label="Event Location"
          rules={[{ required: true, message: "Please enter an event location" }]}
        >
          <Input />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="e_description"
          label="Event Description"
          rules={[{ required: true, message: "Please enter an event description" }]}
        >
          <Input.TextArea />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="e_short_description"
          label="Short Description"
          rules={[{ required: true, message: "Please enter a short description" }]}
        >
          <Input.TextArea />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="e_image"
          label="Event Image"
          valuePropName="file"
          rules={[{ required: true, message: "Please upload an event image" }]}
        >
          <Input type="file" accept="image/*" />
        </Form.Item>
      </Col>
    </Row>
    <div style={{ textAlign: "right" }}>
      <Button type="default" onClick={toggleModal} style={{ marginRight: 8 }}>
        Cancel
      </Button>
      <Button type="primary" htmlType="submit">
        {isEditing ? "Update Event" : "Add Event"}
      </Button>
    </div>
  </Form>
</Modal>

    </div>
  );
};

export default Event;
