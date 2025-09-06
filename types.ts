// FIX: Import React to provide the 'React' namespace for types like React.ComponentType.
import React from 'react';

export enum ProjectStatus {
  Success = 'Success',
  Failure = 'Failure'
}

export enum ProjectType {
  Demo = 'Demo',
  Link = 'Link'
}

export interface Project {
  id: string;
  title: string;
  description: string;
  status: ProjectStatus;
  type: ProjectType;
  link?: string;
  goal: string;
  failurePoint?: string;
  component?: React.ComponentType;
}
