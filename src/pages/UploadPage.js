import Axios from "axios";
import React, { Component } from "react";
import FileUploadSelector from "../components/FileUploadSelector";
import ProblemSelector from "../components/ProblemSelector";
import StageSelector from "../components/StageSelector";
import TitledForm from "../components/TitledForm";
import ApiURI from "../urls/ApiURIs";

export default class UploadPage extends Component {
  state = {
    title: "",
    description: "",
  };

  handleFileSelect = event => {
    const file = event.target.files[0];
    if (!this.checkCorrectFile(file)) return;

    this.preprocessFile(file);

    this.setState({
      selectedFile: file,
    });
  };

  handleSubmit = async () => {
    if (this.state.selectedFile === undefined) return;

    const data = new FormData();
    data.set("title", this.state.title);
    data.set("description", this.state.description);
    data.set("summary", "");
    data.set("review", false);
    data.append("file", this.state.selectedFile);

    await this.setState({ uploading: true });

    Axios.post(
      ApiURI.PublicationUpload +
        `/${this.state.selectedProblemId}/stages/\
          ${this.state.selectedStageId}/publications`,
      data,
    )
      .then(res => {
        this.setState({ uploading: false });
      })
      .catch(console.error);
  };

  handleProblemSelect = problemId => {
    this.setState({ selectedProblemId: problemId });
  };

  handleStageSelect = id => {
    this.setState({ selectedStageId: id });
  };

  handleTitleChange = e => {
    this.setState({
      title: e.target.value,
    });
  };

  handleDescriptionChange = e => {
    this.setState({
      description: e.target.value,
    });
  };

  checkCorrectFile = file => {
    //TODO check file format
    return true;
  };

  preprocessFile = file => {
    // e.g. Scrape data
  };

  submitEnabled = () => {
    return (
      this.state.selectedFile &&
      this.state.selectedProblemId &&
      this.state.selectedStageId &&
      this.state.title &&
      this.state.description
    );
  };

  render() {
    return (
      <div style={styles.container}>
        <h2>Upload</h2>
        <ProblemSelector onSelect={this.handleProblemSelect} />
        {this.state.selectedProblemId !== undefined && (
          <StageSelector
            problemId={this.state.selectedProblemId}
            onSelect={this.handleStageSelect}
          />
        )}
        <TitledForm
          title="Document Title"
          value={this.state.title}
          onChange={this.handleTitleChange}
        />
        <TitledForm
          title="Document Summary"
          value={this.state.description}
          onChange={this.handleDescriptionChange}
        />
        <FileUploadSelector onSelect={this.handleFileSelect} />
        {this.state.uploading && <h4>Uploading...</h4>}
        <button onClick={this.handleSubmit} disabled={!this.submitEnabled()}>
          Submit
        </button>
      </div>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "1em 1em",
    background: "#f9fafb",
    border: "1px solid lightgrey",
    borderRadius: "0.3rem",
    boxShadow: "0 0 0 0 transparent inset",
    margin: "2em 10em",
  },
};
