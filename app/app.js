/**
 * main application
 * 
 * @returns {App}
 */
function App() {
	var self = this;
	this.canvas;
	this.gl;
	this.shader;
	this.scene;
	this.eventManager;

	// Application parameter.
	this.width = 500;
	this.height = 500;
	this.aspectRatio;
	this.aspectRatio;

	// Loop parameter and variables.
	this.framerate = 30.0;	
	this.verticalViewAngle = 45.0;
	this.intervalTimer = null;	
	this.startTime = 0.0; 
	this.timerHandle = null;

	this.init = function(canvasId) {
		with (this) {
			var canvas = document.getElementById(canvasId);
			canvas.width = width;
			canvas.height = height;
			this.canvas = canvas;
			this.aspectRatio = width / height;

			// DEBUG
			// --------------------------------------------
			this.lastTime = 0.0;
			this.debug = document.createElement("div");
			this.canvas.parentNode.appendChild(this.debug);
			// --------------------------------------------

			this.gl = initGL(canvas);

			// Create Shader
			// ("shader-vs", "shader-fs"); // Shader form HTML tag.
			this.shader = this.createShader();
	
			// Create and initial draw of scene.
			this.scene = this.createScene();
			
			// Create the eventManager.
			this.eventManager = this.createEventManager();
		}
	};

	/** 
	 * @param canvas
	 * @returns
	 */
	var initGL = function(canvas) {
		try {
			var gl = canvas.getContext("experimental-webgl");
			gl.viewport(0, 0, canvas.width, canvas.height);
		} catch (e) {
			alert("Error initialising WebGL.");
			return null;
		}
		if (!gl) {
			alert("No gl context: Could not initialise WebGL.");
			return null;
		}
		return gl;
	};

	
	this.startLoop = function() {
		with(this){			
			// Start interval
			var startDate = new Date();
			this.startTime = startDate.getTime()/1000.0;
			var self = this;
			this.timerHandle = window.setInterval( function(){self.update();}, (1000.0/this.framerate));
		}
	};
	
	/**
	 * Called by window interval handler
	 */
	this.update = function() {

		// Calculate time
		var newDate = new Date();
		var time = (newDate.getTime() / 1000.0) - this.startTime;

		this.scene.drawSceneGraph(time);

		// DEBUG
		// --------------------------------------------
		this.debug.innerHTML = Math.round(10/(time-this.lastTime))/10.0+" fps";
		this.lastTime = time;
		// --------------------------------------------
	};


	/**
	 * Stop scene time
	 */
	this.stop = function() {
		window.clearInterval(this.timerHandle);
		this.timerHandle = null;
	};
	
};


/**
 * Public entry point for the application.
 */
App.prototype.start = function(canvasId) {
	this.init(canvasId);
	this.startLoop();
};


/**
 * Override this method to apply another shader program
 * @returns {Shader}
 */
App.prototype.createShader = function() {
	return new Shader().init(this.gl, "../../shader/simple.vertex", "../../shader/white.fragment");
};


/**
 * Override this method to apply another scene for the app.
 * @returns {Scene}
 */
App.prototype.createScene = function() {
	return new Scene().init(this.gl, this.canvas, this.aspectRatio, this.shader);
};


/**
 * Override this method to apply an event manager to the app.
 * @returns {EventManager}
 */
App.prototype.createEventManager = function() {
	return null;
};
