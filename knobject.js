function Knob(array) {
    var self = this;

    this.diameter = 50;
    this.type = 'smooth';
    this.knobValue = 0;
    this.min = 0;
    this.max = 100;
    this.onLeftTurn = function() {
        console.log('Please update me.')
    }
    this.onRightTurn = function() {
        console.log('Please update me.')
    }

    for(var key in array)
    {
        if(array.hasOwnProperty(key))
        {
            if(array[key] != null) 
            {   
                this[key] = array[key]; 
            }
        }
    }
    if(this.diameter == null) { this.diameter = 50; }

    if(this.containerId == null) {
        var div = document.createElement("div");
    
        div.setAttribute("width", this.diameter);
        div.setAttribute("height", this.diameter);
        div.setAttribute('id', 'knobContainer');

        document.body.appendChild(div);

        this.containerId = 'knobContainer';
    }
    if(this.knobId == null) { this.knobId = 'knob'}

    var canvas = document.createElement("canvas");
    
    canvas.setAttribute("width", this.diameter);
    canvas.setAttribute("height", this.diameter);
    canvas.setAttribute('id', this.knobId);
    
    document.getElementById(this.containerId).appendChild(canvas);

    document.getElementById(this.knobId).addEventListener('mousedown', function() {
        self.capture(event);
    });
    
    this.context = document.getElementById(this.knobId).getContext('2d');
    
    this.preRotate();

    return this;
}
Knob.prototype.capture = function(event) {
    if(this.type == null) { this.type == 'smooth'; }

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
                        if(self.min == 0)
                        {
                            self.right();
                            self.right();
                            self.right();
                            self.right();
                        }else
                        {
                            self.right();
                            self.right();
                            self.right();
                            self.right();
                            self.right();
                            self.right();
                            self.right();
                            self.right();
                        }
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
                        if(self.min == 0)
                        {
                            self.left();
                            self.left();
                            self.left();
                            self.left();
                        }else 
                        {
                            self.left();
                            self.left();
                            self.left();
                            self.left();
                            self.left();
                            self.left();
                            self.left();
                            self.left();
                        }
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

        if(this.context != null)
        {
            var ctx = this.context;
            ctx.clearRect(0,0,this.diameter,this.diameter);
            ctx.setTransform(1, 0, 0, 1, 0, 0);

            this.preRotate();

            if(this.min == 0) { this.leftFunction(this.knobValue); }
        }
    }
}
Knob.prototype.drawKnob = function() {
    if(this.context != null)
    {
        if(this.diameter == null) { this.diameter = 50; }

        var ctx = this.context;
        ctx.beginPath();
        ctx.arc(this.diameter/2,this.diameter/2,this.diameter/2,0,2*Math.PI);
        ctx.fillStyle = 'rgb(126,38,36)';
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(this.diameter/2,0);
        ctx.lineTo(this.diameter/2,this.diameter/3);
        ctx.lineWidth = this.diameter/7.5;
        ctx.stroke();
        ctx.closePath();
    }
}
Knob.prototype.left = function() {
    if(this.knobValue == null) { this.knobValue = 0; }
    if(this.min == null) { this.min = 0; }

    if(this.knobValue > this.min) 
    {
        this.knobValue--;
        this.rotate('left');
        this.drawKnob();

        if(this.onLeftTurn != null) {
            if(typeof this.onLeftTurn == 'function')
            {
                this.onLeftTurn(this.knobValue);
            }
        }
    }
}
Knob.prototype.right = function() {
    if(this.knobValue == null) { this.knobValue = 0; }
    if(this.max == null) { this.max = 0; }

    if(this.knobValue < this.max) 
    {
        this.knobValue++;
        this.rotate('right');
        this.drawKnob();

        if(this.onRightTurn != null) {
            if(typeof this.onRightTurn == 'function')
            {
                this.onRightTurn(this.knobValue);
            }
        }
    }
}
Knob.prototype.preRotate = function() {
    if(this.context != null) 
    {
        var ctx = this.context;

        if(this.diameter == null) { this.diameter = 0; }

        ctx.clearRect(0,0,this.diameter,this.diameter);
        ctx.translate(this.diameter/2, this.diameter/2);

        if(this.min == null) { this.min = 0 };
        if(this.knobValue == null) { this.knobValue = 0; }

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
}
Knob.prototype.rotate = function(direction) {
    if(this.context != null)
    {
        var ctx = this.context;

        if(this.diameter == null) { this.diameter = 0; } 

        ctx.clearRect(0,0,this.diameter,this.diameter);
        ctx.translate(this.diameter/2, this.diameter/2); 

        if(this.min == null) { this.min = 0; }

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
}