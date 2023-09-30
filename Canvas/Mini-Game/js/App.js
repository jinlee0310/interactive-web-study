export default class App{
    static canvas=document.querySelector('canvas')
    static ctx=App.canvas.getContext('2d')
    static dpr=devicePixelRatio > 1 ? 2 : 1
    static interval=1000/60
    static width=1024
    static height=768

    constructor(){
        //binding을 안해주면 this가 window를 가리킴
        window.addEventListener('resize',this.resize.bind(this))
    }

    resize(){
        App.canvas.width=App.width*App.dpr
        App.canvas.height=App.height*App.dpr
        App.ctx.scale(App.dpr,App.dpr)

        const width=innerWidth>innerHeight? innerWidth * 0.9 : innerHeight * 0.9
        App.canvas.style.width=width+'px'
        App.canvas.style.height=width*(3/4)+'px'
    }

    render(){
        let now, delta
        let then=Date.now()
        const frame=()=>{
            requestAnimationFrame(frame)
            now=Date.now()
            delta=now-delta
            if(delta<App.interval) return

            App.ctx.clearRect(0,0,App.width,App.height)
            App.ctx.fillRect(50,50,100,100)

            then=now-(delta%App.interval)
        }
        requestAnimationFrame(frame)
    }
}