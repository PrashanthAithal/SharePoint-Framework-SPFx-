import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';

import * as strings from 'TrainingCrudOperationsWebPartStrings';
import TrainingCrudOperations from './components/TrainingCrudOperations';
import { ITrainingCrudOperationsProps } from './components/ITrainingCrudOperationsProps';
import { ITrainingCrudOperationsWebPartProps } from './ITrainingCrudOperationsWebPartProps';

export interface ITrainingCrudOperationsWebPartProps {
  description: string;
}

export default class TrainingCrudOperationsWebPart extends BaseClientSideWebPart<ITrainingCrudOperationsWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ITrainingCrudOperationsProps > = React.createElement(
      TrainingCrudOperations,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }
  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
