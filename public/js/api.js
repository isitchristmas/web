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
    
    isConnected: function(userId) {
        return !!others[userId];
    },
    
    getConnectedIds: function() {
        return Object.getOwnPropertyNames(others);
    },
    
    getId: function() {
        return me.id;
    },
    
    // Chat
    
    onChat: function(listener) {
        return this.addEventListener('chat', function(data) {
            if(data.id !== me.id)
                listener(data.id, data.message);
        });
    },
    
    // Country
    
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
        if(userId)
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
    _debugElements: [],
    
    _addDebugDiv: function(x, y) {
        var element = document.createElement('div');
        
        element.style.position = 'absolute';
        element.style.left = x + 'px';
        element.style.top = y + 'px';
        
        document.body.appendChild(element);
        this._debugElements.push(element);
        
        return element;
    },
    
    debugPoint: function(x, y, color) {
        var pointElement = this._addDebugDiv(x - this._DEBUG_POINT_SIZE / 2, y - this._DEBUG_POINT_SIZE / 2);
        
        pointElement.style.width = this._DEBUG_POINT_SIZE + 'px';
        pointElement.style.height = this._DEBUG_POINT_SIZE + 'px';
        
        pointElement.style.backgroundColor = color;
    },
    
    debugText: function(x, y, text, color) {
        var textElement = this._addDebugDiv(x, y);
        textElement.innerText = text;
        
        textElement.style.fontFamily = 'sans-serif';
        
        if(color)
            textElement.style.color = color;
    },
    
    debugErase: function() {
        for(var i = 0; i < this._debugElements.length; i++)
            this._debugElements[i].parentElement.removeChild(this._debugElements[i]);
        this._debugElements = [];
    }
};