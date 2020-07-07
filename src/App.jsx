import React, { Component } from 'react';
import './App.css';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import ReactDOM from 'react-dom';

class App extends Component{
  state = {
    imageUrl: 'https://picsum.photos/200',
    numBar: 10,
    left: [],
    middle: [],
    right: [],
    sel: false,
    selName: "null",
    totalMoves: 1,
    i: 1,
    value: "human",
    numMove: 0
  };
  constructor(props){
    super(props);
    let temp = [];
    for(let i=0;i<this.state.numBar;i++){
      temp.push(i+1);
    }
    this.state.left=temp;
    this.state.totalMoves=((Math.pow(2,this.state.numBar))-1);
  }
  hanoiMove = (src, dest) => {
    if (src.length==0){
      src.unshift(dest[0]);
      dest.shift();
    }
    else if(dest.length == 0){
      dest.unshift(src[0]);
      src.shift();
    }
    else if (src[0] > dest[0])  {
      src.unshift(dest[0]);
      dest.shift();
    }
    else{
      dest.unshift(src[0]);
      src.shift();
    }
  }
  hanoi = () => {
    if(this.state.i <= this.state.totalMoves){
      if(this.state.numBar % 2 == 0){
          if (this.state.i % 3 == 1)
            this.hanoiMove(this.state.left, this.state.middle);
          else if (this.state.i % 3 == 2)
            this.hanoiMove(this.state.left, this.state.right);
          else if (this.state.i % 3 == 0)
            this.hanoiMove(this.state.right, this.state.middle);
      }
      else{
        if (this.state.i % 3 == 1)
          this.hanoiMove(this.state.left, this.state.right);
        else if (this.state.i % 3 == 2)
          this.hanoiMove(this.state.left, this.state.middle);
        else if (this.state.i % 3 == 0)
          this.hanoiMove(this.state.middle, this.state.right);
      }
      this.setState({i:(this.state.i+1)});
      this.setState({numMove:(this.state.numMove+1)});
    }
  }
  clickBut = name => {
    if(name===this.state.left)
      name="left";
    if(name===this.state.middle)
      name="middle";
    if(name===this.state.right)
      name="right";
    console.log(name);
    if(this.state.sel == false && ((name=="left" && this.state.left.length!=0) | (name=="right" && this.state.right.length!=0) | (name=="middle" && this.state.middle.length!=0))){
      this.setState({selName:name});
      this.setState({sel:true});
    }
    else if(this.state.selName != "null"){
      this.setState({sel:false});
      if(name=="left"){
        if(this.state.selName=="middle" && (this.state.left.length==0 | this.state.left[0]>this.state.middle[0])){
          this.state.left.unshift(this.state.middle[0]);
          this.state.middle.shift();
        }
        if(this.state.selName=="right" && (this.state.left.length==0 | this.state.left[0]>this.state.right[0])){
          this.state.left.unshift(this.state.right[0]);
          this.state.right.shift();
        }
      }
      if(name=="middle"){
        if(this.state.selName=="left" && (this.state.middle.length==0 | this.state.middle[0]>this.state.left[0])){
          this.state.middle.unshift(this.state.left[0]);
          this.state.left.shift();
        }
        if(this.state.selName=="right" && (this.state.middle.length==0 | this.state.middle[0]>this.state.right[0])){
          this.state.middle.unshift(this.state.right[0]);
          this.state.right.shift();
        }
      }
      if(name=="right"){
        if(this.state.selName=="left" && (this.state.right.length==0 | this.state.right[0]>this.state.left[0])){
          this.state.right.unshift(this.state.left[0]);
          this.state.left.shift();
        }
        if(this.state.selName=="middle" && (this.state.right.length==0 | this.state.right[0]>this.state.middle[0])){
          this.state.right.unshift(this.state.middle[0]);
          this.state.middle.shift();
        }
      }
      this.setState({selName:null});
      this.setState({numMove:(this.state.numMove+1)});
    }
  }
  handleChange = (event) =>{
    let temp = [];
    for(let i=0;i<this.state.numBar;i++){
      temp.push(i+1);
    }
    this.setState({left: temp});
    this.setState({middle: []});
    this.setState({right: []});
    this.setState({value:event.target.value});
    this.setState({numMove:0});
  }
  inputType = (col) => {
    if(this.state.value=="human"){
      this.clickBut(col);}
    else if((col===this.state.middle) & (this.state.value=="bot")){
      this.hanoi();}
  }
  render(){
    return(
      <React.Fragment>
        {this.drawAll()}
      </React.Fragment>
    );
  }
  drawAll(){
    return(
      <React.Fragment>
        <div class = "row">
          <div class="column" style={{width:"5%"}}></div>
          <div class="column" style={{width:"30%"}}>
            <FormControl component="fieldset" style={{marginLeft:"10%", marginTop: 13}}>
              <FormLabel component="legend">Input Type:</FormLabel>
              <RadioGroup row aria-label="InputType" name="InputType" value={this.state.value} onChange={this.handleChange}>
                <FormControlLabel value="bot" control={<Radio />} label="Bot" />
                <FormControlLabel value="human" control={<Radio />} label="Human" />
              </RadioGroup>
            </FormControl>
          </div>
          <div class="column" style={{width:"30%"}}>
            <div style={{marginTop: 13}} className={makeStyles({root:{width:300}}).root}>
              <Typography id="discrete-slider" gutterBottom>
                Number of Bars:
              </Typography>
              <Slider
                defaultValue={30}
                onChange={(event) => this.slideR(event.target.innerText)}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                max={10}
              />
            </div>
          </div>
          <div class="column" style={{width:"22%"}}></div>
          <div class="column" style={{width:"1%"}}>
            <span style={{fontSize: "50px", fontWeight: 'bold'}} className="badge m-2 badge-warning">{this.state.numMove}</span>
          </div>
        </div>
        <div class="row">
          <svg width={0} height={390-this.state.numBar*21}><rect style={{x:0, y:0, width:0, height:450-this.state.numBar*21, fill:"#FFFFFF",strokeWidth:0,stroke:"#FFFFFF"}} /></svg>
        </div>
        <div class="row">
          <div class="column" style={{width:"2.23%"}}></div>
          {this.drawCols(this.state.left)}
          {this.drawCols(this.state.middle)}
          {this.drawCols(this.state.right)}
        </div>
      </React.Fragment>
    );
  }

