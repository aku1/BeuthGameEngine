
document.write("<br>Objects");

function BaseObject(val){
	document.write("<br>BaseObject "+val);
	this.val = val; // Public var.
	var privateVar = val;
	var that = this; // By convention, we make a private that variable to make the object available to the private methods. 

	// Privileged function.
	this.duc = function(s){
		document.write("<br>duc: "+val+s);
		dec(s);
	};

	// Private function.
	function dec(s){
		document.write("<br>dec: "+val+s);
	}
};

// Public function.
BaseObject.prototype.init = function(s){
	document.write("<br>.init:"+this.val+s);
};

BaseObject.prototype.print = function(s){
	document.write("<br>print:"+s+this.val);
};


var baseObj = new BaseObject('abc');
baseObj.init('cdf');
baseObj.duc('hmm');
baseObj.print('text');

document.write("<br><br>////// Callbacks //////////////");

function register(callback){
	document.write("<br>register:"+callback);
	callback('from register....');
}

register(baseObj.print); // Does not work, this gets lost.

register(function(){baseObj.print('from register functoin ()....');}); // Works via closure.

BaseObject.prototype.printCaller = function(s){
	document.write("<br>printCaller:"+s+this.val);
	var obj = this;
	register(function(){obj.print(s);});
	//register(this.print); // This does not work.
};

baseObj.printCaller('xyz');

function bind(toObject, methodName, parameter){
	return function(){toObject[methodName](parameter);};
}

register(bind(baseObj,"print","klm"));

function registerObj(anObject, methodName, parameter){
	anObject[methodName](parameter);
}

registerObj(baseObj,"print","uvw");

register(baseObj.duc); 


document.write("<br><br>Prototypes<br><br>");

function ChildOfBase(name){
	var name = name;
	this.printAll = function(){
		this.print('called from child '+name);
	};
};
ChildOfBase.prototype = new BaseObject("myParentClass");

var child = new ChildOfBase("tim");
child.print("direct");
child.printAll();
 
document.write("<br><br>Global Variables<br><br>");

var somename = "samy";
function SomeObject(name){
	var name = name;
	this.age = '22';
	this.print = function(){
		age = 17;
		document.write('<br>MyName '+name+this.age+age);
		somename = "mee";
	};
	SomeOtherObject();
};

document.write("<br>somename:"+somename);
var someObj = new SomeObject("tom");
someObj.print();
document.write("<br>somename:"+somename);

document.write("<br>scope");

//var shaderProgram = "shprogVAR";
function Shader(gl, vertexShaderId, fragmentShaderId) {	
	this.shaderProgram;
	shaderProgram = "shprog";
	this.init = function(){
		shaderProgram = "shpogInit";
	};
};

function Shape(){
	//var mySomeObj = new SomeObject("tim");
	document.write("<br>Shape:"+shaderProgram);	
}

function initShaderProg(){
	shaderProgram = "GlobalshprogVAR";
}

function Scene(){
	this.shader = new Shader();
	//this.shader.init();
	//initShaderProg();
	this.shape = new Shape();
}

var scene = new Scene();

