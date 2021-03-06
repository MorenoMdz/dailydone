import styled from 'styled-components';
import { Input, Select } from '@rocketseat/unform';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 10px 12px;
  background: #333;
  flex: 1;
  min-height: calc(100vh - 150px);
  position: relative;
  overflow: auto;

  .teal-btn {
    color: #ddd;
    font-weight: bold;
    border: 3px #1c6a6c solid;
    background-color: #11464e;
    padding: 3px 10px;
  }

  .save-btn {
    display: flex;
    justify-content: center;
    margin: 10px 0;
    display: inline;
  }

  @media (max-width: 599px) {
    width: 100vw;
  }
`;

export const TasksList = styled.div`
  .nothing-box {
    height: 15vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  li {
    display: flex;
    flex-direction: row;
    list-style: none;
    padding: 5px 0;
    opacity: 0.8;

    :nth-child(even) {
      background-color: #383838;
    }

    span {
      padding: 3px;
      margin: 0 5px;
      text-align: center;
    }

    .text {
      width: 475px;
      text-align: left;
      padding-left: 10px;
    }

    .type,
    .value,
    .time,
    .duration {
      width: 123px;
    }

    button {
      display: none;
      padding: 3px 10px;
      margin: 0 3px;
      border-radius: 2px;
      font-weight: bold;
      cursor: pointer;
    }

    .btn-box {
      width: 102px;
    }

    .edit-btn {
      color: #fff;
      background-color: #00b8ff;
      width: 60px;
    }

    .remove-btn {
      color: #fff;
      background-color: #d900ff;
      margin-left: 3px;
      text-align: center;
      width: 30px;
    }

    [level='1'] {
      color: #fff;
      background-color: #bd00ff;
      padding: 2px;
      max-width: 60px;
    }

    :hover {
      opacity: 1;
      button {
        display: inline;
      }
    }
  }

  .show-sm {
    display: none;
  }

  @media (max-width: 599px) {
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;

    ul {
      width: 100%;
    }

    li {
      justify-content: center;
      align-items: center;
      display: flex;
      flex-wrap: wrap;

      span {
        margin: 2px auto !important;
        border-bottom: 1px solid #555;
        line-height: 1.5rem;
        span {
          border-bottom: none;
        }
      }
    }

    .show-sm {
      display: inline;
    }

    .column {
      width: 48% !important;
    }
    .row {
      width: 98% !important;
      background: teal;
      text-align: center !important;
      height: 25px;
      font-weight: bold;
      text-transform: capitalize;
    }
    .btn-box {
      display: flex;
      justify-content: space-around;
      align-items: center;

      button {
        margin: 2px auto !important;
        width: 49%;
        display: inline;
      }
    }
  }
`;

export const FormBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  z-index: 20;

  form {
    width: 100%;
  }

  button {
    color: #fff;
    font-weight: bold;
    border: 3px #1c6a6c solid;
    background-color: #11464e;
    padding: 5px;
    margin: 0 5px;
    width: 100px;
    height: 30px;
    font-weight: bold;
    cursor: pointer;

    :hover {
      opacity: 0.9;
    }
  }

  input {
    padding: 3px;
    margin: 0 5px;
    outline: none;
    height: 30px;
  }

  [name='title'] {
    width: 475px;
    text-align: left;
    padding-left: 10px;
  }

  [name='type'],
  [name='value'],
  [name='duration'] {
    width: 123px;
  }

  input:invalid {
    background: #ccc;
  }
  input:required:focus {
    border: 1px solid teal;
    outline: none;
  }
  input:required:hover {
    opacity: 1;
  }
  @media (max-width: 599px) {
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;

    form {
      justify-content: center;
      align-items: center;
      display: flex;
      flex-wrap: wrap;

      input {
        height: 30px;
        margin: 2px 2px;
      }

      button {
        margin: 2px 2px;
      }
    }

    .column {
      width: 48%;
    }
    .row {
      width: 98%;
    }
  }
`;

export const FormInput = styled(Input)`
  text-align: center;
  padding: 5px;
`;

export const FormSelect = styled(Select)`
  width: 123px;
  margin: 0 2px;
  text-align: center;
  padding: 3px;
`;

export const DateBox = styled.div`
  top: 50px;
  left: 20px;
  background-color: rgba(33, 33, 33, 0.7);
  padding: 10px;
  position: absolute;
  display: flex;
  justify-content: flex-start;
  z-index: 1;
`;

export const ToolBox = styled.div`
  position: relative;
  width: 100%;
  padding: 5px 10px;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    padding: 5px;
    font-weight: bold;
  }
`;