  slideR(val){
    this.wait(20);
    if(val != null){
      if(val[0] == "T")
        val = val[-2] + val[-1];
      val = parseInt(val);
      this.setState({numBar:val});
    }
    console.log(val);
    let temp = [];
    for(let i=0;i<this.state.numBar;i++){
      temp.push(i+1);
    }
    this.setState({left: temp});
    this.setState({middle: []});
    this.setState({right: []});
    this.setState({numMove:(0)});
  }
  wait(ms){
    var d = new Date();
    var d2 = null;
    do { d2 = new Date(); }
    while(d2-d < ms);
  }

  drawCols(col){
    let temp = [];
    for(let i=0;i<this.state.numBar-col.length;i++){
      temp.push(1);
    }
    let butClass;
    if((this.state.value=="bot") && (col !== this.state.middle))
       butClass = "btn btn-secondary btn-sm";
    else if((this.state.selName == "left" && col == this.state.left)|(this.state.selName == "middle" && col == this.state.middle)|(this.state.selName == "right" && col == this.state.right))
      butClass = "btn btn-secondary btn-sm";
    else
       butClass = "btn btn-primary btn-sm";
    return(
      <div class="column" style={{width:"32.5%"}}>
        {
          temp.map(bar =>
            <div class="row">
              <svg width={0} height={21}><rect style={{
                width:0,
                height:21,
                fill:"#FFFFFF"}} />
              </svg>
            </div>
          )
        }
        {
          col.map(bar =>
            <div class="row">
              <svg width={"86.8%"} height={21}><rect style={{
                x:((32+(this.state.numBar-bar)*(187/this.state.numBar))/4.50865800866)+"%",
                y:0,
                width:((350-(this.state.numBar-bar)*(374/this.state.numBar))/3.90625)+"%",
                height:17,
                fill:"#2409ba",
                strokeWidth:2,
                stroke:"#000000"}} />
              </svg>
            </div>
          )
        }
        {
          <div class="row">
            <button style={{fontSize:30, marginLeft:"34.3%"}}  height={300}
              onClick={() => this.inputType(col)}
              className={butClass}>
            {(butClass == "btn btn-secondary btn-sm") ? "No" : "Go"}
            </button>
          </div>
        }
      </div>
    );
  }
}

export default App;
