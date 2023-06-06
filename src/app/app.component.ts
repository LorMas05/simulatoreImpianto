import { first } from 'rxjs';
import { AfterViewInit, Component } from '@angular/core';
import { DataService } from './services/dataService';
import *as XLSX from 'xlsx'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  constructor(private DataService: DataService) { }
  noExcel=true
  title = 'simulatoreImpianto';
  idOfMovableItems:string[]=[]
  thirdLenght=0
  DivIdList:string[]=["singleActivePowerDiv","PlantActivePowerDiv","QpSignalsDiv","ActivePowerPlantPlotDiv"]
  /*variables that are used for logic of components view*/
  analyticsVisible=false
  settingsVisible=false
  showSettings=false
  LightColorSwitch=true
  /*variables that are used for logic of components view*/
  currentTimeLabelsForChart=["starting1","starting2","starting3","starting4","starting5","starting6","starting7","starting8","starting9","starting10",]
  currentkwPerTime=[0,0,0,0,0,0,0,0,0,0]
  currentNominalPower=24500
  currentQTargetPercentage=0.5
  currentPTargetPercentage=0.5
  currentActivePower=12250
  currentReactivePower=8000
  currentPF=0.45
  currentPfForGauge=0.20
  currentInvertersProduction=["0","0","0","0","0","0","0","0","0","0"]
  currentInvertersTargets=[""]

  invertersChart = {
    data: [
        { x: ["inverter 1", "inverter 2", "inverter 3","inverter 4","inverter 5","inverter 6", "inverter 7", "inverter 8","inverter 9","inverter 10"], y: this.currentInvertersProduction, type: 'histogram', histfunc: "sum",
        marker:{color:["red", '"red",, "red", "red", "red"',"red","red","red","red","red"]}},
    ],
    layout: { 
      title: ' Inverters Active Power',
      bargap :6,height:(String)((Number)(document.getElementById("singleActivePowerDiv")?.offsetHeight)),
      width:(String)((Number)(document.getElementById("singleActivePowerDiv")?.offsetWidth)),
      paper_bgcolor:"transparent",
      plot_bgcolor:"transparent",
      margin:{t:25,b:30},
      font: {size: 8,color:"white"},
      xaxis: {
       showgrid:false

      },
      yaxis: {
        showgrid:true,
        range: [0, 2000],
      },
      shapes: [
        {
          type: 'line',
          xref: 'x',
          yref: 'y',
          fillcolor: '#0084e4c9',
          x0: -0.4,
          y0: 1000,
          x1: 0.4,
          y1: 1000,
          line: {
            color: 'orange',
            width:4
          }
        },
        {
          type: 'line',
          xref: 'x',
          yref: 'y',
          fillcolor: '#0084e4c9',
          x0: 0.6,
          y0: 1000,
          x1: 1.4,
          y1: 1000,
          line: {
            color: 'orange',
            width:4
          }
        },
        {
          type: 'line',
          xref: 'x',
          yref: 'y',
          fillcolor: '#0084e4c9',
          x0: 1.6,
          y0: 1000,
          x1: 2.4,
          y1: 1000,
          line: {
            color: 'orange',
            width:4
          }
        },
        {
          type: 'line',
          xref: 'x',
          yref: 'y',
          fillcolor: '#0084e4c9',
          x0: 2.6,
          y0: 1000,
          x1: 3.4,
          y1: 1000,
          line: {
            color: 'orange',
            width:4
          }
        },
        {
          type: 'line',
          xref: 'x',
          yref: 'y',
          fillcolor: '#0084e4c9',
          x0: 3.6,
          y0: 1000,
          x1: 4.4,
          y1: 1000,
          line: {
            color: 'orange',
            width:4
          }
        },
        {
          type: 'line',
          xref: 'x',
          yref: 'y',
          fillcolor: '#0084e4c9',
          x0: 4.6,
          y0: 1000,
          x1: 5.4,
          y1: 1000,
          line: {
            color: 'orange',
            width:4
          }
        },
        {
          type: 'line',
          xref: 'x',
          yref: 'y',
          fillcolor: '#0084e4c9',
          x0: 5.6,
          y0: 1000,
          x1: 6.4,
          y1: 1000,
          line: {
            color: 'orange',
            width:4
          }
        },
        {
          type: 'line',
          xref: 'x',
          yref: 'y',
          fillcolor: '#0084e4c9',
          x0: 6.6,
          y0: 1000,
          x1: 7.4,
          y1: 1000,
          line: {
            color: 'orange',
            width:4
          }
        },
        {
          type: 'line',
          xref: 'x',
          yref: 'y',
          fillcolor: '#0084e4c9',
          x0: 7.6,
          y0: 1000,
          x1: 8.4,
          y1: 1000,
          line: {
            color: 'orange',
            width:4
          }
        },
        {
          type: 'line',
          xref: 'x',
          yref: 'y',
          fillcolor: '#0084e4c9',
          x0: 8.6,
          y0: 1000,
          x1: 9.4,
          y1: 1000,
          line: {
            color: 'orange',
            width:4
          }
        },
      ],
    },
    config:{
      displayModeBar: false,
      binSize:0.5
    }
};

