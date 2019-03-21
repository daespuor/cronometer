import React,{Component} from 'react';
import {addSeconds,formatTime} from '../utils';
import CronometerComponent from './cronometer.component';
export default class Cronometer extends Component{
    
    constructor(props){
        super(props);
        this.state={
            time:{
                sec:0,
                min:0,
                hours:0
            },
            interval:null
        }
        this.handlePause=this.handlePause.bind(this);
        this.handlePlay=this.handlePlay.bind(this);
        this.handleStop=this.handleStop.bind(this);
    }

    componentDidMount(){
        this.play=document.getElementById('play');
        this.play.addEventListener('click',this.handlePlay);
        this.pause=document.getElementById('pause');
        this.pause.addEventListener('click',this.handlePause);
        this.stop=document.getElementById('stop');
        this.stop.addEventListener('click',this.handleStop);
    }
    handlePlay(){
       
           if(this.state.interval===null){ 
                this.setState({
                    interval:setInterval(()=>{
                                    this.setState((state)=>{
                                        return {
                                            time:addSeconds(state.time)
                                        }
                                    })
                                },1000)
                })
            }
    }

    handlePause(ev){
            if(this.state.interval!==null){
                clearInterval(this.state.interval);
                this.setState({
                    interval:null
                })
            }
    }

    handleStop(){
   
            if(this.state.interval!==null)
            clearInterval(this.state.interval);
            this.setState({
                interval:null,
                time:{
                    sec:0,
                    min:0,
                    hours:0
                }
            })
    
    }

    componentWillUnmount(){
        clearInterval(this.state.interval);
        this.play.removeEventListener('click',this.handlePlay);
        this.pause.removeEventListener('click',this.handlePause);
        this.stop.removeEventListener('click',this.handleStop);
    }
    
    render(){
        const value=`${formatTime(this.state.time.hours)}:${formatTime(this.state.time.min)}:${formatTime(this.state.time.sec)}`;
        return(
            <div>
                <CronometerComponent value={value}/>
            </div>
        )
    }
}