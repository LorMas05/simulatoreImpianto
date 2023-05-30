import { first } from 'rxjs';
import { AfterViewInit, Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'simulatoreImpianto';
  idOfMovableItems:string[]=[]
  thirdLenght=0
  DivIdList:string[]=["singleActivePowerDiv","PlantActivePowerDiv","QpSignalsDiv","ActivePowerPlantPlotDiv"]
  /*variables that are used for logic of components view*/
  analyticsVisible=false
  settingsVisible=false


  /*variables that are used for logic of components view*/
  invertersChart = {
    data: [
        { x: ["inverter 1", "inverter 2", "inverter 3","inverter 4","inverter 5"], y: ["2000", "1600", "1800","1500","1900"], type: 'histogram', histfunc: "sum",marker:{color:"#1b81e8"}},
    ],
    layout: { 
      title: 'Active power produced by any single inverter',
      bargap :6,height:document.getElementById("singleActivePowerDiv")?.style.height,
      width:document.getElementById("singleActivePowerDiv")?.style.width,
      paper_bgcolor:"transparent",
      plot_bgcolor:"transparent",
      margin:{t:25,b:20},
      font: {size: 8,color:"white"},
      xaxis: {
       showgrid:false

      },
      yaxis: {
        showgrid:false
      },
      'modebar': {
        'orientation': 'h',
        xanchor:"center"
    }
    },
    config:{
      displayModeBar: false,
      binSize:0.5
    }
};
activePowerGauge=
{
  data: [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: 12250,
      type: "indicator",
      mode: "gauge+number+delta",
      delta: { reference: 12250 },
      gauge: {
        axis: { range: [0, 24500],tickcolor: "#1b81e8"  },
        bar: { color: "#fbb03b" },
        steps: [
          { range: [0, 12250], color: "#448bd4" },
          { range: [12250, 24500], color: "#0f61b5" }
        ],
        threshold: {
          line: { color: "#fbb03b", width: 4 },
          thickness: 0.75,
          value: 12250
        }
      }
    }
  ],

  config:{
    displayModeBar: false,
  }
};
reactivePowerGouge=
{
  data: [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: 8000,
      type: "indicator",
      mode: "gauge+number+delta",
      delta: { reference: 12250 },
      gauge: {
        axis: { range: [0, 24500],tickcolor: "#1b81e8"  },
        bar: { color: "#fbb03b" },
        steps: [
          { range: [0, 12250], color: "#448bd4" },
          { range: [12250, 24500], color: "#0f61b5" }
        ],
        threshold: {
          line: { color: "#fbb03b", width: 4 },
          thickness: 0.75,
          value: 8000
        }
      }
    }
  ],

  config:{
    displayModeBar: false,
  }
};
powerFactorGauge=
{
  data: [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: 0.65,
      type: "indicator",
      mode: "gauge+number+delta",
      delta: { reference: 0 },
      gauge: {
        axis: { range: [-1, 1],tickcolor: "#1b81e8"  },
        bar: { color: "#fbb03b" },
        steps: [
          { range: [-1, 0], color: "#448bd4" },
          { range: [0, 1], color: "#0f61b5" }
        ],
        threshold: {
          line: { color: "#fbb03b", width: 4 },
          thickness: 0.75,
          value: 0.65
        }
      }
    }
  ],

  config:{
    displayModeBar: false,
  }
};
gaugeCommonLayout={
  width:document.getElementById("chartGaugeHolder")?.style.width,
  height:document.getElementById("chartGaugeHolder")?.style.height,
  title: 'Acdwd',
  paper_bgcolor:"transparent",
  plot_bgcolor:"transparent",
  margin:{t:0,b:0,l:20,r:20},
  font: { color: "darkblue", family: "Arial",size:8 }
}
  ngAfterViewInit() {
    this.DivIdList.forEach((item)=>{this.registerDragElement(item)})
    this.DivIdList.forEach((item,index)=>{this.setInitialPositions(item,index+1)})
  }

  private registerDragElement(elementId:string) {
    const elmnt = document.getElementById(elementId);

    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    const dragMouseDown = (e:any) => {
      e = e || window.event;
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    };

    const elementDrag = (e:any) => {
      e = e || window.event;
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      if(elmnt){
        elmnt.style.top = elmnt.offsetTop - pos2 + 'px';
        elmnt.style.left = elmnt.offsetLeft - pos1 + 'px';
      }
    };

    const closeDragElement = () => {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
    };

    if(elmnt){
      elmnt.onmousedown = dragMouseDown;
    }
   
  }
  
  public allowDrop(ev:any): void {
    ev.preventDefault();
  }
  
  public drag(ev:any): void {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  public drop(ev:any): void {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
  }
  restartDivs(){
    setTimeout(() => {
      this.DivIdList.forEach((item)=>{this.registerDragElement(item)})
      this.DivIdList.forEach((item,index)=>{this.setInitialPositions(item,index+1)})
      console.log(document.getElementById("singleActivePowerDiv")?.style.height,document.getElementById("singleActivePowerDiv")?.style.width)
      this.invertersChart.layout.height=(String)((Number)(document.getElementById("singleActivePowerDiv")?.offsetHeight))
      this.invertersChart.layout.width=(String)((Number)(document.getElementById("singleActivePowerDiv")?.offsetWidth))
      let chartGaudeOlderElememt=document.getElementById("chartGaugeHolder")
      if(chartGaudeOlderElememt){
        this.gaugeCommonLayout.height=(String)((Number)(chartGaudeOlderElememt.offsetHeight))
        this.gaugeCommonLayout.width=(String)((Number)(chartGaudeOlderElememt.offsetWidth)/100*28-30)
      }
    }, 0);

  }
  setInitialPositions(divId:string,index:number){
    let oldIndex=index
    let height=window.innerHeight
    if(index>3){index=3}
    //TODO this will not work for phone
    let singleDivHeight=(height-120)/3
    let currentDiv=document.getElementById(divId)
    let currenTTopSpace=5*index
    currenTTopSpace+=(index-1)*singleDivHeight+100
    if(currentDiv){
      currentDiv.style.height=singleDivHeight.toString()+"px"
      currentDiv.style.top=currenTTopSpace.toString()+"px"
      index!=2?currentDiv.style.width=(singleDivHeight*1.8).toString()+"px":currentDiv.style.width=(singleDivHeight*2.3).toString()+"px"
      if(oldIndex==3){this.thirdLenght=singleDivHeight*1.8}
      if(oldIndex>3){currentDiv.style.width=(singleDivHeight*2.3).toString()+"px";currentDiv.style.left=(this.thirdLenght+10).toString()+"px";}else{
        currentDiv.style.left=(5).toString()+"px";
      }
    }
  }
}