timeLinePlot={
  data: [
      { x: this.currentTimeLabelsForChart,
        y:this.currentkwPerTime,
        fill: 'tozeroy',
        type: 'scatter',
        fillcolor:'#0084e4c9',
        mode:'none',
        name:"Power"
      },
      { x: this.currentTimeLabelsForChart,
        y:[15,15,15,15,15,15,15,15,15],
      type: 'scatter',
      mode:'lines+point',
      marker:{color:'#fbb03b'},
      name:"setPoint"
      },
      { x: this.currentTimeLabelsForChart,
        y:[this.currentNominalPower/1000],
      type: 'scatter',
      mode:'lines+point',
      marker:{color:'transparent'},
      name:"0"
      },
  ],
  layout: { 
    title: 'Active Power ',
    height:document.getElementById("ActivePowerPlantPlotDiv")?.style.width,
    width:document.getElementById("ActivePowerPlantPlotDiv")?.style.width,
    paper_bgcolor:"transparent",
    plot_bgcolor:"transparent",
    margin:{t:20,b:20},
    font: {size: 8,color:"white"},
    xaxis: {
      titlefont: {
        family: 'Arial, sans-serif',
        size: 18,
        color: 'lightgrey',
       
      },
      showgrid:false,
      showticklabels: true,
      tickangle: 'auto',
      tickfont: {
        family: 'Old Standard TT, serif',
        size: 14,
        color: 'black'
      },

    },
    yaxis: {
      title: 'MW',
      titlefont: {
        family: 'Arial, sans-serif',
        size: 18,
        color: 'lightgrey'
      },
      showticklabels: true,
      tickangle: 0,
      tickfont: {
        family: 'Old Standard TT, serif',
        size: 14,
        color: 'black'
      },
    }
      
  },
  config:{
    displayModeBar: false,
    binSize:0.5
  }
};
QPSignlas={
  data: [
    {   
    },
  ],
  layout: {
    title: 'Operating Point',
    font:{size:10,color:'white'},
    margin:{t:0,l:0,b:0,r:0},
    paper_bgcolor:"transparent",
    plot_bgcolor:"transparent",
    xaxis: {
      range: [-1.33, 1.33],
      zeroline: false,
      dtick:0.33
    },
    yaxis: {
      range: [0, 1.2]
    },
    width: document.getElementById("QpSignalsDiv")?.style.width,
    height: document.getElementById("QpSignalsDiv")?.style.height,
    shapes: [
      {
        type: 'circle',
        xref: 'x',
        yref: 'y',
        fillcolor: '#0084e4c9',
        x0: -1.12,
        y0: -1.12,
        x1: 1.12,
        y1: 1.12,
        line: {
          color: '#005d99',
          width:2
        }
      },
      {
        type: 'rect',
        xref: 'x',
        yref: 'y',
        fillcolor: 'transparent',
        x0: this.currentQTargetPercentage,
        y0: 0,
        x1: this.currentQTargetPercentage,
        y1: Math.sqrt((1.12)**2-(this.currentQTargetPercentage)**2),
        line: {
          dash:'dot',
          color: 'red',
          width:1
        }
      },
      {
        type: 'rect',
        xref: 'x',
        yref: 'y',
        fillcolor: 'transparent',
        x0: -this.currentQTargetPercentage,
        y0: 0,
        x1: -this.currentQTargetPercentage,
        y1: Math.sqrt((1.12)**2-(this.currentQTargetPercentage)**2),
        line: {
          dash:'dot',
          color: 'red',
          width:1
        }
      },
      {
        type: 'rect',
        xref: 'x',
        yref: 'y',
        fillcolor: 'transparent',
        x0: -Math.sqrt((1.12)**2-(this.currentPTargetPercentage)**2),
        y0: this.currentPTargetPercentage,
        x1: Math.sqrt((1.12)**2-(this.currentPTargetPercentage)**2),
        y1: this.currentPTargetPercentage,
        line: {
          color: '#fbb03b',
          width:2
        }
      },
      {
        type: 'rect',
        xref: 'x',
        yref: 'y',
        fillcolor: 'transparent',
        x0: 0,
        y0: 0,
        x1: 0,
        y1: this.currentNominalPower,
        line: {
          color: 'white',
          width:3
        }
      },
      {
        type: 'rect',
        xref: 'x',
        yref: 'y',
        fillcolor: 'transparent',
        x0: -2,
        y0: 0,
        x1: 2,
        y1: 0,
        line: {
          color: 'white',
          width:3
        }
      },
      {
        type: 'circle',
        xref: 'x',
        yref: 'y',
        fillcolor: 'transparent',
        x0: this.currentQTargetPercentage+0.02,
        y0: this.currentPTargetPercentage+0.02,
        x1: this.currentQTargetPercentage-0.02,
        y1: this.currentPTargetPercentage-0.02,
        line: {
          color: 'red',
          width:3
        }
      },
      {
        type: 'line',
        xref: 'x',
        yref: 'y',
        fillcolor: 'transparent',
        x0: 0,
        y0: 0,
        x1: 4,
        y1: 2,
        line: {
          color: 'red',
          width:3
        }
      },
      {
        type: 'line',
        xref: 'x',
        yref: 'y',
        fillcolor: 'transparent',
        x0: 0,
        y0: 2,
        x1: 2,
        y1: 3,
        line: {
          color: 'red',
          width:3
        }
      }
      
    ]
  },
  config:{
    displayModeBar: false,
    binSize:0.5
  }
};
activePowerGauge={
  data: [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: this.currentActivePower,
      type: "indicator",
      mode: "gauge+number",
      gauge: {
        axis: { range: [0, this.currentNominalPower],tickcolor: "#1b81e8"  },
        bar: { color: "#fbb03b" },
        steps: [
          { range: [0, this.currentNominalPower/2], color: "#448bd4" },
          { range: [this.currentNominalPower/2, this.currentNominalPower], color: "#0f61b5" }
        ],
        threshold: {
          line: { color: "#fbb03b", width: 4 },
          thickness: 0.75,
          value: this.currentActivePower
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
      value: this.currentReactivePower,
      type: "indicator",
      mode: "gauge+number",
      gauge: {
        axis: { range: [-this.currentNominalPower, this.currentNominalPower],tickcolor: "#1b81e8"  },
        bar: { color: "transparent" },
        steps: [
          { range: [-this.currentNominalPower/2, this.currentNominalPower/2], color: "#448bd4" },
          { range: [this.currentNominalPower/2, this.currentNominalPower], color: "#0f61b5" },
          { range: [-this.currentNominalPower, -this.currentNominalPower/2], color: "#0f61b5" }
        ],
        threshold: {
          line: { color: "#fbb03b", width: 4 },
          thickness: 0.75,
          value: this.currentReactivePower
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
      value: this.currentPF,
      type: "indicator",
      mode: "gauge+number",
      gauge: {
        axis: { range: [-1, 1],tickcolor: "transparentl" , showticklabels: false},
        bar: { color: "transparent" },
        steps: [
          { range: [-1, 0], color: "#448bd4" },
          { range: [0, 1], color: "#0f61b5" }
        ],
        threshold: {
          line: { color: "#fbb03b", width: 4 },
          thickness: 0.75,
          value: this.currentPfForGauge
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
  margin:{t:0,b:0,l:5,r:5},
  font: { color: "darkblue", family: "Arial",size:8 }
}
  ngAfterViewInit() {
    this.DivIdList.forEach((item)=>{this.registerDragElement(item)})
    this.DivIdList.forEach((item,index)=>{this.setInitialPositions(item,index+1)})
    setTimeout(() => {
      this.simulateGetData()
    }, );
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
      this.invertersChart.layout.height=(String)((Number)(document.getElementById("singleActivePowerDiv")?.offsetHeight))
      this.invertersChart.layout.width=(String)((Number)(document.getElementById("singleActivePowerDiv")?.offsetWidth))
      let chartGaudeOlderElememt=document.getElementById("chartGaugeHolder")
      let chartTimeLineElement=document.getElementById("ActivePowerPlantPlotDiv")
      let QPSignlasElement=document.getElementById("QpSignalsDiv")
      if(chartGaudeOlderElememt){
        this.gaugeCommonLayout.height=(String)((Number)(chartGaudeOlderElememt.offsetHeight))
        this.gaugeCommonLayout.width=(String)((Number)(chartGaudeOlderElememt.offsetWidth)/100*28-30)
      }
      if(chartTimeLineElement){
        this.timeLinePlot.layout.height=(String)((Number)(chartTimeLineElement.offsetHeight))
        this.timeLinePlot.layout.width=(String)((Number)(chartTimeLineElement.offsetWidth))

      }
      if(QPSignlasElement){
        this.QPSignlas.layout.height=(String)((Number)(QPSignlasElement.offsetHeight))
        this.QPSignlas.layout.width=(String)((Number)(QPSignlasElement.offsetWidth))

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
      if(oldIndex==1){currentDiv.style.width=(singleDivHeight*2.3).toString()+"px"}
      if(oldIndex==3){this.thirdLenght=singleDivHeight*1.8}
      if(oldIndex>3){currentDiv.style.width=(singleDivHeight*2.3).toString()+"px";currentDiv.style.left=(this.thirdLenght+10).toString()+"px";}else{
        currentDiv.style.left=(5).toString()+"px";
      }
    }
  }
  SettingsClicked(){
    this.showSettings=!this.showSettings
  }





  /*Just Simulating*/
  simulateGetData(){
    this.activePowerGauge.data[0].value=this.currentActivePower
    this.activePowerGauge.data[0].gauge.threshold.value=this.currentActivePower
    this.reactivePowerGouge.data[0].value=this.currentReactivePower
    this.reactivePowerGouge.data[0].gauge.threshold.value=this.currentReactivePower
    this.powerFactorGauge.data[0].value=this.currentPF
    this.powerFactorGauge.data[0].gauge.threshold.value=this.currentPfForGauge
    /*refreshing qp signals*/
    this.QPSignlas.layout={
      title: 'Operating Point',
      margin:{t:20,l:20,b:20,r:20},
      font:{size:10,color:'white'},
      paper_bgcolor:"transparent",
      plot_bgcolor:"transparent",
      xaxis: {
        range: [-1.33, 1.33],
        zeroline: false,
        dtick:0.33
      },
      yaxis: {
        range: [0, 1.3]
      },
      width: (String)((Number)( document.getElementById("QpSignalsDiv")?.offsetWidth)),
      height:(String)((Number)( document.getElementById("QpSignalsDiv")?.offsetHeight)),
      shapes: [
        {
          type: 'circle',
          xref: 'x',
          yref: 'y',
          fillcolor: '#0084e4c9',
          x0: -1.12,
          y0: -1.12,
          x1: 1.12,
          y1: 1.12,
          line: {
            color: '#005d99',
            width:2
          }
        },
        {
          type: 'rect',
          xref: 'x',
          yref: 'y',
          fillcolor: 'transparent',
          x0: this.currentQTargetPercentage,
          y0: 0,
          x1: this.currentQTargetPercentage,
          y1: Math.sqrt((1.12)**2-(this.currentQTargetPercentage)**2),
          line: {
            dash:'dot',
            color: 'red',
            width:1
          }
        },
        {
          type: 'rect',
          xref: 'x',
          yref: 'y',
          fillcolor: 'transparent',
          x0: -this.currentQTargetPercentage,
          y0: 0,
          x1: -this.currentQTargetPercentage,
          y1: Math.sqrt((1.12)**2-(this.currentQTargetPercentage)**2),
          line: {
            dash:'dot',
            color: 'red',
            width:1
          }
        },
        {
          type: 'rect',
          xref: 'x',
          yref: 'y',
          fillcolor: 'transparent',
          x0: -Math.sqrt((1.12)**2-(this.currentPTargetPercentage)**2),
          y0: this.currentPTargetPercentage,
          x1: Math.sqrt((1.12)**2-(this.currentPTargetPercentage)**2),
          y1: this.currentPTargetPercentage,
          line: {
            color: '#fbb03b',
            width:2
          }
        },
        {
          type: 'rect',
          xref: 'x',
          yref: 'y',
          fillcolor: 'transparent',
          x0: 0,
          y0: 0,
          x1: 0,
          y1: this.currentNominalPower,
          line: {
            color: 'white',
            width:3
          }
        },
        {
          type: 'rect',
          xref: 'x',
          yref: 'y',
          fillcolor: 'transparent',
          x0: -2,
          y0: 0,
          x1: 2,
          y1: 0,
          line: {
            color: 'white',
            width:3
          }
        },
        {
          type: 'circle',
          xref: 'x',
          yref: 'y',
          fillcolor: 'transparent',
          x0: this.currentQTargetPercentage+0.02,
          y0: this.currentPTargetPercentage+0.02,
          x1: this.currentQTargetPercentage-0.02,
          y1: this.currentPTargetPercentage-0.02,
          line: {
            color: 'red',
            width:3
          }
        },
        {
          type: 'line',
          xref: 'x',
          yref: 'y',
          fillcolor: 'transparent',
          x0: 0,
          y0: 0,
          x1: 1.2,
          y1: 0.3,
          line: {
            color: 'blue',
            width:1
          }
        },
        {
          type: 'line',
          xref: 'x',
          yref: 'y',
          fillcolor: 'transparent',
          x0: 0,
          y0: 0,
          x1: -1.2,
          y1: 0.3,
          line: {
            color: 'blue',
            width:1
          }
        },
        {
          type: 'line',
          xref: 'x',
          yref: 'y',
          fillcolor: 'transparent',
          x0: -1.3,
          y0: 1,
          x1: 1.3,
          y1: 1,
          line: {
            color: 'red',
            width:1
          }
        }
        
      ]
    }
    /* end refreshinf qp signals*/
    /*refreshing inverters Start*/
    let newArrayOfInverters=[]

    this.invertersChart.data[0].y=this.currentInvertersProduction
    if(this.LightColorSwitch==true){
      this.invertersChart.data[0].marker.color=["#1b81e8", "dbc5c5b5","#1b81e8", "#1b81e8", "dbc5c5b5","#1b81e8","#1b81e8","#1b81e8","#1b81e8","#1b81e8"]
    }else{
      this.invertersChart.data[0].marker.color=["#1b81e8", "cb0c0cb5","#1b81e8", "#1b81e8","cb0c0cb5","#1b81e8","#1b81e8","#1b81e8","#1b81e8","#1b81e8"]
    }
    this.LightColorSwitch=!this.LightColorSwitch
    this.invertersChart.layout={ 
      title: ' Inverters Active Power',
      bargap :6,height:(String)((Number)(document.getElementById("singleActivePowerDiv")?.offsetHeight)),
      width:(String)((Number)(document.getElementById("singleActivePowerDiv")?.offsetWidth)),
      paper_bgcolor:"transparent",
      plot_bgcolor:"transparent",
      margin:{t:25,b:30},
      font: {size: 8,color:"white"},
      xaxis: {
       showgrid:false

      },
      yaxis: {
        showgrid:true,
        range: [0, 2000],
      },
      shapes: [
        {
          type: 'line',
          xref: 'x',
          yref: 'y',
          fillcolor: '#0084e4c9',
          x0: -0.4,
          y0: parseInt(this.currentInvertersTargets[0]),
          x1: 0.4,
          y1: parseInt(this.currentInvertersTargets[0]),
          line: {
            color: 'orange',
            width:4
          }
        },
        {
          type: 'line',
          xref: 'x',
          yref: 'y',
          fillcolor: '#0084e4c9',
          x0: 0.6,
          y0: parseInt(this.currentInvertersTargets[1]),
          x1: 1.4,
          y1: parseInt(this.currentInvertersTargets[1]),
          line: {
            color: 'orange',
            width:4
          }
        },
        {
          type: 'line',
          xref: 'x',
          yref: 'y',
          fillcolor: '#0084e4c9',
          x0: 1.6,
          y0: parseInt(this.currentInvertersTargets[2]),
          x1: 2.4,
          y1: parseInt(this.currentInvertersTargets[2]),
          line: {
            color: 'orange',
            width:4
          }
        },
        {
          type: 'line',
          xref: 'x',
          yref: 'y',
          fillcolor: '#0084e4c9',
          x0: 2.6,
          y0: parseInt(this.currentInvertersTargets[3]),
          x1: 3.4,
          y1: parseInt(this.currentInvertersTargets[3]),
          line: {
            color: 'orange',
            width:4
          }
        },
        {
          type: 'line',
          xref: 'x',
          yref: 'y',
          fillcolor: '#0084e4c9',
          x0: 3.6,
          y0: parseInt(this.currentInvertersTargets[4]),
          x1: 4.4,
          y1: parseInt(this.currentInvertersTargets[4]),
          line: {
            color: 'orange',
            width:4
          }
        },
        {
          type: 'line',
          xref: 'x',
          yref: 'y',
          fillcolor: '#0084e4c9',
          x0: 4.6,
          y0: parseInt(this.currentInvertersTargets[5]),
          x1: 5.4,
          y1: parseInt(this.currentInvertersTargets[5]),
          line: {
            color: 'orange',
            width:4
          }
        },
        {
          type: 'line',
          xref: 'x',
          yref: 'y',
          fillcolor: '#0084e4c9',
          x0: 5.6,
          y0: parseInt(this.currentInvertersTargets[6]),
          x1: 6.4,
          y1: parseInt(this.currentInvertersTargets[6]),
          line: {
            color: 'orange',
            width:4
          }
        },
        {
          type: 'line',
          xref: 'x',
          yref: 'y',
          fillcolor: '#0084e4c9',
          x0: 6.6,
          y0: parseInt(this.currentInvertersTargets[7]),
          x1: 7.4,
          y1: parseInt(this.currentInvertersTargets[7]),
          line: {
            color: 'orange',
            width:4
          }
        },
        {
          type: 'line',
          xref: 'x',
          yref: 'y',
          fillcolor: '#0084e4c9',
          x0: 7.6,
          y0: parseInt(this.currentInvertersTargets[8]),
          x1: 8.4,
          y1: parseInt(this.currentInvertersTargets[8]),
          line: {
            color: 'orange',
            width:4
          }
        },
        {
          type: 'line',
          xref: 'x',
          yref: 'y',
          fillcolor: '#0084e4c9',
          x0: 8.6,
          y0: parseInt(this.currentInvertersTargets[9]),
          x1: 9.4,
          y1: parseInt(this.currentInvertersTargets[9]),
          line: {
            color: 'orange',
            width:4
          }
        },
      ],
    }




    /*refreshing inverters End*/
    let currentTarget=this.currentNominalPower*this.currentPTargetPercentage/1000
    let newRandomNumber=this.generateRandomInt(5,15)
    this.currentkwPerTime.push(newRandomNumber)
    this.currentkwPerTime.shift()
    let d=new Date()
    let stringDateToPush=(String)(d.getMinutes())+":"+(String)(d.getSeconds())+":"+(String)(d.getMilliseconds()).substring(0,1)
    this.currentTimeLabelsForChart.push(stringDateToPush)
    this.currentTimeLabelsForChart.shift()
    this.timeLinePlot.data=[
      { x: this.currentTimeLabelsForChart,
        y:this.currentkwPerTime,
        fill: 'tozeroy',
        type: 'scatter',
        fillcolor:'#0084e4c9',
        mode:'none',
        name:"Power"
      },
      { x: this.currentTimeLabelsForChart,
        y:[currentTarget,currentTarget,currentTarget,currentTarget,currentTarget,currentTarget,currentTarget,currentTarget,currentTarget,currentTarget,currentTarget],
      type: 'scatter',
      mode:'lines+point',
      marker:{color:'#fbb03b'},
      name:"set point"
      },
      { x: this.currentTimeLabelsForChart,
        y:[this.currentNominalPower/1000],
      type: 'scatter',
      mode:'lines+point',
      marker:{color:'transparent'},
      name:""
      },
  ]

    setTimeout(() => {
      this.getNewData()
    }, 500);
    
  }
  getNewData(){
    let myData=this.DataService.getCurrentData()
    this.currentInvertersProduction=[(String)(myData.InvP1),(String)(myData.InvP2),(String)(myData.InvP3),(String)(myData.InvP4),(String)(myData.InvP5),(String)(myData.InvP6),(String)(myData.InvP7),(String)(myData.InvP8),(String)(myData.InvP9),(String)(myData.InvP10)]
    this.currentInvertersTargets=[(String)(myData.invP1SP),(String)(myData.invP2SP),(String)(myData.invP3SP),(String)(myData.invP4SP),(String)(myData.invP5SP),(String)(myData.invP6SP),(String)(myData.invP7SP),(String)(myData.invP8SP),(String)(myData.invP9Sp),(String)(myData.invP10Sp)]
    this.currentNominalPower=20000
    this.currentActivePower=myData.P
    this.currentReactivePower=myData.Q
    this.currentPF=myData.PF
    this.currentPfForGauge=myData.PFGauge
    this.currentPTargetPercentage=myData.SetP
    this.currentQTargetPercentage=myData.SetQ
    let now=new Date()

    this.simulateGetData()
  }
  generateRandomInt(min:number,max:number){
    return Math.floor(Math.random()*(max-min)+min)
  }
  generateRandomFloat(min:number,max:number){
    return parseFloat((Math.random()*(max-min)+min).toFixed(2))
  }
  uploadData(event:any){
    this.DataService.read(event)
      
  }
  
}