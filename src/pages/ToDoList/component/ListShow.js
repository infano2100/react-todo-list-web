import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment'
import { Button, Icon, Popconfirm, message, Modal, Table, Checkbox } from 'antd'

import FormAdd from './FormAdd'
import { addTodo, delTodo, editTodo, changeStatusTodo } from '../../../actions/'

export class ListShow extends Component {
  constructor(props) {
    super(props)

    this.state = {
      visible: false,
      dataToDo: {}
    }

    this.add = this.add.bind(this)
    this.edit = this.edit.bind(this)
    this.del = this.del.bind(this)
    this.onEdit = this.onEdit.bind(this)
    this.showModal = this.showModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  async add(data) {
    await this.props.addTodo(data)

    await this.setState({
      visible: false
    })
    await message.success('Add Success')
  }

  async edit(data) {
    await this.props.editTodo(data)

    if (data) {
      this.setState({
        visible: false,
        dataToDo: {}
      })
    }
    message.success('Edit Success')
  }

  del(id) {
    this.props.delTodo(id)
    message.success('Delete Success')
  }

  showModal() {
    this.setState({
      visible: true
    })
  }

  closeModal() {
    this.setState({
      visible: false,
      dataToDo: {}
    })
  }

  onEdit(data) {
    this.setState({
      visible: true,
      dataToDo: data
    })
  }

  render() {
    const columns = [
      {
        title: 'ToDo List',
        dataIndex: '',
        key: 'title',
        render: item => (
          <div>
            <Checkbox
              checked={item.completed}
              onChange={() => this.props.changeStatusTodo(item.id)}
            />
            <span
              style={
                item.completed === true
                  ? styles.completedCheckBox
                  : styles.defaultCheckBox
              }
            >
              {item.completed === true ? <Icon type="check" /> : null}
              {item.title}
            </span>
          </div>
        )
      },
      {
        title: 'Action',
        dataIndex: '',
        align: 'right',
        render: item => (
          <div>
            <a
              style={{ paddingRight: '1em' }}
              onClick={() => this.onEdit(item)}
            >
              <Icon type="edit" />
            </a>
            <Popconfirm
              placement="leftTop"
              title="Are you sure delete?"
              onConfirm={() => this.del(item.id)}
              okText="Yes"
              cancelText="No"
            >
              <Icon style={{ color: 'red' }} type="delete" />
            </Popconfirm>
          </div>
        )
      }
    ]

    const { dataToDo } = this.state
    const { list } = this.props
    return (
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ marginBottom: 16 }}>ToDo List</h1>
        <div style={{ textAlign: 'left', marginBottom: '1em' }}>
          <Button onClick={this.showModal} type="primary">
            ADD
          </Button>
        </div>
        <Table
          // rowSelection={rowSelection}
          columns={columns}
          expandedRowRender={record => (
            <div>
              <p style={{ margin: 0 }}>ID : {record.id}</p>
              <p style={{ margin: 0 }}>Description : {record.description}</p>
              <p style={{ margin: 0 }}>
                Date : {moment(record.createdAt).format('LLL')}
              </p>
            </div>
          )}
          dataSource={list}
          rowKey={record => record.id}
        />

        <Modal
          title={
            Object.getOwnPropertyNames(dataToDo).length === 0
              ? 'Add Todo List'
              : 'Edit Todo List'
          }
          visible={this.state.visible}
          footer={null}
          onCancel={this.closeModal}
        >
          <FormAdd
            dataToDo={dataToDo}
            submitForm={
              Object.getOwnPropertyNames(dataToDo).length === 0
                ? this.add
                : this.edit
            }
          />
        </Modal>
      </div>
    )
  }
}

const styles = {
  defaultCheckBox: {
    color: 'rgba(0, 0, 0, 0.65)'
  },
  completedCheckBox: {
    color: 'green',
    textDecoration: 'line-through'
  }
}

const mapStateToProps = state => {
  return {
    list: state.data
  }
}

export const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addTodo,
      delTodo,
      editTodo,
      changeStatusTodo
    },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListShow)
