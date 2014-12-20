var IIC = {
    userListeners: {},
    
    addEventListener: function(event, listener) {
        // We aren't calling user listeners for this event: start doing so.
        if(!this.userListeners[event]) {
            this.userListeners[event] = [];
            
            var defaultListener = events[event];
            events[event] = function(data) {
                // Call the system's listener.
                defaultListener(data);
                
                // And then all of the user-defined ones.
                for(var i = 0; i < this.userListeners[event].length; i++) {
                    if(this.userListeners[event][i])
                        this.userListeners[event][i](data);
                }
            }.bind(this);
        }
        
        // Add user's listener.
        return [ event, this.userListeners[event].push(listener) - 1 ];
    },
    
    removeEventListener: function(listenerId) {
        // Delete the listener.
        this.userListeners[listenerId[0]][listenerId[1]] = null;
    },
    
    
    onChat: function(listener) {
        return this.addEventListener('chat', function(data) { listener(data.id, data.message); });
    },
    
    onMovement: function(listener) {
        return this.addEventListener('motion', function(data) { listener(data.id, data.x, data.y); });
    },
    
    onRotation: function(listener) {
        return this.addEventListener('scroll', function(data) { listener(data.id, data.angle / 180 * Math.PI); });
    },
    
    onWave: function(listener) {
        return this.addEventListener('click', function(data) {
            if(data.button === 'left')
                listener(data.id, data.x, data.y);
        });
    },
    
    onGhost: function(listener) {
        return this.addEventListener('click', function(data) {
            if(data.button === 'right')
                listener(data.id, data.x, data.y);
        });
    },
    
    
    isConnected: function(userId) {
        return !!others[userId];
    },
    
    
    getCountry: function(userId) {
        return userId ? others[userId].country : me.country;
    },
    
    setCountry: function(countryCode) {
        me.country = countryCode;
        
        // Delete the old cursor and remember its position, if necessary.
        var isFlagVisible = me.flag && me.flag.parentElement;
        var oldFlagPosition = null;
        if(isFlagVisible) {
            me.flag.parentElement.removeChild(me.flag);
            oldFlagPosition = { left: me.flag.style.left, top: me.flag.style.top };
        }
        
        // Create a new cursor.
        setCursor(me.country);
        
        // Flag was visible: put it back.
        if(isFlagVisible) {
            document.body.appendChild(me.flag);
            
            me.flag.style.left = oldFlagPosition.left;
            me.flag.style.top = oldFlagPosition.top;
            
            me.flag._new = false;
        }
    },
    
    setPosition: function(x, y) {
        // Pretend we moved the mouse to a given location.
        mouseMove({ clientX: x, clientY: y });
    },
    
    setAngle: function(angle /* radians */) {
        // Set the rotation of the cursor.
        me.angle = angle / Math.PI * 180;
        setRotate(me.flag, me.angle);
        
        // And broadcast it to everyone else.
        emit('scroll', { id: me.id, angle: me.angle });
    },
    
    makeWave: function(x, y) {
        // Pretend we made a left mouse click.
        mouseClick({ clientX: x, clientY: y, button: 0 });
    },
    
    makeGhost: function(x, y) {
        // Pretend we made a right mouse click.
        mouseClick({ clientX: x, clientY: y, button: 2 });
    }
};