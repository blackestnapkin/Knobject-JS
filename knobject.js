function createKnob() {
    return new Knob();
}
function Knob() {
    this.type = 'smooth';
    this.knobValue = 0;
    this.min = 0;
    this.max = 100;

    return this;
}
Knob.prototype.init = function(array) { 
    for(var key in array)
    {
        if(array.hasOwnProperty(key))
        {
            this[key] = array[key];
        }
    }
    this.context = document.getElementById(this.location).getContext('2d');
    this.preRotate();
}
Knob.prototype.capture = function(event) {
    var self = this;
    if(!event.altKey) {
        var x = event.clientX;
        var y = event.clientY;
        function knobUpdate(e) {
            var newX = e.clientX;
            var newY = e.clientY;
            if(newY < y) {
                if(self.type == 'smooth')
                {
                    if(!e.ctrlKey) {
                        self.right();
                        self.right();
                        self.right();
                        self.right();
                    }else {
                        self.right();
                    }
                }else 
                {
                    self.right();
                }
                y = newY;
            }
            if(newY > y) {
                if(self.type == 'smooth')
                {
                    if(!e.ctrlKey) {
                        self.left();
                        self.left();
                        self.left();
                        self.left();
                    }else {
                        self.left();
                    }
                }else
                {
                    self.left();
                }
                y = newY;
            }
        }
        window.addEventListener("mousemove", knobUpdate);
        window.onmouseup = function() {
            window.removeEventListener("mousemove", knobUpdate);
        }
    }else {
        this.knobValue = 0;

        if(this.min == -100)
        {
            var ctx = this.context;
            ctx.clearRect(0,0,this.diameter,this.diameter);
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            
            this.drawKnob();
        }
    }
}
Knob.prototype.drawKnob = function() {
    var ctx = this.context;
    ctx.beginPath();
    ctx.arc(this.diameter/2,this.diameter/2,this.diameter/2,0,2*Math.PI);
    ctx.fillStyle = 'rgb(126,38,36)';
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(this.diameter/2,0);
    ctx.lineTo(this.diameter/2,this.diameter/3);
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.closePath();
}
Knob.prototype.left = function() {
    if(this.knobValue > this.min) 
    {
        this.knobValue--;
        this.rotate('left');
        this.drawKnob();

        //define custom events here
    }
}
Knob.prototype.right = function() {
    if(this.knobValue < this.max) 
    {
        this.knobValue++;
        this.rotate('right');
        this.drawKnob();

        //define custom events here
    }
}
Knob.prototype.preRotate = function() {
    var ctx = this.context;
    ctx.clearRect(0,0,this.diameter,this.diameter);
    ctx.translate(this.diameter/2, this.diameter/2);
    switch(this.min)
    {
        case 0: 
            ctx.rotate((Math.abs(-1*100)*1.45)*Math.PI/-180); 
        break;
        case -100:
            this.knobValue < 0 ? ctx.rotate((Math.abs(parseFloat(this.knobValue)*100)*1.45)*Math.PI/-180) : ctx.rotate((Math.abs(parseFloat(this.knobValue)*100)*1.45)*Math.PI/180); 
        break;
    }
    ctx.translate(-this.diameter/2, -this.diameter/2);
    this.drawKnob();
}
Knob.prototype.rotate = function(direction) {
    var ctx = this.context;
    ctx.clearRect(0,0,this.diameter,this.diameter);
    ctx.translate(this.diameter/2, this.diameter/2); 
    switch(this.min)
    {
        case 0:
            direction == 'left' ? ctx.rotate(2.9*Math.PI/-180) : ctx.rotate(2.9*Math.PI/180);
        break;
        case -100:
            direction == 'left' ? ctx.rotate(1.45*Math.PI/-180) : ctx.rotate(1.45*Math.PI/180);
        break;
    }
    ctx.translate(-this.diameter/2, -this.diameter/2);
}