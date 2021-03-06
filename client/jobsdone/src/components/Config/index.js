import React, { Component } from 'react';
import api from '../../services/api';
import { logout } from '../../services/auth';
import { Form, Input } from '@rocketseat/unform';

import ConfirmButton from '../../components/ConfirmButton';

import { Container, FormBox, TypesBox, LogoutBox } from './styles';

class Config extends Component {
  state = {
    types: [],
    currency: '',
    meta: '',
    editingTypeId: undefined,
    loading: true,
  };

  async componentDidMount() {
    await this.updateList();
  }

  updateList = async () => {
    const userId = localStorage.getItem('@jobsdone-id');
    const types = await api.get('types');
    const settings = await api.get(`users/${userId}`);
    const { meta, currency } = settings.data;
    this.setState({
      types: types.data,
      meta: meta,
      currency,
      loading: false,
      editingTypeId: undefined,
    });
  };

  removeItem = async id => {
    this.setState({ loading: true });
    await api.delete(`types/${id}`);
    this.updateList();
  };

  editItem = id => {
    this.setState({ loading: false, editingTypeId: id });
  };

  handleTypeUpdate = async data => {
    this.setState({ loading: true });
    await api.put(`types/${data.id}`, { title: data.title });
    this.updateList();
  };

  handleSubmit = async ({ meta, currency }) => {
    const userId = localStorage.getItem('@jobsdone-id');
    await api.put(`users/${userId}`, { meta, currency });
    this.updateList();
    window.location.reload();
  };

  addType = async (e, { resetForm }) => {
    let input = document.getElementById('title');
    if (!e.title) {
      input.classList.add('invalid');
    } else {
      input.classList.remove('invalid');
    }
    await api.post(`types`, { title: e.title });
    this.updateList();
    resetForm();
    window.location.reload();
  };

  handleLogout = () => {
    logout();
    window.location.reload();
  };

  render() {
    const { currency, meta, types, loading, editingTypeId } = this.state;

    const displayType = type => (
      <li key={type.id}>
        <span className="type-title">{type.title}</span>
        <div>
          <button
            className="edit-btn"
            onClick={() => {
              this.editItem(type.id);
            }}
          >
            edit
          </button>
          <ConfirmButton
            className="remove-btn"
            dialog={['X', 'confirm']}
            action={() => {
              this.removeItem(type.id);
            }}
          >
            x
          </ConfirmButton>
        </div>
      </li>
    );

    const editType = type => (
      <li key={type.id}>
        <FormBox>
          <Form onSubmit={this.handleTypeUpdate} initialData={{ ...type }}>
            <Input type="hidden" name="id" />
            <Input type="text" name="title" placeholder={type.text || 'text'} />
            <button type="submit" className="teal-btn">
              Update
            </button>
          </Form>
        </FormBox>
      </li>
    );

    const initialData = {
      meta: meta,
      currency: currency,
    };

    return (
      <Container>
        <h3>Your app configuration</h3>
        <FormBox>
          <Form onSubmit={this.handleSubmit} initialData={initialData}>
            <div>
              <label htmlFor="meta">Daily Meta (in {currency})</label>
              <Input type="number" name="meta" placeholder="1000" className="meta" />
            </div>
            <div>
              <label htmlFor="currency">Currency</label>
              <Input type="text" name="currency" placeholder="$" className="currency" required />
            </div>
            <div className="save-btn">
              <button type="submit" className="teal-btn">
                Save
              </button>
            </div>
          </Form>
        </FormBox>

        <TypesBox>
          <h4>Types</h4>
          <div>
            {!loading ? (
              types.length > 0 ? (
                <ul>{types && types.map(type => (type.id !== editingTypeId ? displayType(type) : editType(type)))}</ul>
              ) : (
                <div className="nothing-box">Nothing??</div>
              )
            ) : (
              <p>loading...</p>
            )}
            <Form onSubmit={this.addType}>
              <label htmlFor="title">New Type</label>
              <Input type="text" name="title" placeholder={'Type Title'} />
              <button type="submit" className="teal-btn">
                Add
              </button>
            </Form>
          </div>
        </TypesBox>
        <LogoutBox>
          <button onClick={() => this.handleLogout()}>Logout</button>
        </LogoutBox>
      </Container>
    );
  }
}

export default Config;
