var IIC = {
    // User-defined events
    
    _userListeners: {},
    
    addEventListener: function(event, listener) {
        // We aren't calling user listeners for this event: start doing so.
        if(!this._userListeners[event]) {
            this._userListeners[event] = [];
            
            var defaultListener = events[event];
            events[event] = function(data) {
                // Call the system's listener.
                defaultListener(data);
                
                // And then all of the user-defined ones.
                for(var i = 0; i < this._userListeners[event].length; i++) {
                    if(this._userListeners[event][i])
                        this._userListeners[event][i](data);
                }
            }.bind(this);
        }
        
        // Add user's listener.
        return [ event, this._userListeners[event].push(listener) - 1 ];
    },
    
    removeEventListener: function(listenerId) {
        // Make sure the id is valid and the listener exists.
        if(!listenerId || !listenerId[0] || (typeof listenerId[1]) === 'undefined'
           || !this._userListeners[listenerId[0]] || !this._userListeners[listenerId[0]][listenerId[1]])
            return false;

        // Delete the listener.
        this._userListeners[listenerId[0]][listenerId[1]] = null;
        return true;
    },
    
    // Connection
    
    getId: function() {
        return me.id;
    },
    
    getConnectedIds: function() {
        return Object.getOwnPropertyNames(others);
    },
    
    isConnected: function(userId) {
        return !!others[userId];
    },
    
    onConnection: function(listener) {
        return this.addEventListener('arrive', function(data) {
            listener(data.id);
        });
    },
    
    // Chat
    
    onChat: function(listener) {
        return this.addEventListener('chat', function(data) {
            listener(data.id, data.message);
        });
    },
    
    // Countries
    
    getCountry: function(userId) {
        if(userId)
            return others[userId] ? others[userId].country : null;
        return me.country;
    },
    
    setCountry: function(countryCode) {
        me.country = countryCode;
        
        // Delete the old cursor and remember its position, if necessary.
        var isFlagVisible = me.flag && me.flag.parentElement;
        var oldFlagPosition = this.getPosition();
        if(isFlagVisible)
            me.flag.parentElement.removeChild(me.flag);
        
        // Create a new cursor.
        setCursor(me.country);
        
        // Flag was visible: put it back.
        if(isFlagVisible) {
            document.body.appendChild(me.flag);
            
            me.flag.style.left = oldFlagPosition.x + 'px';
            me.flag.style.top = oldFlagPosition.y + 'px';
            
            me.flag._new = false;
        }
    },
    
    // Flag dimensions
    
    getFlagWidth: function(countryCode) {
        return flagWidth(countryCode);
    },
    
    getFlagHeight: function(countryCode) {
        return 20;
    },
    
    // Flag position
    
    getPosition: function(userId) {
        var flag;
        if(userId && userId !== me.id)
            flag = others[userId] ? others[userId].flag : null;
        else
            flag = me.flag;
        
        if(!flag || !flag.style.left || !flag.style.top)
            return null;
        
        return { x: parseInt(flag.style.left), y: parseInt(flag.style.top) };
    },
    
    setPosition: function(x, y) {
        // Pretend we moved the mouse to a given location.
        mouseMove({ clientX: x, clientY: y });
    },
    
    onMovement: function(listener) {
        return this.addEventListener('motion', function(data) { listener(data.id, data.x, data.y); });
    },
    
    // Flag rotation
    
    getAngle: function(userId) {
        return (userId ? others[userId].angle : me.angle) / 180 * Math.PI;
    },
    
    setAngle: function(angle) {
        // Set the rotation of the cursor.
        me.angle = angle / Math.PI * 180;
        setRotate(me.flag, me.angle);
        
        // And broadcast it to everyone else.
        emit('scroll', { id: me.id, angle: me.angle });
    },
    
    onRotation: function(listener) {
        return this.addEventListener('scroll', function(data) { listener(data.id, data.angle / 180 * Math.PI); });
    },
    
    // Waves and ghosts
    
    makeWave: function(x, y) {
        // Pretend we made a left mouse click.
        mouseClick({ clientX: x, clientY: y, button: 0 });
    },
    
    onWave: function(listener) {
        return this.addEventListener('click', function(data) {
            if(data.button === 'left')
                listener(data.id, data.x, data.y);
        });
    },
    
    makeGhost: function(x, y) {
        // Pretend we made a right mouse click.
        mouseClick({ clientX: x, clientY: y, button: 2 });
    },
    
    onGhost: function(listener) {
        return this.addEventListener('click', function(data) {
            if(data.button === 'right')
                listener(data.id, data.x, data.y);
        });
    },
    
    // Debugging
    
    _DEBUG_POINT_SIZE: 4,
    _DEBUG_Z_INDEX: 10000,
    _debugElements: [],
    
    _addDebugDiv: function(x, y) {
        var element = document.createElement('div');
        
        element.style.zIndex = this._DEBUG_Z_INDEX;
        
        element.style.position = 'absolute';
        element.style.left = x + 'px';
        element.style.top = y + 'px';
        
        document.body.appendChild(element);
        return { element: element, index: this._debugElements.push(element) - 1 };
    },
    
    debugPoint: function(x, y, color) {
        var point = this._addDebugDiv(x - this._DEBUG_POINT_SIZE / 2, y - this._DEBUG_POINT_SIZE / 2);
        
        point.element.style.width = this._DEBUG_POINT_SIZE + 'px';
        point.element.style.height = this._DEBUG_POINT_SIZE + 'px';
        
        point.element.style.backgroundColor = color || 'black';
        
        return point.index;
    },
    
    debugText: function(x, y, text, color) {
        var textbox = this._addDebugDiv(x, y);
        textbox.element.innerText = text;
        
        textbox.element.style.fontFamily = 'sans-serif';
        textbox.element.style.fontSize = '12px';
        
        if(color)
            textbox.element.style.color = color;
        
        return textbox.index;
    },
    
    debugErase: function(elementId) {
        if(!this._debugElements[elementId])
            return false;
        
        this._debugElements[elementId].parentElement.removeChild(this._debugElements[elementId]);
        this._debugElements[elementId] = null;
        return true;
    },
    
    debugEraseAll: function() {
        for(var i = 0; i < this._debugElements.length; i++)
            this.debugErase(i);
        this._debugElements = [];
    }
};