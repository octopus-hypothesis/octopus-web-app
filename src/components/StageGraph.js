import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styled, { css } from "styled-components";

import Stage from "./Stage";

const numbers = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
];

class StageGraph extends Component {
  render() {
    const open = this.props.open;

    let problem = this.props.problem.title || (
      <div>
        <div
          className="ui fluid placeholder"
          style={{ marginTop: "0.05em", height: "1.28571429rem" }}
        >
          <div
            className="line"
            style={{ backgroundColor: "initial", marginBottom: 0 }}
          />
        </div>
        <div style={{ clear: "both" }} />
      </div>
    );

    let stages;

    if (this.props.content.content.loading) {
      stages = (
        <div
          className={"ui six column grid"}
          style={{
            overflowX: "auto",
            overflowY: "hidden",
            flexWrap: "nowrap",
          }}
        >
          {new Array(6).fill(null).map((_, i) => (
            <Stage
              key={i}
              stage={{
                name: undefined,
                publications: [],
                links: [],
                selection: {
                  publications: [],
                  links: [],
                },
                loading: true,
              }}
              content={this.props.content}
              open={open}
            />
          ))}
        </div>
      );
    } else {
      stages = (
        <div
          className={"ui " + numbers[this.props.stages.length] + " column grid"}
          style={{
            overflowX: "auto",
            overflowY: "hidden",
            flexWrap: "nowrap",
          }}
        >
          {this.props.stages.map(stage => (
            <Stage
              key={stage.id}
              stage={stage}
              content={this.props.content}
              open={open}
            />
          ))}
        </div>
      );
    }

    return (
      <div
        onClick={event => {
          if (this.props.problem.id !== undefined) {
            this.props.history.push(
              `/problems/${this.props.problem.id}`,
              this.props.content,
            );
          }
          event.stopPropagation();
        }}
      >
        <ProblemTitleContainer>
          <div className="ui container">
            <h3
              className="ui block header"
              style={{
                cursor:
                  this.props.content.publication !== undefined
                    ? "pointer"
                    : "default",
              }}
            >
              <span style={{ float: "left", marginRight: "0.5em" }}>
                Problem:
              </span>
              {problem}
            </h3>
          </div>
        </ProblemTitleContainer>

        <div style={{ backgroundColor: "#dcf8ec" }}>
          <div
            className="ui segment"
            onClick={event => {
              this.props.toggleOpen();
              event.stopPropagation();
            }}
            style={{
              float: "left",
              margin: "1em 30px 0 30px",
              cursor: "pointer",
            }}
          >
            <GraphHider
              className={"chevron down icon " + (open ? "opened" : "collapsed")}
            />
          </div>

          <GraphContainer>{stages}</GraphContainer>
        </div>
      </div>
    );
  }
}

const commonStyle = css`
  overflow-x: auto;
  overflow-y: hidden;
`;

const GraphContainer = styled.div`
  ${commonStyle}
  padding-top: 1em;
  padding-right: 30px;
  padding-bottom: 30px;
`;

const ProblemTitleContainer = styled.div`
  ${commonStyle}
  background-color: #dcf8ec;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
`;

const GraphHider = styled.i`
  fontsize: 1.07142857rem;
  color: #4b72ab;
  transition: transform 0.3s ease-in-out;

  &.opened {
    transform: rotate(180deg) translateY(-5px);
  }

  &.collapsed {
    transform: rotate(0deg) translateY(-5px);
  }
`;

export default withRouter(StageGraph);
