import React from 'react';
import FilePreview from "./file-preview";
import file from "../../util/file";

export default class FileThumb extends React.Component {

    static defaultProps = {
        mediaConversion: 'thumb'
    };

    render() {
        return (
            <div className="file-thumb">
                <div className="file-thumb__preview">
                    <FilePreview file={this.props.file} style={['full']} mediaConversion={this.props.mediaConversion} />
                </div>
                <div className={'file-thumb__name'}>
                    {this.props.file.name}
                </div>
                <div className={'file-thumb__size'}>
                    {file.filesize(this.props.file.size)} ({this.props.file.disk})
                </div>
            </div>
        );
    }
}
