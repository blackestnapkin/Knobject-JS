function Knob(array) {
    var self = this;

    this.diameter = 50;
    this.knobValue = 0;
    this.min = 0;
    this.max = 100;
    this.orientation = 'normal';
    this.step = 1;
    this.type = 'smooth';

    this.onLeftTurn = function() {
        console.log('Please update me.')
    }
    this.onRightTurn = function() {
        console.log('Please update me.')
    }
    this.onCenter = function() {
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
    if(this.diameter == null || typeof this.diameter != 'number') { this.diameter = 50; }

    if(this.containerId == null || typeof this.containerId != 'string') {
        var div = document.createElement("div");
    
        div.setAttribute("width", this.diameter);
        div.setAttribute("height", this.diameter);
        div.setAttribute('id', 'knobContainer');

        document.body.appendChild(div);

        this.containerId = 'knobContainer';
    }
    if(this.knobId == null || typeof this.knobId != 'string') { this.knobId = 'knob'}

    var canvas = document.createElement("canvas");
    
    canvas.setAttribute("width", this.diameter);
    canvas.setAttribute("height", this.diameter);
    canvas.setAttribute('id', this.knobId);
    
    document.getElementById(this.containerId).appendChild(canvas);

    document.getElementById(this.knobId).addEventListener('mousedown', function() {
        event.stopPropagation();
        self.capture(event);
    });
    
    if(this.knobValue == null || typeof this.knobValue != 'number') { this.knobValue = 0; } 
    if(this.max == null || typeof this.max != 'number') { this.max = 100; } 
    if(this.min == null || typeof this.max != 'number') { this.min = 100; } 
    if(this.orientation == null || typeof this.orientation != 'string') { this.orientation = 'normal'; }
    if(this.step == null || typeof this.step != 'number') { this.step = 1; } 
    if(this.type == null || typeof this.type != 'smooth') { this.type = 'smooth'; }

    this.context = document.getElementById(this.knobId).getContext('2d');
    
    this.preRotate();

    return this;
}
Knob.prototype.capture = function(event) {
    if(this.type == null || typeof this.type != 'smooth') { this.type = 'smooth'; }
    if(this.min == null || typeof this.max != 'number') { this.min = 100; } 

    var self = this;
    if(!event.altKey) {
        var x = event.clientX;
        var y = event.clientY;
        function knobUpdate(e) {
            var newX = e.clientX;
            var newY = e.clientY;
            if(newY < y) 
            {
                if(self.type == 'smooth')
                {
                    if(!e.ctrlKey) 
                    {
                        self.right();
                        self.right();
                        self.right();
                        self.right();
                    }else 
                    {
                        self.right();
                    }
                }else 
                {
                    self.right();
                }
                y = newY;
            }
            if(newY > y) 
            {
                if(self.type == 'smooth')
                {
                    if(!e.ctrlKey) 
                    {
                        self.left();
                        self.left();
                        self.left();
                        self.left();
                    }else 
                    {
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

            if(this.min == null || typeof this.max != 'number') { this.min = 100; } 
            if(this.orientation == null || typeof this.orientation != 'string') { this.orientation = 'normal'; }

            switch(this.orientation)
            {
                case 'normal': 
                    if(this.onLeftTurn != null) {
                        if(typeof this.onCenter == 'function')
                        {
                            this.onLeftTurn(this.knobValue);
                        }
                    }
                break;
                case 'noon':
                    if(this.onLeftTurn != null) {
                        if(typeof this.onCenter == 'function')
                        {
                            this.onCenter(this.knobValue);
                        }
                    }
                break;
            }
        }
    }
}
Knob.prototype.drawKnob = function() {
    if(this.context != null)
    {
        if(this.diameter == null || typeof this.diameter != 'number') { this.diameter = 50; } 

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
    if(this.knobValue == null || typeof this.knobValue != 'number') { this.knobValue = 0; } 
    if(this.min == null || typeof this.max != 'number') { this.min = 100; } 
    if(this.step == null || typeof this.step != 'number') { this.step = 1; } 

    if(this.knobValue > this.min) 
    {
        this.knobValue -= this.step;
        this.rotate('left');
        this.drawKnob();

        if(this.onLeftTurn != null && typeof this.onLeftTurn == 'function')
        {
            this.onLeftTurn(this.knobValue);
        }
    }
}
Knob.prototype.right = function() {
    if(this.knobValue == null || typeof this.knobValue != 'number') { this.knobValue = 0; } 
    if(this.max == null || typeof this.max != 'number') { this.max = 100; } 
    if(this.step == null || typeof this.step != 'number') { this.step = 1; } 

    if(this.knobValue < this.max) 
    {
        this.knobValue += this.step;
        this.rotate('right');
        this.drawKnob();

        if(this.onRightTurn != null && typeof this.onRightTurn == 'function')
        {
            this.onRightTurn(this.knobValue);
        }
    }
}
Knob.prototype.preRotate = function() {
    if(this.context != null) 
    {
        var ctx = this.context;

        if(this.diameter == null || typeof this.diameter != 'number') { this.diameter = 50; } 

        ctx.clearRect(0,0,this.diameter,this.diameter);
        ctx.translate(this.diameter/2, this.diameter/2);

        if(this.knobValue == null || typeof this.knobValue != 'number') { this.knobValue = 0; } 
        if(this.min == null || typeof this.min != 'number') { this.min = 0; } 
        if(this.orientation == null || typeof this.orientation != 'string') { this.orientation = 'normal'; }

        switch(this.orientation)
        {
            case 'normal': 
                ctx.rotate(145*Math.PI/-180); 
            break;
            case 'noon':
                if(this.knobValue < 0)
                {
                    ctx.rotate(Math.abs(this.knobValue)*145/Math.abs(this.min)*Math.PI/-180);
                }else {
                    ctx.rotate(Math.abs(this.knobValue)*145/Math.abs(this.min)*Math.PI/180);
                }
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

        if(this.diameter == null || typeof this.diameter != 'number') { this.diameter = 50; } 

        ctx.clearRect(0,0,this.diameter,this.diameter);
        ctx.translate(this.diameter/2, this.diameter/2); 

        if(this.max == null || typeof this.max != 'number') { this.max = 100; } 
        if(this.min == null || typeof this.max != 'number') { this.min = 100; } 
        if(this.orientation == null || typeof this.orientation != 'string') { this.orientation = 'normal'; }

        switch(this.orientation)
        {
            case 'normal':
                direction == 'left' ? ctx.rotate((290/(this.max-this.min))*Math.PI/-180) : ctx.rotate((290/(this.max-this.min))*Math.PI/180);
            break;
            case 'noon':
                if(Math.abs(this.min) == Math.abs(this.max))
                {
                    direction == 'left' ? ctx.rotate((145/this.max)*Math.PI/-180) : ctx.rotate((145/this.max)*Math.PI/180);
                }
                else
                {
                    if(direction == 'left')
                    { 
                        if(this.knobValue > 0)
                        {
                            ctx.rotate(145/Math.abs(this.max)*Math.PI/-180);
                        }else
                        {
                            ctx.rotate(145/Math.abs(this.min)*Math.PI/-180);
                        }
                    }else
                    {
                        if(this.knobValue > 0)
                        {
                            ctx.rotate(145/Math.abs(this.max)*Math.PI/180);
                        }else
                        {
                            ctx.rotate(145/Math.abs(this.min)*Math.PI/180);
                        }
                    }
                }
            break;
        }
        ctx.translate(-this.diameter/2, -this.diameter/2);
    }
}