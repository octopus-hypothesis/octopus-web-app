import React, { Component } from "react";
import { Link } from "react-router-dom";

class Publication extends Component {
  render() {
    // Highlighted if: this.props.publication.id === this.props.content.publication

    return (
      <Link
        to={{
          pathname: `/publications/${this.props.publication.id}`,
          state: this.props.content,
        }}
        style={{ marginBottom: 0.5 + "em" }}
      >
        <div
          className="ui segment"
          style={{ fontSize: 0.75 + "rem", paddingBottom: 0 }}
        >
          <h5
            style={{
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
              width: "100%",
            }}
          >
            {this.props.publication.title}
          </h5>
          <div className="meta">{this.props.publication.created_at}</div>
          <div className="description fade">
            {this.props.publication.description}
          </div>
        </div>
      </Link>
    );
  }
}

export default Publication;
