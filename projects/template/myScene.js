function MyScene(){};
MyScene.prototype = new Scene;


/**
 * Override buildSceneGraph
 */
MyScene.prototype.buildSceneGraph = function() {
	
	// Create some special Nodes.
	var sceneGraph = new Group();
	var speedRotor = new RotorXMutableSpeed(0.5);
	var camera = new PositionCamera(this.verticalViewAngle, this.aspectRatio , 1, 1000);
	
	// Add these objects as properties,
	// so that the event manager can access them.
	this.camera = camera;
	this.speedRotor = speedRotor;

	// Create 1st group with triangle.
	var g2 = new Group();
	g2.addChild(new Translation(-1.5, -1.5, -8.0));
	g2.addChild(new RotorY(1.0));
	g2.addChild(new Triangle(2.0, 2.0));

	// Create 2st group with rectangle.
	var g1 = new Group();
	g1.addChild(new Translation(1.5, 1.5, -8.0));
	g1.addChild(speedRotor);
	g1.addChild(new Rectangle(1.0, 1.0));

	// Create 3rd group with box.
	var g3 = new Group();
	g3.addChild(new Translation(-3, -3, -8.0));
	g3.addChild(new RotorY(1.0));
	g3.addChild(new Box(2.0, 2.0));


	// Add all nodes to scene graph.
	sceneGraph.addChild(camera); // <------- Camera
	sceneGraph.addChild(g1);
	sceneGraph.addChild(g2);
	sceneGraph.addChild(g3);

	return sceneGraph;
};

