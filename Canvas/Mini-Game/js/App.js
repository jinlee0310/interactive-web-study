import Background from "./Background.js"
import Coin from "./Coin.js"
import Player from "./Player.js"
import Score from "./Score.js"
import Wall from "./Wall.js"

export default class App{
    static canvas=document.querySelector('canvas')
    static ctx=App.canvas.getContext('2d')
    static dpr=devicePixelRatio > 1 ? 2 : 1
    static interval=1000/60
    static width=1024
    static height=768

    constructor(){
        this.backgrounds=[
            new Background({img:document.querySelector('#bg3-img'),speed:-1}),
            new Background({img:document.querySelector('#bg2-img'),speed:-2}),
            new Background({img:document.querySelector('#bg1-img'),speed:-4}),
        ]

        this.walls=[
            new Wall({type:'SMALL'})
        ]

        this.player=new Player()

        this.coins=[
            new Coin(
                this.walls[0].x+this.walls[0].width/2,
                this.walls[0].y2-this.walls[0].gapY/2,
                this.walls[0].vx
            )
        ]

        this.score=new Score()

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
            delta=now-then
            if(delta<App.interval) return

            App.ctx.clearRect(0,0,App.width,App.height)
            App.ctx.fillRect(50,50,100,100)

            // 배경 관련
            this.backgrounds.forEach(background=>{
                background.update()
                background.draw()
            })

            // 벽 관련
            for(let i=this.walls.length-1;i>=0;i--){
                this.walls[i].update()
                this.walls[i].draw()

                // 벽 제거
                if(this.walls[i].isOutside) {
                    this.walls.splice(i,1)
                    continue
                }

                // 벽 생성
                if(this.walls[i].canGenerateNext){
                    this.walls[i].generatedNext=true
                    const newWall=new Wall({type:Math.random()>0.3? 'SMALL':'BIG'})
                    this.walls.push(newWall)

                    // 코인 생성
                    if(Math.random()<1){
                        const x=newWall.x+newWall.width/2
                        const y=newWall.y2-newWall.gapY/2
                        this.coins.push(new Coin(x,y,newWall.vx))
                    }
                }

                // 벽과 플레이어 충돌 관련
                if(this.walls[i].isColliding(this.player.boundingBox)){
                    this.player.boundingBox.color=`rgba(255,0,0,0.3)`
                }else{
                    this.player.boundingBox.color=`rgba(0,0,255,0.3)`
                }
            }

            // 플레이어 관련
            this.player.update()
            this.player.draw()

            // 코인 생성
            for(let i=this.coins.length-1;i>=0;i--){
                this.coins[i].update()
                this.coins[i].draw()
                if(this.coins[i].x+this.coins[i].width<0){
                    this.coins.splice(i,1)
                    continue
                }

                // 코인과 플레이어 충돌 관련
                if(this.coins[i].boundingBox.isColliding(this.player.boundingBox)){
                    this.coins.splice(i,1)
                    this.score.coinCount+=1
                }
            }
            this.score.update()
            this.score.draw()

            then=now-(delta%App.interval)
        }
        requestAnimationFrame(frame)
    }
}