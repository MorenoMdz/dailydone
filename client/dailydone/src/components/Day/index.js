import React, { Component } from 'react';
import api from '../../services/api';
import DatePicker from 'react-datepicker';
import { Form } from '@rocketseat/unform';
import { format } from 'date-fns';

import ConfirmButton from '../../components/ConfirmButton';

import { Container, ToolBox, DateBox, FormBox, FormInput, FormSelect, TasksList } from './styles';

class List extends Component {
  state = {
    list: [],
    types: [],
    flash: '',
    error: '',
    editingItemId: '',
    loading: true,
    selectedDate: format(Date.now(), 'MM/DD/YYYY'),
    showCalendar: false,
  };

  async componentDidMount() {
    const { selectedDate } = this.state;
    this.fetchTypes();
    this.fetchList(selectedDate);
  }

  toggleCalendar = () => {
    const showCalendar = !this.state.showCalendar;
    this.setState({ showCalendar });
  };

  handleChange = async e => {
    const selectedDate = format(e, 'MM/DD/YYYY');
    this.setState({ selectedDate });
    this.fetchList(selectedDate);
    this.toggleCalendar();
  };

  fetchList = async date => {
    const response = await api.get(`completed?date=${date}&_expand=type`);
    const flatList = await response.data.map(item => ({ ...item, type: item.type.title }));
    this.setState({ list: flatList, loading: false, editingItemId: '' });
    const total = await this.getTotal();
    const { setTotal } = this.props;
    setTotal(total);
  };

  fetchTypes = async () => {
    const response = await api.get('types');
    this.setState({ types: response.data });
  };

  getTotal = () => {
    const { list } = this.state;
    let total = list.map(item => parseInt(item.value)).reduce((a, b) => a + b, 0);
    return total;
  };

  removeItem = async id => {
    this.setState({ loading: true });
    await api.delete(`completed/${id}`);
    const { selectedDate } = this.state;
    this.fetchList(selectedDate);
  };

  editItem = id => {
    this.setState({ loading: false, editingItemId: id });
  };

  handleUpdate = async data => {
    this.setState({ loading: true });
    const { selectedDate } = this.state;
    console.log(selectedDate);
    await api.put(`completed/${data.id}`, { ...data, date: selectedDate });
    this.fetchList(selectedDate);
  };

  handleSubmit = async (data, { resetForm }) => {
    this.setState({ loading: true });
    const id = Math.floor(Math.random() * 1000); //to be removed
    const { selectedDate } = this.state;
    await api.post(`completed/`, {
      ...data,
      date: selectedDate,
      id,
    });
    this.fetchList(selectedDate);
    resetForm();
  };

  render() {
    const { list, types, flash, loading, editingItemId, showCalendar, selectedDate } = this.state;

    const displayItem = item => (
      <li key={item.id}>
        <span className="text">{item.text}</span>
        <span className="type">{item.type}</span>
        <span className="value">{item.value}</span>
        <span className="duration">{item.duration}</span>

        <div className="btn-box">
          <button
            className="edit-btn"
            onClick={() => {
              this.editItem(item.id);
            }}
          >
            edit
          </button>
          <ConfirmButton
            className="remove-btn"
            dialog={['X', 'confirm']}
            action={() => {
              this.removeItem(item.id);
            }}
          >
            x
          </ConfirmButton>
        </div>
      </li>
    );

    const editItem = item => (
      <li key={item.id}>
        <FormBox>
          <Form onSubmit={this.handleUpdate} initialData={{ ...item }}>
            <FormInput type="hidden" name="id" />
            <FormInput type="text" name="text" placeholder={item.text || 'text'} />
            <FormSelect name="typeId" options={types} required />
            <FormInput type="number" name="value" placeholder={item.value || 'value'} />
            <FormInput type="number" name="duration" placeholder={item.duration || 'duration'} />
            <button type="submit" className="save-btn">
              Update
            </button>
          </Form>
        </FormBox>
      </li>
    );

    return (
      <Container>
        <ToolBox>
          {/* <p>{flash && flash}</p> */}
          <button onClick={this.toggleCalendar} className="teal-btn">
            Select a Day
          </button>
          <span>Day: {selectedDate}</span>
        </ToolBox>
        {showCalendar && (
          <DateBox id="daily-box">
            <DatePicker
              inline
              selected={Date.now()}
              maxDate={new Date()}
              onChange={e => {
                this.handleChange(e, 'day');
              }}
              dateFormat="yyyy/MM/dd"
            />
          </DateBox>
        )}
        <div>
          <FormBox>
            <Form onSubmit={this.handleSubmit}>
              <FormInput type="text" name="text" placeholder="Text" required />
              <FormSelect name="typeId" options={types} required />
              <FormInput type="number" name="value" placeholder="Value" required />
              <FormInput type="number" name="duration" placeholder="Duration" required />
              <button type="submit">Save</button>
            </Form>
          </FormBox>
          <TasksList>
            {!loading ? (
              list.length > 0 ? (
                <ul>{list && list.map(item => (item.id !== editingItemId ? displayItem(item) : editItem(item)))}</ul>
              ) : (
                <div className="nothing-box">Nothing to list in this day</div>
              )
            ) : (
              <p>loading...</p>
            )}
          </TasksList>
        </div>
      </Container>
    );
  }
}

export default List;

// nav calls function up in List
// function sets month or day
// display month or day
