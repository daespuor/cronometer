export const  addSeconds=(time)=>{
    time.sec++;
    if(time.sec>=60){
        time.sec=0;
        time.min++;
    }
    if(time.min>=60){
        time.min=0;
        time.hours++;
    }

    return time;
}

export const formatTime=(time)=>{
    return time<10?`0${time}`:time;
}