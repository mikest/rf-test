/**
 * Node.tsx
 * Copyright: Microsoft 2021
 *
 * Base class for all nodes.
 */

import React, { Component } from "react";

import {
  Dimensions,
  Position,
  NodeProps,
  HandleType,
  Handle,
} from "react-flow-renderer";
import { AnchorDirection } from "./elements";

export interface EdgeData {}

export const AnchorRadius = 14;

export const DefaultNodeWidth = 180;
export const DefaultNodeHeight = 90;
export const NodeBorderWidth = 2;
export const NodeHeaderHeight = 30;

export const NodeHorizontalPadding = 12;
export const NodeVerticalPadding = 12;

export const NodeDefaultBorderRadius = 5;
export const NodeSelectionBorderWidth = 2;

// IDs for the default input/output anchors.
export const NodeInAnchorID = "in";
export const NodeOutAnchorID = "out";

export interface NodeData {
  inputs?: string[];
  outputs?: string[];
  dimensions?: Dimensions;
  label?: string;
}
export interface CustomNodeProps extends NodeProps<NodeData> {}

export interface NodeState {}

const sleep = (delay: number) =>
  new Promise((resolve) => setTimeout(resolve, delay));

async function snooze() {
  await sleep(20);
}

export default class CustomNode<
  P extends CustomNodeProps,
  S extends NodeState
> extends Component<P, S> {
  render() {
    snooze();
    return (
      <>
        {this.props.data.label}
        {this._getAnchors()}
      </>
    );
  }

  protected _getPositionForHandleType(handleType: HandleType) {
    const input = handleType === "target";
    switch (this._getFlowDirection()) {
      case AnchorDirection.Downwards:
        return input ? Position.Top : Position.Bottom;
      case AnchorDirection.Upwards:
        return input ? Position.Bottom : Position.Top;
      case AnchorDirection.Rightwards:
        return input ? Position.Left : Position.Right;
      case AnchorDirection.Leftwards:
        return input ? Position.Right : Position.Left;
    }
  }

  protected _getAnchors() {
    // target==input, source==output
    const targetPosition = this._getPositionForHandleType("target");
    const sourcePosition = this._getPositionForHandleType("source");

    // used to fan-out the ports along the edge of the node
    function getOffsetStyleForHandle(
      position: Position,
      count: number,
      index: number
    ) {
      return position === Position.Top || position === Position.Bottom
        ? { left: `${(100 / (count + 1)) * (index + 1)}%` }
        : { top: `${(100 / (count + 1)) * (index + 1)}%` };
    }

    const inputs = this.props.data.inputs ?? [NodeInAnchorID];
    const outputs = this.props.data.outputs ?? [NodeOutAnchorID];
    return (
      <>
        {inputs.map((label, index) => {
          return (
            <Handle
              type={"target"}
              position={targetPosition}
              style={{
                ...getOffsetStyleForHandle(
                  targetPosition,
                  inputs.length,
                  index
                ),
                // width: AnchorRadius,
                // height: AnchorRadius,
                //backgroundImage: `url(${NodeHandleTarget})`,
              }}
              translate={undefined}
              id={label}
              key={label}
            />
          );
        })}
        {outputs.map((label, index) => {
          return (
            <Handle
              type={"source"}
              position={sourcePosition}
              style={{
                ...getOffsetStyleForHandle(
                  sourcePosition,
                  outputs.length,
                  index
                ),
                // width: AnchorRadius,
                // height: AnchorRadius,
                //backgroundImage: `url(${NodeHandleSource})`,
              }}
              translate={undefined}
              id={label}
              key={label}
            />
          );
        })}
      </>
    );
  }

  protected _getFlowDirection(): AnchorDirection {
    return AnchorDirection.Downwards;
  }
}
