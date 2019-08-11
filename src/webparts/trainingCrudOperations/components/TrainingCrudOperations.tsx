import * as React from 'react';
import styles from './TrainingCrudOperations.module.scss';
import { ITrainingCrudOperationsProps } from './ITrainingCrudOperationsProps';
import { escape } from '@microsoft/sp-lodash-subset';

export interface ITrainingSpfxState{  
  items:[  
        {  
          "Title": "", 
          "Trainer Name": "", 
          "Location":"",
        }]  
}  
export default class TrainingCrudOperations extends React.Component<ITrainingCrudOperationsProps, ITrainingSpfxState> {

  public constructor(props: ITrainingCrudOperationsProps, state: ITrainingSpfxState){  
    super(props); 
    
    this.state = {  
      items: [  
        {  
          "Title": "", 
          "Trainer Name": "", 
          "Location":"",
         
        }  
      ]  
    };  
  } 
  private componentDidMount() {
    setInterval(
     () => this.GetDatafromSharePointList(),
     1000
   );
  }
  private GetDatafromSharePointList()
{
  var reactHandler = this;  
    jquery.ajax({  
        url: `${this.props.siteurl}/_api/web/lists/getbytitle('Training')/items`,  
        type: "GET",  
        headers:{'Accept': 'application/json; odata=verbose;'},  
        success: function(resultData) {  
          reactHandler.setState({  
            items: resultData.d.results  
          });  
        },  
        error : function(jqXHR, textStatus, errorThrown) {  
        }  
    });  
} 
public render(): React.ReactElement<ITrainingCrudOperationsProps> {
    
  return (  
   <div className={styles.panelStyle} > 
     
       <div className={styles.tableCaptionStyle} >Fetch 
       Course Details from SharePointList using SPFx,RESTAPI,React JS
         Data on page changes with change in the SharePointList  </div>
      
        <div className={styles.headerCaptionStyle} >Training Details</div>
       <div className={styles.tableStyle} >   
         
         <div className={styles.headerStyle} >  
           <div className={styles.CellStyle}>Title</div>  
           <div className={styles.CellStyle}>Trainer Name </div>  
           <div className={styles.CellStyle}>Location</div>  
             
                  
         </div>  
         
           {this.state.items.map(function(item,key){  
             
             return (<div className={styles.rowStyle} key={key}>  
                 <div className={styles.CellStyle}>{item.Title}</div>  
                 <div className={styles.CellStyle}>{item.Trainer Name}</div>  
                  <div className={styles.CellStyle}>{item.Location}</div>
                   
       
               </div>);  
           })}  
                 
       </div>  
     </div>  


 );  
}  
}
