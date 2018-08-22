import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Button } from 'antd'

const FormItem = Form.Item
const { TextArea } = Input

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field])
}

export class FormAdd extends Component {
  constructor() {
    super()

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()

    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (this.props.dataToDo) {
          this.props.submitForm(
            Object.assign(
              {
                id: this.props.dataToDo.id,
                completed: this.props.dataToDo.completed,
                createdAt: this.props.dataToDo.createdAt
              },
              values
            )
          )
        } else {
          this.props.submitForm(values)
        }
      }
    })
  }

  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem>
          {getFieldDecorator('title', {
            rules: [{ required: true, message: 'title is required!' }]
          })(<Input placeholder="title" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('description', {
            rules: [{ required: true, message: 'description is required!' }]
          })(<TextArea rows={4} placeholder="description" />)}
        </FormItem>
        <div style={{ textAlign: 'right' }}>
          <Button
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
          >
            Save
          </Button>
        </div>
      </Form>
    )
  }
}

FormAdd.propTypes = {
  form: PropTypes.object.isRequired,
  submitForm: PropTypes.func.isRequired,
  dataToDo: PropTypes.object
}

export default Form.create({
  mapPropsToFields(props) {
    return {
      title: Form.createFormField({ value: props.dataToDo.title }),
      description: Form.createFormField({ value: props.dataToDo.description })
    }
  }
})(FormAdd)
