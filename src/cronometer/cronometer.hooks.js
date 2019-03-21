import React,{useState,useEffect,useRef} from 'react';
import {addSeconds,formatTime} from '../utils';
import CronometerComponent from './cronometer.component';


export default function Cronometer(props){
    let time=useEventListeners();
    const value=`${formatTime(time.hours)}:${formatTime(time.min)}:${formatTime(time.sec)}`;
    return(
            <div>
                <CronometerComponent value={value}/>
            </div>
    )
}

function useEventListeners(){
    let [time,setTime]=useState({
            sec:0,
            min:0,
            hours:0
    });
    let savedCallback=useCurrentCallback(()=>{
        const newtime=addSeconds(time);
        setTime({
            sec:newtime.sec,
            min:newtime.min,
            hours:newtime.hours
        })
    });
    let interval=null;
    useEffect(()=>{
        const play=document.getElementById('play');
        play.addEventListener('click',handlePlay);
        const stop=document.getElementById('stop');
        stop.addEventListener('click',handleStop);
        const pause=document.getElementById('pause');
        pause.addEventListener('click',handlePause);
        return ()=>{
            clearInterval(interval);
            play.removeEventListener('click',handlePlay);
            stop.removeEventListener('click',handleStop);
            pause.removeEventListener('click',handlePause);
        }
    },[])
    function handlePlay(){
        if(interval===null){
            interval=setInterval(()=>savedCallback.current(),1000);
        }
    }
    function handleStop(ev){
        if(interval!==null){
            clearInterval(interval);
            setTime(
                {
                    sec:0,
                    min:0,
                    hours:0
                }
            );
            interval=null;
        }
    }
    function handlePause(ev){   
        if(interval!==null){
            clearInterval(interval);
            interval=null;
        }
    }
    return time;
}

function useCurrentCallback(callback){
    let savedCallback=useRef();
    useEffect(()=>{
        savedCallback.current=callback;
    })
    
    return savedCallback;
}