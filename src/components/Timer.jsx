<<<<<<< HEAD
import Sketch from "react-p5";
import "./Timer.css"
import Wave from 'react-wavify'
import { useState } from "react";

function Drop(p5) {
    this.x = p5.width / 4 + p5.random(-10, 10);
    this.y = 10;
    this.xv = p5.random(4, 5);
    this.yv = 0;

    let s = p5.random(15, 20);

    this.show = () => {
        p5.noStroke();
        // p5.fill(111, 78, 55, 40);
        p5.fill(255, 80)
        p5.ellipse(this.x, this.y, s)
    }

    this.update = () => {
        this.yv += 5.8 / 60;
        this.x += this.xv;
        this.y += this.yv;
        s *= 1.005
        this.xv *= 0.997
    }
=======
function Timer() {
    return (<p>timer</p>)
>>>>>>> 7a90704d65ee98acb7eecf6dac97414ebb88ffe1
}

const drops = []

/*
function Timer() {
    let teacupImage;
    let x, w, yOffset, y;
    const setup = (p5, canvasParentRef) => {
        teacupImage = p5.loadImage(".//teacup.png")
        // use parent to render the canvas in this ref
        // (without that p5 will render the canvas outside of your component)
        const canvasWidth = window.innerWidth * .9;
        const canavsHeight = window.innerHeight * .8;
        const canvasX = (window.innerWidth - canvasWidth) / 2;
        const canvasY = (window.innerHeight - canavsHeight) / 4;
        let canvas = p5.createCanvas(canvasWidth, canavsHeight).parent(canvasParentRef);
        canvas.position(canvasX, 0, 0)


        x = p5.width / 2;
        w = 200;
        yOffset = -w * 2.5;
        y = p5.height - yOffset;
    };

    const draw = (p5) => {
        drops.push(new Drop(p5))
        drops.push(new Drop(p5))
        drops.push(new Drop(p5))
        drops.push(new Drop(p5))
        p5.background('#EECA81');
        // p5.background(0, 0, 0)

        y -= 0.1;
        // console.log(y)
        let h = w / 3;
        let full = w * 4;
        let empty = full * 1.4;
        let yc = p5.constrain(y, full * 1.01, empty);
        // let yc =100
        let yr = 1 / 9 * ((empty - yc) / 100); // times .4375 to cap at .35
        let wc = w + w * yr;
        let hc = h + h * yr;

        //liquid fill
        p5.noStroke();
        p5.fill('GhostWhite');
        p5.ellipse(x, empty + yOffset, w, h); //bottom
        p5.beginShape();
        p5.vertex(x - wc / 2, yc + yOffset);
        p5.vertex(x + wc / 2, yc + yOffset);
        p5.vertex(x + w / 2, empty + yOffset);
        p5.vertex(x - w / 2, empty + yOffset);
        p5.endShape(p5.CLOSE);
        p5.fill('white');
        p5.ellipse(x, yc + yOffset, wc, hc); //changing 
        //cup outline
        p5.strokeWeight(7);
        p5.stroke('#DDB970');
        // p5.fill(255, 255, 255, 80); //transparent white
        p5.noFill();
        p5.line(x - w / 2, empty + yOffset, x - w * 1.35 / 2 + 1, full + yOffset);
        p5.line(x + w / 2, empty + yOffset, x + w * 1.35 / 2 - 1, full + yOffset);
        p5.arc(x, empty + yOffset, w, h, 0, p5.PI, p5.OPEN); //bottom arc
        // p5.fill('#DEBA71');
        p5.noFill();
        // p5.ellipse(x, full, w * 1.35, h * 1.35); //top
        p5.arc(x, full + yOffset, w * 1.35, h * 1.35, p5.PI, 0, p5.OPEN); //top arc

        for (let i = 0; i < drops.length; i++) {
            const drop = drops[i];
            drop.show();
            drop.update();
            if (drop.y > yc + yOffset) {
                drops.splice(i, 1);
            }
        }

        p5.noFill();
        p5.strokeWeight(7);
        p5.stroke('#DDB970');
        p5.arc(x, full + yOffset, w * 1.35, h * 1.35, 0, p5.PI, p5.OPEN); //bottom arc
    };

    return <Sketch className="sketch" setup={setup} draw={draw} />;
}
*/

function Timer() {
    const [waveHeight, setWaveHeight] = useState(20);

    const handleClick = () => {
        console.log('what')
        setWaveHeight(waveHeight - 5);
    };

    return (
        <Wave className="wave" fill='#1b95e0'
            paused={false}
            options={{
                height: 20,
                amplitude: 30,
                speed: 0.25,
                points: 4
            }}
        />
    );
}

export default Timer;