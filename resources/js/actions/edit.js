import React from 'react';
import components from "../rendering/components";
import Form from "../core/ui/form";
import api from "../api/api";
import path from "../state/path";
import http from "../util/http";
import ui from "../core/ui/util";

class Edit extends React.Component {

    static defaultProps = {
        type: '',
        components: [],
        path: {},
        id: 0,
        data: {},
        params: null,
        redirect: 'index',
        redirectBack: false,
        singular: '',
        plural: ''
    };

    constructor(props) {
        super(props);

        if (this.props.params) {
            this.props.path.params = this.props.params;
        }

        this.state = {
            data: {},
            formErrors: {}
        };

        this.formRef = React.createRef();
    }

    componentDidMount() {
        this.load();
    }

    load() {
        // Load the data from the backend (with id as param)
        api.execute.get(this.props.path, this.props.id,'load', this.props.path.params).then(response => {
            // Set the data to the state
            this.setState({
                data: response.data
            });
        });
    }

    save(data) {

        // Add the id to the data first
        data.id = this.props.path.params.id;

        // Post the data to the backend
        api.execute.post(this.props.path, this.props.id,'save', http.formData(data))
            .then(response => {
                // Ready the form
                this.formRef.current.ready();
                // Redirect
                this.redirect(response);
                // Notify the user
                ui.notify(`${this.props.singular} was successfully updated`);
            }, response => {
                // Ready the form
                this.formRef.current.ready();
                // Set the error messages
                this.setState({
                    formErrors: response.body.errors
                });
                ui.notify('The form contains errors');
            });
    }

    redirect(response) {
        path.handleRedirect(this.props, {id: response.data.id});
    }

    render() {
        return (
            <div className="edit">
                <Form
                    ref={this.formRef}
                    errors={this.state.formErrors}
                    onSubmit={this.save.bind(this)}
                    submitButtonText={`Save ${this.props.singular}`}
                >
                    {components.renderComponents(this.props.components, this.state.data, this.props.path)}
                </Form>
            </div>
        );
    }
}

export default Edit;
