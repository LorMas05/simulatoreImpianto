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
  showSettings=false

  /*variables that are used for logic of components view*/
  currentTimeLabelsForChart=["15:23:30","15:24:00","15:24:30","15:25:00","15:25:30","15:26:30","15:23:30","15:23:30","15:23:30","15:23:30",]
  currentkwPerTime=[1,3,4,6,2,5]
  currentNominalPower=24500
  currentQTargetPercentage=0.5
  currentPTargetPercentage=0.5
  currentActivePower=12250
  currentReactivePower=8000
  currentPF=0.45


  invertersChart = {
    data: [
        { x: ["inverter 1", "inverter 2", "inverter 3","inverter 4","inverter 5","inverter 6", "inverter 7", "inverter 8","inverter 9","inverter 10"], y: ["2000", "1600", "1800","1500","1900","1200","1400","1600","2000","1900"], type: 'histogram', histfunc: "sum",marker:{color:"#1b81e8"}},
    ],
    layout: { 
      title: 'Active power produced by any single inverter',
      bargap :6,height:document.getElementById("singleActivePowerDiv")?.style.height,
      width:document.getElementById("singleActivePowerDiv")?.style.width,
      paper_bgcolor:"transparent",
      plot_bgcolor:"transparent",
      margin:{t:25,b:30},
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

timeLinePlot={
  data: [
      { x: this.currentTimeLabelsForChart,
        y:this.currentkwPerTime,
        fill: 'tozeroy',
        type: 'scatter',
        fillcolor:'#0084e4c9',
        mode:'none'
      },
      { x: this.currentTimeLabelsForChart,
        y:[15,15,15,15,15,15,15,15,15],
      type: 'scatter',
      mode:'lines+point',
      marker:{color:'#fbb03b'}
      },
      { x: this.currentTimeLabelsForChart,
        y:[this.currentNominalPower/1000],
      type: 'scatter',
      mode:'lines+point',
      marker:{color:'transparent'}
      },
  ],
  layout: { 
    title: 'Active power of entire power plant',
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
        color: 'lightgrey'
      },
      showticklabels: true,
      tickangle: 'auto',
      tickfont: {
        family: 'Old Standard TT, serif',
        size: 14,
        color: 'black'
      },

    },
    yaxis: {
      title: 'kW',
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
    title: 'QP Signals',
    font:{size:10,color:'white'},
    paper_bgcolor:"transparent",
    plot_bgcolor:"transparent",
    xaxis: {
      range: [-2, 2],
      zeroline: false
    },
    yaxis: {
      range: [0, 1.3]
    },
    width: document.getElementById("QpSignalsDiv")?.style.width,
    height: document.getElementById("QpSignalsDiv")?.style.height,
    shapes: [
      {
        type: 'circle',
        xref: 'x',
        yref: 'y',
        fillcolor: '#0084e4c9',
        x0: -this.currentNominalPower/20000,
        y0: -this.currentNominalPower/20000,
        x1: this.currentNominalPower/20000,
        y1: this.currentNominalPower/20000,
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
        y1: Math.sqrt((this.currentNominalPower/20000)**2-(this.currentQTargetPercentage)**2),
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
        y1: Math.sqrt((this.currentNominalPower/20000)**2-(this.currentQTargetPercentage)**2),
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
        x0: -Math.sqrt((this.currentNominalPower/20000)**2-(this.currentPTargetPercentage)**2),
        y0: this.currentPTargetPercentage,
        x1: Math.sqrt((this.currentNominalPower/20000)**2-(this.currentPTargetPercentage)**2),
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
      mode: "gauge+number+delta",
      delta: { reference: 0 },
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
      mode: "gauge+number+delta",
      delta: { reference: 0 },
      gauge: {
        axis: { range: [-this.currentNominalPower, this.currentNominalPower],tickcolor: "#1b81e8"  },
        bar: { color: "#fbb03b" },
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
          value: this.currentPF
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
      console.log(document.getElementById("singleActivePowerDiv")?.style.height,document.getElementById("singleActivePowerDiv")?.style.width)
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
    this.powerFactorGauge.data[0].gauge.threshold.value=this.currentPF
    /*refreshing qp signals*/
    this.QPSignlas.layout={
      title: 'QP Signals',
      font:{size:10,color:'white'},
      paper_bgcolor:"transparent",
      plot_bgcolor:"transparent",
      xaxis: {
        range: [-2, 2],
        zeroline: false
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
          x0: -this.currentNominalPower/20000,
          y0: -this.currentNominalPower/20000,
          x1: this.currentNominalPower/20000,
          y1: this.currentNominalPower/20000,
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
          y1: Math.sqrt((this.currentNominalPower/20000)**2-(this.currentQTargetPercentage)**2),
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
          y1: Math.sqrt((this.currentNominalPower/20000)**2-(this.currentQTargetPercentage)**2),
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
          x0: -Math.sqrt((this.currentNominalPower/20000)**2-(this.currentPTargetPercentage)**2),
          y0: this.currentPTargetPercentage,
          x1: Math.sqrt((this.currentNominalPower/20000)**2-(this.currentPTargetPercentage)**2),
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
        }
        
      ]
    }
    /* end refreshinf qp signals*/
    /*refreshing inverters Start*/
    let newArrayOfInverters=[]
    for(let i=0;i<10;i++){
      newArrayOfInverters.push((String)(this.generateRandomInt(1000,2000)))
    }
    this.invertersChart.data[0].y=newArrayOfInverters
    /*refreshing inverters End*/
    let newRandomNumber=this.generateRandomInt(5,15)
    this.currentkwPerTime.push(newRandomNumber)
    this.currentkwPerTime.shift()
    this.timeLinePlot.data=[
      { x: this.currentTimeLabelsForChart,
        y:this.currentkwPerTime,
        fill: 'tozeroy',
        type: 'scatter',
        fillcolor:'#0084e4c9',
        mode:'none'
      },
      { x: this.currentTimeLabelsForChart,
        y:[15,15,15,15,15,15,15,15,15],
      type: 'scatter',
      mode:'lines+point',
      marker:{color:'#fbb03b'}
      },
      { x: this.currentTimeLabelsForChart,
        y:[this.currentNominalPower/1000],
      type: 'scatter',
      mode:'lines+point',
      marker:{color:'transparent'}
      },
  ]

    setTimeout(() => {
      this.getNewData()
    }, 300);
    
  }
  getNewData(){
    this.currentNominalPower=this.generateRandomInt(18000,20000)
    this.currentActivePower=this.generateRandomInt(30000,this.currentNominalPower-5000)
    this.currentReactivePower=this.generateRandomInt(8000,this.currentNominalPower-5000)
    this.currentPF=this.generateRandomFloat(0,1)
    this.currentPTargetPercentage=this.generateRandomFloat(0.3,1)
    this.currentQTargetPercentage=this.generateRandomFloat(0.3,Math.sqrt((this.currentNominalPower/20000)**2-this.currentPTargetPercentage**2))

    this.simulateGetData()
  }
  generateRandomInt(min:number,max:number){
    return Math.floor(Math.random()*(max-min)+min)
  }
  generateRandomFloat(min:number,max:number){
    return parseFloat((Math.random()*(max-min)+min).toFixed(2))
  }
}